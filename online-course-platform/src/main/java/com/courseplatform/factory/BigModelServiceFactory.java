package com.courseplatform.factory;

import com.courseplatform.service.BigModelService;
import org.springframework.stereotype.Component;

@Component
public class BigModelServiceFactory {

    public BigModelService create(String userId, Boolean wsCloseFlag) {
        BigModelService service = new BigModelService();
        service.init(userId, wsCloseFlag);
        return service;
    }
}