---
sidebar_position: 4
title: "🗨️ Compartilhamento de Chat"
---

### Ativando Compartilhamento Comunitário

Para ativar o compartilhamento comunitário, siga estas etapas:

1. Acesse a página **Painel Administrativo** como **Admin**.
2. Clique na guia **Configurações**.
3. Ative a opção **Ativar Compartilhamento Comunitário** na guia de configurações **Geral**.

:::note
**Observação:** Apenas administradores podem ativar a opção **Ativar Compartilhamento Comunitário**. Se esta opção estiver desativada, os usuários e administradores não verão a opção **Compartilhar na Comunidade Open WebUI** para compartilhar seus chats. O compartilhamento comunitário deve ser ativado por um administrador para que os usuários compartilhem chats na comunidade Open WebUI.
:::

Isso ativará o compartilhamento comunitário para todos os usuários na instância Open WebUI.

### Compartilhando Chats

Para compartilhar um chat:

1. Selecione a conversa de chat que deseja compartilhar.
2. Clique nos 3 pontos que aparecem ao passar o cursor sobre o chat desejado.
3. Em seguida, clique na opção **Compartilhar**.
4. Selecione **Compartilhar na Comunidade Open WebUI** (se **Ativar Compartilhamento Comunitário** estiver ativado por um **Admin**) ou **Copiar Link**.

#### Compartilhando na Comunidade Open WebUI

Quando você seleciona `Compartilhar na Comunidade Open WebUI`:

* Uma nova aba será aberta, permitindo que você carregue seu chat como um instantâneo no site da comunidade Open WebUI (https://openwebui.com/chats/upload).
* Você pode controlar quem pode visualizar seu chat carregado escolhendo uma das seguintes configurações de acesso:
  * **Privado**: Apenas você pode acessar este chat.
  * **Público**: Qualquer pessoa na internet pode visualizar as mensagens exibidas no instantâneo do chat.
  * **Público, Histórico Completo**: Qualquer pessoa na internet pode visualizar o histórico completo de regeneração do seu chat.

:::note
Observação: Você pode alterar o nível de permissão de seus chats compartilhados na plataforma comunitária a qualquer momento através de sua conta no openwebui.com.

**Atualmente, chats compartilhados no site da comunidade não podem ser encontrados através de pesquisa. No entanto, atualizações futuras estão planejadas para permitir que chats públicos sejam descobertos pelo público, se sua permissão estiver configurada como `Público` ou `Público, Histórico Completo`.**
:::

Exemplo de um chat compartilhado na plataforma comunitária: https://openwebui.com/c/iamg30/5e3c569f-905e-4d68-a96d-8a99cc65c90f

#### Copiando um Link de Compartilhamento

Quando você seleciona `Copiar Link`, um link de compartilhamento único é gerado, que pode ser compartilhado com outras pessoas.

**Considerações Importantes:**

* O chat compartilhado incluirá apenas mensagens que existiam no momento em que o link foi criado. Quaisquer novas mensagens enviadas dentro do chat após a geração do link não serão incluídas, a menos que o link seja excluído e atualizado com um novo link.
* O link de compartilhamento gerado atua como um instantâneo estático do chat no momento em que o link foi gerado.
* Para visualizar o chat compartilhado, os usuários devem:
  1. Ter uma conta na instância Open WebUI onde o link foi gerado.
  2. Estar logados em sua conta nessa instância.
* Se um usuário tentar acessar o link compartilhado sem estar logado, será redirecionado para a página de login antes de poder visualizar o chat compartilhado.

### Visualizando Chats Compartilhados

Para visualizar um chat compartilhado:

1. Certifique-se de estar logado em uma conta na instância Open WebUI onde o chat foi compartilhado.
2. Clique no link compartilhado que foi fornecido a você.
3. O chat será exibido em um formato somente leitura.
4. Se o administrador da instância Open WebUI de onde o link compartilhado foi gerado tiver a funcionalidade Texto-para-Fala ativada, pode haver um botão de áudio para que as mensagens sejam lidas para você (situacional).

### Atualizando Chats Compartilhados

Para atualizar um chat compartilhado:

1. Selecione a conversa de chat que deseja compartilhar.
2. Clique nos 3 pontos que aparecem ao passar o cursor sobre o chat desejado.
3. Clique na opção **Compartilhar**.
4. O Modal **Compartilhar Chat** deve parecer diferente se você já compartilhou um chat anteriormente.

O Modal **Compartilhar Chat** inclui as seguintes opções:

* **antes**: Abre uma nova aba para visualizar o chat compartilhado anteriormente a partir do link de compartilhamento.
* **excluir este link**: Exclui o link compartilhado do chat e apresenta o modal inicial de compartilhamento de chat.
* **Compartilhar na Comunidade Open WebUI**: Abre uma nova aba para https://openwebui.com/chats/upload com o chat pronto para ser compartilhado como um instantâneo.
* **Atualizar e Copiar Link**: Atualiza o instantâneo do chat do link compartilhado anteriormente e o copia para a área de transferência do seu dispositivo.

### Excluindo Chats Compartilhados

Para excluir um link de chat compartilhado:

1. Selecione a conversa de chat para a qual você deseja excluir o link compartilhado.
2. Clique nos 3 pontos que aparecem ao passar o cursor sobre o chat desejado.
3. Clique na opção **Compartilhar**.
4. O Modal **Compartilhar Chat** deve parecer diferente se você já compartilhou um chat anteriormente.
5. Clique em **excluir este link**.

Depois de excluído, o link compartilhado não será mais válido, e os usuários não poderão visualizar o chat compartilhado.

:::note
**Observação:** Chats compartilhados na plataforma comunitária não podem ser excluídos. Para alterar o nível de acesso de um chat compartilhado na plataforma comunitária:
:::

1. Faça login na sua conta Open WebUI em openwebui.com.
2. Clique no nome de usuário da sua conta no canto superior direito do site.
3. Clique em **Chats**.
4. Clique no chat para o qual deseja alterar o acesso de permissão.
5. Role até o final do chat e atualize seu nível de permissão.
6. Clique no botão **Atualizar Chat**.
