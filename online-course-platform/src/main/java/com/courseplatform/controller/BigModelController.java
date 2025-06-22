package com.courseplatform.controller;

import com.courseplatform.service.BigModelService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.server.standard.SpringConfigurator;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;
import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 集成HTTP接口和WebSocket服务端的控制器示例
 * 既保留了原有HTTP异步接口，也提供了WebSocket方式调用大模型服务
 */
@RestController
@RequestMapping("/api/bigmodel")
public class BigModelController implements WebSocketConfigurer {

    private final BigModelService bigModelService;
    private final ExecutorService executor = Executors.newFixedThreadPool(10);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public BigModelController(BigModelService bigModelService) {
        this.bigModelService = bigModelService;
    }

    private final ExecutorService asyncTaskExecutor = Executors.newFixedThreadPool(10);

    /**
     * 异步提交问题，立即返回任务ID
     */
    @PostMapping("/ask")
    public ResponseEntity<?> submitQuestionAsync(@RequestBody QuestionRequest request) {
        if (request == null || request.getQuestion() == null || request.getQuestion().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("问题不能为空");
        }
        if (request.getUserId() == null || request.getUserId().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("用户ID不能为空");
        }

        String uid = request.getUserId().trim();
        String question = request.getQuestion().trim();

        // 生成任务ID
        String taskId = UUID.randomUUID().toString();

        // 异步提交任务，避免阻塞请求线程
        asyncTaskExecutor.submit(() -> {
            try {
                // 这里调用你的同步业务逻辑方法，获取回答
                String answer = askQuestion(uid, question);

                // 通过 WebSocket 推送结果（你需要实现该方法）
                sendAnswerToWebSocketClient(uid, taskId, answer);
            } catch (Exception e) {
                sendErrorToWebSocketClient(uid, taskId, e.getMessage());
            }
        });

        // 立即返回任务ID
        return ResponseEntity.ok(new TaskResponse(taskId));
    }

    // WebSocket消息推送方法示例，请根据实际实现
// 线程安全Map，存储用户ID -> WebSocketSession
    private final ConcurrentHashMap<String, WebSocketSession> userSessions = new ConcurrentHashMap<>();

    private void sendAnswerToWebSocketClient(String uid, String taskId, String answer) {
        WebSocketSession session = userSessions.get(uid);
        if (session != null && session.isOpen()) {
            try {
                // 构造推送消息JSON
                String jsonMsg = objectMapper.writeValueAsString(
                        new WebSocketAnswerMessage(taskId, answer, "result")
                );
                session.sendMessage(new TextMessage(jsonMsg));
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            System.err.println("无法找到用户 " + uid + " 的WebSocket连接");
        }
    }

    private void sendErrorToWebSocketClient(String uid, String taskId, String errorMsg) {
        // TODO: 发送错误信息给客户端
    }

    /**
     * HTTP异步接口，保持原有接口兼容
     */
    private String askQuestion(String uid, String question) throws Exception {
        if (uid == null || uid.trim().isEmpty()) {
            throw new IllegalArgumentException("用户ID不能为空");
        }
        if (question == null || question.trim().isEmpty()) {
            throw new IllegalArgumentException("问题不能为空");
        }

        // 异步提交任务，立即返回任务ID

        // 返回任务ID给前端，后续通过WebSocket推送结果
        return bigModelService.askQuestion(uid, question);
    }

    // 任务ID响应体
    public static class TaskResponse {
        private String taskId;
        public TaskResponse(String taskId) { this.taskId = taskId; }
        public String getTaskId() { return taskId; }
        public void setTaskId(String taskId) { this.taskId = taskId; }
    }

    /**
     * WebSocket配置，注册WebSocket处理器到/ws/bigmodel路径
     */
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new BigModelWebSocketHandler(), "/ws/bigmodel")
                .setAllowedOrigins("*"); // 请根据实际情况限制允许的跨域地址
    }

    /**
     * WebSocket 处理器，支持接收请求、异步调用服务并发送回答
     */
    private class BigModelWebSocketHandler extends TextWebSocketHandler {

        private String getUserIdFromSession(WebSocketSession session) {
            // 例如从URI参数中取uid
            String query = session.getUri().getQuery();
            System.out.println("query: " + query);
            if (query != null) {
                for (String param : query.split("&")) {
                    String[] pair = param.split("=");
                    if (pair.length == 2 && "uid".equals(pair[0])) {
                        return pair[1];
                    }
                }
            }
            // 或从session属性、header中获取
            return null;
        }

        @Override
        public void afterConnectionEstablished(WebSocketSession session) throws Exception {
            String uid = getUserIdFromSession(session);
            if (uid != null) {
                userSessions.put(uid, session);
                System.out.println("用户 " + uid + " WebSocket连接已保存");
            } else {
                System.err.println("未能从连接中获取用户ID，sessionId=" + session.getId());
            }
        }

        @Override
        protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
            String payload = message.getPayload();

            // 简单示例：只做心跳检测或日志打印
            System.out.println("收到来自会话 " + session.getId() + " 的消息: " + payload);

            // 如果需要，可以回复一个简单的确认
            session.sendMessage(new TextMessage("{\"type\":\"ack\", \"message\":\"消息已收到\"}"));

            // 不再调用submitQuestionAsync，也不提交任务
        }

        @Override
        public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
            System.err.println("WebSocket传输错误: " + exception.getMessage());
            session.close(CloseStatus.SERVER_ERROR);
        }

        @Override
        public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
            String uid = getUserIdFromSession(session);
            if (uid != null) {
                userSessions.remove(uid);
                System.out.println("用户 " + uid + " WebSocket连接已移除");
            }
        }
    }

    // 请求体DTO
    public static class QuestionRequest {
        private String question;
        private String userId;

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }
    }

    // 响应体DTO
    public static class AnswerResponse {
        private String answer;

        public AnswerResponse() {
        }

        public AnswerResponse(String answer) {
            this.answer = answer;
        }

        public String getAnswer() {
            return answer;
        }

        public void setAnswer(String answer) {
            this.answer = answer;
        }
    }


    public static class WebSocketAnswerMessage {
        private String taskId;
        private String content;
        private String type;

        public WebSocketAnswerMessage(String taskId, String content, String type) {
            this.taskId = taskId;
            this.content = content;
            this.type = type;
        }

        // getter & setter
        public String getTaskId() { return taskId; }
        public void setTaskId(String taskId) { this.taskId = taskId; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
    }
}