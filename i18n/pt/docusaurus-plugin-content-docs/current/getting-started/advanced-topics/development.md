---
sidebar_position: 5
title: "🛠️ Guia de Desenvolvimento Local"
---

# Pronto para Contribuir com Open WebUI? Vamos Começar! 🚀

Animado para mergulhar no desenvolvimento do Open WebUI? Este guia completo irá orientá-lo na configuração do seu **ambiente de desenvolvimento local** de forma rápida e fácil. Seja você um desenvolvedor experiente ou um iniciante, vamos prepará-lo para ajustar o frontend, aprimorar o backend e contribuir para o futuro do Open WebUI! Vamos configurar seu ambiente de desenvolvimento em etapas simples e detalhadas!

## Pré-requisitos

Antes de começar, certifique-se de que seu sistema atenda a esses requisitos mínimos:

- **Sistema Operacional:** Linux (ou WSL no Windows), Windows 11 ou macOS. *(Recomendado para melhor compatibilidade)*
- **Python:** Versão **3.11 ou superior**. *(Necessário para serviços de backend)*
- **Node.js:** Versão **22.10 ou superior**. *(Necessário para desenvolvimento de frontend)*
- **IDE (Recomendado):** Recomendamos o uso de uma IDE como [VSCode](https://code.visualstudio.com/) para edição de código, depuração e acesso ao terminal integrado. Sinta-se à vontade para usar sua IDE favorita, se tiver uma!
- **[Opcional] GitHub Desktop:** Para facilitar o gerenciamento do repositório Git, especialmente se você não estiver familiarizado com o Git na linha de comando, considere instalar o [GitHub Desktop](https://desktop.github.com/).

## Configurando Seu Ambiente Local

Vamos configurar tanto o frontend (interface do usuário) quanto o backend (API e lógica do servidor) do Open WebUI.

### 1. Clonar o Repositório

Primeiro, use `git clone` para baixar o repositório do Open WebUI para sua máquina local. Isso criará uma cópia local do projeto em seu computador.

1. **Abra seu terminal** (ou Git Bash, se você estiver no Windows e usando o Git Bash).
2. **Navegue para o diretório** onde deseja armazenar o projeto Open WebUI.
3. **Clone o repositório:** Execute o comando a seguir:

```bash
git clone https://github.com/open-webui/open-webui.git
cd open-webui
```

   O comando `git clone` baixa os arquivos do projeto do GitHub. O comando `cd open-webui` então navega para o diretório do projeto criado.

### 2. Configuração do Frontend (Interface do Usuário)

Vamos configurar primeiro a interface do usuário (o que você vê no navegador):

1. **Configurar Variáveis de Ambiente:**
   - Copie o arquivo de exemplo de ambiente para `.env`:

     ```bash
     cp -RPp .env.example .env
     ```

     Este comando copia o arquivo `.env.example` para um novo arquivo chamado `.env`. O arquivo `.env` é onde você configurará variáveis de ambiente para o frontend.

   - **Personalize o `.env`**: Abra o arquivo `.env` em seu editor de código (como o VSCode). Este arquivo contém variáveis de configuração para o frontend, como endpoints de API e outras configurações. Para o desenvolvimento local, as configurações padrão em `.env.example` geralmente são suficientes para começar. No entanto, você pode personalizá-las se necessário.

  **Importante:** Não faça commit de informações sensíveis no arquivo `.env` se estiver contribuindo de volta para o repositório.

1. **Instalar Dependências do Frontend:**
   - **Navegue para o diretório raiz do projeto:** Se você ainda não estiver no diretório raiz do projeto (`open-webui`), certifique-se de estar lá.

     ```bash
     # Se você não estiver no diretório raiz do projeto, execute:
     cd open-webui
     ```

   - Instale os pacotes JavaScript necessários:

     ```bash
     npm install
     ```

     Este comando usa o `npm` (Gerenciador de Pacotes do Node) para ler o arquivo `package.json` no diretório raiz do projeto e baixar todas as bibliotecas JavaScript necessárias e ferramentas requeridas para o funcionamento do frontend. Isso pode levar alguns minutos, dependendo da sua conexão com a internet.

2. **Inicie o Servidor de Desenvolvimento do Frontend:**

     ```bash
     npm run dev
     ```

     Este comando inicia o servidor de desenvolvimento do frontend. Se os passos forem seguidos corretamente, geralmente será indicado que o servidor está em execução e fornecerá uma URL local.

     🎉 **Acesse o Frontend:** Abra seu navegador e vá para [http://localhost:5173](http://localhost:5173). Você deve ver uma mensagem indicando que o frontend do Open WebUI está em execução e aguardando que o backend esteja disponível. Não se preocupe com essa mensagem ainda! Vamos configurar o backend a seguir. **Mantenha este terminal em execução** – ele está servindo seu frontend!

### 3. Configuração do Backend (API e Servidor)

Para uma experiência de desenvolvimento mais suave, **recomendamos fortemente** usar instâncias de terminal separadas para seus processos de frontend e backend. Isso mantém seus fluxos de trabalho organizados e facilita o gerenciamento de cada parte do aplicativo de forma independente.

**Por que Terminais Separados?**

- **Isolamento de Processos:** Os servidores de desenvolvimento de frontend e backend são programas distintos. Executá-los em terminais separados garante que não interferirão um no outro e permite reinícios ou paradas independentes.
- **Logs e saídas mais claros:** Cada terminal exibirá os logs e saídas específicos para o frontend ou backend. Isso torna a depuração e o monitoramento muito mais fáceis, já que você não precisa filtrar logs entrelaçados.
- **Redução da desordem no terminal:** Misturar comandos de frontend e backend em um único terminal pode se tornar confuso. Terminais separados mantém seu histórico de comandos e processos ativos organizados.
- **Maior eficiência no fluxo de trabalho:** Você pode trabalhar em tarefas de frontend (como executar `npm run dev`) em um terminal e simultaneamente gerenciar tarefas de backend (como iniciar o servidor ou verificar logs) em outro, sem precisar alternar constantemente de contexto dentro de um único terminal.

**Usando terminais integrados do VSCode (recomendado):**

O recurso de terminal integrado do VSCode torna o gerenciamento de múltiplos terminais incrivelmente fácil. Aqui está como aproveitá-lo para separação de frontend e backend:

1. **Terminal Frontend (Provavelmente você já tem este):** Se você seguiu as etapas de configuração do Frontend, provavelmente já tem um terminal aberto no VSCode na raiz do projeto (diretório `open-webui`). É aqui que você executará seus comandos de frontend (`npm run dev`, etc.). Certifique-se de estar no diretório `open-webui` para as próximas etapas, se ainda não estiver.

2. **Terminal Backend (Abra um novo):**
   - No VSCode, vá até **Terminal > New Terminal** (ou use o atalho `Ctrl+Shift+` no Windows/Linux ou `Cmd+Shift+` no macOS). Isso abrirá um novo painel de terminal integrado.
   - **Navegue até o diretório `backend`:** Nesse *novo* terminal, use o comando `cd backend` para alterar o diretório para a pasta `backend` dentro do seu projeto. Isso garante que todos os comandos relacionados ao backend sejam executados no contexto correto.

   Agora você tem **duas instâncias de terminal separadas dentro do VSCode**: uma para o frontend (provavelmente no diretório `open-webui`) e outra especificamente para o backend (dentro do diretório `backend`). Você pode alternar facilmente entre esses terminais dentro do VSCode para gerenciar seus processos de frontend e backend de forma independente. Essa configuração é altamente recomendada para um fluxo de trabalho mais limpo e eficiente.

**Etapas de configuração do Backend (no seu terminal *backend*):**

1. **Navegue até o diretório Backend:** (Você já deve estar no diretório `backend` no seu *novo* terminal a partir da etapa anterior). Caso contrário, execute:

   ```bash
   cd backend
   ```

2. **Crie e ative um ambiente Conda (Recomendado):**
   - Recomendamos fortemente o uso do Conda para gerenciar dependências do Python e isolar o ambiente do seu projeto. Isso previne conflitos com outros projetos Python no seu sistema e garante que você tenha a versão correta do Python e as bibliotecas necessárias.

     ```bash
     conda create --name open-webui python=3.11
     conda activate open-webui
     ```

     - `conda create --name open-webui python=3.11`: Este comando cria um novo ambiente Conda chamado `open-webui` usando a versão 3.11 do Python. Se você escolher uma versão diferente do Python 3.11.x, não tem problema.
     - `conda activate open-webui`: Este comando ativa o ambiente Conda recém-criado. Uma vez ativado, o prompt do terminal geralmente mudará para indicar que você está no ambiente `open-webui` (por exemplo, pode mostrar `(open-webui)` no início da linha).
  
    **Certifique-se de ativar o ambiente no seu terminal backend antes de continuar.**

     *(Usar o Conda é opcional, mas fortemente recomendado para gerenciar dependências do Python e evitar conflitos.)* Se você optar por não usar o Conda, certifique-se de estar usando o Python 3.11 ou superior e prossiga para a próxima etapa, mas esteja ciente de possíveis conflitos de dependência.

1. **Instale as dependências do Backend:**
     - No seu terminal *backend* (e com o ambiente Conda ativado, se você estiver usando o Conda), execute:

     ```bash
     pip install -r requirements.txt -U
     ```

     Este comando usa o `pip` (Instalador de Pacotes Python) para ler o arquivo `requirements.txt` no diretório `backend`. O `requirements.txt` lista todas as bibliotecas Python necessárias para o backend funcionar. O `pip install` baixa e instala essas bibliotecas no seu ambiente Python ativo (seu ambiente Conda, se você estiver usando, ou seu ambiente Python global, caso contrário). O parâmetro `-U` garante que você obtenha as versões mais compatíveis das bibliotecas.

2. **Inicie o servidor de desenvolvimento do Backend:**
     - No seu terminal *backend*, execute:

     ```bash
     sh dev.sh
     ```

     Este comando executa o script `dev.sh`. Este script provavelmente contém o comando para iniciar o servidor de desenvolvimento do backend. *(Você pode abrir e examinar o arquivo `dev.sh` no seu editor de código para ver exatamente o que está sendo executado, se estiver curioso.)* O servidor backend normalmente será iniciado e exibirá algumas saídas no terminal.

     📄 **Explore a Documentação da API:** Uma vez que o backend esteja em execução, você pode acessar a documentação da API automaticamente gerada no seu navegador da web em [http://localhost:8080/docs](http://localhost:8080/docs). Esta documentação é extremamente valiosa para entender os endpoints da API do backend, como interagir com o backend e quais dados ele espera e retorna. Mantenha esta documentação à disposição enquanto você desenvolve!

🎉 **Parabéns!** Se você seguiu todos os passos, agora deve ter os servidores de desenvolvimento do frontend e backend rodando localmente. Volte para a aba do navegador onde você acessou o frontend (geralmente [http://localhost:5173](http://localhost:5173)). **Atualize a página.** Agora você deve ver o aplicativo completo Open WebUI rodando no navegador, conectado ao backend local!

## Solução de Problemas Comuns

Aqui estão soluções para alguns problemas comuns que você pode encontrar durante a configuração ou desenvolvimento:

### 💥 "ERRO FATAL: Limite de Heap Atingido" (Frontend)

Este erro, frequentemente visto durante o desenvolvimento do frontend, indica que o Node.js está ficando sem memória durante o processo de build, especialmente ao trabalhar com grandes aplicativos frontend.

**Solução:** Aumente o tamanho do heap do Node.js. Isso dá mais memória para o Node.js trabalhar. Você tem algumas opções:

1. **Usando a Variável de Ambiente `NODE_OPTIONS` (Recomendado para Desenvolvimento):**
   - Esta é uma maneira temporária de aumentar o limite de memória para a sessão atual do terminal. Antes de executar `npm run dev` ou `npm run build` no seu terminal *frontend*, defina a variável de ambiente `NODE_OPTIONS`:

     ```bash
     export NODE_OPTIONS="--max-old-space-size=4096" # Para Linux/macOS (bash, zsh)
     # set NODE_OPTIONS=--max-old-space-size=4096 # Para Windows (Prompt de Comando)
     # $env:NODE_OPTIONS="--max-old-space-size=4096" # Para Windows (PowerShell)
     npm run dev
     ```

     Escolha o comando apropriado para o seu sistema operacional e terminal. `4096` representa 4GB de memória. Você pode tentar aumentar este valor ainda mais, se necessário (por exemplo, `8192` para 8GB). Esta configuração só será aplicada aos comandos executados na sessão atual do terminal.

2. **Modificando o `Dockerfile` (Para Ambientes Dockerizados):**
   - Se você está trabalhando com Docker, pode definir a variável de ambiente `NODE_OPTIONS` permanentemente no seu `Dockerfile`. Isso é útil para alocação consistente de memória em ambientes Dockerizados, conforme mostrado no exemplo do guia original:

     ```dockerfile
     ENV NODE_OPTIONS=--max-old-space-size=4096
     ```

   - **Alocar Memória RAM Suficiente:** Independente do método, certifique-se de que o seu sistema ou contêiner Docker tenha RAM suficiente disponível para o Node.js usar. **Pelo menos 4 GB de RAM são recomendados**, e mais pode ser necessário para projetos maiores ou builds complexos. Feche aplicativos desnecessários para liberar RAM.

### ⚠️ Conflitos de Porta (Frontend & Backend)

Se você vir erros relacionados a portas, como "Endereço já em uso" ou "Porta já vinculada", isso significa que outro aplicativo no seu sistema já está usando a porta `5173` (padrão para frontend) ou `8080` (padrão para backend). Apenas um aplicativo pode usar uma porta específica por vez.

**Solução:**

1. **Identifique o Processo em Conflito:** Você precisa descobrir qual aplicativo está usando a porta que você precisa.
   - **Linux/macOS:** Abra um novo terminal e use os comandos `lsof` ou `netstat`:
     - `lsof -i :5173` (ou `:8080` para a porta do backend)
     - `netstat -tulnp | grep 5173` (ou `8080`)
     Esses comandos listarão o ID do processo (PID) e o nome do processo que está usando a porta especificada.
   - **Windows:** Abra o Prompt de Comando ou PowerShell como administrador e use `netstat` ou `Get-NetTCPConnection`:
     - `netstat -ano | findstr :5173` (ou `:8080`) (Prompt de Comando)
     - `Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess` (PowerShell)
     Esses comandos também mostrarão o PID do processo que está usando a porta.

2. **Termine o Processo em Conflito:** Depois de identificar o ID do processo (PID), você pode parar o aplicativo que está usando essa porta. **Tenha cuidado ao terminar processos, especialmente se você não tiver certeza do que eles são.**
   - **Linux/macOS:** Use o comando `kill`: `kill <PID>` (substitua `<PID>` pelo ID do processo real). Se o processo não terminar com `kill`, você pode usar `kill -9 <PID>` (finalização forçada), mas use isso com cautela.
   - **Windows:** Use o comando `taskkill` no Prompt de Comando ou PowerShell como administrador: `taskkill /PID <PID> /F` (substitua `<PID>` pelo ID do processo). A flag `/F` força a terminação.

3. **Alternativamente, Altere as Portas (Avançado):**
   - Se você não puder finalizar o processo em conflito (por exemplo, é um serviço do sistema que você precisa), pode configurar o Open WebUI para usar portas diferentes no frontend e/ou backend. Isso geralmente envolve modificar arquivos de configuração.
     - **Porta do Frontend:** Verifique a documentação ou os arquivos de configuração do frontend (frequentemente no `vite.config.js` ou similar) para saber como alterar a porta do servidor de desenvolvimento. Você pode precisar ajustar o arquivo `.env` também, caso o frontend use variáveis de ambiente para a porta.
     - **Porta do Backend:** Examine o script `dev.sh` ou os arquivos de configuração do backend para ver como a porta do backend está configurada. Você pode precisar modificar o comando de inicialização ou um arquivo de configuração para alterar a porta do backend. Se você mudar a porta do backend, provavelmente precisará atualizar o arquivo `.env` do frontend para apontar para a nova URL do backend.

### 🔄 Recarregamento Automático Não Funcionando

O recarregamento automático (ou substituição de módulo - HMR) é um recurso de desenvolvimento fantástico que atualiza automaticamente o navegador quando você faz alterações no código. Se não estiver funcionando, pode desacelerar significativamente o fluxo de trabalho de desenvolvimento.

**Passos para Solução de Problemas:**

1. **Verificar se os Servidores de Desenvolvimento estão Executando:** Certifique-se de que ambos `npm run dev` (frontend) e `sh dev.sh` (backend) estão sendo executados em seus respectivos terminais e não encontraram nenhum erro. Procure mensagens na saída do terminal indicando que estão em execução e em "modo de observação" ou "modo de desenvolvimento." Se houver erros, resolva-os primeiro.
2. **Verificar Mensagens de Modo de Observação/HMR:** Quando os servidores de desenvolvimento iniciam, geralmente imprimem mensagens no terminal indicando que o recarregamento automático ou o modo de observação está ativado. Procure frases como "HMR ativado," "observando alterações de arquivo," ou similares. Se você não vir essas mensagens, pode haver um problema de configuração.
3. **Cache do Navegador:** Às vezes, o cache do navegador pode impedir que você veja as alterações mais recentes, mesmo que o recarregamento automático esteja funcionando. Tente um **recarregamento forçado** no seu navegador:
   - **Windows/Linux:** Ctrl+Shift+R
   - **macOS:** Cmd+Shift+R
   - Alternativamente, você pode tentar limpar o cache do navegador ou abrir o frontend em uma janela de navegação privada/incógnita.
4. **Problemas de Dependência (Frontend):** Dependências corruptas ou desatualizadas do frontend podem, às vezes, interferir no recarregamento automático. Tente atualizar as dependências do frontend:
   - No terminal do *frontend*, execute:
  
     ```bash
     rm -rf node_modules && npm install
     ```

     Este comando exclui o diretório `node_modules` (onde as dependências são armazenadas) e, em seguida, as reinstala do zero. Isso pode resolver problemas causados por pacotes corrompidos ou desatualizados.
5. **Reinicialização do Backend Necessária (Para Alterações do Backend):** O recarregamento automático geralmente funciona melhor para alterações de código do frontend (UI, estilos, componentes). Para alterações significativas no código do backend (especialmente mudanças na lógica do servidor, endpoints da API ou dependências), pode ser necessário **reiniciar manualmente o servidor do backend** (parando `sh dev.sh` no terminal do backend e executando-o novamente). O recarregamento automático para mudanças no backend muitas vezes é menos confiável ou não configurado automaticamente em muitas configurações de desenvolvimento de backend.
6. **Problemas no IDE/Editor:** Em casos raros, problemas com seu IDE ou editor de código podem impedir que as alterações de arquivo sejam detectadas corretamente pelos servidores de desenvolvimento. Tente reiniciar seu IDE ou garantir que os arquivos estão sendo salvos corretamente.
7. **Problemas de Configuração (Avançado):** Se nenhuma das etapas acima funcionar, pode haver um problema de configuração mais complexo com a configuração dos servidores de desenvolvimento frontend ou backend. Consulte a documentação do projeto, arquivos de configuração (por exemplo, `vite.config.js` para frontend, arquivos de configuração do servidor do backend) ou busque ajuda na comunidade ou dos mantenedores do Open WebUI.

## Contribuindo para o Open WebUI

Nós recebemos calorosamente suas contribuições para o Open WebUI! Sua ajuda é valiosa para tornar este projeto ainda melhor. Aqui está um guia rápido para um fluxo de trabalho de contribuição eficaz e tranquilo:

1. **Compreenda a Estrutura do Projeto:** Reserve um tempo para se familiarizar com a estrutura de diretórios do projeto, especialmente as pastas `frontend` e `backend`. Olhe o código, os arquivos de configuração e a documentação para ter uma ideia de como as coisas estão organizadas.
2. **Comece com Contribuições Pequenas:** Se você é novo no projeto, considere começar com contribuições menores como:
   - **Melhorias na documentação:** Corrigir erros de digitação, esclarecer explicações, adicionar mais detalhes à documentação.
   - **Correções de bugs:** Resolver problemas ou erros relatados.
   - **Pequenas melhorias na interface:** Melhorar estilos, corrigir pequenos problemas de layout.
   Estas contribuições menores são uma ótima forma de se familiarizar com a base de código e o processo de contribuição.
3. **Discuta Mudanças Maiores Primeiro:** Se você está planejando implementar um recurso novo significativo ou fazer mudanças substanciais, é altamente recomendado **discutir suas ideias com os mantenedores do projeto ou com a comunidade primeiro.** Você pode fazer isso:
   - **Abrindo uma issue** no repositório GitHub para propor seu recurso ou mudança.
   - **Participando dos canais da comunidade Open WebUI** (se disponíveis, verifique o README ou site do projeto para links) e discutindo suas ideias lá.
   Isso ajuda a garantir que sua contribuição esteja alinhada com os objetivos do projeto e evita esforço desperdiçado em recursos que podem não ser aceitos.
4. **Crie um Branch Separado para seu Trabalho:** **Nunca faça commit diretamente no branch `dev`.** Sempre crie um novo branch para cada recurso ou correção de bug em que estiver trabalhando. Isso mantém suas alterações isoladas e facilita o gerenciamento e o envio de pull requests.
   - Para criar um novo branch (por exemplo, chamado `my-feature-branch`) baseado no branch `dev`:
  
     ```bash
     git checkout dev
     git pull origin dev # Certifique-se de que sua branch dev local está atualizada
     git checkout -b my-feature-branch
     ```

5. **Faça Commits Frequentes e Escreva Mensagens de Commit Claras:** Faça commits pequenos e lógicos ao desenvolver funcionalidades ou corrigir bugs. **Escreva mensagens de commit claras e concisas** explicando quais alterações foram feitas e por quê. Mensagens de commit bem elaboradas facilitam o entendimento do histórico de alterações e são essenciais para colaboração.
   - Exemplo de uma boa mensagem de commit: `Correção: Corrigido erro de digitação na documentação para configuração do backend`
   - Exemplo de uma boa mensagem de commit: `Funcionalidade: Implementada página de perfil de usuário com exibição básica de informações`
6. **Mantenha Sincronização Regular com a Branch `dev`:** Enquanto trabalha na sua branch, sincronize periodicamente sua branch com as alterações mais recentes da branch `dev` para minimizar conflitos de mesclagem posteriormente:

   ```bash
   git checkout dev
   git pull origin dev
   git checkout my-feature-branch
   git merge dev
   ```

   Resolva quaisquer conflitos de mesclagem que surgirem durante o passo `git merge`.
7. **Execute Testes (Se Existirem) Antes de Enviar:** Embora este guia não detalhe procedimentos de teste específicos para Open WebUI, é uma boa prática executar quaisquer testes disponíveis antes de enviar seu código. Verifique a documentação do projeto ou `package.json` (para frontend) e arquivos do backend para comandos relacionados a testes (por exemplo, `npm run test`, `pytest`, etc.). Executar testes ajuda a garantir que suas alterações não introduziram regressões ou quebraram funcionalidades existentes.
8. **Submeta uma Pull Request (PR):** Depois de concluir seu trabalho, testá-lo (se aplicável) e estar pronto para contribuir com suas alterações, envie uma pull request (PR) para a branch `dev` do repositório Open WebUI no GitHub.
   - **Acesse o repositório Open WebUI no GitHub.**
   - **Navegue até sua branch.**
   - **Clique no botão "Contribuir" ou "Pull Request"** (geralmente verde).
   - **Preencha o formulário de PR:**
     - **Título:** Dê à sua PR um título claro e descritivo que resuma suas alterações (por exemplo, "Correção: Resolvido problema com validação de formulário de login").
     - **Descrição:** Forneça uma descrição mais detalhada de suas alterações, o problema que você está resolvendo (se aplicável) e qualquer contexto relevante. Vincule quaisquer problemas relacionados, se houver.
   - **Envie a PR.**

   Os mantenedores do projeto revisarão sua pull request, fornecerão feedback e poderão mesclar suas alterações. Seja responsivo ao feedback e esteja preparado para fazer revisões, se solicitado.

**Obrigado por ler este guia abrangente e por seu interesse em contribuir para o Open WebUI! Estamos empolgados para ver suas contribuições e ajudá-lo a fazer parte da comunidade Open WebUI!** 🎉 Feliz programação!
