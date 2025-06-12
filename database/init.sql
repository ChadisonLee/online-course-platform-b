-- init.sql: 统一调用 schema.sql 和 data.sql（MySQL不支持RUN SCRIPT，示例用source命令）

-- 如果你用的MySQL客户端，初始化时可以执行：
SOURCE schema.sql;
SOURCE data.sql;

-- 也可以直接把 schema.sql 和 data.sql 合并执行