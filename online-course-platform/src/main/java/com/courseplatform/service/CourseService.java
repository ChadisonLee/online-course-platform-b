package com.courseplatform.service;

import com.courseplatform.dto.CourseDTO;
import com.courseplatform.exception.ResourceNotFoundException;
import com.courseplatform.model.Category;
import com.courseplatform.model.Course;
import com.courseplatform.repository.CategoryRepository;
import com.courseplatform.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<CourseDTO> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return courses.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public CourseDTO getCourseById(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("课程未找到，ID：" + courseId));
        return mapToDTO(course);
    }

    public CourseDTO createCourse(CourseDTO courseDTO) {
        Category category = categoryRepository.findById(courseDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("分类未找到，ID：" + courseDTO.getCategoryId()));

        Course course = new Course();
        course.setTitle(courseDTO.getTitle());
        course.setDescription(courseDTO.getDescription());
        course.setCategory(category);

        Course saved = courseRepository.save(course);
        return mapToDTO(saved);
    }

    public CourseDTO updateCourse(Long courseId, CourseDTO courseDTO) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("课程未找到，ID：" + courseId));

        Category category = categoryRepository.findById(courseDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("分类未找到，ID：" + courseDTO.getCategoryId()));

        course.setTitle(courseDTO.getTitle());
        course.setDescription(courseDTO.getDescription());
        course.setCategory(category);

        Course updated = courseRepository.save(course);
        return mapToDTO(updated);
    }

    public void deleteCourse(Long courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new ResourceNotFoundException("课程未找到，ID：" + courseId);
        }
        courseRepository.deleteById(courseId);
    }

    private CourseDTO mapToDTO(Course course) {
        CourseDTO dto = new CourseDTO();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setCategoryId(course.getCategory().getId());
        return dto;
    }
}