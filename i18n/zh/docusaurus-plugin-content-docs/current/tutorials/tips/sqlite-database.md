---
sidebar_position: 11
title: "💠 SQLite 数据库概述"
---

:::warning
本教程是社区贡献，不由 Open WebUI 团队支持。它仅作为如何根据您的特定使用情况自定义 Open WebUI 的示例。想要贡献？请查看贡献教程。
:::

> [!WARNING]  
> 本文档是基于当前版本 (0.5.11) 创建的，并在不断更新中。

# Open-WebUI 内部 SQLite 数据库

对于 Open-WebUI，SQLite 数据库是用户管理、聊天历史、文件存储以及各种核心功能的基础。了解其结构对于任何希望有效贡献或维护项目的人都至关重要。

## 内部 SQLite 位置

您可以在 `root` -> `data` -> `webui.db` 找到 SQLite 数据库

```
📁 根目录 (/)
├── 📁 data
│   ├── 📁 cache
│   ├── 📁 uploads
│   ├── 📁 vector_db
│   └── 📄 webui.db
├── 📄 dev.sh
├── 📁 open_webui
├── 📄 requirements.txt
├── 📄 start.sh
└── 📄 start_windows.bat
```

## 本地复制数据库

如果您想将运行在容器中的 Open-WebUI SQLite 数据库复制到本地计算机，可以使用：

```bash
docker cp open-webui:/app/backend/data/webui.db ./webui.db
```

或者，您可以使用以下命令在容器内访问数据库：

```bash
docker exec -it open-webui /bin/sh
```

## 表概览

以下是 Open-WebUI SQLite 数据库中的完整表格列表。表格按字母顺序排列，并为方便起见进行了编号。

| **编号** | **表名**         | **描述**                                                   |
| ------- | ---------------- | ---------------------------------------------------------- |
| 01      | auth             | 存储用户认证凭据和登录信息                                 |
| 02      | channel          | 管理聊天频道及其配置                                       |
| 03      | channel_member   | 跟踪用户在频道内的会员资格和权限                           |
| 04      | chat             | 存储聊天会话及其元数据                                     |
| 05      | chatidtag        | 映射聊天与其关联标签之间的关系                             |
| 06      | config           | 维护系统范围内的配置设置                                   |
| 07      | document         | 存储文档及其元数据用于知识管理                             |
| 08      | feedback         | 捕获用户反馈和评分                                         |
| 09      | file             | 管理上传的文件及其元数据                                   |
| 10      | folder           | 将文件和内容组织为层次结构                                 |
| 11      | function         | 存储自定义函数及其配置                                     |
| 12      | group            | 管理用户组及其权限                                         |
| 13      | knowledge        | 存储知识库条目及相关信息                                   |
| 14      | memory           | 维护聊天历史和上下文记忆                                   |
| 15      | message          | 存储单独的聊天消息及其内容                                 |
| 16      | message_reaction | 记录用户对消息的反应（表情/回复）                          |
| 17      | migrate_history  | 跟踪数据库模式版本和迁移记录                               |
| 18      | model            | 管理 AI 模型配置和设置                                     |
| 19      | prompt           | 存储 AI 提示的模板和配置                                   |
| 20      | tag              | 管理用于内容分类的标签/标签                                |
| 21      | tool             | 存储系统工具和集成的配置                                   |
| 22      | user             | 维护用户配置文件和账户信息                                 |

注意：Open-WebUI 的 SQLite 数据库中有两个与 Open-WebUI 核心功能无关的附加表格，已被排除：

- Alembic Version 表
- 迁移历史表

现在我们已经列出了所有表格，让我们了解每个表的结构。

## Auth 表

| **列名**    | **数据类型**   | **约束**       | **描述**         |
| ----------- | ------------- | ------------- | ---------------- |
| id          | 字符串        | 主键          | 唯一标识符       |
| email       | 字符串        | -             | 用户邮箱         |
| password    | 文本          | -             | 哈希密码         |
| active      | 布尔值        | -             | 账号状态         |

关于 auth 表需要知道的事项：

- 主键使用 UUID
- 与 `users` 表有一对一关系（共享 id）

## Channel 表

| **列名**    | **数据类型**   | **约束**       | **描述**                             |
| ----------- | ------------- | ------------- | ----------------------------------- |
| id              | 文本          | 主键            | 唯一标识符 (UUID)                |
| user_id         | 文本          | -               | 频道的所有者/创建者             |
| type            | 文本          | 可为空          | 频道类型                        |
| name            | 文本          | -               | 频道名称                        |
| description     | 文本          | 可为空          | 频道描述                        |
| data            | JSON          | 可为空          | 灵活的数据存储                  |
| meta            | JSON          | 可为空          | 频道元数据                      |
| access_control  | JSON          | 可为空          | 权限设置                        |
| created_at      | 大整数        | -               | 创建时间戳 (纳秒)               |
| updated_at      | 大整数        | -               | 最后更新时间戳 (纳秒)           |

关于身份验证表的注意事项：

- 使用 UUID 作为主键
- 频道名称不区分大小写（存储为小写）

## 频道成员表

| **列名**        | **数据类型**  | **约束条件**    | **描述**                        |
| --------------- | ------------- | --------------- | -------------------------------- |
| id              | 文本          | 不为空          | 频道成员的唯一标识符            |
| channel_id      | 文本          | 不为空          | 引用频道                        |
| user_id         | 文本          | 不为空          | 引用用户                        |
| created_at      | 大整数        | -               | 创建成员关系的时间戳            |

## 聊天表

| **列名**        | **数据类型**  | **约束条件**             | **描述**                    |
| --------------- | ------------- | ----------------------- | -------------------------- |
| id              | 字符串        | 主键                  | 唯一标识符 (UUID)          |
| user_id         | 字符串        | -                      | 聊天的所有者               |
| title           | 文本          | -                      | 聊天标题                   |
| chat            | JSON          | -                      | 聊天内容和历史记录         |
| created_at      | 大整数        | -                      | 创建时间戳                 |
| updated_at      | 大整数        | -                      | 最后更新时间戳             |
| share_id        | 文本          | 唯一, 可为空            | 分享标识符                 |
| archived        | 布尔          | 默认值=False            | 归档状态                   |
| pinned          | 布尔          | 默认值=False, 可为空    | 固定状态                   |
| meta            | JSON          | 服务器默认="{}"         | 元数据（包括标签等）        |
| folder_id       | 文本          | 可为空                 | 父文件夹的 ID              |

## 聊天 ID 标签表

| **列名**        | **数据类型**  | **约束条件**    | **描述**                    |
| --------------- | ------------- | --------------- | -------------------------- |
| id              | VARCHAR(255)  | 不为空          | 唯一标识符                 |
| tag_name        | VARCHAR(255)  | 不为空          | 标签名称                   |
| chat_id         | VARCHAR(255)  | 不为空          | 引用聊天记录                |
| user_id         | VARCHAR(255)  | 不为空          | 引用用户                   |
| timestamp       | 整数          | 不为空          | 创建时间戳                 |

## 配置表

| **列名**        | **数据类型**  | **约束条件**    | **默认值**       | **描述**                 |
| --------------- | ------------- | --------------- | ----------------- | ----------------------- |
| id              | 整数          | 不为空          | -                 | 主键标识符              |
| data            | JSON          | 不为空          | -                 | 配置数据                |
| version         | 整数          | 不为空          | -                 | 配置版本号              |
| created_at      | 日期时间      | 不为空          | 当前时间戳        | 创建时间戳              |
| updated_at      | 日期时间      | -               | 当前时间戳        | 最后更新时间戳          |

## 反馈表

| **列名**        | **数据类型**  | **约束条件**    | **描述**                        |
| --------------- | ------------- | --------------- | ------------------------------ |
| id              | 文本          | 主键            | 唯一标识符 (UUID)              |
| user_id         | 文本          | -               | 提供反馈的用户                 |
| version         | 大整数        | 默认值=0        | 反馈版本号                     |
| type            | 文本          | -               | 反馈类型                       |
| data            | JSON          | 可为空          | 反馈数据（包括评分等）         |
| meta            | JSON          | 可为空          | 元数据（竞技场、聊天 ID 等）   |
| snapshot        | JSON          | 可为空          | 关联的聊天记录快照             |
| created_at      | BigInteger    | -               | 创建时间戳                  |
| updated_at      | BigInteger    | -               | 最后更新时间戳               |

# 文件表

| **列名**        | **数据类型**  | **约束条件**    | **描述**              |
| --------------- | ------------- | --------------- | --------------------- |
| id              | String        | PRIMARY KEY     | 唯一标识符              |
| user_id         | String        | -               | 文件所有者              |
| hash            | Text          | nullable        | 文件哈希值/校验码        |
| filename        | Text          | -               | 文件名称                |
| path            | Text          | nullable        | 文件系统路径             |
| data            | JSON          | nullable        | 与文件相关的数据          |
| meta            | JSON          | nullable        | 文件元数据               |
| access_control  | JSON          | nullable        | 权限设置                |
| created_at      | BigInteger    | -               | 创建时间戳               |
| updated_at      | BigInteger    | -               | 最后更新时间戳            |

`meta`字段的预期结构：

```python
{
    "name": string,          # 可选显示名称
    "content_type": string,  # MIME类型
    "size": integer,         # 文件大小（字节）
    # 通过ConfigDict(extra="allow")支持额外元数据
}
```

## 文件夹表

| **列名**        | **数据类型**  | **约束条件**    | **描述**                   |
| --------------- | ------------- | --------------- | -------------------------- |
| id              | Text          | PRIMARY KEY     | 唯一标识符（UUID）          |
| parent_id       | Text          | nullable        | 用于层次结构的父文件夹ID    |
| user_id         | Text          | -               | 文件夹所有者                |
| name            | Text          | -               | 文件夹名称                  |
| items           | JSON          | nullable        | 文件夹内容                  |
| meta            | JSON          | nullable        | 文件夹元数据                |
| is_expanded     | Boolean       | default=False   | UI展开状态                  |
| created_at      | BigInteger    | -               | 创建时间戳                  |
| updated_at      | BigInteger    | -               | 最后更新时间戳              |

关于文件夹表的一些注意事项：

- 文件夹可以嵌套（parent_id引用）
- 根文件夹的parent_id为null
- 文件夹名称在同一父级内必须唯一

## 功能表

| **列名**        | **数据类型**  | **约束条件**    | **描述**               |
| --------------- | ------------- | --------------- | ----------------------- |
| id              | String        | PRIMARY KEY     | 唯一标识符              |
| user_id         | String        | -               | 功能所有者              |
| name            | Text          | -               | 功能名称               |
| type            | Text          | -               | 功能类型               |
| content         | Text          | -               | 功能内容/代码           |
| meta            | JSON          | -               | 功能元数据              |
| valves          | JSON          | -               | 功能控制设置             |
| is_active       | Boolean       | -               | 功能激活状态            |
| is_global       | Boolean       | -               | 全局可用性标志          |
| created_at      | BigInteger    | -               | 创建时间戳              |
| updated_at      | BigInteger    | -               | 最后更新时间戳          |

关于功能表的一些注意事项：

- `type`只能是：["filter", "action"]

## 组表

| **列名**        | **数据类型**  | **约束条件**        | **描述**               |
| --------------- | ------------- | ------------------- | ------------------------ |
| id              | Text          | PRIMARY KEY, UNIQUE | 唯一标识符（UUID）      |
| user_id         | Text          | -                   | 组所有者/创建者         |
| name            | Text          | -                   | 组名称                  |
| description     | Text          | -                   | 组描述                  |
| data            | JSON          | nullable            | 额外组数据              |
| meta            | JSON          | nullable            | 组元数据                |
| permissions     | JSON          | nullable            | 权限配置                |
| user_ids        | JSON          | nullable            | 成员用户ID列表          |
| created_at      | BigInteger    | -                   | 创建时间戳              |
| updated_at      | BigInteger    | -                   | 最后更新时间戳          |

## 知识表

| **列名**        | **数据类型**  | **约束条件**        | **描述**                |
| --------------- | ------------- | ------------------- | -------------------------- |
| id              | Text          | PRIMARY KEY, UNIQUE | 唯一标识符 (UUID)           |
| user_id         | Text          | -                   | 知识库所有者                  |
| name            | Text          | -                   | 知识库名称                   |
| description     | Text          | -                   | 知识库描述                   |
| data            | JSON          | nullable            | 知识库内容                   |
| meta            | JSON          | nullable            | 附加元数据                   |
| access_control  | JSON          | nullable            | 访问控制规则                  |
| created_at      | BigInteger    | -                   | 创建时间戳                   |
| updated_at      | BigInteger    | -                   | 最后更新时间戳                |

`access_control` 字段的预期结构：

```python
{
  "read": {
    "group_ids": ["group_id1", "group_id2"],
    "user_ids": ["user_id1", "user_id2"]
  },
  "write": {
    "group_ids": ["group_id1", "group_id2"],
    "user_ids": ["user_id1", "user_id2"]
  }
}
```

## 内存表

| **列名**        | **数据类型**  | **约束条件**       | **描述**                |
| --------------- | ------------- | --------------- | ------------------------ |
| id              | String        | PRIMARY KEY     | 唯一标识符 (UUID)         |
| user_id         | String        | -               | 内存所有者               |
| content         | Text          | -               | 内存内容                 |
| created_at      | BigInteger    | -               | 创建时间戳               |
| updated_at      | BigInteger    | -               | 最后更新时间戳            |

## 消息表

| **列名**         | **数据类型**  | **约束条件**       | **描述**                          |
| --------------- | ------------- | --------------- | ----------------------------------- |
| id              | Text          | PRIMARY KEY     | 唯一标识符 (UUID)                  |
| user_id         | Text          | -               | 消息作者                           |
| channel_id      | Text          | nullable        | 相关频道                           |
| parent_id       | Text          | nullable        | 父消息（用于线程）                 |
| content         | Text          | -               | 消息内容                           |
| data            | JSON          | nullable        | 附加消息数据                       |
| meta            | JSON          | nullable        | 消息元数据                         |
| created_at      | BigInteger    | -               | 创建时间戳（纳秒）                  |
| updated_at      | BigInteger    | -               | 最后更新时间戳（纳秒）              |

## 消息反应表

| **列名**        | **数据类型**  | **约束条件**       | **描述**                |
| --------------- | ------------- | --------------- | ------------------------ |
| id              | Text          | PRIMARY KEY     | 唯一标识符 (UUID)         |
| user_id         | Text          | -               | 参与反应的用户            |
| message_id      | Text          | -               | 相关消息                  |
| name            | Text          | -               | 反应名称/表情             |
| created_at      | BigInteger    | -               | 反应时间戳                |

## 模型表

| **列名**        | **数据类型**  | **约束条件**       | **描述**                |
| --------------- | ------------- | --------------- | ---------------------- |
| id              | Text          | PRIMARY KEY     | 模型标识符               |
| user_id         | Text          | -               | 模型所有者               |
| base_model_id   | Text          | nullable        | 父模型参考               |
| name            | Text          | -               | 显示名称                 |
| params          | JSON          | -               | 模型参数                 |
| meta            | JSON          | -               | 模型元数据               |
| access_control  | JSON          | nullable        | 访问权限控制              |
| is_active       | Boolean       | default=True    | 活跃状态                 |
| created_at      | BigInteger    | -               | 创建时间戳               |
| updated_at      | BigInteger    | -               | 最后更新时间戳            |

## 提示表

| **列名**        | **数据类型**  | **约束条件**       | **描述**                  |
| --------------- | ------------- | --------------- | ------------------------- |
| command         | String        | PRIMARY KEY     | 唯一命令标识符             |
| user_id         | String        | -               | 提示所有者                |
| title           | Text          | -               | 提示标题                  |
| content         | Text          | -               | 提示内容/模板              |
| timestamp       | BigInteger    | -               | 最后更新时间戳             |
| access_control  | JSON          | nullable        | 访问权限控制               |

## 标签表

| **列名** | **数据类型** | **约束** | **描述**                 |
| -------- | ------------ | --------- | ----------------------- |
| id       | 字符串       | 主键 (组合) | 标准化标签标识符        |
| name     | 字符串       | -         | 显示名称                |
| user_id  | 字符串       | 主键 (组合) | 标签所有者              |
| meta     | JSON         | 可为空    | 标签元数据              |

关于标签表需要注意的事项：

- 主键是组合键 (id, user_id)

## 工具表

| **列名**       | **数据类型** | **约束**        | **描述**             |
| -------------- | ------------ | --------------- | ------------------- |
| id             | 字符串       | 主键            | 唯一标识符         |
| user_id        | 字符串       | -               | 工具所有者         |
| name           | 文本         | -               | 工具名称           |
| content        | 文本         | -               | 工具内容/代码      |
| specs          | JSON         | -               | 工具规格           |
| meta           | JSON         | -               | 工具元数据         |
| valves         | JSON         | -               | 工具控制设置       |
| access_control | JSON         | 可为空          | 访问权限           |
| created_at     | 大整数       | -               | 创建时间戳         |
| updated_at     | 大整数       | -               | 最后更新时间戳     |

## 用户表

| **列名**           | **数据类型** | **约束**         | **描述**                  |
| ------------------ | ------------ | ---------------- | ------------------------ |
| id                 | 字符串       | 主键             | 唯一标识符              |
| name               | 字符串       | -                | 用户名称                |
| email              | 字符串       | -                | 用户邮箱                |
| role               | 字符串       | -                | 用户角色                |
| profile_image_url  | 文本         | -                | 头像路径                |
| last_active_at     | 大整数       | -                | 最后活动时间戳          |
| updated_at         | 大整数       | -                | 最后更新时间戳          |
| created_at         | 大整数       | -                | 创建时间戳              |
| api_key            | 字符串       | 唯一, 可为空      | API 验证密钥            |
| settings           | JSON         | 可为空           | 用户偏好                |
| info               | JSON         | 可为空           | 额外用户信息            |
| oauth_sub          | 文本         | 唯一             | OAuth 主体标识符        |

# 实体关系图

为了帮助可视化表之间的关系，请参考使用 Mermaid 生成的以下实体关系图 (ERD)。

```mermaid
erDiagram
    %% 用户和认证关系
    user ||--o{ auth : "拥有"
    user ||--o{ chat : "拥有"
    user ||--o{ channel : "拥有"
    user ||--o{ message : "创建"
    user ||--o{ folder : "拥有"
    user ||--o{ file : "拥有"
    user ||--o{ feedback : "提供"
    user ||--o{ function : "管理"
    user ||--o{ group : "管理"
    user ||--o{ knowledge : "管理"
    user ||--o{ memory : "拥有"
    user ||--o{ model : "管理"
    user ||--o{ prompt : "创建"
    user ||--o{ tag : "创建"
    user ||--o{ tool : "管理"

    %% 内容关系
    message ||--o{ message_reaction : "拥有"
    chat ||--o{ tag : "被标记"
    chat }|--|| folder : "组织于"
    channel ||--o{ message : "包含"
    message ||--o{ message : "回复"

    user {
        字符串 id 主键
        字符串 name
        字符串 email
        字符串 role
        文本 profile_image_url
        大整数 last_active_at
        字符串 api_key
        JSON settings
        JSON info
        文本 oauth_sub
    }

    auth {
        字符串 id 主键
        字符串 email
        文本 password
        布尔 active
    }

    chat {
        字符串 id 主键
        字符串 user_id 外键
        字符串 title
        JSON chat
        文本 share_id
        布尔 archived
        布尔 pinned
        JSON meta
        文本 folder_id 外键
    }

    channel {
        文本 id 主键
        文本 user_id 外键
        文本 name
        文本 description
        JSON data
        JSON meta
        JSON access_control
    }

    message {
        文本 id 主键
        文本 user_id 外键
        文本 channel_id 外键
        文本 parent_id 外键
        文本 content
        JSON data
        JSON meta
    }

    message_reaction {
        文本 id 主键
        文本 user_id 外键
        文本 message_id 外键
        文本 name
    }

    feedback {
        文本 id 主键
        文本 user_id 外键
        大整数 version
        文本 type
        JSON data
        JSON meta
        JSON snapshot
    }

    file {
        字符串 id 主键
        字符串 user_id 外键
        文本 hash
        文本 filename
        文本 path
        JSON data
        JSON meta
        json 访问控制
    }

    文件夹 {
        text id 主键
        text parent_id 外键
        text user_id 外键
        text 名称
        json 项目
        json 元数据
        boolean 是否展开
    }

    函数 {
        string id 主键
        string user_id 外键
        text 名称
        text 内容
        json 元数据
        json 阀门
        boolean 是否激活
        boolean 是否全局
    }

    组 {
        text id 主键
        text user_id 外键
        text 名称
        text 描述
        json 数据
        json 元数据
        json 权限
        json 用户ID列表
    }

    知识 {
        text id 主键
        text user_id 外键
        text 名称
        text 描述
        json 数据
        json 元数据
        json 访问控制
    }

    记忆 {
        string id 主键
        string user_id 外键
        text 内容
    }

    模型 {
        text id 主键
        text user_id 外键
        text base_model_id 外键
        text 名称
        json 参数
        json 元数据
        json 访问控制
        boolean 是否激活
    }

    提示 {
        string 命令 主键
        string user_id 外键
        text 标题
        text 内容
        json 访问控制
    }

    标签 {
        string id 主键 "复合"
        string user_id 主键 "复合"
        string 名称
        json 元数据
    }

    工具 {
        string id 主键
        string user_id 外键
        text 名称
        text 内容
        json 规格
        json 元数据
        json 阀门
        json 访问控制
    }
```
