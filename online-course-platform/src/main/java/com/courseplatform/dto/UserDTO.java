package com.courseplatform.dto;

import jakarta.validation.constraints.Email;

public class UserDTO {

    private Long id;

    private String username;

    @Email(message = "邮箱格式不正确")
    private String email;

    private String role;  // 如 ROLE_USER, ROLE_ADMIN 等

    private String password;

    // Getters 和 Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}