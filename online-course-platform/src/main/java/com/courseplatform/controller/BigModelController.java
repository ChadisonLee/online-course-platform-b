package com.courseplatform.controller;

import com.courseplatform.service.BigModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/bigmodel")
public class BigModelController {

    private final BigModelService bigModelService;

    @Autowired
    public BigModelController(BigModelService bigModelService) {
        this.bigModelService = bigModelService;
    }

    /**
     *前端调用，建立WebSocket连接
      */
    @PostMapping("/connect")
    public ResponseEntity<?> connectWebsocket() {
        try {
            bigModelService.createWebSocket();
            return ResponseEntity.ok("WebSocket连接已建立");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("连接建立失败：" + e.getMessage());
        }
    }

    /**
     * 提交问题，获取大模型回答（异步接口）
     * POST /api/bigmodel/ask
     * 请求体示例：{ "question": "环境治理的重要性" }
     *
     * @param request 请求体JSON，包含问题字段
     * @return 大模型回答文本（异步返回）
     */
    @PostMapping("/ask")
    public CompletableFuture<ResponseEntity<?>> askQuestion(@RequestBody QuestionRequest request) {
        if (request == null || request.getQuestion() == null || request.getQuestion().trim().isEmpty()) {
            return CompletableFuture.completedFuture(ResponseEntity.badRequest().body("问题不能为空"));
        }

        return CompletableFuture.supplyAsync(() -> {
            try {
                // 调用服务层获取答案（同步阻塞调用）
                String answer = bigModelService.askQuestion(request.getQuestion().trim());
                return ResponseEntity.ok(new AnswerResponse(answer));
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("大模型服务异常：" + e.getMessage());
            }
        });
    }

    /**
     *前端调用，关闭WebSocket连接
     */
    @PostMapping("/disconnect")
    public ResponseEntity<?> disconnectWebsocket() {
        try {
            bigModelService.destroyWebSocket();
            return ResponseEntity.ok("WebSocket连接已关闭");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("连接关闭失败：" + e.getMessage());
        }
    }

    // 请求体DTO
    public static class QuestionRequest {
        private String question;

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }
    }

    // 响应体DTO
    public static class AnswerResponse {
        private String answer;

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
}