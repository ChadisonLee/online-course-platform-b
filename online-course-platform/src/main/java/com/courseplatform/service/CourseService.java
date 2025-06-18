package com.courseplatform.service;

import com.courseplatform.dto.CourseDTO;
import com.courseplatform.exception.ResourceNotFoundException;
import com.courseplatform.model.*;
import com.courseplatform.repository.CategoryRepository;
import com.courseplatform.repository.CourseRepository;
import com.courseplatform.repository.EnrollmentRepository;
import com.courseplatform.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

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
            courseDTO.setCategoryName("未分类");
        } else {
            courseDTO.setCategoryName(course.getCategory().getName());
        }
        courseDTO.setCategoryName(course.getCategory().getName());

        return courseDTO;
    }

//    detail里查看订阅状态
    public CourseDTO getEnrollmentCourse(Long courseId, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("用户未找到，ID：" + userId));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("课程未找到，ID：" + courseId));

        Optional<Enrollment> enrollmentOpt = enrollmentRepository.findByUserAndCourse(user, course);
        CourseDTO courseDTO = getCourseDetailById(courseId);

        // 如果存在报名记录，设置 enrolled 为 true
        courseDTO.setEnrolled(enrollmentOpt.isPresent());

        return courseDTO;
    }

    public CourseDTO enrollmentCourse(Long courseId, Long userId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("课程未找到"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("用户未找到"));

        // 判断是否已报名
        boolean alreadyEnrolled = enrollmentRepository.existsByUserAndCourse(user, course);

        if (!alreadyEnrolled) {
            // 创建新的报名记录
            Enrollment enrollment = new Enrollment();
            enrollment.setCourse(course);
            enrollment.setUser(user);
            enrollment.setEnrolledAt(LocalDateTime.now()); // 可选
            enrollmentRepository.save(enrollment);
        }

        // 重新加载或更新课程报名状态（假设CourseDTO有enrolled字段）
        CourseDTO courseDTO = mapToDTO(course);
        courseDTO.setEnrolled(true); // 标记用户已报名

        return courseDTO;
    }

    /**
     * my-course页面功能获取用户已报名的课程列表
     * @param userId 用户ID
     * @return 课程 DTO 列表
     */
    public List<CourseDTO> getMyCourses(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("用户未找到，ID：" + userId));

        List<Enrollment> enrollments = enrollmentRepository.findByUser(user);

        return enrollments.stream()
                .map(Enrollment::getCourse) // 取出课程实体
                .filter(Objects::nonNull)   // 过滤空值，防止空指针
                .map(course -> {
                    CourseDTO dto = mapToDTO(course);
                    dto.setEnrolled(true);  // 已报名状态
                    return dto;
                })
                .collect(Collectors.toList());
    }
    @Transactional
    public void cancelEnrollment(Long userId, Long courseId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("用户未找到，ID：" + userId));

        // 查找用户所有报名记录
        List<Enrollment> enrollments = enrollmentRepository.findByUser(user);

        // 找到对应课程的报名记录
        Enrollment targetEnrollment = enrollments.stream()
                .filter(enrollment -> enrollment.getCourse() != null && enrollment.getCourse().getId().equals(courseId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("报名记录未找到，课程ID：" + courseId));

        // 删除报名记录
        enrollmentRepository.delete(targetEnrollment);
    }


    /**
     * admin操作
     * @param courseDTO 前端传入的课程DTO
     * @return 创建后的课程DTO（含ID等数据库生成字段）
     */
    public CourseDTO createCourse(CourseDTO courseDTO) {
        Course course = new Course();
        course.setTitle(courseDTO.getTitle());
        course.setDescription(courseDTO.getDescription());

        Category category = new Category();
        category.setName(courseDTO.getCategoryName());

        Course saved = courseRepository.save(course);
        Category savedCategory = categoryRepository.save(category);

        CourseDTO result = new CourseDTO();
        result.setId(saved.getId());
        result.setTitle(saved.getTitle());
        result.setDescription(saved.getDescription());
        result.setCategoryName(savedCategory.getName());
        return result;
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
        dto.setEnrolled(false);
        return dto;
    }
}