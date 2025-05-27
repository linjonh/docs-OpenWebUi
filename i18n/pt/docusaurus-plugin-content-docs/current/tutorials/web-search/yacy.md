---
sidebar_position: 16
title: "Yacy"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

## API do Yacy

### Configuração

1. Navegue para: `Painel Administrativo` -> `Configurações` -> `Pesquisa na Web`
2. Ative `Habilitar Pesquisa na Web`
3. Defina `Motor de Pesquisa na Web` no menu suspenso como `yacy`
4. Defina `URL da Instância Yacy` para um dos seguintes exemplos:

    * `http://yacy:8090` (usando o nome do contêiner e porta exposta, adequado para configurações baseadas em Docker)
    * `http://host.docker.internal:8090` (usando o nome DNS `host.docker.internal` e a porta do host, adequado para configurações baseadas em Docker)
    * `https://<yacy.local>:8443` (usando um nome de domínio local, adequado para acesso à rede local)
    * `https://yacy.example.com` (usando um nome de domínio personalizado para uma instância Yacy auto-hospedada, adequado para acesso público ou privado)
    * `https://yacy.example.com:8443` (usando https na porta padrão https do Yacy)

5. Opcionalmente, insira seu nome de usuário e senha Yacy caso a autenticação seja necessária para sua instância Yacy. Se ambos forem deixados em branco, a autenticação digest será ignorada.
6. Pressione salvar

![Painel Administrativo do Open WebUI mostrando a configuração do Yacy](/images/tutorial_yacy.png)
