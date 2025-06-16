package com.courseplatform.repository;

import com.courseplatform.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
    // 你可以添加自定义查询方法


}