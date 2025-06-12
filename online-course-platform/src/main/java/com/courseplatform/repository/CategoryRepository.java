package com.courseplatform.repository;

import com.courseplatform.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    // 可以根据需要添加自定义查询方法
}