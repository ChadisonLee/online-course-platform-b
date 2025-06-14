-- data.sql: 初始化基础数据

-- 插入默认角色用户（示例超级管理员）
INSERT INTO users (username, password, email, role)
VALUES
    ('admin',
        -- 密码是 "admin123"，用 bcrypt 加密后的示例（请根据项目实际加密替换）
     '$2a$10$dKsstaZxsgzGIvjCbMIetOuMCPAY0jk7HorobCSsTb7WV21mrFMEu',
     'admin@example.com',
     'ROLE_ADMIN');
-- 插入示例分类
INSERT INTO categories (name) VALUES
                                  ('Programming'),
                                  ('Design'),
                                  ('Marketing');

-- 插入示例课程
INSERT INTO courses (title, description, category_id) VALUES
                                                          ('Java Basics', 'Learn the basics of Java programming.', 1),
                                                          ('Advanced CSS', 'Master CSS for responsive web design.', 2),
                                                          ('Digital Marketing 101', 'Introduction to digital marketing strategies.', 3);

-- 插入示例视频
INSERT INTO videos (title, url, course_id) VALUES
                                               ('Java Introduction', 'https://example.com/videos/java_intro.mp4', 1),
                                               ('Java Variables', 'https://example.com/videos/java_variables.mp4', 1),
                                               ('CSS Grid Layout', 'https://example.com/videos/css_grid.mp4', 2),
                                               ('Marketing Fundamentals', 'https://example.com/videos/marketing_fundamentals.mp4', 3);