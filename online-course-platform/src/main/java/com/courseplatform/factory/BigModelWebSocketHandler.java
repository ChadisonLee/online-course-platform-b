package com.courseplatform.factory;

import com.courseplatform.service.BigModelService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
public class BigModelWebSocketHandler extends TextWebSocketHandler {
    private final BigModelService bigModelService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final ExecutorService executor = Executors.newCachedThreadPool();

    @Autowired
    public BigModelWebSocketHandler(BigModelService bigModelService) {
        this.bigModelService = bigModelService;
    }

    // 你的处理逻辑...
}
