---
sidebar_position: 17
title: "🪝 Integrações de Webhook"
---

Visão Geral
--------

O Open WebUI fornece um recurso de webhook que permite receber notificações automaticamente sempre que novos usuários se inscrevem em sua instância. Isso é feito fornecendo uma URL de webhook para o Open WebUI, que enviará notificações para essa URL quando uma nova conta de usuário for criada.

Configurando Webhooks no Open WebUI
---------------------------------

Você precisará obter uma URL de webhook de um serviço externo que suporte webhooks, como um canal do Discord ou um workspace do Slack. Essa URL será usada para receber notificações do Open WebUI.

Para configurar webhooks no Open WebUI, você tem duas opções:

### Opção 1: Configurar através da Interface Administrativa

1. Faça login em sua instância do Open WebUI como administrador.
2. Navegue até o `Painel de Administração`.
3. Clique na aba `Configurações` localizada no topo.
4. A partir daí, vá até a seção `Geral` dentro das configurações no painel de administração.
5. Localize o campo `URL do Webhook` e insira a URL do webhook.
6. Salve as alterações.

### Opção 2: Configurar através de Variáveis de Ambiente

Alternativamente, você pode configurar a URL do webhook estabelecendo a variável de ambiente `WEBHOOK_URL`. Para mais informações sobre variáveis de ambiente no Open WebUI, veja [Configuração de Variáveis de Ambiente](https://docs.openwebui.com/getting-started/env-configuration/#webhook_url).

### Etapa 3: Verificar o Webhook

Para verificar se o webhook está funcionando corretamente, crie uma nova conta de usuário no Open WebUI. Se o webhook estiver configurado corretamente, você deverá receber uma notificação na URL do webhook especificada.

Formato do Payload de Webhook
----------------------

O payload enviado pelo Open WebUI é em texto simples e contém uma mensagem de notificação simples sobre a nova conta de usuário. O formato do payload é o seguinte:

```
Novo usuário registrado: <nome_usuario>
```

Por exemplo, se um usuário chamado "Tim" se registrar, o payload enviado será:

```
Novo usuário registrado: Tim
```

Solução de Problemas
--------------

* Certifique-se de que a URL do webhook está correta e formatada adequadamente.
* Verifique se o serviço de webhook está habilitado e configurado corretamente.
* Confira os logs do Open WebUI em busca de erros relacionados ao webhook.
* Verifique se a conexão não foi interrompida ou bloqueada por um firewall ou proxy.
* O servidor do webhook pode estar temporariamente indisponível ou enfrentando alta latência.
* Se fornecido através do serviço de webhook, verifique se a chave de API do Webhook é inválida, expirada ou revogada.

Nota: O recurso de webhook no Open WebUI ainda está evoluindo e planejamos adicionar mais funcionalidades e tipos de eventos no futuro.
