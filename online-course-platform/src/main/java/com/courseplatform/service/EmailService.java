package com.courseplatform.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    // 这里可以注入JavaMailSender等邮件组件，实现发送邮件功能

    public void sendEmail(String to, String subject, String content) {
        // TODO: 实现邮件发送逻辑
        System.out.println("发送邮件给：" + to);
        System.out.println("主题：" + subject);
        System.out.println("内容：" + content);
    }
}