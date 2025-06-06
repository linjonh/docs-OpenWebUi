---
sidebar_position: 5
title: "🔗 URL 参数"
---

在 Open WebUI 中，可以通过各种 URL 参数自定义聊天会话。这些参数允许您设置特定配置、启用功能，并针对每次聊天定义模型设置。这种方法为从 URL 直接管理单个聊天会话提供了灵活性和控制力。

## URL 参数概览

以下表格列出了可用的 URL 参数、它们的功能和示例使用。

| **参数**           | **描述**                                                                    | **示例**                           |
|-----------------------|----------------------------------------------------------------------------------|--------------------------------------------------------|
| `models`           | 指定要使用的模型，参数值为以逗号分隔的模型列表。                                | `/?models=model1,model2`         |
| `model`            | 指定在聊天会话中使用的单一模型。                                              | `/?model=model1`                 |
| `youtube`          | 指定要在聊天中转录的 YouTube 视频 ID。                                       | `/?youtube=VIDEO_ID`             |
| `web-search`       | 如果设置为 `true`，启用网页搜索功能。                                          | `/?web-search=true`              |
| `tools` 或 `tool-ids` | 指定要在聊天中激活的工具 ID，以逗号分隔的列表形式。                             | `/?tools=tool1,tool2`            |
| `call`             | 如果设置为 `true`，启用通话界面覆盖功能。                                     | `/?call=true`                    |
| `q`                | 设置聊天的初始查询或提示。                                                   | `/?q=Hello%20there`              |
| `temporary-chat`   | 如果设置为 `true`，将聊天标记为临时聊天，仅用于一次性会话。                     | `/?temporary-chat=true`          |

### 1. **模型选择**

- **描述**：`models` 和 `model` 参数允许您指定在特定聊天会话中使用哪些[语言模型](/features/workspace/models.md)。
- **设置方式**：您可以使用 `models` 参数指定多个模型，或使用 `model` 参数指定单一模型。
- **示例**：
  - `/?models=model1,model2` – 使用 `model1` 和 `model2` 初始化聊天。
  - `/?model=model1` – 设置 `model1` 为聊天中唯一使用的模型。

### 2. **YouTube 视频转录**

- **描述**：`youtube` 参数接受一个 YouTube 视频 ID，允许聊天转录指定的视频内容。
- **设置方式**：使用 YouTube 视频 ID 作为此参数的值。
- **示例**：`/?youtube=VIDEO_ID`
- **行为**：此功能将在聊天中启动视频转录功能。

### 3. **网页搜索**

- **描述**：启用 `web-search` 参数使聊天会话可以访问[网页搜索](/category/-web-search)功能。
- **设置方式**：将此参数设置为 `true` 以启用网页搜索功能。
- **示例**：`/?web-search=true`
- **行为**：启用后，聊天可以在响应中检索网页搜索结果。

### 4. **工具选择**

- **描述**：`tools` 或 `tool-ids` 参数指定要在聊天中激活的[工具](/features/plugin/tools)。
- **设置方式**：提供以逗号分隔的工具 ID 列表作为参数值。
- **示例**：`/?tools=tool1,tool2` 或 `/?tool-ids=tool1,tool2`
- **行为**：每个工具 ID 都会被匹配并在会话中激活，以供用户使用。

### 5. **通话界面覆盖**

- **描述**：`call` 参数在聊天界面中启用视频或通话覆盖功能。
- **设置方式**：将此参数设置为 `true` 以启用通话界面覆盖功能。
- **示例**：`/?call=true`
- **行为**：激活通话界面覆盖功能，支持实时转录和视频输入等功能。

### 6. **初始查询提示**

- **描述**：`q` 参数允许设置聊天的初始查询或提示。
- **设置方式**：将查询或提示文本指定为参数值。
- **示例**：`/?q=Hello%20there`
- **行为**：聊天以指定的提示开始，并自动将其作为第一条消息提交。

### 7. **临时聊天会话**

- **描述**：`temporary-chat` 参数将聊天会话标记为临时会话。此设置可能限制保存聊天历史或应用持久性设置等功能。
- **设置方式**：将此参数设置为 `true` 以开启临时聊天会话。
- **示例**：`/?temporary-chat=true`
- **行为**：启动一次性聊天会话，不保存历史记录或应用高级配置。

<details>
<summary>示例使用场景</summary>
:::tip **临时聊天会话**
假设用户希望开启一个快速聊天会话并且不保存历史记录，他们可以在 URL 中设置 `temporary-chat=true` 来实现。这种方式提供了一次性互动的临时聊天环境。
:::
</details>

## 同时使用多个参数

这些 URL 参数可以组合在一起，创建高度自定义的聊天会话。例如：

```bash
/?models=model1,model2&youtube=VIDEO_ID&web-search=true&tools=tool1,tool2&call=true&q=Hello%20there&temporary-chat=true
```

这个 URL 会执行以下操作：

- 使用 `model1` 和 `model2` 初始化聊天。
- 启用 YouTube 转录、网页搜索以及指定工具。
- 显示通话界面。
- 设置初始提示为 "Hello there."。
- 将聊天标记为临时会话，不保存任何历史记录。
