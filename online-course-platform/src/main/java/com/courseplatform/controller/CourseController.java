package com.courseplatform.controller;

import com.courseplatform.dto.CourseDTO;
import com.courseplatform.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    /**
     * 获取所有课程列表
     * @return 课程DTO列表
     */
    @GetMapping
    public ResponseEntity<List<CourseDTO>> getAllCourses() {
        List<CourseDTO> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    /**
     * 根据ID获取课程信息，包括类型，视频url，订阅信息
     * @param courseId 课程ID
     * @return 课程DTO
     */

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseDTO> getCourseDetailById(@PathVariable Long courseId, @RequestParam Long userId) {
        // 调用带用户ID的服务方法，返回包含报名状态的 CourseDTO
        CourseDTO courseDetail = courseService.getEnrollmentCourse(courseId, userId);
        return ResponseEntity.ok(courseDetail);
    }

    /**myCourse功能
     * 订阅课程信息
     * @param courseId 课程ID
     * @return 更新后的课程DTO
     */
    @PostMapping("/{courseId}/enrollment")
    public ResponseEntity<CourseDTO> enrollmentCourse(@PathVariable Long courseId, @RequestParam Long userId) {
        CourseDTO enrollmentCourse = courseService.enrollmentCourse(courseId, userId);
        return ResponseEntity.ok(enrollmentCourse);
    }

}