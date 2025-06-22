package com.courseplatform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.courseplatform") // 确保扫描到 factory 包
public class CourseplatformApplication {
	public static void main(String[] args) {
		SpringApplication.run(CourseplatformApplication.class, args);
	}
}