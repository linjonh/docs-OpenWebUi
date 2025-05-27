---
sidebar_position: 14
title: "🛃 カスタムCAストアを使用して設定する"
---

:::warning
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームによってサポートされているものではありません。これは特定のユースケースに合わせてOpen WebUIをカスタマイズする方法を示すデモンストレーションとして機能します。貢献したい場合は、貢献方法のチュートリアルをご覧ください。
:::

OIの実行中に`[SSL: CERTIFICATE_VERIFY_FAILED]`エラーが発生する場合、通常、これはHTTPSトラフィックを傍受するネットワーク（例: 企業ネットワーク）にいることが原因です。

これを修正するには、新しい証明書をOIのトラストストアに追加する必要があります。

**事前構築されたDockerイメージの場合**:

1. `docker run`に`--volume=/etc/ssl/certs/ca-certificates.crt:/etc/ssl/certs/ca-certificates.crt:ro`をコマンドラインオプションとして渡すことで、ホストマシンの証明書ストアをコンテナにマウントします。
2. `REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt`を設定してPythonにシステムトラストストアを使用させます（https://docs.docker.com/reference/cli/docker/container/run/#env を参照）。

環境変数`REQUESTS_CA_BUNDLE`が機能しない場合は、同じ値で`SSL_CERT_FILE`（[httpxのドキュメント](https://www.python-httpx.org/environment_variables/#ssl_cert_file)に従って）を設定してみてください。

[@KizzyCode](https://github.com/open-webui/open-webui/issues/1398#issuecomment-2258463210)による例の`compose.yaml`:

```yaml
services:
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    volumes:
      - /var/containers/openwebui:/app/backend/data:rw
      - /etc/containers/openwebui/compusrv.crt:/etc/ssl/certs/ca-certificates.crt:ro
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    environment:
      - WEBUI_NAME=compusrv
      - ENABLE_SIGNUP=False
      - ENABLE_COMMUNITY_SHARING=False
      - WEBUI_SESSION_COOKIE_SAME_SITE=strict
      - WEBUI_SESSION_COOKIE_SECURE=True
      - ENABLE_OLLAMA_API=False
      - REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```

`ro`フラグはCAストアを読み取り専用としてマウントし、ホストのCAストアへの誤操作を防止します。
**ローカル開発の場合**:

UIに変更を加える場合などに便利なように、ビルドプロセス中に証明書を追加することもできます。この場合、`Dockerfile`を変更します。
[マルチステージ](https://docs.docker.com/build/building/multi-stage/)でビルドが行われるため、両方のステージに証明書を追加する必要があります。

1. フロントエンド（`build`ステージ）:

```dockerfile
COPY package.json package-lock.json <YourRootCert>.crt ./
ENV NODE_EXTRA_CA_CERTS=/app/<YourRootCert>.crt
RUN npm ci
```

2. バックエンド（`base`ステージ）:

```dockerfile
COPY <CorporateSSL.crt> /usr/local/share/ca-certificates/
RUN update-ca-certificates
ENV PIP_CERT=/etc/ssl/certs/ca-certificates.crt \
    REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```
