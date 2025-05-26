---
sidebar_position: 2
title: "🐍 Python代码执行"
---

# 🐍 Python代码执行

## 概览

Open WebUI允许在浏览器中客户端执行Python代码，通过Pyodide在聊天中的代码块运行脚本。此功能使大型语言模型（LLM）能够生成可直接在浏览器中执行的Python脚本，并利用Pyodide支持的多种库。

为了保障用户隐私和灵活性，Open WebUI镜像了PyPI包，避免了直接的外部网络请求。这种方法还使得Pyodide在没有互联网接入的环境中可用。

Open WebUI前端包含了一个自包含的WASM（WebAssembly）Python环境，由Pyodide提供支持，可以执行LLM生成的基础Python脚本。此环境设计易于使用，无需额外的设置或安装。

## 支持的库

Pyodide代码执行被配置为仅加载在scripts/prepare-pyodide.js中配置并添加到"CodeBlock.svelte"中的包。目前Open WebUI支持以下Pyodide包：

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

这些库可以用于执行各种任务，例如数据处理、机器学习和网页抓取。如果您想运行的包没有在我们随Open WebUI提供的Pyodide中编译，就无法使用该包。

## 调用Python代码执行

要执行Python代码，请在聊天中请求LLM为您编写Python脚本。当LLM生成代码后，代码块右上角会出现一个`运行`按钮。点击该按钮即可使用Pyodide执行代码。为了在代码块底部显示结果，请确保代码中至少有一个打印语句用于显示结果。

## 使用Python代码执行的提示

* 编写Python代码时，请牢记代码将在Pyodide环境中运行。可以通过在请求代码时提及"Pyodide环境"告知LLM。
* 研究Pyodide文档以了解该环境的能力和限制。
* 尝试使用不同的库和脚本，探索在Open WebUI中执行Python代码的可能性。

## Pyodide文档

* [Pyodide文档](https://pyodide.org/en/stable/)

## 代码示例

以下是一个简单Python脚本的示例，可以通过Pyodide执行：

```python
import pandas as pd

# 创建一个示例DataFrame
data = {&apos;Name&apos;: [&apos;John&apos;, &apos;Anna&apos;, &apos;Peter&apos;], 
        &apos;Age&apos;: [28, 24, 35]}
df = pd.DataFrame(data)

# 打印DataFrame
print(df)
```

此脚本将使用pandas创建一个示例DataFrame，并在您的聊天中代码块下方打印出它。

## 扩展支持库列表

想要突破现有的限制？要扩展支持的库列表，请按照以下步骤操作：

1. **分叉Pyodide仓库**以创建您的版本。
2. **选择新包**，从Pyodide现有的包列表中选择，或者探索Open WebUI目前缺乏的优质包。
3. **将新包集成**到您分叉的仓库中，以解锁更多可能性。
