# StudentManagerment 学生管理系统

基于 **SSH（Spring + SpringMVC + Hibernate/JPA）+ MySQL** 的学生管理系统，带 Spring Security OAuth2 认证、角色权限管理、Excel 导入导出与图片上传。非 Spring Boot 项目，采用多模块 Maven + WAR 包部署。

## 功能

- **学生管理**：学生档案、班级（ClassName）、奖学金（Scholarship）评定
- **课程与选课**：课程（Course）维护、选课（Sc）记录、平均分（AvgFraction）统计
- **异动管理**：学生异动（change）记录
- **权限体系**：用户 / 角色 / 权限三张表 + Spring Security OAuth2，方法级权限控制
- **辅助功能**：Excel 导入导出、文件上传（路径可配）、CORS 跨域、代码生成器（Generator）

## 技术栈

| 层 | 技术 |
| --- | --- |
| 框架 | Spring 4.x、SpringMVC、Spring ORM / TX、Spring Security + OAuth2 |
| 持久层 | Hibernate 4.x + JPA、Hibernate Envers（审计）、C3P0 / Proxool 连接池 |
| 前端 | JSP + JSTL + Bootstrap（后台页面在 `rs/src/main/webapp/admin`） |
| 工具 | Apache POI（Excel）、zxing（二维码）、AspectJ、Hibernate Validator |
| 数据库 | MySQL 5.x |
| 构建 | Maven 多模块，WAR 包部署到 Servlet 容器 |

## 模块结构

```
build/      父 POM，聚合 misc / config / model / commons / core / rs，管理依赖版本
config/     各环境过滤器配置（dev / local / autotest / jenkins），数据库地址在此切换
model/      实体（entity）、Excel 模型（excel）、消息（message）
commons/    公共工具类
core/       业务层：dao / service（含 change、course、sc、student 等子包）
rs/         Web 层：controller、Spring 配置、JSP 页面（最终打成 WAR）
misc/       MySQL 建表与初始化 SQL
parent/     parent POM
```

`core` 只依赖 `model` / `commons`，`rs` 再依赖 `core`，控制层与业务层分离。

## 快速开始

**1. 建库**

`misc/MySQL/sql/CreateDatabase.sql` 建权限相关表，`student.sql`、`course.sql`、`sc.sql`、`change.sql`、`others.sql` 等业务表按需导入，`spring.security.oauth2.sql` 建 OAuth2 表，`data/init.sql` 为初始化数据。数据库名默认为 `torinosrc`。

**2. 配置数据源**

编辑 `config/src/main/filters/dev.properties`（或其他环境文件）：

```properties
port=8080
db-url=jdbc:mysql://你的地址:3306/torinosrc
db-username=你的账号
db-password=你的密码
```

默认账号在 `CreateDatabase.sql` 中预置（`admin`、`guest` 等），密码为哈希值，需按项目加密算法自行生成。

**3. 启动**

在 `rs/` 下执行 Maven 打包，将生成的 WAR 部署到 Tomcat：

```bash
mvn -pl rs -am clean package -Ddeploy.env=dev
```

通过 `rs/src/main/webapp/WEB-INF/web.xml` 与 `springmvc-servlet.xml` 加载 Spring / SpringMVC 配置。访问 `http://localhost:8080/`。

## 说明

本项目为个人练习作品，提交多为学习阶段的测试代码。生产使用请务必：替换硬编码的数据库地址与凭据、关闭测试账号、审查 OAuth2 与权限配置。
