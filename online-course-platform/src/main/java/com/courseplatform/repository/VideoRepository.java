package com.courseplatform.repository;

import com.courseplatform.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {

    List<Video> findByCourseId(Long courseId);

    @Query("SELECT COUNT(e) FROM Video e")
    long countVideos();
}