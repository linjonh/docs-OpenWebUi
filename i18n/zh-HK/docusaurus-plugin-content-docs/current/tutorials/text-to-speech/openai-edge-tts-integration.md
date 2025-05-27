---
sidebar_position: 1
title: "🗨️ 使用 Docker 的 Edge TTS"
---

:::warning
本教程為社群貢獻，並未獲得 Open WebUI 團隊的支持。它僅用於演示如何針對您的特定用例自訂 Open WebUI。如有興趣貢獻，請參閱貢獻教學。
:::

# 使用 Open WebUI 整合 `openai-edge-tts` 🗣️

## 什麼是 `openai-edge-tts`? 

[OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) 是一個模仿 OpenAI API 端點的文字轉語音 API，允許在可以自訂端點 URL 的場景（如 Open WebUI）中直接作為替代品。

它使用 [edge-tts](https://github.com/rany2/edge-tts) 套件，利用 Edge 瀏覽器的免費「朗讀」功能模擬向 Microsoft / Azure 發送的請求，免費實現高品質的文字轉語音。

[在此試聽聲音示例](https://tts.travisvn.com)

<details>
  <summary>它與 'openedai-speech' 有什麼不同？</summary>

類似 [openedai-speech](https://github.com/matatonic/openedai-speech)，[openai-edge-tts](https://github.com/travisvn/openai-edge-tts) 是一個模仿 OpenAI API 端點的文字轉語音 API，可作為能夠呼叫 OpenAI Speech 端點並配置伺服器端點 URL 的場景中的直接替代品。

`openedai-speech` 是一個更加全面的選項，允許完全離線生成語音，並可選擇多種模式。

`openai-edge-tts` 則是一個更簡單的選項，使用名為 `edge-tts` 的 Python 套件生成音頻。

</details>

## 要求

- 您的系統上已安裝 Docker
- Open WebUI 正在運行

## ⚡️ 快速開始

以下命令是無需配置即可快速開始的最簡單方式

```bash
docker run -d -p 5050:5050 travisvn/openai-edge-tts:latest
```

這將使用所有默認配置在埠 5050 上運行服務。

## 設定 Open WebUI 使用 `openai-edge-tts`

- 打開管理面板，前往 `Settings` -> `Audio`
- 設置您的 TTS 設定以符合下方的截圖
- _注意：您可以在此指定 TTS 聲音_

![Open WebUI 管理設置中的音頻截圖，為此項目新增正確的端點](https://utfs.io/f/MMMHiQ1TQaBobmOhsMkrO6Tl2kxX39dbuFiQ8cAoNzysIt7f)

:::info
默認 API 密鑰為字串 `your_api_key_here`。如果不需要額外的安全性，您無需更改該值。
:::

**僅此而已！您可以到此結束**

# 如果您覺得 [OpenAI Edge TTS](https://github.com/travisvn/openai-edge-tts) 有用，請在 GitHub 上給此倉庫加顆 ⭐️


<details>
  <summary>使用 Python 運行</summary>
  
### 🐍 使用 Python 運行

如果您更喜歡直接使用 Python 運行此專案，請按照以下步驟設置虛擬環境、安裝依賴項並啟動伺服器。

#### 1. 克隆倉庫

```bash
git clone https://github.com/travisvn/openai-edge-tts.git
cd openai-edge-tts
```

#### 2. 設置虛擬環境

創建並激活虛擬環境以隔離依賴項：

```bash
# 適用於 macOS/Linux
python3 -m venv venv
source venv/bin/activate

# 適用於 Windows
python -m venv venv
venv\Scripts\activate
```

#### 3. 安裝依賴項

使用 `pip` 安裝 `requirements.txt` 中列出的必要套件：

```bash
pip install -r requirements.txt
```

#### 4. 配置環境變數

在根目錄中創建一個 `.env` 檔案，並設置以下變數：

```plaintext
API_KEY=your_api_key_here
PORT=5050

DEFAULT_VOICE=en-US-AvaNeural
DEFAULT_RESPONSE_FORMAT=mp3
DEFAULT_SPEED=1.0

DEFAULT_LANGUAGE=en-US

REQUIRE_API_KEY=True
REMOVE_FILTER=False
EXPAND_API=True
```

#### 5. 啟動伺服器

設置完成後，使用以下命令啟動伺服器：

```bash
python app/server.py
```

伺服器將開始在 `http://localhost:5050` 運行。

#### 6. 測試 API

現在可以與 API 進行互動，訪問 `http://localhost:5050/v1/audio/speech` 和其他可用的端點。 請參閱使用部分以獲取請求示例。

</details>

<details>
  <summary>使用說明細節</summary>
  
##### 端點: `/v1/audio/speech` (別名 `/audio/speech`)

從輸入文本生成音頻。可用參數如下：

**必填參數：**

- **input** (字串): 要轉換為語音的文本（最多 4096 個字元）。

**選填參數：**

- **model** (字串): 設置為 "tts-1" 或 "tts-1-hd" (默認值: `"tts-1"`)。
- **voice** (字串): 一個 OpenAI 兼容的聲音（如 alloy, echo, fable, onyx, nova, shimmer）或任何有效的 `edge-tts` 聲音 (默認值: `"en-US-AvaNeural"`)。
- **response_format** (字串): 音頻格式。選項有：`mp3`, `opus`, `aac`, `flac`, `wav`, `pcm` (默認值: `mp3`)。
- **speed** (數字): 播放速度（0.25 到 4.0）。默認為 `1.0`。

:::tip
您可以瀏覽可用聲音，並在 [tts.travisvn.com](https://tts.travisvn.com) 上聆聽示例預覽。
:::

使用 `curl` 發送請求並將輸出保存到 mp3 檔案的示例請求：

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "input": "您好，我是您的AI助理！讓我知道我如何幫助您實現您的想法。",
    "voice": "echo",
    "response_format": "mp3",
    "speed": 1.0
  } \
  --output speech.mp3
```

或者，要與OpenAI的API端點參數保持一致：

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "model": "tts-1",
    "input": "您好，我是您的AI助理！讓我知道我如何幫助您實現您的想法。",
    "voice": "alloy"
  } \
  --output speech.mp3
```

以下是英語以外語言的示例：

```bash
curl -X POST http://localhost:5050/v1/audio/speech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d {
    "model": "tts-1",
    "input": "じゃあ、行く。電車の時間、調べておくよ。",
    "voice": "ja-JP-KeitaNeural"
  } \
  --output speech.mp3
```

##### 附加端點

- **POST/GET /v1/models**: 顯示可用的語音合成模型。
- **POST/GET /v1/voices**: 列出給定語言/地區的 `edge-tts` 聲音。
- **POST/GET /v1/voices/all**: 列出所有 `edge-tts` 聲音，包含語言支持信息。

:::info
`/v1` 現在是可選的。

此外，還有 **Azure AI Speech** 和 **ElevenLabs** 的端點，這些端點可供未來支持，如果在開放的 WebUI 中允許自定義API端點。

您可以通過設置環境變量 `EXPAND_API=False` 來禁用這些功能。
:::

</details>

## 🐳 Docker快速配置

您可以在用於運行項目的命令中配置環境變量 

```bash
docker run -d -p 5050:5050 \
  -e API_KEY=your_api_key_here \
  -e PORT=5050 \
  -e DEFAULT_VOICE=en-US-AvaNeural \
  -e DEFAULT_RESPONSE_FORMAT=mp3 \
  -e DEFAULT_SPEED=1.0 \
  -e DEFAULT_LANGUAGE=en-US \
  -e REQUIRE_API_KEY=True \
  -e REMOVE_FILTER=False \
  -e EXPAND_API=True \
  travisvn/openai-edge-tts:latest
```

:::note
現在通過進行過濾，可以提高Markdown文本的可讀性及支持性。

您可以通過設置環境變量 `REMOVE_FILTER=True` 來禁用此功能。
:::

## 附加資源

更多有關 `openai-edge-tts` 的信息，請訪問 [GitHub repo](https://github.com/travisvn/openai-edge-tts)

若需直接支持，請訪問 [Voice AI & TTS Discord](https://tts.travisvn.com/discord)

## 🎙️語音示例

[播放語音示例並查看所有可用的 Edge TTS 聲音](https://tts.travisvn.com/)
