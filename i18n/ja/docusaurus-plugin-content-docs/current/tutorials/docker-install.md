---
sidebar_position: 4
title: 🐳 Docker のインストール
---

:::warning
このチュートリアルはコミュニティによる寄稿であり、Open WebUI チームによってサポートされていません。これは、特定の利用ケース向けに Open WebUI をカスタマイズする方法のデモンストレーションとして提供されています。寄稿を希望しますか？寄稿チュートリアルをご確認ください。
:::

# Docker のインストール

## Windows および Mac ユーザー向け

- [Docker の公式ウェブサイト](https://www.docker.com/products/docker-desktop) から Docker Desktop をダウンロードしてください。
- ウェブサイトに記載されているインストール手順に従ってください。
- インストール後、Docker Desktop を開いて正常に動作していることを確認してください。

---

## Ubuntu ユーザー向け

1. **ターミナルを開きます。**

2. **Docker の APT リポジトリを設定します：**

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
**Ubuntu 派生ディストリビューション**（例: Linux Mint）を使用している場合は、`VERSION_CODENAME` の代わりに `UBUNTU_CODENAME` を使用してください。
:::

3. **Docker エンジンをインストールします：**

   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

4. **Docker のインストールを確認します：**

   ```bash
   sudo docker run hello-world
   ```

---

## その他の Linux ディストリビューション向け

その他の Linux ディストリビューションについては、[公式 Docker ドキュメント](https://docs.docker.com/engine/install/) を参照してください。

---

## Ollama のインストールと確認

1. **Ollama をダウンロード** [https://ollama.com/](https://ollama.com/) からしてください。

2. **Ollama のインストールを確認します：**
   - ブラウザを開き、次の URL にアクセスしてください：
     [http://127.0.0.1:11434/](http://127.0.0.1:11434/)。
   - 注意: ポート番号はインストールにより異なる場合があります。
