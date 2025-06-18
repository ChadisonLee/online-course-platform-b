package com.courseplatform.controller;

import com.courseplatform.dto.CourseDTO;
import com.courseplatform.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/my-courses")
public class MyCourseController {

    private final CourseService courseService;

    public MyCourseController(CourseService courseService) {
        this.courseService = courseService;
    }
    /**
     * 获取当前用户订阅的课程列表
     * 建议通过认证上下文获取用户ID，以下示例用请求参数传参做示范
     *
     * @param userId 用户ID
     * @return 课程 DTO 列表
     */
    @GetMapping
    public ResponseEntity<List<CourseDTO>> getMyCourses(@RequestParam Long userId) {
        List<CourseDTO> myCourses = courseService.getMyCourses(userId);
        return ResponseEntity.ok(myCourses);
    }

    /**
     * 取消用户对某课程的订阅
     * @param userId 用户ID
     * @param courseId 课程ID
     * @return 无内容响应
     */
    @DeleteMapping("/cancelEnrollment")
    public ResponseEntity<Void> cancelEnrollment(
            @RequestParam Long userId,
            @RequestParam Long courseId) {
        courseService.cancelEnrollment(userId, courseId);
        return ResponseEntity.noContent().build();
    }
}
