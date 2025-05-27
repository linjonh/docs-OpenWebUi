---
sidebar_position: 2
title: "🐍 Pythonコードの実行"
---

# 🐍 Pythonコードの実行

## 概要

Open WebUIは、ブラウザ内でPythonコードをクライアントサイドで実行する機能を提供します。Pyodideを活用し、チャット内のコードブロックでスクリプトを実行可能です。この機能により、大規模言語モデル (LLMs) が生成するPythonスクリプトをブラウザ内で直接実行でき、Pyodideがサポートするさまざまなライブラリを利用できます。

ユーザーのプライバシーと柔軟性を維持するために、Open WebUIはPyPIパッケージをミラーリングし、外部ネットワークへの直接リクエストを回避しています。このアプローチにより、インターネットアクセスがない環境でもPyodideを利用可能です。

Open WebUIのフロントエンドには、Pyodideを搭載した自己完結型のWASM (WebAssembly) Python環境が含まれており、LLMsが生成した基本的なPythonスクリプトを実行できます。この環境は使いやすさを重視し、追加のセットアップやインストールを必要としません。

## サポートされているライブラリ

Pyodideコードの実行は、scripts/prepare-pyodide.jsで構成されたパッケージのみを読み込むように設定され、その後"CodeBlock.svelte"に追加されます。現在、Open WebUIでサポートされているPyodideパッケージは以下の通りです:

* micropip
* packaging
* requests
* beautifulsoup4
* numpy
* pandas
* matplotlib
* scikit-learn
* scipy
* regex

これらのライブラリは、データ操作、機械学習、ウェブスクレイピングなどさまざまなタスクに使用できます。使用したいパッケージがOpen WebUIに搭載されているPyodide内に含まれていない場合、そのパッケージは使用できません。

## Pythonコードの実行方法

Pythonコードを実行するには、チャット内でLLMにPythonスクリプト作成を依頼してください。LLMがコードを生成すると、コードブロックの右上に"Run"ボタンが表示されます。このボタンをクリックすると、Pyodideを使用してコードが実行されます。結果をコードブロックの下に表示させるには、コード内に少なくとも1つのprint文を追加して結果を表示してください。

## Pythonコード実行の使用方法に関するヒント

* Pythonコードを書く際は、コードがPyodide環境で実行されることを念頭に置いてください。コードを依頼する際に「Pyodide環境」と明記することで、LLMに情報を伝えることができます。
* Pyodideのドキュメントを調査し、環境の機能や制限について理解しましょう。
* さまざまなライブラリやスクリプトを試して、Open WebUIでPythonコード実行の可能性を探求してください。

## Pyodideドキュメント

* [Pyodideドキュメント](https://pyodide.org/en/stable/)

## コード例

以下はPyodideを使用して実行可能なシンプルなPythonスクリプトの例です:

```python
import pandas as pd

# サンプルDataFrameを作成
data = {Name: [John, Anna, Peter], 
        Age: [28, 24, 35]}
df = pd.DataFrame(data)

# DataFrameを出力
print(df)
```

このスクリプトはpandasを使用してサンプルのDataFrameを作成し、コードブロック下部に出力します。

## サポートされるライブラリの拡張

可能性をさらに広げたいですか？サポートされるライブラリのリストを拡張するには、以下の手順を実行してください:

1. **Pyodideリポジトリをフォーク**して独自のバージョンを作成します。
2. **新しいパッケージを選択**して、Pyodideの既存のリストに追加するか、Open WebUIに現在ない高品質なパッケージを探しましょう。
3. **新しいパッケージを統合**して、フォークしたリポジトリにさらに多くの可能性を開拓します。
