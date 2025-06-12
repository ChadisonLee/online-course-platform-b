package com.courseplatform.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // 允许的域名，生产环境请改成你前端地址
        config.setAllowedOrigins(List.of("http://localhost:3000", "http://your-frontend-domain.com"));

        // 允许的请求头
        config.setAllowedHeaders(List.of("*"));

        // 允许的请求方法
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // 允许携带cookie等凭证
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // 配置所有请求路径都使用此CORS配置
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}