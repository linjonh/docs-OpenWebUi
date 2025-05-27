---
sidebar_position: 2
title: "🐍 Python代码执行"
---

# 🐍 Python代码执行

## 概述

Open WebUI允许在浏览器中客户端侧执行Python代码，通过Pyodide在聊天中的代码块运行脚本。此功能使大型语言模型（LLMs）能够生成Python脚本并直接在浏览器中执行，同时利用Pyodide支持的一系列库。

为了保持用户隐私和灵活性，Open WebUI镜像了PyPI包，避免直接的外部网络请求。这种方法还可以在没有互联网访问的环境中使用Pyodide。

Open WebUI前端包含一个由Pyodide驱动的独立WASM（WebAssembly）Python环境，可以执行由LLMs生成的基本Python脚本。这个环境设计为易于使用，无需额外的设置或安装。

## 支持的库

Pyodide代码执行被配置为仅加载在scripts/prepare-pyodide.js中配置的包，然后添加到"CodeBlock.svelte"中。当前在Open WebUI中支持以下Pyodide包：

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

这些库可用于执行各种任务，例如数据处理、机器学习和网页抓取。如果你想运行的包未编译到我们随Open WebUI提供的Pyodide中，该包将无法使用。

## 调用Python代码执行

要执行Python代码，请在聊天中请求LLM为你编写Python脚本。一旦LLM生成了代码，代码块的右上角将出现一个`运行`按钮。点击此按钮将使用Pyodide执行代码。在代码块底部显示结果时，确保代码中至少有一个打印语句来显示结果。

## 使用Python代码执行的提示

* 编写Python代码时，请记住代码将运行在Pyodide环境中执行。你可以在请求代码时提及"Pyodide环境"来通知LLM。
* 研究Pyodide文档以了解该环境的功能和限制。
* 通过不同的库和脚本实验，以探索Open WebUI中Python代码执行的可能性。

## Pyodide文档

* [Pyodide文档](https://pyodide.org/en/stable/)

## 代码示例

以下是一个可以使用Pyodide执行的简单Python脚本示例：

```python
import pandas as pd

# 创建一个示例DataFrame
data = {Name: [John, Anna, Peter], 
        Age: [28, 24, 35]}
df = pd.DataFrame(data)

# 打印DataFrame
print(df)
```

此脚本将使用pandas创建一个示例DataFrame，并在聊天中的代码块下面打印它。

## 扩展支持库列表

想要突破可能性的界限吗？要扩展支持的库列表，请按照以下步骤操作：

1. **Fork Pyodide仓库**以创建您自己的版本。
2. **选择新包**，可以选择Pyodide中现有的包列表或探索Open WebUI目前缺少的高质量包。
3. **将新包集成**到您的Fork仓库中，以解锁更多可能性。
