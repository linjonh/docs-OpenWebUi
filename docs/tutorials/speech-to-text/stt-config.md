---
sidebar_position: 1
title: "🗨️ 配置"
---

Open Web UI 支持本地、浏览器和远程的语音转文字功能。

![alt text](/images/tutorials/stt/image.png)

![alt text](/images/tutorials/stt/stt-providers.png)

## 云端 / 远程语音转文字服务提供商

目前支持以下云端语音转文字服务提供商。API 密钥可以配置为环境变量（OpenAI）或在管理员设置页面中配置（两者的密钥均适用）。

 | 服务  | 需要 API 密钥 |
 | ------------- | ------------- |
 | OpenAI  | ✅ |
 | DeepGram  | ✅ |

 WebAPI 通过内置浏览器的 STT 提供语音转文字功能。

## 配置您的 STT 提供商

要配置语音转文字提供商，请执行以下步骤：

- 前往管理员设置页面
- 选择音频
- 提供一个 API 密钥，并从下拉菜单中选择一个模型

![alt text](/images/tutorials/stt/stt-config.png)

## 用户级设置

除了管理面板中设置的实例配置外，还有一些用户级设置可以提供额外功能。

*   **STT 设置：** 包含与语音转文字功能相关的设置。
*   **语音转文字引擎：** 决定用于语音识别的引擎（默认或 Web API）。
 

![alt text](/images/tutorials/stt/user-settings.png)

## 使用 STT

语音转文字提供了一种通过声音进行“书写”提示的高效方式，其在台式机和移动设备上表现都非常稳定。

要使用 STT，只需点击麦克风图标：

![alt text](/images/tutorials/stt/stt-operation.png)

实时音频波形会指示语音捕获成功：

![alt text](/images/tutorials/stt/stt-in-progress.png)

## STT 模式操作

开始录音后，您可以：

- 点击勾选图标保存录音（如果启用了完成后自动发送功能，则会自动发送；否则，您可以手动发送）
- 如果希望中止录音（例如，想重新开始新的录音），可以点击&#x27;x&#x27; 图标退出录音界面

![alt text](/images/tutorials/stt/endstt.png)
