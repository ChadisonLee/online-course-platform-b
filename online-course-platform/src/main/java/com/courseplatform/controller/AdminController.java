package com.courseplatform.controller;

import com.courseplatform.dto.CourseDTO;
import com.courseplatform.dto.UserDTO;
import com.courseplatform.service.UserService;
import com.courseplatform.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * 管理员专用控制器，提供管理用户和课程的接口
 */
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")  // 整个类所有方法都需要ADMIN角色
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private CourseService courseService;

    /**
     * 获取所有用户
     */
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * 根据用户ID删除用户
     */
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    /**
     * 根据课程ID获取课程详情
     */
    @GetMapping("/courses/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable Long id) {
        CourseDTO course = courseService.getCourseDetailById(id);
        if (course == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(course);
    }

    /**
     * 获取所有分类ID，方便用户选择
     */
    @GetMapping("/courses/category")
    public ResponseEntity<List<Map<Long, String>>> getAllCategory() {
        List<Map<Long, String>> category = courseService.getAllCategory();
        if (category == null || category.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(category);
    }

    /**
     * 管理员创建课程
     */
    @PostMapping("/courses/create")
    public ResponseEntity<CourseDTO> createCourse(@Valid @RequestBody CourseDTO courseDTO) {
        CourseDTO createdCourse = courseService.createCourse(courseDTO);
        return ResponseEntity.ok(createdCourse);
    }

    /**
     * 管理员编辑课程
     */
    @PutMapping("/courses/edit")
    public ResponseEntity<CourseDTO> editCourse(@RequestBody @Valid CourseDTO courseDTO) {
        if (courseDTO.getId() == null) {
            return ResponseEntity.badRequest().build();
        }
        System.out.println(courseDTO);
        CourseDTO updatedCourse = courseService.updateCourse(courseDTO);
        return ResponseEntity.ok(updatedCourse);
    }

    /**
     * 管理员删除课程
     */
    @DeleteMapping("/courses/del{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long courseId) {
        courseService.deleteCourse(courseId);
        return ResponseEntity.noContent().build();
    }

    /**
     * 管理员获取订阅数
     */
    @GetMapping("/courses/enrollment")
    public Long getEnrollmentCourse(){
        return courseService.getTotalEnrollment();
    }

    /**
     * 管理员获取课程视频数
     */
    @GetMapping("/courses/video")
    public Long getTotalVideo(){
        return courseService.getTotalVideo();
    }


}