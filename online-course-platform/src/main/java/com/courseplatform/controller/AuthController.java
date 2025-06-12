package com.courseplatform.controller;

import com.courseplatform.dto.LoginRequest;
import com.courseplatform.dto.RegisterRequest;
import com.courseplatform.dto.UserDTO;
import com.courseplatform.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * 用户登录接口
     * @param loginRequest 登录请求体，包含用户名和密码
     * @return 返回JWT令牌和用户信息
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        var response = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }

    /**
     * 用户注册接口
     * @param registerRequest 注册请求体，包含用户名、邮箱、密码等
     * @return 注册成功的用户信息
     */
    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@Valid @RequestBody RegisterRequest registerRequest) {
        UserDTO userDTO = authService.registerUser(registerRequest);
        return ResponseEntity.ok(userDTO);
    }
}