---
sidebar_position: 2
title: "🤝 貢獻教程"
---

:::warning
此教程為社群貢獻內容，並非由 Open WebUI 團隊支持。這僅用於展示如何針對您的特定使用案例自訂 Open WebUI。想要貢獻？請參考貢獻教程。
:::

# 貢獻教程

我們感謝您對 Open WebUI 文檔貢獻教程的興趣。請按照以下步驟設置您的環境並提交您的教程。

## 步驟

1. **Fork `openwebui/docs` GitHub Repository**

   - 瀏覽至 GitHub 上的 [Open WebUI Docs Repository](https://github.com/open-webui/docs)。
   - 點擊右上角的 **Fork** 按鈕，將代碼複製到您的 GitHub 帳戶下。

2. **啟用 GitHub Actions**

   - 在您的 fork 存儲庫中，導航到 **Actions** 標籤頁。
   - 如果有提示，按照屏幕上的說明啟用 GitHub Actions。

3. **啟用 GitHub Pages**

   - 前往您的 fork 存儲庫的 **Settings** > **Pages**。
   - 在 **Source** 下，選擇您希望部署的分支（例如 `main`）和文件夾（例如 `/docs`）。
   - 點擊 **Save** 啟用 GitHub Pages。

4. **配置 GitHub 環境變量**

   - 在您的 fork 存儲庫中，進入 **Settings** > **Secrets and variables** > **Actions** > **Variables**。
   - 添加以下環境變量：
     - `BASE_URL` 設置為 `/docs`（或您為 fork 選擇的基準 URL）。
     - `SITE_URL` 設置為 `https://<your-github-username>.github.io/`。

### 📝 更新 GitHub Pages Workflow 和配置文件

如果需要調整部署設置以適應自訂設置，請執行以下操作：

a. **更新 `.github/workflows/gh-pages.yml`**

- 如有需要，在構建步驟中添加 `BASE_URL` 和 `SITE_URL` 環境變量：

     ```yaml
       - name: Build
         env:
           BASE_URL: ${{ vars.BASE_URL }}
           SITE_URL: ${{ vars.SITE_URL }}
         run: npm run build
     ```

b. **修改 `docusaurus.config.ts` 使用環境變量**

- 更新 `docusaurus.config.ts` 使用這些環境變量，並設置本地或直接部署的默認值：

     ```typescript
     const config: Config = {
       title: "Open WebUI",
       tagline: "ChatGPT-Style WebUI for LLMs (Formerly Ollama WebUI)",
       favicon: "images/favicon.png",
       url: process.env.SITE_URL || "https://openwebui.com",
       baseUrl: process.env.BASE_URL || "/",
       ...
     };
     ```

- 此設置確保 fork 和自訂設置的部署行為一致。

5. **運行 `gh-pages` GitHub Workflow**

   - 在 **Actions** 標籤頁中，找到 `gh-pages` workflow。
   - 如果需要，手動觸發 workflow，或者根據您的設置，它可能會自動運行。

6. **瀏覽至您的 fork 副本**

   - 訪問 `https://<your-github-username>.github.io/<BASE_URL>` 查看您的 fork 文檔。

7. **撰寫您的修改**

   - 在您的 fork 存儲庫中，導航到相應的目錄（例如 `docs/tutorial/`）。
   - 為您的教程創建新的 markdown 文件或編輯現有文件。
   - 確保您的教程包含非官方支持的警示標籤。

8. **提交 Pull Request**

   - 完成教程後，將修改提交至您的 fork 存儲庫。
   - 瀏覽至原始的 `open-webui/docs` 存儲庫。
   - 點擊 **New Pull Request**，選擇您的 fork 和分支作為來源。
   - 提供詳細的標題和描述。
   - 提交 Pull Request 以供審核。

## 重要

社群貢獻的教程必須包括以下內容：

```
:::warning
此教程為社群貢獻內容，並非由 Open WebUI 團隊支持。這僅用於展示如何針對您的特定使用案例自訂 Open WebUI。想要貢獻？請參考貢獻教程。
:::
```

---

:::tip 如何本地測試 Docusaurus
您可以使用以下命令本地測試您的 Docusaurus 站點：

```bash
npm install   # 安裝依賴項
npm run build # 建立站點以供生產使用
```

這將幫助您在部署之前檢測任何問題
:::

---
