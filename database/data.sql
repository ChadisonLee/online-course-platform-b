-- data.sql: 初始化基础数据

-- 插入默认角色用户（示例超级管理员）
INSERT INTO users (username, password, email, role)
VALUES
    ('admin',
        -- 密码是 "admin123"，用 bcrypt 加密后的示例（请根据项目实际加密替换）
     '$2a$10$Dow1UJlYcH.MxY59EiQWbO1Xh0/e3nO9hRU8F4JkZ5Kz7q9Hkfl0i',
     'admin@example.com',
     'ROLE_ADMIN');

-- 插入默认课程分类
INSERT INTO categories (name) VALUES ('Java'), ('Python'), ('前端开发'), ('数据库');

-- 插入示例课程
INSERT INTO courses (title, description, category_id) VALUES
                                                          ('Java基础课程', 'Java从入门到精通', (SELECT id FROM categories WHERE name='Java' LIMIT 1)),
                                                          ('Python高级课程', 'Python数据分析与机器学习', (SELECT id FROM categories WHERE name='Python' LIMIT 1));

-- 插入示例视频
INSERT INTO videos (title, url, course_id) VALUES
                                               ('Java入门视频1', 'http://example.com/videos/java1.mp4', (SELECT id FROM courses WHERE title='Java基础课程' LIMIT 1)),
                                               ('Python数据分析视频1', 'http://example.com/videos/python1.mp4', (SELECT id FROM courses WHERE title='Python高级课程' LIMIT 1));