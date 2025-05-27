---
sidebar_position: 2
title: "🗨️ Kokoro Web - Open WebUIのための簡単なTTS"
---

:::warning
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームによってサポートされていません。これは特定のユースケースに合わせてOpen WebUIをカスタマイズする方法を示すデモとして提供されています。貢献したい場合は、貢献チュートリアルをご確認ください。
:::

## `Kokoro Web`とは？

[Kokoro Web](https://github.com/eduardolat/kokoro-web)は、強力な[Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) テキスト読み上げモデルの軽量でOpenAI互換のAPIを提供します。このモデルは、Open WebUIとシームレスに統合され、自然な音声でAIとの会話を向上させます。

## 🚀 2ステップでの統合

### 1. Kokoro Web APIをデプロイする（ワンコマンド）

```yaml
services:
  kokoro-web:
    image: ghcr.io/eduardolat/kokoro-web:latest
    ports:
      - "3000:3000"
    environment:
      # OpenAI互換のAPIキーとして使用する秘密キーに変更してください
      - KW_SECRET_API_KEY=your-api-key
    volumes:
      - ./kokoro-cache:/kokoro/cache
    restart: unless-stopped
```

`docker compose up -d`を実行

### 2. OpenWebUIと接続する（30秒）

1. OpenWebUI内で`管理パネル` → `設定` → `オーディオ`に移動
2. 次を設定:
   - テキスト読み上げエンジン: `OpenAI`
   - APIベースURL: `http://localhost:3000/api/v1`  
     （Dockerを使用している場合: `http://host.docker.internal:3000/api/v1`）
   - APIキー: `your-api-key`（ステップ1から）
   - TTSモデル: `model_q8f16`（サイズとクオリティの最良のバランス）
   - TTSボイス: `af_heart`（デフォルトの温かみのあるナチュラルな英語音声）。[Kokoro Web Demo](https://voice-generator.pages.dev)から他の音声や設定も選択できます。

**これで完了！OpenWebUIにAI音声機能が追加されました。**

## 🌍 対応言語

Kokoro Webは、最適化された特定の音声で以下の8言語をサポートしています:

- 英語（米国） - en-us
- 英語（英国） - en-gb
- 日本語 - ja
- 中国語 - cmn
- スペイン語 - es-419
- ヒンディー語 - hi
- イタリア語 - it
- ポルトガル語（ブラジル） - pt-br

各言語には最適な発音と自然な流れのために専用の音声が用意されています。言語ごとに特化した音声の完全なリストを見るには、[GitHubリポジトリ](https://github.com/eduardolat/kokoro-web)を参照するか、[Kokoro Web Demo](https://voice-generator.pages.dev)を使用して音声をプレビューし、カスタム音声をすぐに作成してください。

## 💾 あらゆるハードウェア向けに最適化されたモデル

ハードウェアのニーズに合ったモデルを選択してください:

| モデルID | 最適化 | サイズ | 推奨用途 |
|----------|-------------|------|-----------|
| model_q8f16 | 混合精度 | 86 MB | **推奨** - 最適なバランス |
| model_quantized | 8ビット | 92.4 MB | CPU性能が良好 |
| model_uint8f16 | 混合精度 | 114 MB | 中性能CPUでのより良い品質 |
| model_q4f16 | 4ビット&fp16ウエイト | 154 MB | 高品質でなお効率的 |
| model_fp16 | fp16 | 163 MB | 高品質 |
| model_uint8 | 8ビット&混合 | 177 MB | バランスの取れたオプション |
| model_q4 | 4ビットマトリックス計算 | 305 MB | 高品質オプション |
| model | fp32 | 326 MB | 最大品質（遅い） |

## ✨ 導入前に試す

[**Kokoro Web Demo**](https://voice-generator.pages.dev)にアクセスして、すべての音声をすぐにプレビューできます。このデモでは:

- **100%ブラウザで実行** - サーバーは不要
- **永遠に無料** - 使用制限や登録なし
- **インストール不要** - サイトにアクセスするだけで利用可能
- **すべての機能を含む** - 任意の音声や言語をすぐに試せる

## その他のヘルプが必要ですか？

追加オプション、音声カスタマイズガイド、詳細設定については[GitHubリポジトリ](https://github.com/eduardolat/kokoro-web)をご覧ください。

**OpenWebUIの会話で自然なAI音声をお楽しみください！**
