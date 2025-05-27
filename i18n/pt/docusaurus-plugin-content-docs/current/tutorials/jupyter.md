---
sidebar_position: 321
title: "🐍 Integração com Jupyter Notebook"
---

:::aviso
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

> [!AVISO]
> Esta documentação foi criada com base na versão atual (0.5.16) e está sendo constantemente atualizada.


# Integração com Jupyter Notebook

A partir da versão v0.5.11, Open-WebUI lançou um novo recurso chamado `Suporte ao Jupyter Notebook no Interpretador de Código`. Este recurso permite integrar o Open-WebUI com o Jupyter. Já houve várias melhorias nesse recurso nas versões subsequentes, então revise as notas de lançamento com atenção.

Este tutorial orienta você sobre os fundamentos da configuração da conexão entre os dois serviços.

- [Ver Notas da Versão v0.5.11](https://github.com/open-webui/open-webui/releases/tag/v0.5.11)
- [Ver Notas da Versão v0.5.15](https://github.com/open-webui/open-webui/releases/tag/v0.5.14)

## O que são Jupyter Notebooks

O Jupyter Notebook é um aplicativo web de código aberto que permite aos usuários criar e compartilhar documentos contendo código ao vivo, equações, visualizações e texto narrativo. É particularmente popular em ciência de dados, computação científica e educação porque possibilita aos usuários combinar código executável (em linguagens como Python, R ou Julia) com texto explicativo, imagens e visualizações interativas, tudo em um único documento. Os Jupyter Notebooks são especialmente úteis para análise e exploração de dados porque permitem que os usuários executem código em pequenos pedaços gerenciáveis enquanto documentam seu raciocínio e descobertas ao longo do caminho. Este formato torna fácil experimentar, depurar código e criar relatórios abrangentes e compartilháveis que demonstram tanto o processo de análise quanto os resultados.

Consulte o site do Jupyter para mais informações: [Project Jupyter](https://jupyter.org/)

## Etapa 0: Resumo da Configuração

Aqui está a configuração alvo que vamos configurar através deste tutorial.

![Configuração de Execução de Código](/images/tutorials/jupyter/jupyter-code-execution.png)

# Etapa 1: Iniciar OUI e Jupyter

Para fazer isso, usei `docker-compose` para iniciar uma pilha que inclui ambos os serviços, junto com meus LLMs, mas isso também deve funcionar se você executar cada container do Docker separadamente.

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

Você pode iniciar a pilha acima executando o comando abaixo no diretório onde o arquivo `docker-compose` está salvo:

```bash title="Executar docker-compose"
docker-compose up -d
```

Agora você deve conseguir acessar ambos os serviços nos seguintes URLs:

| Serviço | URL |
| ---------- | ----------------------- |
| Open-WebUI | `http://localhost:3000` |
| Jupyter | `http://localhost:8888` |

Ao acessar o serviço Jupyter, será necessário o `JUPYTER_TOKEN` definido acima. Para este tutorial, escolhi um valor de token fictício de `123456`.

![Configuração de Execução de Código](/images/tutorials/jupyter/jupyter-token.png)

# Etapa 2: Configurar Execução de Código para Jupyter

Agora que temos o Open-WebUI e o Jupyter em execução, precisamos configurar a Execução de Código do Open-WebUI para usar o Jupyter em Painel de Administração -> Configurações -> Execução de Código. Como o Open-WebUI está constantemente lançando e melhorando este recurso, recomendo sempre revisar as possíveis configurações no [arquivo `configs.py`](https://github.com/open-webui/open-webui/blob/6fedd72e3973e1d13c9daf540350cd822826bf27/backend/open_webui/routers/configs.py#L72) para as últimas novidades. A partir da versão v0.5.16, isso inclui o seguinte:

| Variável de Ambiente do Open-WebUI | Valor |
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

## Etapa 3: Testar a Conexão

Para começar, vamos confirmar o que há em nosso diretório do Jupyter. Como você pode ver na imagem abaixo, temos apenas uma pasta vazia chamada `work`.

![Configuração de Execução de Código](/images/tutorials/jupyter/jupyter-empty.png)

### Criar um CSV

Vamos executar nosso primeiro prompt. Certifique-se de que você selecionou o botão `Execução de Código`.

```
Prompt: Crie dois arquivos CSV usando dados fictícios. O primeiro CSV deve ser criado usando python puro e o segundo CSV deve ser criado usando a biblioteca pandas. Nomeie os CSVs como data1.csv e data2.csv
```

![Configuração de Execução de Código](/images/tutorials/jupyter/jupyter-create-csv.png)

Podemos ver que os arquivos CSV foram criados e agora estão acessíveis no Jupyter.

![Configuração de Execução de Código](/images/tutorials/jupyter/jupyter-view-csv.png)

### Criar uma Visualização

Vamos executar nosso segundo prompt. Novamente, certifique-se de que você selecionou o botão `Execução de Código`.

```
Prompt: Crie várias visualizações em python usando matplotlib e seaborn e salve-as no Jupyter
```

![Configuração de Execução de Código](/images/tutorials/jupyter/jupyter-create-viz.png)

Podemos ver que as visualizações foram criadas e agora estão acessíveis no Jupyter.

![Configuração de Execução de Código](/images/tutorials/jupyter/jupyter-view-viz.png)

### Criar um Notebook

Vamos executar nosso último prompt juntos. Neste prompt, vamos criar um notebook completamente novo usando apenas um prompt.

```
Prompt: Escreva código python para ler e escrever arquivos json e salve-o no meu notebook chamado notebook.ipynb
```

![Configuração de Execução de Código](/images/tutorials/jupyter/jupyter-create-notebook.png)

Podemos ver que as visualizações foram criadas e agora estão acessíveis no Jupyter.

![Configuração de Execução de Código](/images/tutorials/jupyter/jupyter-view-notebook.png)

## Nota sobre o fluxo de trabalho

Ao testar este recurso, percebi várias vezes que o Open-WebUI não salvava automaticamente o código ou a saída gerada dentro do Open-WebUI na minha instância do Jupyter. Para forçar a saída do arquivo/item que criei, muitas vezes segui este fluxo de trabalho de duas etapas, que primeiro cria o artefato de código que quero e depois pede para salvá-lo na minha instância do Jupyter.

![Configuração de Execução de Código](/images/tutorials/jupyter/jupyter-workflow.png)

## Como você está usando este recurso?

Você está usando o recurso de Execução de Código e/ou Jupyter? Se sim, entre em contato. Adoraria saber como você está usando isso para continuar adicionando exemplos a este tutorial de outras maneiras incríveis de usar este recurso!
