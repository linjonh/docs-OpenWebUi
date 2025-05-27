---
sidebar_position: 1
title: "🗨️ 配置"
---

开放式Web UI支持本地、浏览器和远程语音转文本功能。

![alt text](/images/tutorials/stt/image.png)

![alt text](/images/tutorials/stt/stt-providers.png)

## 云端 / 远程语音转文本提供者

当前支持以下云语音转文本提供者。API密钥可以配置为环境变量（OpenAI）或在管理员设置页面中进行配置（两种密钥）。

 | 服务  | 需要API密钥 |
 | ------------- | ------------- |
 | OpenAI  | ✅ |
 | DeepGram  | ✅ |

 WebAPI通过内置的浏览器语音转文本提供者提供STT支持。

## 配置你的语音转文本提供者

要配置语音转文本提供者，可以：

- 前往管理员设置页面  
- 选择音频
- 提供一个API密钥并从下拉列表中选择一个模型  

![alt text](/images/tutorials/stt/stt-config.png)

## 用户级设置

除了管理员面板中配置的实例设置之外，还有一些用户级设置可以提供额外功能。

*   **STT设置:** 包含与语音转文本功能相关的设置。
*   **语音转文本引擎:** 确定用于语音识别的引擎（默认或Web API）。
 

![alt text](/images/tutorials/stt/user-settings.png)

## 使用语音转文本

语音转文本提供了一种高效的方式，通过语音进行“书写”提示，这种方式在桌面和移动设备上都具有很强的表现力。

要使用语音转文本，只需点击麦克风图标：

![alt text](/images/tutorials/stt/stt-operation.png)

实时的音频波形将指示成功的语音捕获：

![alt text](/images/tutorials/stt/stt-in-progress.png)

## 语音转文本模式操作

当录音开始后，你可以：

- 点击勾选图标保存录音（如果启用了完成后自动发送功能，它将发送完成；否则你可以手动发送）
- 如果你希望终止录音（例如，你希望重新开始录音），你可以点击x图标退出录音界面

![alt text](/images/tutorials/stt/endstt.png)
