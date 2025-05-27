---
sidebar_position: 3
title: "🔑 Funções"
---

Open WebUI implementa um sistema estruturado de controle de acesso baseado em funções com três funções principais de usuário:

| **Função**      | **Descrição**                                      | **Criação Padrão**               |
|-----------------|---------------------------------------------------|----------------------------------|
| Administrador   | Administrador do sistema com controle total       | Primeira conta de usuário        |
| Usuário Regular | Usuário padrão com permissões limitadas           | Usuários aprovados subsequentes  |
| Pendente        | Usuário não aprovado aguardando ativação do administrador | Novos registros (configurável) |

### Designação de Funções

* **Primeiro Usuário:** A primeira conta criada em uma nova instância do Open WebUI recebe automaticamente privilégios de Administrador.

* **Usuários Subsequentes:** Novos registros de usuário recebem uma função padrão com base na configuração `DEFAULT_USER_ROLE`.

A função padrão para novos registros pode ser configurada usando a variável de ambiente `DEFAULT_USER_ROLE`:

```.dotenv
DEFAULT_USER_ROLE=pending  # Opções: pending, user, admin
```

Quando definida como "pending" (pendente), novos usuários devem ser aprovados manualmente por um administrador antes de obter acesso ao sistema.

## Grupos de Usuário

Os grupos permitem aos administradores:
* atribuir permissões a vários usuários de uma vez, simplificando a gestão de acesso
* limitar o acesso a recursos específicos (Modelos, Ferramentas, etc.) definindo seu acesso como "privado" e depois liberando o acesso para grupos específicos
* O acesso do grupo a um recurso pode ser configurado como "leitura" ou "escrita"

### Estrutura de Grupo

Cada grupo no Open WebUI contém:

* Um identificador único
* Nome e descrição
* Referência do proprietário/criador
* Lista de IDs de usuários membros
* Configuração de permissões
* Metadados adicionais

### Gerenciamento de Grupos

Os grupos podem ser:

* **Criados manualmente** pelos administradores por meio da interface de usuário
* **Sincronizados automaticamente** de provedores OAuth quando `ENABLE_OAUTH_GROUP_MANAGEMENT` estiver habilitado
* **Criados automaticamente** a partir de declarações OAuth quando ambos `ENABLE_OAUTH_GROUP_MANAGEMENT` e `ENABLE_OAUTH_GROUP_CREATION` estiverem habilitados

### Integração com Grupos OAuth

Quando o gerenciamento de grupos OAuth está habilitado, as associações de grupo de usuários são sincronizadas com os grupos recebidos nas declarações OAuth:

* Os usuários são adicionados aos grupos do Open WebUI que correspondem às suas declarações OAuth
* Os usuários são removidos dos grupos que não estão presentes em suas declarações OAuth
* Com `ENABLE_OAUTH_GROUP_CREATION` habilitado, grupos das declarações OAuth que não existem no Open WebUI são criados automaticamente
