---
sidebar_position: 4
title: 🐳 Docker 설치
---

:::warning
이 튜토리얼은 커뮤니티 기여로 제공되며 Open WebUI 팀에서 지원하지 않습니다. 특정 사용 사례에 맞게 Open WebUI를 맞춤화하는 방법을 시연하기 위해 제공됩니다. 기여하고 싶으신가요? 기여 튜토리얼을 확인하세요.
:::

# Docker 설치

## Windows와 Mac 사용자

- [Docker 공식 웹사이트](https://www.docker.com/products/docker-desktop)에서 Docker Desktop을 다운로드하세요.  
- 웹사이트의 설치 지침을 따르세요.  
- 설치 후, **Docker Desktop을 열어** 제대로 실행되는지 확인하세요.

---

## Ubuntu 사용자

1. **터미널을 엽니다.**

2. **Docker의 apt 저장소를 설정합니다:**

   ```bash
   sudo apt-get update
   sudo apt-get install ca-certificates curl
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
     $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
     sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

:::note
**Ubuntu 파생판**(예: Linux Mint)을 사용하는 경우 `VERSION_CODENAME` 대신 `UBUNTU_CODENAME`을 사용합니다.
:::

3. **Docker 엔진을 설치합니다:**

   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

4. **Docker 설치를 확인합니다:**

   ```bash
   sudo docker run hello-world
   ```

---

## 기타 리눅스 배포판

기타 리눅스 배포판의 경우 [Docker 공식 문서](https://docs.docker.com/engine/install/)를 참조하세요.

---

## Ollama 설치 및 확인

1. **Ollama**를 [https://ollama.com/](https://ollama.com/)에서 다운로드합니다.

2. **Ollama 설치를 확인합니다:**
   - 브라우저를 열고 아래 페이지로 이동하세요:
     [http://127.0.0.1:11434/](http://127.0.0.1:11434/).
   - 참고: 설치에 따라 포트가 다를 수 있습니다.
