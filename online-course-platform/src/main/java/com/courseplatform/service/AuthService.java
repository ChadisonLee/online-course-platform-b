package com.courseplatform.service;

import com.courseplatform.dto.LoginRequest;
import com.courseplatform.dto.RegisterRequest;
import com.courseplatform.dto.UserDTO;
import com.courseplatform.exception.UnauthorizedException;
import com.courseplatform.model.User;
import com.courseplatform.repository.UserRepository;
import com.courseplatform.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * 用户登录认证，返回JWT及用户信息
     */
    public Map<String, Object> authenticateUser(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new UnauthorizedException("用户名不存在"));

            String token = jwtTokenProvider.generateToken(user.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", mapToUserDTO(user));
            return response;

        } catch (BadCredentialsException ex) {
            throw new UnauthorizedException("用户名或密码错误");
        }
    }

    /**
     * 用户注册
     */
    public UserDTO registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new UnauthorizedException("用户名已被占用");
        }
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new UnauthorizedException("邮箱已被使用");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole("ROLE_USER");  // 默认角色

        userRepository.save(user);

        return mapToUserDTO(user);
    }

    private UserDTO mapToUserDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        return dto;
    }
}