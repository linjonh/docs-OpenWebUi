---
sidebar_position: 4000
title: "🪶 Extração do Apache Tika"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

## 🪶 Extração do Apache Tika

Esta documentação fornece um guia passo a passo para integrar o Apache Tika com o Open WebUI. Apache Tika é uma ferramenta de análise de conteúdo que pode ser usada para detectar e extrair metadados e conteúdo de texto de mais de mil tipos diferentes de arquivos. Todos esses tipos de arquivos podem ser analisados por meio de uma única interface, tornando o Tika útil para indexação de mecanismos de busca, análise de conteúdo, tradução e muito mais.

Pré-requisitos
------------

* Instância do Open WebUI
* Docker instalado no seu sistema
* Rede Docker configurada para o Open WebUI

Passos de Integração
----------------

### Passo 1: Crie um arquivo Docker Compose ou execute o comando Docker para o Apache Tika

Você tem duas opções para executar o Apache Tika:

**Opção 1: Usando Docker Compose**

Crie um novo arquivo chamado `docker-compose.yml` no mesmo diretório que a instância do Open WebUI. Adicione a seguinte configuração ao arquivo:

```yml
services:
  tika:
    image: apache/tika:latest-full
    container_name: tika
    ports:
      - "9998:9998"
    restart: unless-stopped
```

Execute o arquivo Docker Compose usando o seguinte comando:

```bash
docker-compose up -d
```

**Opção 2: Usando o Comando Docker Run**

Como alternativa, você pode executar o Apache Tika usando o seguinte comando Docker:

```bash
docker run -d --name tika \
  -p 9998:9998 \
  --restart unless-stopped \
  apache/tika:latest-full
```

Observe que, se optar por usar o comando Docker run, você precisa especificar a flag `--network` se quiser executar o contêiner na mesma rede que a instância do Open WebUI.

### Passo 2: Configurar o Open WebUI para usar o Apache Tika

Para usar o Apache Tika como o mecanismo de extração de contexto no Open WebUI, siga estes passos:

* Faça login na sua instância do Open WebUI.
* Navegue até o menu de configurações do `Painel de Administração`.
* Clique em `Configurações`.
* Clique na aba `Documentos`.
* Altere o menu suspenso do mecanismo de extração de conteúdo `Padrão` para `Tika`.
* Atualize a URL do mecanismo de extração de contexto para `http://tika:9998`.
* Salve as alterações.

 Verificando o Apache Tika no Docker
=====================================

Para verificar se o Apache Tika está funcionando corretamente em um ambiente Docker, você pode seguir estes passos:

### 1. Inicie o contêiner Docker do Apache Tika

Primeiro, certifique-se de que o contêiner Docker do Apache Tika está em execução. Você pode iniciá-lo usando o seguinte comando:

```bash
docker run -p 9998:9998 apache/tika
```

Este comando iniciará o contêiner do Apache Tika e mapeará a porta 9998 do contêiner para a porta 9998 na sua máquina local.

### 2. Verifique se o servidor está em execução

Você pode verificar se o servidor do Apache Tika está em execução enviando uma solicitação GET:

```bash
curl -X GET http://localhost:9998/tika
```

Este comando deve retornar a seguinte resposta:

```
This is Tika Server. Please PUT
```

### 3. Verifique a Integração

Como alternativa, você também pode tentar enviar um arquivo para análise para testar a integração. Você pode testar o Apache Tika enviando um arquivo para análise usando o comando `curl`:

```bash
curl -T test.txt http://localhost:9998/tika
```

Substitua `test.txt` pelo caminho de um arquivo de texto na sua máquina local.

O Apache Tika responderá com os metadados detectados e o tipo de conteúdo do arquivo.

### Usando um Script para Verificar o Apache Tika

Se você quiser automatizar o processo de verificação, este script envia um arquivo para o Apache Tika e verifica a resposta em busca dos metadados esperados. Se os metadados estiverem presentes, o script exibirá uma mensagem de sucesso juntamente com os metadados do arquivo; caso contrário, exibirá uma mensagem de erro e a resposta do Apache Tika.

```python
import requests

def verify_tika(file_path, tika_url):
    try:
        # Envie o arquivo para o Apache Tika e verifique a saída
        response = requests.put(tika_url, files={file: open(file_path, rb)})

        if response.status_code == 200:
            print("O Apache Tika analisou o arquivo com sucesso.")
            print("Resposta do Apache Tika:")
            print(response.text)
        else:
            print("Erro ao analisar o arquivo:")
            print(f"Código de status: {response.status_code}")
            print(f"Resposta do Apache Tika: {response.text}")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

if __name__ == "__main__":
    file_path = "test.txt"  # Substitua pelo caminho do seu arquivo
    tika_url = "http://localhost:9998/tika"

    verify_tika(file_path, tika_url)
```

Instruções para executar o script:

### Pré-requisitos

* Python 3.x deve estar instalado no seu sistema
* A biblioteca `requests` deve estar instalada (você pode instalá-la usando pip: `pip install requests`)
* O contêiner Docker do Apache Tika deve estar em execução (use o comando `docker run -p 9998:9998 apache/tika`)
* Substitua `"test.txt"` pelo caminho do arquivo que você deseja enviar para o Apache Tika

### Executando o Script

1. Salve o script como `verify_tika.py` (por exemplo, usando um editor de texto como Notepad ou Sublime Text)
2. Abra um terminal ou prompt de comando
3. Navegue até o diretório onde você salvou o script (usando o comando `cd`)
4. Execute o script usando o seguinte comando: `python verify_tika.py`
5. O script exibirá uma mensagem indicando se o Apache Tika está funcionando corretamente

Nota: Se você encontrar problemas, certifique-se de que o contêiner do Apache Tika está em execução corretamente e que o arquivo está sendo enviado para a URL correta.

### Conclusão

Ao seguir essas etapas, você pode verificar se o Apache Tika está funcionando corretamente em um ambiente Docker. Você pode testar a configuração enviando um arquivo para análise, verificando se o servidor está em execução com uma solicitação GET ou usando um script para automatizar o processo. Se encontrar problemas, certifique-se de que o contêiner do Apache Tika está em execução corretamente e que o arquivo está sendo enviado para a URL correta.

Solução de Problemas
--------------------

* Certifique-se de que o serviço Apache Tika está em execução e acessível a partir da instância Open WebUI.
* Verifique os logs do Docker para quaisquer erros ou problemas relacionados ao serviço Apache Tika.
* Verifique se a URL do motor de extração de contexto está configurada corretamente no Open WebUI.

Benefícios da Integração
-----------------------

A integração do Apache Tika com o Open WebUI oferece vários benefícios, incluindo:

* **Melhoria na Extração de Metadados**: As avançadas capacidades de extração de metadados do Apache Tika podem ajudá-lo a extrair dados precisos e relevantes dos seus arquivos.
* **Suporte para Múltiplos Formatos de Arquivo**: O Apache Tika suporta uma ampla gama de formatos de arquivo, tornando-o uma solução ideal para organizações que trabalham com tipos de arquivos variados.
* **Análise de Conteúdo Aprimorada**: As avançadas capacidades de análise de conteúdo do Apache Tika podem ajudá-lo a extrair insights valiosos de seus arquivos.

Conclusão
---------

Integrar o Apache Tika ao Open WebUI é um processo simples que pode melhorar as capacidades de extração de metadados da sua instância Open WebUI. Ao seguir os passos descritos nesta documentação, você pode configurar facilmente o Apache Tika como um motor de extração de contexto para o Open WebUI.
