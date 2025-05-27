---
sidebar_position: 2
title: "🤝 贡献教程"
---

:::warning
此教程为社区贡献，不受 Open WebUI 团队支持，仅作为如何根据您的具体使用场景自定义 Open WebUI 的演示。想要贡献？请查看贡献教程。
:::

# 贡献教程

感谢您对为 Open WebUI 文档贡献教程的兴趣。请按照以下步骤设置您的环境并提交您的教程。

## 步骤

1. **Fork `openwebui/docs` GitHub 仓库**

   - 访问 GitHub 上的 [Open WebUI 文档仓库](https://github.com/open-webui/docs)。
   - 点击右上角的 **Fork** 按钮，将仓库复制到您的 GitHub 账户中。

2. **启用 GitHub Actions**

   - 在您的 fork 仓库中，进入 **Actions** 标签页。
   - 如果被提示，请按照屏幕上的说明启用 GitHub Actions。

3. **启用 GitHub Pages**

   - 进入您的 fork 仓库的 **Settings** > **Pages**。
   - 在 **Source** 下，选择您想要部署的分支（例如 `main`）和文件夹（例如 `/docs`）。
   - 点击 **Save** 以启用 GitHub Pages。

4. **配置 GitHub 环境变量**

   - 在您的 fork 仓库中，进入 **Settings** > **Secrets and variables** > **Actions** > **Variables**。
   - 添加以下环境变量：
     - `BASE_URL` 设置为 `/docs`（或您为 fork 选择的基本 URL）。
     - `SITE_URL` 设置为 `https://<your-github-username>.github.io/`。

### 📝 更新 GitHub Pages 工作流和配置文件

如果您需要调整部署设置以适应您的自定义设置，请按以下步骤操作：

a. **更新 `.github/workflows/gh-pages.yml`**

- 如果需要，为 `BASE_URL` 和 `SITE_URL` 在构建步骤中添加环境变量：

     ```yaml
       - name: Build
         env:
           BASE_URL: ${{ vars.BASE_URL }}
           SITE_URL: ${{ vars.SITE_URL }}
         run: npm run build
     ```

b. **修改 `docusaurus.config.ts` 使用环境变量**

- 更新 `docusaurus.config.ts` 使用这些环境变量，并为本地或直接部署设置默认值：

     ```typescript
     const config: Config = {
       title: "Open WebUI",
       tagline: "对 LLMs（原 Ollama WebUI）的 ChatGPT 风格 WebUI",
       favicon: "images/favicon.png",
       url: process.env.SITE_URL || "https://openwebui.com",
       baseUrl: process.env.BASE_URL || "/",
       ...
     };
     ```

- 此设置可确保 fork 和自定义设置的一致部署行为。

5. **运行 `gh-pages` GitHub 工作流**

   - 在 **Actions** 标签页中，找到 `gh-pages` 工作流。
   - 如果需要，可手动触发工作流，或者根据您的设置，它可能会自动运行。

6. **访问您的 fork 副本**

   - 访问 `https://<your-github-username>.github.io/<BASE_URL>` 查看您的 fork 文档。

7. **起草您的更改**

   - 在您的 fork 仓库中，进入相应的目录（例如 `docs/tutorial/`）。
   - 为您的教程创建一个新的 markdown 文件或编辑现有文件。
   - 确保您的教程包含不受支持的警告横幅。

8. **提交一个 Pull Request**

   - 当您的教程准备好后，将您的更改提交到您的 fork 仓库。
   - 进入原始的 `open-webui/docs` 仓库。
   - 点击 **New Pull Request** 并选择您的 fork 和分支作为来源。
   - 为您的 PR 提供一个描述性的标题和描述。
   - 提交 Pull Request 以供审查。

## 重要提示

社区贡献的教程必须包含以下内容：

```
:::warning
此教程为社区贡献，不受 Open WebUI 团队支持，仅作为如何根据您的具体使用场景自定义 Open WebUI 的演示。想要贡献？请查看贡献教程。
:::
```

---

:::tip 如何在本地测试 Docusaurus
您可以使用以下命令在本地测试您的 Docusaurus 站点：

```bash
npm install   # 安装依赖
npm run build # 构建生产环境站点
```

这将帮助您在部署前捕获任何问题
:::

---
