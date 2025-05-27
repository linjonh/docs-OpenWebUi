---
sidebar_position: 4000
title: "🪶 Apache Tika Extraction"
---

:::warning
このチュートリアルはコミュニティによる貢献であり、Open WebUIチームによってサポートされていません。このチュートリアルは、特定のユースケースに向けてOpen WebUIをカスタマイズする方法を示すデモンストレーションとして提供されています。貢献したい場合は、貢献チュートリアルをチェックしてください。
:::

## 🪶 Apache Tika 抽出

このドキュメントは、Apache TikaをOpen WebUIに統合するためのステップバイステップガイドを提供します。Apache Tikaは、1000を超える異なるファイルタイプからメタデータとテキストコンテンツを検出して抽出できるコンテンツ分析ツールキットです。これらすべてのファイルタイプは単一のインターフェイスを通じて解析可能であり、Tikaは検索エンジンのインデックス作成、コンテンツ分析、翻訳、その他多くの用途に役立ちます。

前提条件
------------

* Open WebUI インスタンス
* システムにDockerがインストールされていること
* Open WebUI用にセットアップされたDockerネットワーク

統合手順
----------------

### 手順1: Apache Tika用のDocker Composeファイルを作成するかDockerコマンドを実行する

Apache Tikaを実行するには、以下の2つのオプションがあります:

**オプション1: Docker Composeを使用する場合**

Open WebUIインスタンスと同じディレクトリに `docker-compose.yml` という名前の新しいファイルを作成します。次の構成をファイルに追加します:

```yml
services:
  tika:
    image: apache/tika:latest-full
    container_name: tika
    ports:
      - "9998:9998"
    restart: unless-stopped
```

次のコマンドを使用してDocker Composeファイルを実行します:

```bash
docker-compose up -d
```

**オプション2: Docker Runコマンドを使用する場合**

代わりに、以下のDockerコマンドを使用してApache Tikaを実行することもできます:

```bash
docker run -d --name tika \
  -p 9998:9998 \
  --restart unless-stopped \
  apache/tika:latest-full
```

なお、Docker runコマンドを使用する場合は、Open WebUIインスタンスと同じネットワークでコンテナを実行する場合、`--network` フラグを指定する必要があります。

### 手順2: Apache Tikaを使用するようにOpen WebUIを構成する

Apache TikaをOpen WebUIのコンテキスト抽出エンジンとして使用するには、以下の手順に従います:

* Open WebUIインスタンスにログインします。
* `Admin Panel` 設定メニューに移動します。
* `Settings` をクリックします。
* `Documents` タブをクリックします。
* `Default` のコンテンツ抽出エンジンドロップダウンを `Tika` に変更します。
* コンテキスト抽出エンジンURLを `http://tika:9998` に更新します。
* 変更を保存します。

 DockerでのApache Tikaの確認
=====================================

Docker環境でApache Tikaが正しく動作していることを確認するには、以下の手順を実行します:

### 1. Apache Tika Dockerコンテナを開始する

まず、Apache Tika Dockerコンテナが実行中であることを確認してください。次のコマンドを使用して開始できます:

```bash
docker run -p 9998:9998 apache/tika
```

このコマンドはApache Tikaコンテナを起動し、コンテナのポート9998をローカルマシンのポート9998にマッピングします。

### 2. サーバーが実行中であることを確認する

GETリクエストを送信して、Apache Tikaサーバーが実行中であることを確認します:

```bash
curl -X GET http://localhost:9998/tika
```

このコマンドは次の応答を返すはずです:

```
This is Tika Server. Please PUT
```

### 3. 統合を確認する

また、統合をテストするためにファイルを分析用に送信してみることもできます。以下の `curl` コマンドを使用してApache Tikaをテストできます:

```bash
curl -T test.txt http://localhost:9998/tika
```

`test.txt` をローカルマシン上のテキストファイルのパスに置き換えてください。

Apache Tikaはファイルの検出されたメタデータとコンテンツタイプを応答として返します。

### スクリプトを使用してApache Tikaを確認する

確認プロセスを自動化したい場合、このスクリプトはファイルをApache Tikaに送信し、期待されるメタデータを応答でチェックします。メタデータが存在する場合、スクリプトはファイルのメタデータと共に成功メッセージを出力します。それ以外の場合は、エラーメッセージとApache Tikaからの応答を出力します。

```python
import requests

def verify_tika(file_path, tika_url):
    try:
        # ファイルをApache Tikaに送信し、出力を確認する
        response = requests.put(tika_url, files={file: open(file_path, rb)})

        if response.status_code == 200:
            print("Apache Tikaがファイルを正常に分析しました。")
            print("Apache Tikaからの応答:")
            print(response.text)
        else:
            print("ファイルの分析中にエラーが発生しました:")
            print(f"ステータスコード: {response.status_code}")
            print(f"Apache Tikaからの応答: {response.text}")
    except Exception as e:
        print(f"エラーが発生しました: {e}")

if __name__ == "__main__":
    file_path = "test.txt"  # ファイルのパスに置き換えてください
    tika_url = "http://localhost:9998/tika"

    verify_tika(file_path, tika_url)
```

スクリプトを実行する手順:

### 前提条件

* システムにPython 3.xがインストールされていること
* `requests` ライブラリがインストールされていること（`pip install requests` を使用してインストール可能）
* Apache TikaのDockerコンテナが実行中である必要があります（`docker run -p 9998:9998 apache/tika`コマンドを使用）。
* `"test.txt"`を、Apache Tikaに送信したいファイルのパスに置き換えてください。

### スクリプトの実行方法

1. スクリプトを`verify_tika.py`として保存します（例: NotepadやSublime Textのようなテキストエディタを使用）。
2. ターミナルまたはコマンドプロンプトを開きます。
3. スクリプトを保存したディレクトリに移動します（`cd`コマンドを使用）。
4. 次のコマンドを使用してスクリプトを実行します：`python verify_tika.py`。
5. スクリプトは、Apache Tikaが正常に動作しているかどうかを示すメッセージを出力します。

注意: 問題が発生した場合は、Apache Tikaコンテナが正しく動作していること、およびファイルが正しいURLに送信されていることを確認してください。

### 結論

これらの手順を実行することで、Docker環境でApache Tikaが正しく動作していることを確認できます。ファイルを解析のために送信することでセットアップをテストしたり、GETリクエストでサーバーが動作しているか確認したり、プロセスを自動化するスクリプトを使用することができます。問題が発生した場合は、Apache Tikaコンテナが正しく動作していること、およびファイルが正しいURLに送信されていることを確認してください。

トラブルシューティング
————

* Apache Tikaサービスが実行中であり、Open WebUIインスタンスからアクセス可能であることを確認してください。
* Dockerログを確認して、Apache Tikaサービスに関連するエラーや問題がないかを確認してください。
* Open WebUIでコンテキスト抽出エンジンURLが正しく設定されていることを確認してください。

統合のメリット
——————

Apache TikaをOpen WebUIと統合することで、以下のようなメリットがあります。

* **メタデータ抽出の向上**: Apache Tikaの高度なメタデータ抽出機能によって、ファイルから正確で関連性の高いデータを抽出することができます。
* **多様なファイル形式のサポート**: Apache Tikaは幅広いファイル形式をサポートしており、さまざまなファイル形式を扱う組織にとって理想的なソリューションです。
* **コンテンツ分析の強化**: Apache Tikaの高度なコンテンツ分析機能を活用して、ファイルから価値ある洞察を抽出することができます。

結論
————

Apache TikaをOpen WebUIに統合する手順はシンプルであり、Open WebUIインスタンスのメタデータ抽出機能を向上させることができます。このドキュメントで紹介した手順を実行することで、Apache TikaをOpen WebUIのコンテキスト抽出エンジンとして簡単に設定することができます。
