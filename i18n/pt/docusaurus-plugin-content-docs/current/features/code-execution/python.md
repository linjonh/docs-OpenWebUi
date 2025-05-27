---
sidebar_position: 2
title: "🐍 Execução de Código Python"
---

# 🐍 Execução de Código Python

## Visão Geral

O Open WebUI permite a execução de código Python no lado do cliente diretamente no navegador, utilizando o Pyodide para executar scripts dentro de um bloco de código em um chat. Esse recurso possibilita que Modelos de Linguagem Grandes (LLMs) gerem scripts em Python que podem ser executados diretamente no navegador, aproveitando uma variedade de bibliotecas suportadas pelo Pyodide.

Para manter a privacidade e a flexibilidade do usuário, o Open WebUI reflete pacotes PyPI, evitando solicitações diretas para redes externas. Essa abordagem também permite o uso do Pyodide em ambientes sem acesso à internet.

O frontend do Open WebUI inclui um ambiente Python autossuficiente em WASM (WebAssembly), alimentado pelo Pyodide, que pode executar scripts básicos em Python gerados por LLMs. Esse ambiente foi projetado para ser fácil de usar, sem necessidade de configuração ou instalação adicional.

## Bibliotecas Suportadas

A execução de código no Pyodide está configurada para carregar apenas pacotes configurados em scripts/prepare-pyodide.js e depois adicionados a "CodeBlock.svelte". As seguintes bibliotecas Pyodide são atualmente suportadas no Open WebUI:

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

Essas bibliotecas podem ser usadas para realizar várias tarefas, como manipulação de dados, aprendizado de máquina e mineração de dados da web. Se o pacote que você deseja executar não estiver compilado dentro do Pyodide fornecido com o Open WebUI, o pacote não poderá ser utilizado.

## Invocando a Execução de Código Python

Para executar código Python, solicite a um LLM dentro de um chat para escrever um script em Python para você. Assim que o LLM gerar o código, um botão `Run` aparecerá no canto superior direito do bloco de código. Clicando nesse botão, o código será executado usando Pyodide. Para exibir o resultado na parte inferior do bloco de código, certifique-se de incluir pelo menos uma instrução print no código para mostrar um resultado.

## Dicas para Utilizar a Execução de Código Python

* Ao escrever código Python, tenha em mente que o código será executado em um ambiente Pyodide. Você pode informar o LLM sobre isso mencionando "ambiente Pyodide" ao solicitar o código.
* Pesquise a documentação do Pyodide para entender as capacidades e limitações do ambiente.
* Experimente diferentes bibliotecas e scripts para explorar as possibilidades de execução de código Python no Open WebUI.

## Documentação do Pyodide

* [Documentação do Pyodide](https://pyodide.org/en/stable/)

## Exemplo de Código

Aqui está um exemplo de um script simples em Python que pode ser executado usando Pyodide:

```python
import pandas as pd

# Criar um DataFrame de exemplo
dados = {Nome: [João, Ana, Pedro],
         Idade: [28, 24, 35]}
df = pd.DataFrame(dados)

# Imprimir o DataFrame
print(df)
```

Esse script criará um DataFrame de exemplo usando pandas e o imprimirá abaixo do bloco de código dentro do seu chat.

## Estendendo a Lista de Bibliotecas Suportadas

Quer expandir os limites do que é possível? Para estender a lista de bibliotecas suportadas, siga estas etapas:

1. **Crie um fork do repositório Pyodide** para criar sua própria versão.
2. **Escolha novos pacotes** da lista existente de pacotes dentro do Pyodide ou explore pacotes de alta qualidade que o Open WebUI ainda não suporta.
3. **Integre os novos pacotes** ao seu repositório forkado para desbloquear ainda mais possibilidades.
