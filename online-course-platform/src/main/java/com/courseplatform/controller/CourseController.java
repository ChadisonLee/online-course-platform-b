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
     * 根据ID获取课程信息，包括类型，视频url
     * @param courseId 课程ID
     * @return 课程DTO
     */

    @GetMapping("/{courseId}")
    public ResponseEntity<CourseDTO> getCourseDetailById(@PathVariable Long courseId) {
        CourseDTO CourseDetail = courseService.getCourseDetailById(courseId);
        return ResponseEntity.ok(CourseDetail);
    }

    /**添加myCourse
     * 创建新课程
     * @param courseDTO 课程数据传输对象
     * @return 创建后的课程DTO
     */
    @PostMapping
    public ResponseEntity<CourseDTO> createCourse(@Valid @RequestBody CourseDTO courseDTO) {
        CourseDTO createdCourse = courseService.createCourse(courseDTO);
        return ResponseEntity.ok(createdCourse);
    }


    /**myCourse功能
     * 更新课程信息
     * @param courseId 课程ID
     * @param courseDTO 更新的课程数据
     * @return 更新后的课程DTO
     */
    @PutMapping("/{courseId}")
    public ResponseEntity<CourseDTO> updateCourse(@PathVariable Long courseId, @Valid @RequestBody CourseDTO courseDTO) {
        CourseDTO updatedCourse = courseService.updateCourse(courseId, courseDTO);
        return ResponseEntity.ok(updatedCourse);
    }

    /**
     * 删除课程
     * @param courseId 课程ID
     * @return 无内容响应
     */
    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long courseId) {
        courseService.deleteCourse(courseId);
        return ResponseEntity.noContent().build();
    }
}