---
sidebar_position: 4
title: "⚙️ Parâmetros do Chat"
---

No Open WebUI, existem três níveis para configurar um **Prompt do Sistema** e **Parâmetros Avançados**: por chat, por modelo e por conta. Esse sistema hierárquico permite flexibilidade enquanto mantém uma administração estruturada e controle.

## Diagrama de Hierarquia de Prompt do Sistema e Parâmetros Avançados

| **Nível** | **Definição** | **Permissões de Modificação** | **Capacidades de Substituição** |
| --- | --- | --- | --- |
| **Por Chat** | Prompt do sistema e parâmetros avançados para uma instância de chat específica | Usuários podem modificar, mas não podem substituir configurações específicas do modelo | Restringido de substituir configurações específicas do modelo |
| **Por Conta** | Prompt do sistema padrão e parâmetros avançados para uma conta de usuário específica | Usuários podem configurar, mas podem ser substituídos por configurações específicas do modelo | Configurações do usuário podem ser substituídas por configurações específicas do modelo |
| **Por Modelo** | Prompt do sistema padrão e parâmetros avançados para um modelo específico | Administradores podem configurar, Usuários não podem modificar | Configurações específicas do Admin têm precedência, Configurações dos Usuários podem ser substituídas |

### 1. **Por chat:**

- **Descrição**: A configuração por chat refere-se ao prompt do sistema e parâmetros avançados configurados para uma instância de chat específica. Essas configurações são aplicáveis apenas à conversa atual e não afetam futuros chats.
- **Como configurar**: Usuários podem modificar o prompt do sistema e parâmetros avançados para uma instância de chat específica na seção **Controles de Chat** na barra lateral direita do Open WebUI.
- **Capacidades de substituição**: Usuários estão restritos de substituir o **Prompt do Sistema** ou **Parâmetros Avançados** específicos já configurados por um administrador com base no modelo (**#2**). Isso garante consistência e adesão às configurações específicas do modelo.

<details>
<summary>Exemplo de Caso de Uso</summary>
:::tip **Por chat:**
Suponha que um usuário queira configurar um prompt do sistema personalizado para uma conversa específica. Ele pode fazer isso acessando a seção **Controles de Chat** e modificando o campo **Prompt do Sistema**. Essas alterações serão aplicadas apenas à sessão de chat atual.
:::
</details>

### 2. **Por conta:**

- **Descrição**: A configuração por conta refere-se ao prompt do sistema padrão e parâmetros avançados configurados para uma conta de usuário específica. Quaisquer alterações específicas do usuário podem servir como fallback em situações onde configurações de nível inferior não estão definidas.
- **Como configurar**: Usuários podem configurar seu próprio prompt do sistema e parâmetros avançados para sua conta na seção **Geral** do menu **Configurações** no Open WebUI.
- **Capacidades de substituição**: Usuários têm a capacidade de definir seu próprio prompt do sistema em sua conta, mas devem estar cientes de que esses parâmetros podem ser substituídos se um administrador já tiver configurado o **Prompt do Sistema** ou **Parâmetros Avançados** específicos por modelo para o modelo em uso.

<details>
<summary>Exemplo de Caso de Uso</summary>
:::tip **Por conta:**
Suponha que um usuário queira configurar seu próprio prompt do sistema para sua conta. Ele pode fazer isso acessando o menu **Configurações** e modificando o campo **Prompt do Sistema**.
:::
</details>

### 3. **Por modelo:**

- **Descrição**: A configuração por modelo refere-se ao prompt do sistema padrão e parâmetros avançados configurados para um modelo específico. Essas configurações são aplicáveis a todas as instâncias de chat que utilizam esse modelo.
- **Como configurar**: Administradores podem configurar o prompt do sistema padrão e parâmetros avançados para um modelo específico na seção **Modelos** do **Workspace** no Open WebUI.
- **Capacidades de substituição**: Contas de **Usuário** estão restritas de modificar o **Prompt do Sistema** ou **Parâmetros Avançados** específicos por modelo (**#3**). Essa restrição previne que usuários alterem inadequadamente as configurações padrão.
- **Preservação do comprimento do contexto:** Quando o **Prompt do Sistema** ou **Parâmetros Avançados** específicos de um modelo são configurados manualmente na seção **Workspace** por um Admin, tal **Prompt do Sistema** ou **Parâmetros Avançados** configurados manualmente não podem ser substituídos ou ajustados em nível de conta ou chat na seção **Geral** ou **Controles de Chat** por uma conta de **Usuário**. Isso garante consistência e previne o recarregamento excessivo do modelo sempre que a configuração de comprimento do contexto de um usuário for alterada.
- **Precedência do modelo:** Se o **Prompt do Sistema** ou valor de **Parâmetros Avançados** de um modelo for pré-configurado na seção Workspace por um Admin, quaisquer alterações de comprimento de contexto feitas por uma conta de **Usuário** na seção **Geral** ou **Controles de Chat** serão desconsideradas, mantendo o valor pré-configurado para aquele modelo. Aviso que os parâmetros não tocados por uma conta de **Admin** ainda podem ser ajustados manualmente por uma conta de **Usuário** em nível de conta ou chat.

<details>
<summary>Exemplo de Caso de Uso</summary>
:::tip **Por modelo**:
Suponha que um administrador queira definir um prompt de sistema padrão para um modelo específico. Ele pode fazer isso acessando a seção **Modelos** e modificando o campo **Prompt de Sistema** para o modelo correspondente. Qualquer instância de chat que utilize este modelo usará automaticamente o prompt de sistema e os parâmetros avançados do modelo.
:::
</details>


## **Otimize as Configurações de Prompt de Sistema para Máxima Flexibilidade**

:::tip **Dicas Extras**
**Esta dica se aplica tanto a administradores quanto a contas de usuários. Para alcançar a máxima flexibilidade com os seus prompts de sistema, recomendamos considerar a seguinte configuração:**

- Atribua o seu Prompt de Sistema primário (**ou seja, para dar ao LLM um caráter definidor**) que deseja utilizar no campo **Prompt de Sistema** das configurações **Gerais**. Isso o configura em nível de conta e permite que funcione como o prompt de sistema para todos os seus LLMs sem exigir ajustes dentro de um modelo na seção de **Workspace**.

- Para o seu Prompt de Sistema secundário (**ou seja, para dar ao LLM uma tarefa a realizar**), escolha se deseja colocá-lo no campo **Prompt de Sistema** dentro da barra lateral **Controles de Chat** (baseado em cada chat) ou na seção **Modelos** da seção **Workspace** (baseado em cada modelo) para Administradores, permitindo configurá-los diretamente. Isso permite que o prompt de sistema em nível de conta funcione em conjunto com o prompt de sistema em nível de chat fornecido pelos **Controles de Chat**, ou com o prompt de sistema em nível de modelo fornecido por **Modelos**.

- Como administrador, você deve atribuir seus parâmetros de LLM em nível de modelo utilizando a seção **Modelos** para máxima flexibilidade. Para ambos os Prompts de Sistema secundários, certifique-se de configurá-los de uma maneira que maximize a flexibilidade e minimize os ajustes necessários em diferentes instâncias de conta ou chat. É essencial que tanto sua conta de Admin quanto todas as contas de Usuário entendam a ordem de prioridade pela qual os prompts de sistema dentro dos **Controles de Chat** e da seção **Modelos** serão aplicados ao **LLM**.
:::
