package com.courseplatform.service;

import com.courseplatform.dto.CourseDTO;
import com.courseplatform.exception.ResourceNotFoundException;
import com.courseplatform.model.Category;
import com.courseplatform.model.Course;
import com.courseplatform.model.Video;
import com.courseplatform.repository.CategoryRepository;
import com.courseplatform.repository.CourseRepository;
import com.courseplatform.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
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


    public CourseDTO getCourseDetailById(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("课程未找到，ID：" + courseId));
        CourseDTO courseDTO = mapToDTO(course);

        // 从视频集合中取视频的URL
        Set<Video> videos = course.getVideo();
        List<Map<String, Object>> videoInfos = videos.stream()
                .map(v -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", v.getId());
                    map.put("url", v.getUrl());
                    map.put("title", v.getTitle());
                    return map;
                })
                .collect(Collectors.toList());

        courseDTO.setVideo(videoInfos);
        // 直接从 course.getCategory() 获取分类名称，避免重复 DB 查询
        if (course.getCategory() == null) {
            throw new ResourceNotFoundException("课程未关联分类");
        }
        courseDTO.setCategoryName(course.getCategory().getName());

        return courseDTO;
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
        if (course.getCategory() != null) {
            dto.setCategoryId(course.getCategory().getId());
            dto.setCategoryName(course.getCategory().getName());
        } else {
            dto.setCategoryId(null);
            dto.setCategoryName(null);
        }
        return dto;
    }
}