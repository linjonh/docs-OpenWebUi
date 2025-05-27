---
sidebar_position: 2
title: "🗨️ 使用 Docker 的 Openedai-speech"
---

:::warning
本教程是社群貢獻，並未獲得 Open WebUI 團隊的支援。它僅作為如何為您的特定使用案例自訂 Open WebUI 的示範。想要貢獻？請參閱貢獻教程。
:::

**將`openedai-speech`整合進 Open WebUI，使用 Docker**
==============================================================

**什麼是 `openedai-speech`？**
-----------------------------

:::info
[openedai-speech](https://github.com/matatonic/openedai-speech) 是符合 OpenAI 音頻/語音 API 的文字轉語音伺服器。

它提供`/v1/audio/speech`端點，並提供免費、私人化的文字轉語音體驗，支持自訂語音克隆功能。此服務與 OpenAI 無關，也不需要 OpenAI API 密鑰。
:::

**需求條件**
-----------------

* 系統已安裝 Docker
* Open WebUI 在 Docker 容器中運行
* 基本的 Docker 和 Docker Compose 使用知識

**選項 1: 使用 Docker Compose**
----------------------------------

**步驟 1: 為 `openedai-speech` 服務建立新資料夾**
-----------------------------------------------------------------

建立一個新資料夾，例如`openedai-speech-service`，用來存放`docker-compose.yml`和`speech.env`檔案。

**步驟 2: 從 GitHub 克隆 `openedai-speech` 儲存庫**
--------------------------------------------------------------

```bash
git clone https://github.com/matatonic/openedai-speech.git
```

這將把`openedai-speech`儲存庫下載到您的本地機器，其中包含 Docker Compose 檔案（`docker-compose.yml`，`docker-compose.min.yml`和`docker-compose.rocm.yml`）及其他必要檔案。

**步驟 3: 將`sample.env`檔案重新命名為`speech.env`（根據需要進行自訂）**
------------------------------------------------------------------------------

在`openedai-speech`儲存庫資料夾中，建立一個名為`speech.env`的新檔案，內容如下：

```yaml
TTS_HOME=voices
HF_HOME=voices
#PRELOAD_MODEL=xtts
#PRELOAD_MODEL=xtts_v2.0.2
#PRELOAD_MODEL=parler-tts/parler_tts_mini_v0.1
#EXTRA_ARGS=--log-level DEBUG --unload-timer 300
#USE_ROCM=1
```

**步驟 4: 選擇 Docker Compose 檔案**
----------------------------------------

您可以使用以下任何一個 Docker Compose 檔案：

* [docker-compose.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.yml): 此檔案使用`ghcr.io/matatonic/openedai-speech`映像並基於[Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile)進行構建。
* [docker-compose.min.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.min.yml): 此檔案使用`ghcr.io/matatonic/openedai-speech-min`映像並基於[Dockerfile.min](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile.min)進行構建。該映像是最小版本，只支持 Piper，不需要 GPU。
  * [docker-compose.rocm.yml](https://github.com/matatonic/openedai-speech/blob/main/docker-compose.rocm.yml): 此檔案使用`ghcr.io/matatonic/openedai-speech-rocm`映像，並基於 [Dockerfile](https://github.com/matatonic/openedai-speech/blob/main/Dockerfile)以支援 ROCm。

**步驟 4: 建立所選的 Docker 映像**
-----------------------------------------

在運行 Docker Compose 檔案之前，您需要建立 Docker 映像：

* **Nvidia GPU（支持 CUDA）**：

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
```

* **AMD GPU（支持 ROCm）**：

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
```

* **僅使用 CPU，無 GPU（僅支持 Piper）**：

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
```

**步驟 5: 運行正確的`docker compose up -d`命令**
----------------------------------------------------------

* **Nvidia GPU（支持 CUDA）**：運行以下命令以脫離模式啟動`openedai-speech`服務：

```bash
docker compose up -d
```

* **AMD GPU（支持 ROCm）**：運行以下命令以脫離模式啟動`openedai-speech`服務：

```bash
docker compose -f docker-compose.rocm.yml up -d
```

* **ARM64（Apple M 系列、樹莓派）**：XTTS 在此僅支持 CPU 並且速度非常慢。您可以使用支持 XTTS 的 Nvidia 映像進行 CPU（慢）的運行，或者使用僅支持 Piper 的映像（建議）：

```bash
docker compose -f docker-compose.min.yml up -d
```

* **僅使用 CPU，無 GPU（僅支持 Piper）**：使用僅支持 Piper 的最小 Docker 映像（< 1GB 相較於8GB）：

```bash
docker compose -f docker-compose.min.yml up -d
```

這將以脫離模式啟動`openedai-speech`服務。

**選項 2: 使用 Docker Run 命令**
---------------------------------------

你也可以使用以下 Docker 運行指令以分離模式啟動 `openedai-speech` 服務：

* **NVIDIA GPU (CUDA)**：執行以下命令以構建並啟動 `openedai-speech` 服務：

```bash
docker build -t ghcr.io/matatonic/openedai-speech .
docker run -d --gpus=all -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech
```

* **ROCm (AMD GPU)**：執行以下命令以構建並啟動 `openedai-speech` 服務：

> 要啟用 ROCm 支援，取消註解 `speech.env` 文件中的 `#USE_ROCM=1` 行。

```bash
docker build -f Dockerfile --build-arg USE_ROCM=1 -t ghcr.io/matatonic/openedai-speech-rocm .
docker run -d --privileged --init --name openedai-speech -p 8000:8000 -v voices:/app/voices -v config:/app/config ghcr.io/matatonic/openedai-speech-rocm
```

* **僅 CPU，無 GPU (僅適用於 Piper)**：執行以下命令以構建並啟動 `openedai-speech` 服務：

```bash
docker build -f Dockerfile.min -t ghcr.io/matatonic/openedai-speech-min .
docker run -d -p 8000:8000 -v voices:/app/voices -v config:/app/config --name openedai-speech ghcr.io/matatonic/openedai-speech-min
```

**步驟 6：配置 Open WebUI 使用 `openedai-speech` 進行文字轉語音（TTS）**
---------------------------------------------------------

![openedai-tts](https://github.com/silentoplayz/docs/assets/50341825/ea08494f-2ebf-41a2-bb0f-9b48dd3ace79)

打開 Open WebUI 設定，前往 **管理面板 > 設定 > 音頻** 下的 TTS 設定。添加以下配置：

* **API 基本 URL**：`http://host.docker.internal:8000/v1`
* **API 密鑰**：`sk-111111111` （注意這是一個虛擬 API 密鑰，因為 `openedai-speech` 不需要 API 密鑰。此字段可以使用任何內容，只要填滿即可。）

**步驟 7：選擇一個語音**
--------------------------

在管理面板的相同音頻設定菜單中的 `TTS Voice` 下，您可以選擇以下 `openedai-speech` 支援的 `TTS 模型`。這些模型的語音已針對英語進行優化。

* `tts-1` 或 `tts-1-hd`：`alloy`、`echo`、`echo-alt`、`fable`、`onyx`、`nova` 和 `shimmer`（`tts-1-hd` 是可配置的；預設使用 OpenAI 樣本）

**步驟 8：按下 `保存`，應用更改並享受自然語音**
--------------------------------------------------------------------------------------------

按下 `保存` 按鈕以應用更改到您的 Open WebUI 設定。重新整理頁面讓改動完全生效，然後享受使用 `openedai-speech` 來以自然語音朗讀文字回應的整合功能。

**模型詳情：**
------------------

`openedai-speech` 支援多個文字轉語音的模型，每個模型均有其獨特的優勢和要求。以下是可用的模型：

* **Piper TTS**（非常快，基於 CPU 運行）：通過 `voice_to_speaker.yaml` 配置文件使用您自己的 [Piper 語音](https://rhasspy.github.io/piper-samples/)。此模型非常適合需要低延遲和高性能的應用。Piper TTS 還支援 [多語種](https://github.com/matatonic/openedai-speech#multilingual) 語音。
* **Coqui AI/TTS XTTS v2**（快速，但需要約 4GB GPU 顯存並且需 NVIDIA GPU 支援 CUDA）：此模型使用 Coqui AIs XTTS v2 語音克隆技術生成高品質語音。雖然需要更高性能的 GPU，但它提供了卓越的性能和高品質音頻。Coqui 也支援 [多語種](https://github.com/matatonic/openedai-speech#multilingual) 語音。
* **Beta Parler-TTS 支援**（試驗性，較慢）：此模型使用 Parler-TTS 框架生成語音。目前處於 Beta 階段，它允許您描述演講者語音的基本特徵。每次生成的語音會略有不同，但應該與所提供的描述相似。關於如何描述語音的靈感，可參見 [文字描述到語音](https://www.text-description-to-speech.com/)。

**故障排除**
-------------------

如果您在將 `openedai-speech` 整合到 Open WebUI 時遇到問題，請遵循以下故障排除步驟：

* **確認 `openedai-speech` 服務**：確保 `openedai-speech` 服務正在運行，並且您在 docker-compose.yml 文件中指定的端口已暴露。
* **檢查訪問 host.docker.internal**：確認主機名 `host.docker.internal` 能從 Open WebUI 容器內解析。這是必要的，因為 `openedai-speech` 是通過本地主機在您的電腦上暴露，但 `open-webui` 通常無法從其容器內訪問。您可以在 docker-compose.yml 文件中添加一個卷以將主機的文件掛載到容器，例如掛載到一個目錄將由 openedai-speech 提供服務。
* **檢查 API 金鑰設定**：確保將 API 金鑰設置為一個虛擬值或有效地留空，因為 `openedai-speech` 並不需要 API 金鑰。
* **檢查語音設定**：確認您試圖用於 TTS 的語音是否存在於您的 `voice_to_speaker.yaml` 檔案中，並且相應的文件（例如語音 XML 文件）是否存在於正確的目錄中。
* **驗證語音模型路徑**：如果您在載入語音模型時遇到問題，請再次檢查 `voice_to_speaker.yaml` 檔案中的路徑是否與您的語音模型實際位置匹配。

**額外的故障排除提示**
------------------------------------

* 檢查 openedai-speech 的日誌中是否有指出問題所在的錯誤或警告。
* 驗證 `docker-compose.yml` 文件是否針對您的環境進行了正確配置。
* 如果仍然遇到問題，嘗試重新啟動 `openedai-speech` 服務或整個 Docker 環境。
* 如果問題持續，請參考 `openedai-speech` 的 GitHub 資源庫或在相關的社群論壇尋求幫助。

**常見問答**
-------

**我如何控制生成音頻的情感範圍？**

沒有直接的機制來控制生成音頻的情感輸出。某些因素，例如大小寫或語法可能會影響輸出音頻，但內部測試結果喜憂參半。

**語音文件存儲在哪裡？那配置文件呢？**。

定義可用語音及其屬性的配置文件存儲在 config 卷中。具體而言，默認語音定義在 voice_to_speaker.default.yaml 檔案中。

**額外資源**
------------------------

有關配置 Open WebUI 使用 `openedai-speech` 的更多資訊，包括設置環境變數，請參閱 [Open WebUI 文件](https://docs.openwebui.com/getting-started/env-configuration#text-to-speech)。

有關 `openedai-speech` 的更多資訊，請訪問 [GitHub 資源庫](https://github.com/matatonic/openedai-speech)。

**如何為 openedai-speech 添加更多語音：**
[Custom-Voices-HowTo](https://github.com/matatonic/openedai-speech?tab=readme-ov-file#custom-voices-howto)

:::note
您可以在 `docker-compose.yml` 檔案中將端口號更改為任何開放且可用的端口，但請確保同時更新 Open WebUI 管理音頻設置中的 **API 基礎 URL**。
:::
