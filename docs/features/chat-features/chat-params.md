---
sidebar_position: 4
title: "⚙️ 聊天参数"
---

在 Open WebUI 中，设置**系统提示**和**高级参数**分为三个层次：按聊天实例、按模型实例、按帐号实例。这种分层系统既提供了灵活性又保持了规范的管理与控制。

## 系统提示和高级参数的层级图

| **级别** | **定义** | **修改权限** | **覆盖能力** |
| --- | --- | --- | --- |
| **按聊天实例** | 针对某一具体聊天实例的系统提示和高级参数设置 | 用户可修改，但不可覆盖模型特定设置 | 不允许覆盖模型特定设置 |
| **按帐号实例** | 针对特定用户帐号的默认系统提示和高级参数 | 用户可设置，但可能被模型特定设置覆盖 | 用户设置可被模型特定设置覆盖 |
| **按模型实例** | 针对特定模型的默认系统提示和高级参数 | 管理员可以设置，用户无法修改 | 管理员设置优先，用户设置可被覆盖 |

### 1. **按聊天实例基准：**

- **描述**：按聊天实例基准设置是指为特定聊天实例配置的系统提示和高级参数。这些设置仅适用于当前会话，不会影响未来的聊天。
- **设置方式**：用户可以通过 Open WebUI 右侧边栏的 **Chat Controls（聊天控制）** 部分修改特定聊天实例的系统提示和高级参数。
- **覆盖能力**：用户不能覆盖管理员为模型特定设置的**系统提示**或特定**高级参数**（**#2**）。这一机制确保了模型特定设置的一致性和遵循性。

<details>
<summary>示例用例</summary>
:::tip **按聊天实例基准**：
假设某用户想为特定会话设置自定义系统提示。他可以通过访问 **Chat Controls（聊天控制）** 部分并修改 **System Prompt（系统提示）** 字段来实现。这些更改只会应用于当前聊天会话。
:::
</details>

### 2. **按帐号实例基准：**

- **描述**：按帐号实例基准设置是指为特定用户帐号配置的默认系统提示和高级参数。在未定义较低级别设置的情况下，用户特定更改可以作为备用设置生效。
- **设置方式**：用户可以通过 Open WebUI **Settings（设置）** 菜单的 **General（通用）** 部分设置其帐号的系统提示和高级参数。
- **覆盖能力**：用户可以为其帐号设置自定义系统提示，但需要注意，如果管理员已经为特定模型设置了**系统提示**或特定**高级参数**，这些用户设置可能仍会被覆盖。

<details>
<summary>示例用例</summary>
:::tip **按帐号实例基准**：
假设用户想为其帐号设置自己的系统提示。他可以通过访问 **Settings（设置）** 菜单并修改 **System Prompt（系统提示）** 字段来实现。
:::
</details>

### 3. **按模型实例基准：**

- **描述**：按模型实例基准设置是指为特定模型配置的默认系统提示和高级参数。这些设置适用于使用该模型的所有聊天实例。
- **设置方式**：管理员可以通过 Open WebUI 的 **Workspace（工作区）** 的 **Models（模型）** 部分为特定模型设置默认系统提示和高级参数。
- **覆盖能力**：**用户**帐号无法修改按模型实例基准设置的**系统提示**或特定**高级参数**（**#3**）。此限制旨在防止用户不适当地更改默认设置。
- **上下文长度保持：** 当管理员在 **Workspace（工作区）** 部分手动设置了模型的**系统提示**或特定**高级参数**时，该**系统提示**或手动设置的**高级参数**不能在 **General（通用）** 设置或 **Chat Controls（聊天控制）** 部分被**用户**帐号按帐号或聊天实例基准覆盖或调整。这确保了设置的一致性，并防止用户的上下文长度设置变化导致模型过度重新加载。
- **模型优先级：** 如果某模型的**系统提示**或特定**高级参数**值已由管理员在 **Workspace（工作区）** 部分预置，则**用户**帐号在 **General（通用）** 设置或 **Chat Controls（聊天控制）** 部分做出的任何上下文长度更改将被忽略，保持该模型的预配置值。需要注意的是，由**管理员**帐号留下的未设置参数仍可由**用户**帐号在按帐号或按聊天实例基准手动调整。

<details>
<summary>示例用例</summary>
:::tip **按模型设置**:
假设管理员希望为特定模型设置默认系统提示。他们可以通过访问**模型**部分并修改对应模型的**系统提示**字段来实现。任何使用该模型的聊天实例都会自动使用该模型的系统提示和高级参数。
:::
</details>


## **优化系统提示设置以实现最大灵活性**

:::tip **额外提示**
**这一提示适用于管理员和用户账户。为了实现系统提示的最大灵活性，我们建议考虑以下设置：**

- 在你的**通用**设置中的**系统提示**字段中分配主要的系统提示（**即，为LLM赋予一个定义性的特征**）。这样将其设置为按账户级别的提示，使其能够在所有LLM中作为系统提示工作，而无需在**工作区**部分内对模型进行调整。

- 对于次要的系统提示（**即，为LLM分配一个任务**），选择将其放置在**聊天控制**侧边栏中的**系统提示**字段中（按聊天设置），或者放置在**工作区**部分的**模型**部分中（按模型设置，适用于管理员），允许直接设置。这样，你的账户级别系统提示能够与**聊天控制**提供的按聊天级别系统提示，或**模型**提供的按模型级别系统提示联合工作。

- 作为管理员，你应该在**模型**部分按模型级别分配LLM参数以实现最佳灵活性。对于这些次要系统提示，确保以一种最大化灵活性并最小化在不同账户或聊天实例之间进行调整的方式进行设置。对于你的管理员账户以及所有用户账户来说，理解**聊天控制**和**模型**部分的系统提示在**LLM**中应用的优先级顺序至关重要。
:::
