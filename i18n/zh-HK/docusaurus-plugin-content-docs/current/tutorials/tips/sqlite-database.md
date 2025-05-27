---
sidebar_position: 11
title: "💠 SQLite 資料庫概覽"
---

:::warning
此教學為社群貢獻內容，未獲得 Open WebUI 團隊的支援。它僅作為定制 Open WebUI 以適應您特定需求的示範。想貢獻內容嗎？請參閱貢獻教學。
:::

> [!WARNING]  
> 此文件是根據目前版本 (0.5.11) 創建，並會持續更新。

# Open-WebUI 內部 SQLite 資料庫

對於 Open-WebUI 來說，SQLite 資料庫是用於用戶管理、聊天紀錄、檔案存儲以及其他核心功能的支柱。了解此結構對於希望有效貢獻或維護此專案的任何人來說至關重要。

## 內部 SQLite 位址

您可以在 `root` -> `data` -> `webui.db` 找到 SQLite 資料庫

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

## 本地複製資料庫

如果您想將容器中正在運行的 Open-WebUI SQLite 資料庫複製到您的本地機器，可以使用以下指令：

```bash
docker cp open-webui:/app/backend/data/webui.db ./webui.db
```

或者，您可以使用以下指令進入容器，直接訪問資料庫：

```bash
docker exec -it open-webui /bin/sh
```

## 表概覽

以下是 Open-WebUI SQLite 資料庫中所有表的完整列表。表按照字母順序排列，並已編號便於查閱。

| **編號** | **表名稱**        | **描述**                                                  |
| ------- | ---------------- | ---------------------------------------------------------- |
| 01      | auth             | 存儲用戶身份驗證憑據和登錄信息                            |
| 02      | channel          | 管理聊天頻道及其配置                                       |
| 03      | channel_member   | 跟蹤用戶在頻道中的成員關係及權限                          |
| 04      | chat             | 存儲聊天會話及其元數據                                    |
| 05      | chatidtag        | 聯繫聊天及其相關標籤的映射                                |
| 06      | config           | 維護系統範圍內的配置設定                                  |
| 07      | document         | 存儲文檔及其元數據，以便於知識管理                        |
| 08      | feedback         | 捕捉用戶反饋和評分                                        |
| 09      | file             | 管理上傳的檔案及其元數據                                  |
| 10      | folder           | 將檔案和內容組織成層級結構                                |
| 11      | function         | 存儲自定功能及其配置                                      |
| 12      | group            | 管理用戶群組及其權限                                      |
| 13      | knowledge        | 存儲知識庫條目及相關信息                                  |
| 14      | memory           | 維護聊天紀錄和上下文記憶                                  |
| 15      | message          | 存儲各個聊天訊息及其內容                                  |
| 16      | message_reaction | 記錄用戶對訊息的反應（表情符號/回應）                      |
| 17      | migrate_history  | 跟蹤資料庫架構版本及遷移記錄                              |
| 18      | model            | 管理 AI 模型的配置及設定                                  |
| 19      | prompt           | 存儲 AI 提示的模板及配置                                  |
| 20      | tag              | 管理內容分類的標籤/標記                                   |
| 21      | tool             | 存儲系統工具及整合配置                                    |
| 22      | user             | 維護用戶檔案及帳戶信息                                    |

注意：Open-WebUI SQLite 資料庫中有兩個表不屬於 Open-WebUI 核心功能，這裡已排除：

- Alembic 版本表
- 遷移記錄表

現在我們擁有所有表，接下來了解每個表的結構。

## Auth 表

| **列名稱**      | **資料類型**   | **約束條件**    | **描述**           |
| --------------- | ------------- | --------------- | ------------------ |
| id              | String        | PRIMARY KEY     | 唯一標識符        |
| email           | String        | -               | 用戶的電子郵件    |
| password        | Text          | -               | 已加密的密碼      |
| active          | Boolean       | -               | 帳戶狀態          |

關於 Auth 表需要了解的事情：

- 使用 UUID 作為主鍵
- 與 `users` 表一對一關係（共享 id）

## Channel 表

| **列名稱**      | **資料類型**   | **約束條件**    | **描述**                         |
| --------------- | ------------- | --------------- | ------------------------------- |
| id              | Text          | PRIMARY KEY     | 唯一標識符 (UUID)                       |
| user_id         | Text          | -               | 頻道的擁有者/建立者                      |
| type            | Text          | nullable        | 頻道類型                              |
| name            | Text          | -               | 頻道名稱                              |
| description     | Text          | nullable        | 頻道描述                              |
| data            | JSON          | nullable        | 靈活的數據存儲                          |
| meta            | JSON          | nullable        | 頻道元數據                            |
| access_control  | JSON          | nullable        | 權限設置                              |
| created_at      | BigInteger    | -               | 建立時間戳 (納秒級)                     |
| updated_at      | BigInteger    | -               | 最後更新時間戳 (納秒級)                 |

關於 auth 表的注意事項：

- 使用 UUID 作為主鍵
- 頻道名稱不區分大小寫（存儲為小寫）

## 頻道成員表

| **列名**       | **數據類型**  | **約束**         | **描述**                                         |
| --------------- | ------------- | --------------- | ------------------------------------------------ |
| id              | TEXT          | NOT NULL        | 頻道成員資格的唯一標識符                          |
| channel_id      | TEXT          | NOT NULL        | 參考的頻道                                     |
| user_id         | TEXT          | NOT NULL        | 參考的用戶                                     |
| created_at      | BIGINT        | -               | 创建成員資格的時間戳                             |

## 聊天表

| **列名**       | **數據類型**  | **約束**               | **描述**               |
| --------------- | ------------- | ----------------------- | ----------------------- |
| id              | String        | PRIMARY KEY             | 唯一標識符 (UUID)       |
| user_id         | String        | -                       | 聊天的擁有者            |
| title           | Text          | -                       | 聊天標題                |
| chat            | JSON          | -                       | 聊天內容和歷史           |
| created_at      | BigInteger    | -                       | 建立時間戳               |
| updated_at      | BigInteger    | -                       | 最後更新時間戳           |
| share_id        | Text          | UNIQUE, nullable        | 分享標識符               |
| archived        | Boolean       | default=False           | 是否已存檔               |
| pinned          | Boolean       | default=False, nullable | 是否已置頂               |
| meta            | JSON          | server_default="{}"     | 包括標籤的元數據           |
| folder_id       | Text          | nullable                | 父文件夾 ID              |

## 聊天標籤表

| **列名**       | **數據類型**      | **約束**          | **描述**                  |
| --------------- | -------------- | --------------- | -------------------------- |
| id              | VARCHAR(255)   | NOT NULL        | 唯一標識符                |
| tag_name        | VARCHAR(255)   | NOT NULL        | 標籤名稱                  |
| chat_id         | VARCHAR(255)   | NOT NULL        | 聊天的引用                 |
| user_id         | VARCHAR(255)   | NOT NULL        | 用戶的引用                 |
| timestamp       | INTEGER        | NOT NULL        | 建立時間戳                 |

## 配置

| **列名**       | **數據類型**  | **約束**         | **默認值**          | **描述**                 |
| --------------- | ------------- | --------------- | ------------------ | ------------------------ |
| id              | INTEGER       | NOT NULL        | -                  | 主鍵標識符               |
| data            | JSON          | NOT NULL        | -                  | 配置數據                 |
| version         | INTEGER       | NOT NULL        | -                  | 配置版本號               |
| created_at      | DATETIME      | NOT NULL        | CURRENT_TIMESTAMP  | 建立時間戳               |
| updated_at      | DATETIME      | -               | CURRENT_TIMESTAMP  | 最後更新時間戳           |

## 反饋表

| **列名**       | **數據類型**  | **約束**         | **描述**                          |
| --------------- | ------------- | --------------- | ---------------------------------- |
| id              | Text          | PRIMARY KEY     | 唯一標識符 (UUID)                  |
| user_id         | Text          | -               | 提供反饋的用戶                      |
| version         | BigInteger    | default=0       | 反饋版本號                         |
| type            | Text          | -               | 反饋類型                           |
| data            | JSON          | nullable        | 包括評分的反饋數據                  |
| meta            | JSON          | nullable        | 元數據（如競技場，聊天 ID 等）        |
| snapshot        | JSON          | nullable        | 關聯的聊天快照                      |
| created_at      | BigInteger    | -               | 建立時間戳             |
| updated_at      | BigInteger    | -               | 最後更新時間戳         |

# 檔案表格

| **欄位名稱**    | **資料類型** | **限制條件**    | **描述**                |
| --------------- | ------------- | --------------- | --------------------- |
| id              | String        | PRIMARY KEY     | 唯一識別碼             |
| user_id         | String        | -               | 檔案的擁有者           |
| hash            | Text          | nullable        | 檔案哈希值/校驗碼      |
| filename        | Text          | -               | 檔案名稱               |
| path            | Text          | nullable        | 檔案系統路徑           |
| data            | JSON          | nullable        | 檔案相關的資料         |
| meta            | JSON          | nullable        | 檔案元數據             |
| access_control  | JSON          | nullable        | 權限設置               |
| created_at      | BigInteger    | -               | 建立時間戳             |
| updated_at      | BigInteger    | -               | 最後更新時間戳         |

`meta` 欄位的預期結構:

```python
{
    "name": string,          # 可選的顯示名稱
    "content_type": string,  # MIME 類型
    "size": integer,         # 檔案大小（位元組）
    # 透過 ConfigDict(extra="allow") 支援額外的元數據
}
```

## 資料夾表格

| **欄位名稱**    | **資料類型** | **限制條件**    | **描述**                 |
| --------------- | ------------- | --------------- | ------------------------ |
| id              | Text          | PRIMARY KEY     | 唯一識別碼 (UUID)        |
| parent_id       | Text          | nullable        | 用於層級結構的父資料夾ID |
| user_id         | Text          | -               | 資料夾的擁有者           |
| name            | Text          | -               | 資料夾名稱               |
| items           | JSON          | nullable        | 資料夾內容               |
| meta            | JSON          | nullable        | 資料夾元數據             |
| is_expanded     | Boolean       | default=False   | UI 展開狀態              |
| created_at      | BigInteger    | -               | 建立時間戳               |
| updated_at      | BigInteger    | -               | 最後更新時間戳            |

關於資料夾表格需注意的事項:

- 資料夾可以嵌套（parent_id 引用）
- 根資料夾的 parent_id 為空
- 相同父資料夾內的資料夾名稱必須唯一

## 函數表格

| **欄位名稱**    | **資料類型** | **限制條件**    | **描述**                |
| --------------- | ------------- | --------------- | --------------------- |
| id              | String        | PRIMARY KEY     | 唯一識別碼             |
| user_id         | String        | -               | 函數的擁有者           |
| name            | Text          | -               | 函數名稱               |
| type            | Text          | -               | 函數類型               |
| content         | Text          | -               | 函數內容/代碼          |
| meta            | JSON          | -               | 函數元數據             |
| valves          | JSON          | -               | 函數控制設置           |
| is_active       | Boolean       | -               | 函數啟動狀態           |
| is_global       | Boolean       | -               | 全域可用性標誌          |
| created_at      | BigInteger    | -               | 建立時間戳             |
| updated_at      | BigInteger    | -               | 最後更新時間戳         |

關於資料夾表格需注意的事項:

- `type` 值僅可為: ["filter", "action"]

## 群組表格

| **欄位名稱**    | **資料類型** | **限制條件**        | **描述**                  |
| --------------- | ------------- | ------------------- | ------------------------ |
| id              | Text          | PRIMARY KEY, UNIQUE | 唯一識別碼 (UUID)        |
| user_id         | Text          | -                   | 群組的擁有者/建立者      |
| name            | Text          | -                   | 群組名稱                 |
| description     | Text          | -                   | 群組描述                 |
| data            | JSON          | nullable            | 額外的群組資料           |
| meta            | JSON          | nullable            | 群組元數據               |
| permissions     | JSON          | nullable            | 權限設定                 |
| user_ids        | JSON          | nullable            | 群組成員的使用者ID列表   |
| created_at      | BigInteger    | -                   | 建立時間戳               |
| updated_at      | BigInteger    | -                   | 最後更新時間戳           |

## 知識表格

| **欄位名稱**    | **資料類型** | **限制條件**        | **描述**                  |
| --------------- | ------------- | ------------------- | ------------------------ |
| id              | Text          | PRIMARY KEY, UNIQUE | 唯一識別碼 (UUID)           |
| user_id         | Text          | -                   | 知識庫擁有者               |
| name            | Text          | -                   | 知識庫名稱                 |
| description     | Text          | -                   | 知識庫描述                 |
| data            | JSON          | nullable            | 知識庫內容                 |
| meta            | JSON          | nullable            | 附加元數據                 |
| access_control  | JSON          | nullable            | 訪問控制規則               |
| created_at      | BigInteger    | -                   | 創建時間戳                 |
| updated_at      | BigInteger    | -                   | 最後更新時間戳             |

`access_control` 領域的預期結構：

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

## 記憶表

| **列名**         | **數據類型** | **約束**        | **描述**                 |
| --------------- | ------------- | --------------- | ------------------------ |
| id              | String        | PRIMARY KEY     | 唯一識別碼 (UUID)       |
| user_id         | String        | -               | 記憶擁有者               |
| content         | Text          | -               | 記憶內容                 |
| created_at      | BigInteger    | -               | 創建時間戳               |
| updated_at      | BigInteger    | -               | 最後更新時間戳           |

## 消息表

| **列名**         | **數據類型** | **約束**        | **描述**                 |
| --------------- | ------------- | --------------- | ------------------------ |
| id              | Text          | PRIMARY KEY     | 唯一識別碼 (UUID)       |
| user_id         | Text          | -               | 消息作者                 |
| channel_id      | Text          | nullable        | 聯繫的頻道               |
| parent_id       | Text          | nullable        | 線程的父消息             |
| content         | Text          | -               | 消息內容                 |
| data            | JSON          | nullable        | 附加消息數據             |
| meta            | JSON          | nullable        | 消息元數據               |
| created_at      | BigInteger    | -               | 創建時間戳 (納秒)        |
| updated_at      | BigInteger    | -               | 最後更新時間戳 (納秒)    |

## 消息反應表

| **列名**         | **數據類型** | **約束**        | **描述**                 |
| --------------- | ------------- | --------------- | ------------------------ |
| id              | Text          | PRIMARY KEY     | 唯一識別碼 (UUID)       |
| user_id         | Text          | -               | 反應的用戶               |
| message_id      | Text          | -               | 聯繫的消息               |
| name            | Text          | -               | 反應名稱/表情            |
| created_at      | BigInteger    | -               | 反應時間戳               |

## 模型表

| **列名**         | **數據類型** | **約束**        | **描述**                 |
| --------------- | ------------- | --------------- | ------------------------ |
| id              | Text          | PRIMARY KEY     | 模型識別碼               |
| user_id         | Text          | -               | 模型擁有者               |
| base_model_id   | Text          | nullable        | 父模型引用               |
| name            | Text          | -               | 顯示名稱                 |
| params          | JSON          | -               | 模型參數                 |
| meta            | JSON          | -               | 模型元數據               |
| access_control  | JSON          | nullable        | 訪問權限                 |
| is_active       | Boolean       | default=True    | 活躍狀態                 |
| created_at      | BigInteger    | -               | 創建時間戳               |
| updated_at      | BigInteger    | -               | 最後更新時間戳           |

## 提示表

| **列名**         | **數據類型** | **約束**        | **描述**                 |
| --------------- | ------------- | --------------- | ------------------------ |
| command         | String        | PRIMARY KEY     | 唯一命令識別符           |
| user_id         | String        | -               | 提示擁有者               |
| title           | Text          | -               | 提示標題                 |
| content         | Text          | -               | 提示內容/模板             |
| timestamp       | BigInteger    | -               | 最後更新時間戳           |
| access_control  | JSON          | nullable        | 訪問權限                 |

## 標籤表

| **欄位名稱** | **資料類型** | **限制條件** | **描述**                     |
| ------------ | ------------ | ------------ | -------------------------- |
| id           | 字串         | 主鍵 (組合式) | 正規化標籤識別碼            |
| name         | 字串         | -            | 顯示名稱                   |
| user_id      | 字串         | 主鍵 (組合式) | 標籤擁有者                 |
| meta         | JSON         | 可為空       | 標籤元數據                 |

關於標籤資料表的重要資訊：

- 主鍵為組合式 (id, user_id)

## 工具資料表

| **欄位名稱** | **資料類型** | **限制條件** | **描述**               |
| ------------ | ------------ | ------------ | --------------------- |
| id           | 字串         | 主鍵         | 唯一識別碼             |
| user_id      | 字串         | -            | 工具擁有者             |
| name         | 文本         | -            | 工具名稱               |
| content      | 文本         | -            | 工具內容或代碼         |
| specs        | JSON         | -            | 工具規格               |
| meta         | JSON         | -            | 工具元數據             |
| valves       | JSON         | -            | 工具控制設定           |
| access_control | JSON       | 可為空       | 訪問權限               |
| created_at   | 大整數       | -            | 建立時間戳             |
| updated_at   | 大整數       | -            | 最後更新時間戳         |

## 使用者資料表

| **欄位名稱**     | **資料類型** | **限制條件**   | **描述**                   |
| ---------------- | ------------ | -------------- | ------------------------- |
| id              | 字串         | 主鍵          | 唯一識別碼                |
| name            | 字串         | -             | 使用者姓名                 |
| email           | 字串         | -             | 使用者電子郵件             |
| role            | 字串         | -             | 使用者角色                 |
| profile_image_url | 文本       | -             | 頭像圖片路徑               |
| last_active_at  | 大整數       | -             | 最後活動時間戳             |
| updated_at      | 大整數       | -             | 最後更新時間戳             |
| created_at      | 大整數       | -             | 建立時間戳                 |
| api_key         | 字串         | 唯一，可為空  | API認證密鑰               |
| settings        | JSON         | 可為空        | 使用者偏好設定             |
| info            | JSON         | 可為空        | 額外的使用者資訊           |
| oauth_sub       | 文本         | 唯一          | OAuth主體識別碼            |

# 實體關係圖

為了幫助您可視化資料表之間的關係，請參考以下用Mermaid生成的實體關係圖（ERD）。

```mermaid
erDiagram
    %% 使用者與身份驗證
    user ||--o{ auth : "有"
    user ||--o{ chat : "擁有"
    user ||--o{ channel : "擁有"
    user ||--o{ message : "創建"
    user ||--o{ folder : "擁有"
    user ||--o{ file : "擁有"
    user ||--o{ feedback : "提供"
    user ||--o{ function : "管理"
    user ||--o{ group : "管理"
    user ||--o{ knowledge : "管理"
    user ||--o{ memory : "擁有"
    user ||--o{ model : "管理"
    user ||--o{ prompt : "創建"
    user ||--o{ tag : "創建"
    user ||--o{ tool : "管理"

    %% 內容關係
    message ||--o{ message_reaction : "有"
    chat ||--o{ tag : "標記於"
    chat }|--|| folder : "組織於"
    channel ||--o{ message : "包含"
    message ||--o{ message : "回覆"

    user {
        string id 主鍵
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
        string id 主鍵
        string email
        text password
        boolean active
    }

    chat {
        string id 主鍵
        string user_id 外鍵
        string title
        json chat
        text share_id
        boolean archived
        boolean pinned
        json meta
        text folder_id 外鍵
    }

    channel {
        text id 主鍵
        text user_id 外鍵
        text name
        text description
        json data
        json meta
        json access_control
    }

    message {
        text id 主鍵
        text user_id 外鍵
        text channel_id 外鍵
        text parent_id 外鍵
        text content
        json data
        json meta
    }

    message_reaction {
        text id 主鍵
        text user_id 外鍵
        text message_id 外鍵
        text name
    }

    feedback {
        text id 主鍵
        text user_id 外鍵
        bigint version
        text type
        json data
        json meta
        json snapshot
    }

    file {
        string id 主鍵
        string user_id 外鍵
        text hash
        text filename
        text path
        json data
        json meta
        json 訪問控制
    }

    資料夾 {
        text id 主鍵
        text parent_id 外鍵
        text user_id 外鍵
        text 名稱
        json 項目
        json 元數據
        boolean 是否展開
    }

    功能 {
        string id 主鍵
        string user_id 外鍵
        text 名稱
        text 內容
        json 元數據
        json 阀门
        boolean 是否啟用
        boolean 是否全局
    }

    群組 {
        text id 主鍵
        text user_id 外鍵
        text 名稱
        text 描述
        json 數據
        json 元數據
        json 權限
        json 使用者_id
    }

    知識 {
        text id 主鍵
        text user_id 外鍵
        text 名稱
        text 描述
        json 數據
        json 元數據
        json 訪問控制
    }

    記憶 {
        string id 主鍵
        string user_id 外鍵
        text 內容
    }

    模型 {
        text id 主鍵
        text user_id 外鍵
        text base_model_id 外鍵
        text 名稱
        json 參數
        json 元數據
        json 訪問控制
        boolean 是否啟用
    }

    提示 {
        string 命令 主鍵
        string user_id 外鍵
        text 標題
        text 內容
        json 訪問控制
    }

    標籤 {
        string id 主鍵 "複合"
        string user_id 主鍵 "複合"
        string 名稱
        json 元數據
    }

    工具 {
        string id 主鍵
        string user_id 外鍵
        text 名稱
        text 內容
        json 規格
        json 元數據
        json 阀门
        json 訪問控制
    }
```
