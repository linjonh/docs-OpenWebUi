---
sidebar_position: 3
title: "🔒 權限設定"
---

`Workspace` 的 `Permissions` 區塊在 Open WebUI 中允許管理員配置使用者的存取控制及功能使用權限。這套強大的系統可實現對使用者可以訪問與修改的應用程式功能進行細緻的控制。

管理員可以通過以下方式管理權限:

1. **使用者界面：** Workspace 的 Permissions 區塊提供了一個圖形化界面以配置權限。
2. **環境變數：** 權限可通過環境變數來設定，這些變數儲存在 `PersistentConfig` 中。
3. **群組管理：** 分配使用者至具有預設權限的群組中。

## Workspace 權限

Workspace 權限控制對 Open WebUI 平台核心功能的存取:

* **模型存取：** 切換以允許使用者存取及管理自訂模型。（環境變數: `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`）
* **知識庫存取：** 切換以允許使用者存取及管理知識庫。（環境變數: `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`）
* **提示存取：** 切換以允許使用者存取及管理已儲存的提示。（環境變數: `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`）
* **工具存取：** 切換以允許使用者存取及管理工具。（環境變數: `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`）*注意：啟用此功能將允許使用者將任意代碼上傳到服務器上。*

## 聊天權限

聊天權限決定使用者在聊天會話中可以執行哪些操作:

* **允許聊天控制：** 切換以啟用訪問聊天控制選項。
* **允許檔案上傳：** 切換以允許使用者在聊天期間上傳檔案。（環境變數: `USER_PERMISSIONS_CHAT_FILE_UPLOAD`）
* **允許刪除聊天：** 切換以允許使用者刪除聊天會話。（環境變數: `USER_PERMISSIONS_CHAT_DELETE`）
* **允許編輯聊天：** 切換以允許使用者編輯聊天會話中的消息。（環境變數: `USER_PERMISSIONS_CHAT_EDIT`）
* **允許臨時聊天：** 切換以允許使用者創建臨時聊天會話。（環境變數: `USER_PERMISSIONS_CHAT_TEMPORARY`）

## 功能權限

功能權限控制使用者對 Open WebUI 特殊能力的存取:

* **網頁搜尋：** 切換以允許使用者在聊天會話中進行網頁搜尋。（環境變數: `ENABLE_RAG_WEB_SEARCH`）
* **圖片生成：** 切換以允許使用者生成圖片。（環境變數: `ENABLE_IMAGE_GENERATION`）
* **程式碼解釋器：** 切換以允許使用者使用程式碼解釋功能。（環境變數: `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`）
* **直接工具伺服器：** 切換以允許使用者直接連接工具伺服器。（環境變數: `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`）

## 預設權限設定

預設情況下，Open WebUI 應用以下權限設定:

**Workspace 權限:**
- 模型存取: 禁用（`USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS=False`）
- 知識庫存取: 禁用（`USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS=False`）
- 提示存取: 禁用（`USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS=False`）
- 工具存取: 禁用（`USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS=False`）

**聊天權限:**
- 允許聊天控制: 啟用
- 允許檔案上傳: 啟用（`USER_PERMISSIONS_CHAT_FILE_UPLOAD=True`）
- 允許刪除聊天: 啟用（`USER_PERMISSIONS_CHAT_DELETE=True`）
- 允許編輯聊天: 啟用（`USER_PERMISSIONS_CHAT_EDIT=True`）
- 允許臨時聊天: 啟用（`USER_PERMISSIONS_CHAT_TEMPORARY=True`）

**功能權限:**
- 網頁搜尋: 啟用（`ENABLE_RAG_WEB_SEARCH=True`）
- 圖片生成: 啟用（`ENABLE_IMAGE_GENERATION=True`）
- 程式碼解釋器: 啟用（`USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`）
- 直接工具伺服器: 禁用（`USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS=False`）

管理員可在管理面板的「users」設定中更改預設權限。

## 管理權限

管理員可通過使用者界面或設定相應的環境變數來調整這些權限。所有與權限相關的環境變數都標記為 `PersistentConfig`，這意味著它們在首次啟動後會被內部儲存並可通過 Open WebUI 界面進行管理。

這種靈活性允許組織在提供所需工具的同時實施安全策略。欲了解更詳細的與權限相關環境變數的資訊，請參見 [環境變數配置](../../getting-started/env-configuration.md#workspace-permissions) 文件。
