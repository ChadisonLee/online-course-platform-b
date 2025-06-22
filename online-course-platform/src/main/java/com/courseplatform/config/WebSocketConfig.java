package com.courseplatform.config;

import com.courseplatform.controller.BigModelController;
import com.courseplatform.factory.BigModelWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final BigModelWebSocketHandler bigModelWebSocketHandler;

    @Autowired
    public WebSocketConfig(BigModelWebSocketHandler bigModelWebSocketHandler) {
        this.bigModelWebSocketHandler = bigModelWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(bigModelWebSocketHandler, "/ws/bigmodel")
                .setAllowedOrigins("*");
    }
}
