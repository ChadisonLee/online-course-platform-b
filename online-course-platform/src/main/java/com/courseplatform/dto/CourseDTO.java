package com.courseplatform.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.Map;

public class CourseDTO {

    private Long id;

    @NotBlank(message = "课程名称不能为空")
    private String title;

    private String description;

    private Long categoryId;

    private String categoryName;

    // 其他字段，如价格、讲师等可以根据需求添加

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    private List<Map<String, Object>> video;

    public List<Map<String, Object>> getVideo() {
        return video;
    }

    public void setVideo(List<Map<String, Object>> video) {
        this.video = video;
    }

    private boolean enrolled;

    public boolean isEnrolled() {
        return enrolled;
    }

    public void setEnrolled(boolean enrolled) {
        this.enrolled = enrolled;
    }
}