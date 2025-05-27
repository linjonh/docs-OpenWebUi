---
sidebar_position: 2
title: "🤝 기여 튜토리얼"
---

:::경고
이 튜토리얼은 커뮤니티 기여물이며 Open WebUI 팀에서 지원하지 않습니다. 이 튜토리얼은 특정 사용 사례에 맞게 Open WebUI를 맞춤화하는 방법을 시연하는 데만 목적이 있습니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인하세요.
:::

# 기여 튜토리얼

Open WebUI 문서에 튜토리얼을 기여하려는 관심에 감사드립니다. 아래 단계를 따라 환경을 설정하고 튜토리얼을 제출하세요.

## 단계

1. **`openwebui/docs` GitHub 리포지토리 포크하기**

   - GitHub에서 [Open WebUI Docs Repository](https://github.com/open-webui/docs)로 이동하세요.
   - 오른쪽 상단의 **Fork** 버튼을 클릭하여 자신의 GitHub 계정에 복사본을 만드세요.

2. **GitHub Actions 활성화하기**

   - 포크한 리포지토리에서 **Actions** 탭으로 이동하세요.
   - 화면에 표시되는 지침에 따라 GitHub Actions를 활성화하세요.

3. **GitHub Pages 활성화하기**

   - 포크한 리포지토리에서 **Settings** > **Pages**로 이동하세요.
   - **Source**에서 배포하고 싶은 브랜치(예: `main`)와 폴더(예: `/docs`)를 선택하세요.
   - **Save**를 클릭하여 GitHub Pages를 활성화하세요.

4. **GitHub 환경 변수 설정하기**

   - 포크한 리포지토리에서 **Settings** > **Secrets and variables** > **Actions** > **Variables**로 이동하세요.
   - 다음 환경 변수를 추가하세요:
     - `BASE_URL`을 `/docs`(혹은 포크에 적합한 기본 URL)로 설정하세요.
     - `SITE_URL`을 `https://<your-github-username>.github.io/`로 설정하세요.

### 📝 GitHub Pages Workflow 및 설정 파일 업데이트하기

맞춤설정에 맞추어 배포 설정을 조정해야 한다면 아래를 참조하세요:

a. **`.github/workflows/gh-pages.yml` 업데이트**

- `BASE_URL` 및 `SITE_URL` 환경 변수를 필요시 빌드 단계에 추가하세요:

     ```yaml
       - name: Build
         env:
           BASE_URL: ${{ vars.BASE_URL }}
           SITE_URL: ${{ vars.SITE_URL }}
         run: npm run build
     ```

b. **`docusaurus.config.ts` 파일 수정하여 환경 변수 사용하기**

- 환경 변수 및 로컬 또는 직접 배포에서 기본값으로 `docusaurus.config.ts`를 업데이트하세요:

     ```typescript
     const config: Config = {
       title: "Open WebUI",
       tagline: "LLM을 위한 ChatGPT 스타일 WebUI (이전 이름: Ollama WebUI)",
       favicon: "images/favicon.png",
       url: process.env.SITE_URL || "https://openwebui.com",
       baseUrl: process.env.BASE_URL || "/",
       ...
     };
     ```

- 이 설정은 포크와 맞춤설정 설치에 대해 일관된 배포 행동을 보장합니다.

5. **`gh-pages` GitHub 워크플로 실행하기**

   - **Actions** 탭에서 `gh-pages` 워크플로를 찾으세요.
   - 필요에 따라 워크플로를 수동으로 트리거하거나 설정에 따라 자동 실행될 수 있습니다.

6. **포크한 복사본 확인하기**

   - `https://<your-github-username>.github.io/<BASE_URL>`를 방문하여 포크한 문서를 확인하세요.

7. **변경 사항 작성하기**

   - 포크한 리포지토리에서 적절한 디렉토리(예: `docs/tutorial/`)로 이동하세요.
   - 튜토리얼을 위한 새 마크다운 파일을 만들거나 기존 파일을 수정하세요.
   - 튜토리얼에 지원되지 않는 경고 배너를 포함하세요.

8. **Pull Request 제출하기**

   - 튜토리얼이 준비되면 변경 사항을 포크한 리포지토리에 커밋하세요.
   - 원본 `open-webui/docs` 리포지토리로 이동하세요.
   - **New Pull Request**를 클릭하고 소스 리포지토리와 브랜치를 선택하세요.
   - Pull Request 제목과 설명을 작성하세요.
   - 리뷰를 위해 Pull Request를 제출하세요.

## 중요

커뮤니티 기여 튜토리얼에는 다음을 포함해야 합니다:

```
:::경고
이 튜토리얼은 커뮤니티 기여물이며 Open WebUI 팀에서 지원하지 않습니다. 이 튜토리얼은 특정 사용 사례에 맞게 Open WebUI를 맞춤화하는 방법을 시연하는 데만 목적이 있습니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인하세요.
:::
```

---

:::정보 로컬에서 Docusaurus 테스트하는 방법  
다음 명령으로 로컬에서 Docusaurus 사이트를 테스트할 수 있습니다:

```bash
npm install   # 종속성 설치
npm run build # 프로덕션용 사이트 빌드
```

이를 통해 배포 전에 문제를 확인할 수 있습니다.
:::

---
