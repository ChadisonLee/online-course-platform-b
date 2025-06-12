package com.courseplatform.repository;

import com.courseplatform.model.Enrollment;
import com.courseplatform.model.User;
import com.courseplatform.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    Optional<Enrollment> findByUserAndCourse(User user, Course course);

    List<Enrollment> findByUser(User user);

    List<Enrollment> findByCourse(Course course);
}