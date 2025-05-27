---
sidebar_position: 3
title: "🔐 Grupos"
---

Os grupos permitem que os administradores
* atribuam permissões a múltiplos usuários de uma vez, simplificando o gerenciamento de acesso
* restrinjam o acesso a recursos específicos (Modelos, Ferramentas, etc.) definindo o acesso como "privado" e depois abrindo o acesso para grupos específicos
* Especificar o acesso de um grupo a um recurso como "leitura" ou "escrita" (acesso de escrita implica leitura)

:::info
Observe que o modelo de permissões é permissivo. Se um usuário for membro de dois grupos que definem permissões diferentes para um recurso, a permissão mais permissiva será aplicada.
:::

### Estrutura do Grupo

Cada grupo no Open WebUI contém:

* Um identificador único
* Nome e descrição
* Referência do proprietário/criador
* Lista de IDs de usuários membros
* Configuração de permissões
* Metadados adicionais

### Gestão de Grupos

Os grupos podem ser:

* **Criados manualmente** pelos administradores através da interface do usuário
* **Sincronizados automaticamente** a partir de provedores OAuth quando `ENABLE_OAUTH_GROUP_MANAGEMENT` está habilitado
* **Criados automaticamente** a partir de reivindicações OAuth quando `ENABLE_OAUTH_GROUP_MANAGEMENT` e `ENABLE_OAUTH_GROUP_CREATION`
  estão habilitados

### Integração de Grupos OAuth

Quando o gerenciamento de grupos OAuth está habilitado, as associações de usuários a grupos são sincronizadas com os grupos recebidos nas reivindicações OAuth:

* Os usuários são adicionados a grupos no Open WebUI que correspondem às suas reivindicações OAuth
* Os usuários são removidos de grupos que não estão presentes em suas reivindicações OAuth
* Com `ENABLE_OAUTH_GROUP_CREATION` habilitado, grupos das reivindicações OAuth que não existem no Open WebUI são automaticamente
  criados

## Permissões de Grupos

Os grupos podem ser usados para disponibilizar conjuntos de permissões aos usuários. Por exemplo, um grupo poderia ser criado para "Cientistas de Dados" que tenha acesso de leitura e escrita a todos os modelos, bases de conhecimento e ferramentas.

## Controle de Acesso a Recursos para Grupos

O Open WebUI implementa um controle de acesso granular para recursos como modelos, bases de conhecimento, prompts e ferramentas. O acesso pode
ser controlado tanto no nível do usuário quanto do grupo.

Para ativar o controle de acesso a um recurso, defina seu acesso como "privado" e então abra o acesso a grupos específicos.

### Estrutura de Controle de Acesso

Recursos como bases de conhecimento usam uma estrutura de controle de acesso que especifica permissões de leitura e escrita para usuários
e grupos:

```json
{
  "read": {
    "group_ids": ["group_id1", "group_id2"],
    "user_ids": ["user_id1", "user_id2"]
  },
  "write": {
    "group_ids": ["group_id1", "group_id2"],
    "user_ids": ["user_id1", "user_id2"]
  }
}
```

Essa estrutura permite controle preciso sobre quem pode visualizar e modificar recursos específicos.
