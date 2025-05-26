---
sidebar_position: 2
title: "🤝 贡献教程"
---

:::warning
此教程由社区贡献，并未获得 Open WebUI 团队支持。它仅作为定制 Open WebUI 以适应您的特定用例的演示。如果想要贡献，请查看贡献教程。
:::

# 贡献教程

感谢您对 Open WebUI 文档贡献教程的兴趣。请按照以下步骤设置您的环境并提交您的教程。

## 步骤

1. **Fork `openwebui/docs` GitHub 仓库**

   - 前往 GitHub 上的 [Open WebUI Docs 仓库](https://github.com/open-webui/docs)。
   - 点击右上角的 **Fork** 按钮，以在您的 GitHub 账户下创建复制。

2. **启用 GitHub Actions**

   - 在您的 fork 仓库中，进入 **Actions** 标签。
   - 如果提示，请按照屏幕上的指示启用 GitHub Actions。

3. **启用 GitHub Pages**

   - 前往您 fork 仓库中的 **Settings** > **Pages**。
   - 在 **Source** 下，选择您要部署的分支（例如 `main`）和文件夹（例如 `/docs`）。
   - 点击 **Save** 以启用 GitHub Pages。

4. **配置 GitHub 环境变量**

   - 在您 fork 仓库中，进入 **Settings** > **Secrets and variables** > **Actions** > **Variables**。
   - 添加以下环境变量：
     - `BASE_URL` 设置为 `/docs`（或您为 fork 选择的基本 URL）。
     - `SITE_URL` 设置为 `https://<your-github-username>.github.io/`。

### 📝 更新 GitHub Pages 工作流和配置文件

如果您需要调整部署设置以适应您的自定义设置，请按以下步骤操作：

a. **更新 `.github/workflows/gh-pages.yml`**

- 如果需要，向构建步骤添加环境变量 `BASE_URL` 和 `SITE_URL`：

     ```yaml
       - name: Build
         env:
           BASE_URL: ${{ vars.BASE_URL }}
           SITE_URL: ${{ vars.SITE_URL }}
         run: npm run build
     ```

b. **修改 `docusaurus.config.ts` 以使用环境变量**

- 更新 `docusaurus.config.ts` 以使用这些环境变量，并为本地或直接部署设置默认值：

     ```typescript
     const config: Config = {
       title: "Open WebUI",
       tagline: "用于 LLM 的 ChatGPT 风格 WebUI（前 Ollama WebUI）",
       favicon: "images/favicon.png",
       url: process.env.SITE_URL || "https://openwebui.com",
       baseUrl: process.env.BASE_URL || "/",
       ...
     };
     ```

- 此设置确保 fork 和自定义设置的部署行为一致。

5. **运行 `gh-pages` GitHub 工作流**

   - 在 **Actions** 标签中，找到 `gh-pages` 工作流。
   - 如果需要，可手动触发工作流，或者根据设置，工作流可能会自动运行。

6. **浏览到您的 fork 副本**

   - 访问 `https://<your-github-username>.github.io/<BASE_URL>` 查看您的 fork 文档。

7. **起草您的更改**

   - 在您的 fork 仓库中，导航到合适的目录（例如 `docs/tutorial/`）。
   - 为您的教程创建新的 markdown 文件或编辑现有文件。
   - 确保您的教程包含不支持的警告横幅。

8. **提交 Pull Request**

   - 当您的教程准备就绪时，将更改提交到您的 fork 仓库。
   - 导航到原始 `open-webui/docs` 仓库。
   - 点击 **New Pull Request** 并选择您的 fork 和分支作为来源。
   - 为您的 PR 提供描述性标题和说明。
   - 提交 Pull Request 进行审查。

## 重要事项

社区贡献的教程必须包括以下内容：

```
:::warning
此教程由社区贡献，并未获得 Open WebUI 团队支持。它仅作为定制 Open WebUI 以适应您的特定用例的演示。如果想要贡献，请查看贡献教程。
:::
```

---

:::tip 如何本地测试 Docusaurus
您可以使用以下命令本地测试您的 Docusaurus 网站：

```bash
npm install   # 安装依赖项
npm run build # 构建站点以供生产
```

这将帮助您在部署前发现任何问题
:::

---
