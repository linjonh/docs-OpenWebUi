---
sidebar_position: 3
title: "🔒 权限"
---

`Workspace` 的 `权限` 部分在 Open WebUI 中允许管理员为用户配置访问控制和功能可用性。这个功能强大的系统可以对用户在应用程序中访问和修改的内容进行细粒度控制。

管理员可以通过以下方式管理权限：

1. **用户界面：** Workspace 的权限部分提供了图形界面供配置权限。
2. **环境变量：** 权限可以通过存储为 `PersistentConfig` 变量的环境变量进行设置。
3. **组管理：** 将用户分配到具有预定义权限的组中。

## Workspace 权限

Workspace 权限控制对 Open WebUI 平台核心组件的访问：

* **模型访问**：切换以允许用户访问和管理自定义模型。（环境变量：`USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`）
* **知识访问**：切换以允许用户访问和管理知识库。（环境变量：`USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`）
* **提示访问**：切换以允许用户访问和管理已保存的提示。（环境变量：`USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`）
* **工具访问**：切换以允许用户访问和管理工具。（环境变量：`USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`）*注意：启用此选项会允许用户上传任意代码到服务器。*

## 聊天权限

聊天权限决定用户在聊天对话中可以执行的操作：

* **允许聊天控制**：切换以启用聊天控制选项访问。
* **允许文件上传**：切换以允许用户在聊天会话中上传文件。（环境变量：`USER_PERMISSIONS_CHAT_FILE_UPLOAD`）
* **允许聊天删除**：切换以允许用户删除聊天对话。（环境变量：`USER_PERMISSIONS_CHAT_DELETE`）
* **允许聊天编辑**：切换以允许用户编辑聊天对话中的消息。（环境变量：`USER_PERMISSIONS_CHAT_EDIT`）
* **允许临时聊天**：切换以允许用户创建临时聊天会话。（环境变量：`USER_PERMISSIONS_CHAT_TEMPORARY`）

## 功能权限

功能权限控制对 Open WebUI 中特定功能的访问：

* **网页搜索**：切换以允许用户在聊天会话中执行网页搜索。（环境变量：`ENABLE_RAG_WEB_SEARCH`）
* **图像生成**：切换以允许用户生成图像。（环境变量：`ENABLE_IMAGE_GENERATION`）
* **代码解释器**：切换以允许用户使用代码解释器功能。（环境变量：`USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`）
* **直接工具服务器**：切换以允许用户直接连接到工具服务器。（环境变量：`USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`）

## 默认权限设置

默认情况下，Open WebUI 应用以下权限设置：

**Workspace 权限**：
- 模型访问：禁用（`USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS=False`）
- 知识访问：禁用（`USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS=False`）
- 提示访问：禁用（`USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS=False`）
- 工具访问：禁用（`USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS=False`）

**聊天权限**：
- 允许聊天控制：启用
- 允许文件上传：启用（`USER_PERMISSIONS_CHAT_FILE_UPLOAD=True`）
- 允许聊天删除：启用（`USER_PERMISSIONS_CHAT_DELETE=True`）
- 允许聊天编辑：启用（`USER_PERMISSIONS_CHAT_EDIT=True`）
- 允许临时聊天：启用（`USER_PERMISSIONS_CHAT_TEMPORARY=True`）

**功能权限**：
- 网页搜索：启用（`ENABLE_RAG_WEB_SEARCH=True`）
- 图像生成：启用（`ENABLE_IMAGE_GENERATION=True`）
- 代码解释器：启用（`USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`）
- 直接工具服务器：禁用（`USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS=False`）

管理员可以在管理面板中“用户”部分的用户界面中更改默认权限。

## 管理权限

管理员可以通过用户界面或在配置中设置相应的环境变量调整这些权限。所有与权限相关的环境变量均被标记为 `PersistentConfig` 变量，意味着它们在首次启动后将被内部存储，并且可以通过 Open WebUI 接口进行管理。

这种灵活性允许组织在为用户提供所需工具的同时实施安全策略。有关与权限相关的环境变量的更详细信息，请参阅 [环境变量配置](../../getting-started/env-configuration.md#workspace-permissions) 文档。
