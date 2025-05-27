---
sidebar_position: 321
title: "🐍 Jupyter Notebook統合"
---

:::warning
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームによるサポートは受けられません。これは、特定の使用ケースに合わせてOpen WebUIをカスタマイズする方法を示すデモンストレーションとして提供されています。貢献したいですか？貢献方法のチュートリアルをチェックしてください。
:::

> [!WARNING]
> このドキュメントは現在のバージョン（0.5.16）に基づいて作成されており、常に更新されています。


# Jupyter Notebook統合

v0.5.11以降、Open-WebUIには`コードインタープリタでのJupyter Notebookサポート`という新機能がリリースされました。この機能により、Open-WebUIとJupyterを統合することが可能です。この機能にはその後のリリースでもいくつかの改善が加えられているため、リリースノートを注意深く確認してください。

このチュートリアルでは、2つのサービス間の接続を設定する基本的な手順を説明します。

- [v0.5.11リリースノートを参照](https://github.com/open-webui/open-webui/releases/tag/v0.5.11)
- [v0.5.15リリースノートを参照](https://github.com/open-webui/open-webui/releases/tag/v0.5.14)

## Jupyter Notebookとは

Jupyter Notebookはオープンソースのウェブアプリケーションであり、ライブコード、方程式、視覚化、説明用テキストを含むドキュメントを作成し共有することができます。主にデータサイエンス、科学計算、教育で人気があり、実行可能なコード（Python、R、Juliaなどの言語）を説明文、画像、インタラクティブな視覚化と組み合わせて1つのドキュメントにまとめられます。Jupyter Notebookはデータ分析と探索に特に有用で、小さなコードスニペットを実行することで簡単に実験、デバッグ、および分析プロセスと結果を示す包括的なレポートの作成が可能です。

詳細については、Jupyterのウェブサイトを参照してください：[Project Juptyer](https://jupyter.org/)

## ステップ0: 設定の概要

このチュートリアルでは、以下のようなターゲット設定を行います。

![コード実行設定](/images/tutorials/jupyter/jupyter-code-execution.png)

# ステップ1: OUIとJupyterを起動する

`docker-compose`を使用して、LLMを含む両方のサービスを含むスタックを立ち上げましたが、各コンテナを個別に実行しても機能するはずです。

```yaml title="docker-compose.yml"
version: "3.8"

services:
open-webui:
image: ghcr.io/open-webui/open-webui:latest
container_name: open-webui
ports:
- "3000:8080"
volumes:
- open-webui:/app/backend/data

jupyter:
image: jupyter/minimal-notebook:latest
container_name: jupyter-notebook
ports:
- "8888:8888"
volumes:
- jupyter_data:/home/jovyan/work
environment:
- JUPYTER_ENABLE_LAB=yes
- JUPYTER_TOKEN=123456

volumes:
open-webui:
jupyter_data:
```

`docker-compose`ファイルを保存したディレクトリで以下のコマンドを実行して、上記のスタックを起動します。

```bash title="Run docker-compose"
docker-compose up -d
```

以下のURLから両方のサービスにアクセスできるようになります。

| サービス | URL |
| ---------- | ----------------------- |
| Open-WebUI | `http://localhost:3000` |
| Jupyter | `http://localhost:8888` |

Jupyterサービスにアクセスする際には、上記で定義した`JUPYTER_TOKEN`が必要です。このチュートリアルでは、トークン値`123456`を使用しています。

![コード実行設定](/images/tutorials/jupyter/jupyter-token.png)

# ステップ2: Jupyter用のコード実行を設定する

Open-WebUIとJupyterが起動できたので、Open-WebUIの管理パネル -> 設定 -> コード実行でJupyterを使用するようにOpen-WebUIのコード実行を設定する必要があります。この機能はOpen-WebUIで継続的に改良されているため、[`configs.py`ファイル](https://github.com/open-webui/open-webui/blob/6fedd72e3973e1d13c9daf540350cd822826bf27/backend/open_webui/routers/configs.py#L72)で常に最新の設定を確認することをお勧めします。v0.5.16時点で、以下の設定があります。

| Open-WebUI環境変数 | 値 |
| ------------------------------------- | -------------------------------- |
| `ENABLE_CODE_INTERPRETER` | True |
| `CODE_EXECUTION_ENGINE` | jupyter |
| `CODE_EXECUTION_JUPYTER_URL` | http://host.docker.internal:8888 |
| `CODE_EXECUTION_JUPYTER_AUTH` | token |
| `CODE_EXECUTION_JUPYTER_AUTH_TOKEN` | 123456 |
| `CODE_EXECUTION_JUPYTER_TIMEOUT` | 60 |
| `CODE_INTERPRETER_ENGINE` | jupyter |
| `CODE_INTERPRETER_JUPYTER_URL` | http://host.docker.internal:8888 |
| `CODE_INTERPRETER_JUPYTER_AUTH` | token |
| `CODE_INTERPRETER_JUPYTER_AUTH_TOKEN` | 123456 |
| `CODE_INTERPRETER_JUPYTER_TIMEOUT` | 60 |

## ステップ3: 接続をテストする

まず、Jupyterディレクトリに何があるかを確認します。以下の画像からわかるように、空の`work`フォルダしかありません。

![コード実行設定](/images/tutorials/jupyter/jupyter-empty.png)

### CSVを作成する

最初のプロンプトを実行しましょう。`Code Execution`ボタンを選択していることを確認してください。

```
プロンプト: バニラPythonを使用して1つ目のCSVを作成し、pandasライブラリを使用して2つ目のCSVを作成するフェイクデータの2つのCSVファイルを作成してください。CSVファイルの名前はdata1.csvとdata2.csvとしてください。
```

![コード実行の設定](/images/tutorials/jupyter/jupyter-create-csv.png)

CSVファイルが作成され、Jupyter内で利用可能であることが確認できます。

![コード実行の設定](/images/tutorials/jupyter/jupyter-view-csv.png)

### 可視化を作成する

2つ目のプロンプトを実行しましょう。同様に、`Code Execution`ボタンを選択していることを確認してください。

```
プロンプト: matplotlibとseabornを使用してPythonで複数の可視化を作成し、それらをjupyterに保存してください。
```

![コード実行の設定](/images/tutorials/jupyter/jupyter-create-viz.png)

可視化が作成され、Jupyter内で利用可能であることが確認できます。

![コード実行の設定](/images/tutorials/jupyter/jupyter-view-viz.png)

### ノートブックを作成する

最後のプロンプトを一緒に実行しましょう。このプロンプトでは、完全に新しいノートブックを作成します。

```
プロンプト: JSONファイルを読み取って書き込むPythonコードを書き、それをnotebook.ipynbという名前のノートブックに保存してください。
```

![コード実行の設定](/images/tutorials/jupyter/jupyter-create-notebook.png)

可視化が作成され、Jupyter内で利用可能であることが確認できます。

![コード実行の設定](/images/tutorials/jupyter/jupyter-view-notebook.png)

## ワークフローに関する注意

この機能をテストする際、Open-WebUIが生成されたコードや出力を自動的にJupyterのインスタンスに保存しないことが何度かあることに気付きました。作成したファイルやアイテムを強制的に出力させるために、以下の2ステップのワークフローを利用することがよくありました：まず必要なコードアーティファクトを作成し、その後Jupyterのインスタンスに保存するように指示します。

![コード実行の設定](/images/tutorials/jupyter/jupyter-workflow.png)

## この機能をどのように活用していますか？

コード実行機能やJupyterを使用していますか？もしそうなら、ぜひ教えてください。この機能を使用する他の素晴らしい方法の例をこのチュートリアルに追加し続けるために、皆さんがどのように利用しているのか聞きたいと思っています！
