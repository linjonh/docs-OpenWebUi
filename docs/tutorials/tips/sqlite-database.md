---
sidebar_position: 11
title: "💠 SQLite 数据库概述"
---

:::warning
本教程为社区贡献内容，不由 Open WebUI 团队提供支持。它仅用于展示如何根据具体使用案例定制 Open WebUI。有意贡献？请查看贡献教程。
:::

> [!WARNING]  
> 此文档基于当前版本 (0.5.11) 创建，并会持续更新。

# Open-WebUI 内部 SQLite 数据库

对于 Open-WebUI，SQLite 数据库是用户管理、聊天历史、文件存储以及其他各种核心功能的基石。了解其结构对于想要有效维护或贡献此项目的人来说至关重要。

## 内部 SQLite 位置

你可以在 `root` -> `data` -> `webui.db` 位置找到 SQLite 数据库

```
📁 Root (/)
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

如果你想将容器中运行的 Open-WebUI SQLite 数据库复制到本地机器，可以使用以下命令：

```bash
docker cp open-webui:/app/backend/data/webui.db ./webui.db
```

或者，你也可以通过以下操作在容器内部访问数据库：

```bash
docker exec -it open-webui /bin/sh
```

## 表概览

以下是 Open-WebUI SQLite 数据库中的完整表清单。为方便起见，表按字母顺序排列并附带编号。

| **编号** | **表名**         | **描述**                                                |
| ------- | ---------------- | ------------------------------------------------------- |
| 01      | auth             | 存储用户认证凭据和登录信息                               |
| 02      | channel          | 管理聊天频道及其配置                                     |
| 03      | channel_member   | 跟踪频道内的用户成员和权限                               |
| 04      | chat             | 存储聊天会话及其元数据                                   |
| 05      | chatidtag        | 映射聊天与其关联标签之间的关系                           |
| 06      | config           | 维护系统范围的配置设置                                   |
| 07      | document         | 存储知识管理相关的文档及元数据                           |
| 08      | feedback         | 捕捉用户反馈和评分                                       |
| 09      | file             | 管理上传的文件及其元数据                                 |
| 10      | folder           | 将文件和内容组织为层次结构                               |
| 11      | function         | 存储自定义函数及其配置                                   |
| 12      | group            | 管理用户组及其权限                                       |
| 13      | knowledge        | 存储知识库条目及相关信息                                 |
| 14      | memory           | 维护聊天历史和上下文记忆                                 |
| 15      | message          | 存储单独的聊天消息及其内容                               |
| 16      | message_reaction | 记录用户对消息的反应（表情符号/回复）                   |
| 17      | migrate_history  | 跟踪数据库模式版本和迁移记录                             |
| 18      | model            | 管理 AI 模型配置和设置                                   |
| 19      | prompt           | 存储 AI 提示的模板和配置                                 |
| 20      | tag              | 管理用于内容分类的标签/标识                              |
| 21      | tool             | 存储系统工具和集成配置                                   |
| 22      | user             | 维护用户资料和账户信息                                   |

注意：Open-WebUI SQLite 数据库中还有两个与核心功能无关的表，它们已被排除在外：

- Alembic Version 表
- Migrate History 表

现在我们已经列出了所有的表，接下来让我们了解每个表的结构。

## Auth 表

| **列名**      | **数据类型**   | **约束**        | **描述**          |
| ------------- | -------------- | --------------- | ----------------- |
| id            | String         | PRIMARY KEY     | 唯一标识符        |
| email         | String         | -               | 用户的邮箱         |
| password      | Text           | -               | 哈希密码           |
| active        | Boolean        | -               | 账户状态           |

关于 auth 表需要了解的事项：

- 使用 UUID 作为主键
- 与 `users` 表为一对一关系（共享 id）

## Channel 表

| **列名**      | **数据类型**   | **约束**        | **描述**                         |
| ------------- | -------------- | --------------- | -------------------------------- |
| id              | Text          | PRIMARY KEY     | 唯一标识符 (UUID)                 |
| user_id         | Text          | -               | 频道的拥有者/创建者               |
| type            | Text          | nullable        | 频道类型                          |
| name            | Text          | -               | 频道名称                          |
| description     | Text          | nullable        | 频道描述                          |
| data            | JSON          | nullable        | 灵活的数据存储                    |
| meta            | JSON          | nullable        | 频道元数据                        |
| access_control  | JSON          | nullable        | 权限设置                          |
| created_at      | BigInteger    | -               | 创建时间戳（纳秒）                |
| updated_at      | BigInteger    | -               | 最后更新时间戳（纳秒）            |

关于认证表需要了解的内容：

- 使用UUID作为主键
- 频道名称不区分大小写（以小写形式存储）

## 频道成员表

| **列名称**      | **数据类型**  | **约束条件**     | **描述**                                   |
| --------------- | ------------- | --------------- | ---------------------------------------- |
| id              | TEXT          | NOT NULL        | 频道成员的唯一标识符                     |
| channel_id      | TEXT          | NOT NULL        | 引用频道                                 |
| user_id         | TEXT          | NOT NULL        | 引用用户                                 |
| created_at      | BIGINT        | -               | 创建成员关系的时间戳                     |

## 聊天表

| **列名称**      | **数据类型**  | **约束条件**             | **描述**               |
| --------------- | ------------- | ----------------------- | ---------------------- |
| id              | String        | PRIMARY KEY             | 唯一标识符 (UUID)      |
| user_id         | String        | -                       | 聊天的创建者           |
| title           | Text          | -                       | 聊天标题               |
| chat            | JSON          | -                       | 聊天内容及历史记录     |
| created_at      | BigInteger    | -                       | 创建时间戳             |
| updated_at      | BigInteger    | -                       | 最后更新时间戳         |
| share_id        | Text          | UNIQUE, nullable        | 分享标识符             |
| archived        | Boolean       | default=False           | 存档状态               |
| pinned          | Boolean       | default=False, nullable | 置顶状态               |
| meta            | JSON          | server_default="{}"     | 包含标签的元数据       |
| folder_id       | Text          | nullable                | 父文件夹ID             |

## 聊天标签表

| **列名称**      | **数据类型**  | **约束条件**     | **描述**            |
| --------------- | ------------- | --------------- | ------------------ |
| id              | VARCHAR(255)  | NOT NULL        | 唯一标识符         |
| tag_name        | VARCHAR(255)  | NOT NULL        | 标签名称           |
| chat_id         | VARCHAR(255)  | NOT NULL        | 引用聊天           |
| user_id         | VARCHAR(255)  | NOT NULL        | 引用用户           |
| timestamp       | INTEGER       | NOT NULL        | 创建时间戳         |

## 配置

| **列名称**      | **数据类型**  | **约束条件**     | **默认值**         | **描述**                |
| --------------- | ------------- | --------------- | ----------------- | ---------------------- |
| id              | INTEGER       | NOT NULL        | -                 | 主键标识符             |
| data            | JSON          | NOT NULL        | -                 | 配置信息               |
| version         | INTEGER       | NOT NULL        | -                 | 配置版本号             |
| created_at      | DATETIME      | NOT NULL        | CURRENT_TIMESTAMP | 创建时间戳             |
| updated_at      | DATETIME      | -               | CURRENT_TIMESTAMP | 最后更新时间戳         |

## 反馈表

| **列名称**      | **数据类型**  | **约束条件**     | **描述**                     |
| --------------- | ------------- | --------------- | --------------------------- |
| id              | Text          | PRIMARY KEY     | 唯一标识符 (UUID)           |
| user_id         | Text          | -               | 提供反馈的用户               |
| version         | BigInteger    | default=0       | 反馈版本号                   |
| type            | Text          | -               | 反馈类型                     |
| data            | JSON          | nullable        | 包含评分的反馈数据           |
| meta            | JSON          | nullable        | 元数据（如竞技场、聊天ID等） |
| snapshot        | JSON          | nullable        | 相关聊天快照                 |
| created_at      | BigInteger    | -               | 创建时间戳                  |
| updated_at      | BigInteger    | -               | 最后更新时间戳               |

# 文件表

| **列名**       | **数据类型**   | **约束条件**      | **描述**                 |
| --------------- | ------------- | --------------- | --------------------- |
| id              | String        | PRIMARY KEY     | 唯一标识符               |
| user_id         | String        | -               | 文件的所有者             |
| hash            | Text          | nullable        | 文件哈希/校验和           |
| filename        | Text          | -               | 文件名                  |
| path            | Text          | nullable        | 文件系统路径              |
| data            | JSON          | nullable        | 与文件相关的数据           |
| meta            | JSON          | nullable        | 文件元数据                |
| access_control  | JSON          | nullable        | 权限设置                 |
| created_at      | BigInteger    | -               | 创建时间戳                |
| updated_at      | BigInteger    | -               | 最后更新时间戳             |

`meta` 字段的预期结构：

```python
{
    "name": string,          # 可选的显示名称
    "content_type": string,  # MIME 类型
    "size": integer,         # 文件大小（字节）
    # 通过 ConfigDict(extra="allow") 支持的附加元数据
}
```

## 文件夹表

| **列名**       | **数据类型**   | **约束条件**      | **描述**                     |
| --------------- | ------------- | --------------- | ------------------------------ |
| id              | Text          | PRIMARY KEY     | 唯一标识符 (UUID)            |
| parent_id       | Text          | nullable        | 用于层级关系的父文件夹 ID       |
| user_id         | Text          | -               | 文件夹的所有者               |
| name            | Text          | -               | 文件夹名称                   |
| items           | JSON          | nullable        | 文件夹内容                   |
| meta            | JSON          | nullable        | 文件夹元数据                 |
| is_expanded     | Boolean       | default=False   | UI 展开状态                 |
| created_at      | BigInteger    | -               | 创建时间戳                   |
| updated_at      | BigInteger    | -               | 最后更新时间戳                |

关于文件夹表需要了解事项：

- 文件夹可以嵌套（通过 parent_id 引用）
- 根文件夹的 parent_id 为 null
- 同一父级下文件夹名称必须唯一

## 函数表

| **列名**       | **数据类型**   | **约束条件**      | **描述**                  |
| --------------- | ------------- | --------------- | ------------------------- |
| id              | String        | PRIMARY KEY     | 唯一标识符                |
| user_id         | String        | -               | 函数的所有者              |
| name            | Text          | -               | 函数名称                  |
| type            | Text          | -               | 函数类型                  |
| content         | Text          | -               | 函数内容/代码             |
| meta            | JSON          | -               | 函数元数据                |
| valves          | JSON          | -               | 函数控制设定              |
| is_active       | Boolean       | -               | 函数激活状态              |
| is_global       | Boolean       | -               | 全局可用性标志            |
| created_at      | BigInteger    | -               | 创建时间戳                |
| updated_at      | BigInteger    | -               | 最后更新时间戳             |

关于函数表需要了解事项：

- `type` 只能是: ["filter", "action"]

## 群组表

| **列名**       | **数据类型**   | **约束条件**           | **描述**                  |
| --------------- | ------------- | ------------------- | ------------------------ |
| id              | Text          | PRIMARY KEY, UNIQUE | 唯一标识符 (UUID)         |
| user_id         | Text          | -                   | 群组所有者/创建者         |
| name            | Text          | -                   | 群组名称                  |
| description     | Text          | -                   | 群组描述                  |
| data            | JSON          | nullable            | 附加群组数据              |
| meta            | JSON          | nullable            | 群组元数据                |
| permissions     | JSON          | nullable            | 权限配置                  |
| user_ids        | JSON          | nullable            | 成员用户 ID 列表          |
| created_at      | BigInteger    | -                   | 创建时间戳                |
| updated_at      | BigInteger    | -                   | 最后更新时间戳             |

## 知识表

| **列名**       | **数据类型**   | **约束条件**           | **描述**                   |
| --------------- | ------------- | ------------------- | -------------------------- |
| id              | Text          | PRIMARY KEY, UNIQUE | 唯一标识符 (UUID)           |
| user_id         | Text          | -                   | 知识库所有者               |
| name            | Text          | -                   | 知识库名称                 |
| description     | Text          | -                   | 知识库描述                 |
| data            | JSON          | nullable            | 知识库内容                 |
| meta            | JSON          | nullable            | 附加元数据                 |
| access_control  | JSON          | nullable            | 访问控制规则               |
| created_at      | BigInteger    | -                   | 创建时间戳                 |
| updated_at      | BigInteger    | -                   | 最后更新时间戳             |

`access_control`字段的预期结构：

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

| **列名**         | **数据类型**   | **约束条件**      | **描述**                  |
| --------------- | ------------- | ---------------- | ------------------------ |
| id              | String        | PRIMARY KEY      | 唯一标识符 (UUID)        |
| user_id         | String        | -                | 内存所有者               |
| content         | Text          | -                | 内存内容                 |
| created_at      | BigInteger    | -                | 创建时间戳               |
| updated_at      | BigInteger    | -                | 最后更新时间戳           |

## 消息表

| **列名**         | **数据类型**   | **约束条件**      | **描述**                           |
| --------------- | ------------- | ---------------- | ----------------------------------- |
| id              | Text          | PRIMARY KEY      | 唯一标识符 (UUID)                 |
| user_id         | Text          | -                | 消息作者                           |
| channel_id      | Text          | nullable         | 关联的频道                         |
| parent_id       | Text          | nullable         | 线程的父消息                       |
| content         | Text          | -                | 消息内容                           |
| data            | JSON          | nullable         | 附加的消息数据                     |
| meta            | JSON          | nullable         | 消息元数据                         |
| created_at      | BigInteger    | -                | 创建时间戳（纳秒）                 |
| updated_at      | BigInteger    | -                | 最后更新时间戳（纳秒）             |

## 消息反应表

| **列名**         | **数据类型**   | **约束条件**      | **描述**                  |
| --------------- | ------------- | ---------------- | ------------------------ |
| id              | Text          | PRIMARY KEY      | 唯一标识符 (UUID)        |
| user_id         | Text          | -                | 反应的用户               |
| message_id      | Text          | -                | 关联的消息               |
| name            | Text          | -                | 反应名称/表情            |
| created_at      | BigInteger    | -                | 反应时间戳               |

## 模型表

| **列名**         | **数据类型**   | **约束条件**      | **描述**                |
| --------------- | ------------- | ---------------- | ------------------------ |
| id              | Text          | PRIMARY KEY      | 模型标识符               |
| user_id         | Text          | -                | 模型所有者               |
| base_model_id   | Text          | nullable         | 父模型引用               |
| name            | Text          | -                | 显示名称                 |
| params          | JSON          | -                | 模型参数                 |
| meta            | JSON          | -                | 模型元数据               |
| access_control  | JSON          | nullable         | 访问权限                 |
| is_active       | Boolean       | default=True     | 激活状态                 |
| created_at      | BigInteger    | -                | 创建时间戳               |
| updated_at      | BigInteger    | -                | 最后更新时间戳           |

## 提示表

| **列名**         | **数据类型**   | **约束条件**      | **描述**                  |
| --------------- | ------------- | ---------------- | ------------------------ |
| command         | String        | PRIMARY KEY      | 唯一指令标识符            |
| user_id         | String        | -                | 提示所有者                |
| title           | Text          | -                | 提示标题                  |
| content         | Text          | -                | 提示内容/模板             |
| timestamp       | BigInteger    | -                | 最后更新时间戳             |
| access_control  | JSON          | nullable         | 访问权限                  |

## 标签表

| **列名** | **数据类型** | **约束条件** | **描述**           |
| --------------- | ------------- | --------------- | ------------------------- |
| id              | 字符串        | 主键（复合）      | 标准化标签标识           |
| name            | 字符串        | -               | 显示名称                 |
| user_id         | 字符串        | 主键（复合）      | 标签所属者               |
| meta            | JSON          | 可为空           | 标签元数据               |

关于标签表需要了解的事项：

- 主键是复合主键（id, user_id）

## 工具表

| **列名** | **数据类型** | **约束条件** | **描述**           |
| --------------- | ------------- | --------------- | --------------------- |
| id              | 字符串        | 主键             | 唯一标识符             |
| user_id         | 字符串        | -               | 工具所属者             |
| name            | 文本          | -               | 工具名称               |
| content         | 文本          | -               | 工具内容/代码          |
| specs           | JSON          | -               | 工具规格               |
| meta            | JSON          | -               | 工具元数据             |
| valves          | JSON          | -               | 工具控制设置           |
| access_control  | JSON          | 可为空           | 访问权限               |
| created_at      | 大整数        | -               | 创建时间戳             |
| updated_at      | 大整数        | -               | 最近更新时间戳         |

## 用户表

| **列名**           | **数据类型** | **约束条件**     | **描述**               |
| ----------------- | ------------- | ---------------- | ------------------------ |
| id                | 字符串        | 主键             | 唯一标识符             |
| name              | 字符串        | -               | 用户的名称              |
| email             | 字符串        | -               | 用户的邮箱              |
| role              | 字符串        | -               | 用户的角色              |
| profile_image_url | 文本          | -               | 用户头像路径            |
| last_active_at    | 大整数        | -               | 最近活跃时间戳          |
| updated_at        | 大整数        | -               | 最近更新时间戳          |
| created_at        | 大整数        | -               | 创建时间戳              |
| api_key           | 字符串        | 唯一，可为空     | API认证密钥            |
| settings          | JSON          | 可为空           | 用户偏好设置           |
| info              | JSON          | 可为空           | 额外的用户信息          |
| oauth_sub         | 文本          | 唯一            | OAuth主题标识符        |

# 实体关系图

为了帮助可视化表之间的关系，请参考以下由Mermaid生成的实体关系图（ERD）。

```mermaid
erDiagram
    %% 用户与认证
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
    message ||--o{ message_reaction : "具有"
    chat ||--o{ tag : "与标签关联"
    chat }|--|| folder : "组织于"
    channel ||--o{ message : "包含"
    message ||--o{ message : "回复"

    user {
        string id 主键
        string name
        string email
        string role
        text profile_image_url
        bigint last_active_at
        string api_key
        json settings
        json info
        text oauth_sub
    }

    auth {
        string id 主键
        string email
        text password
        boolean active
    }

    chat {
        string id 主键
        string user_id 外键
        string title
        json chat
        text share_id
        boolean archived
        boolean pinned
        json meta
        text folder_id 外键
    }

    channel {
        text id 主键
        text user_id 外键
        text name
        text description
        json data
        json meta
        json access_control
    }

    message {
        text id 主键
        text user_id 外键
        text channel_id 外键
        text parent_id 外键
        text content
        json data
        json meta
    }

    message_reaction {
        text id 主键
        text user_id 外键
        text message_id 外键
        text name
    }

    feedback {
        text id 主键
        text user_id 外键
        bigint version
        text type
        json data
        json meta
        json snapshot
    }

    file {
        string id 主键
        string user_id 外键
        text hash
        text filename
        text path
        json data
        json meta
        json 访问控制
    }

    文件夹 {
        text id 主键
        text parent_id 外键
        text user_id 外键
        text 名称
        json 项目
        json 元数据
        boolean 展开状态
    }

    功能 {
        string id 主键
        string user_id 外键
        text 名称
        text 内容
        json 元数据
        json 阀门
        boolean 活跃状态
        boolean 全局状态
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
        boolean 活跃状态
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
