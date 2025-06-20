package com.courseplatform.repository;

import com.courseplatform.model.Enrollment;
import com.courseplatform.model.User;
import com.courseplatform.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    // 查找指定用户和课程的报名记录（用于判断是否已报名）
    Optional<Enrollment> findByUserAndCourse(User user, Course course);

    // 查找指定用户所有报名课程
    List<Enrollment> findByUser(User user);

    // 在 EnrollmentRepository 中新增方法
    @Query("SELECT COUNT(e) FROM Enrollment e")
    long countEnrollments();

    // 自定义判断是否存在某用户报名某课程（返回布尔，简化判断）
    boolean existsByUserAndCourse(User user, Course course);
}