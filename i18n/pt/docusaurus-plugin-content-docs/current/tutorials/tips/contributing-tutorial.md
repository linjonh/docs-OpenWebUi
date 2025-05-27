---
sidebar_position: 2
title: "🤝 Tutoriais de Contribuição"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

# Tutoriais de Contribuição

Agradecemos o seu interesse em contribuir com tutoriais para a documentação do Open WebUI. Siga os passos abaixo para configurar seu ambiente e enviar seu tutorial.

## Passos

1. **Faça um Fork do Repositório `openwebui/docs` no GitHub**

   - Navegue até o [Repositório Open WebUI Docs](https://github.com/open-webui/docs) no GitHub.
   - Clique no botão **Fork** no canto superior direito para criar uma cópia em sua conta do GitHub.

2. **Habilite o GitHub Actions**

   - No seu repositório forkado, navegue até a aba **Actions**.
   - Se solicitado, habilite o GitHub Actions seguindo as instruções exibidas na tela.

3. **Habilite o GitHub Pages**

   - Vá em **Settings** > **Pages** no seu repositório forkado.
   - Em **Source**, selecione a branch que deseja implantar (por exemplo, `main`) e a pasta (por exemplo, `/docs`).
   - Clique em **Save** para habilitar o GitHub Pages.

4. **Configure as Variáveis de Ambiente do GitHub**

   - No seu repositório forkado, vá para **Settings** > **Secrets and variables** > **Actions** > **Variables**.
   - Adicione as seguintes variáveis de ambiente:
     - `BASE_URL` definido como `/docs` (ou sua URL base escolhida para o fork).
     - `SITE_URL` definido como `https://<seu-nome-de-usuário-github>.github.io/`.

### 📝 Atualizando o Fluxo de Trabalho do GitHub Pages e o Arquivo de Configuração

Se você precisar ajustar as configurações de implantação para se adequar à sua configuração personalizada, aqui está o que fazer:

a. **Atualize o arquivo `.github/workflows/gh-pages.yml`**

- Adicione variáveis de ambiente para `BASE_URL` e `SITE_URL` na etapa de build, se necessário:

     ```yaml
       - name: Build
         env:
           BASE_URL: ${{ vars.BASE_URL }}
           SITE_URL: ${{ vars.SITE_URL }}
         run: npm run build
     ```

b. **Modifique o arquivo `docusaurus.config.ts` para Usar Variáveis de Ambiente**

- Atualize o arquivo `docusaurus.config.ts` para usar essas variáveis de ambiente, com valores padrão para implantação local ou direta:

     ```typescript
     const config: Config = {
       title: "Open WebUI",
       tagline: "WebUI estilo ChatGPT para LLMs (anteriormente Ollama WebUI)",
       favicon: "images/favicon.png",
       url: process.env.SITE_URL || "https://openwebui.com",
       baseUrl: process.env.BASE_URL || "/",
       ...
     };
     ```

- Esta configuração garante um comportamento consistente de implantação para forks e configurações personalizadas.

5. **Execute o Fluxo de Trabalho `gh-pages` do GitHub**

   - Na aba **Actions**, localize o fluxo de trabalho `gh-pages`.
   - Execute o fluxo de trabalho manualmente, se necessário, ou ele pode ser executado automaticamente com base na sua configuração.

6. **Acesse sua Cópia Forkada**

   - Visite `https://<seu-nome-de-usuário-github>.github.io/<BASE_URL>` para visualizar sua documentação forkada.

7. **Redija Suas Alterações**

   - No seu repositório forkado, navegue para o diretório apropriado (por exemplo, `docs/tutorial/`).
   - Crie um novo arquivo markdown para o seu tutorial ou edite os existentes.
   - Certifique-se de que seu tutorial inclua o banner de aviso de não suportado.

8. **Envie um Pull Request**

   - Quando seu tutorial estiver pronto, faça commit de suas alterações no seu repositório forkado.
   - Navegue até o repositório original `open-webui/docs`.
   - Clique em **New Pull Request** e selecione seu fork e branch como a origem.
   - Forneça um título e descrição descritivos para o seu PR.
   - Envie o pull request para revisão.

## Importante

Os tutoriais contribuídos pela comunidade devem incluir o seguinte:

```
:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::
```

---

:::tip Como Testar o Docusaurus Localmente  
Você pode testar seu site Docusaurus localmente com os seguintes comandos:

```bash
npm install   # Instale as dependências
npm run build # Construa o site para produção
```

Isto ajudará a identificar quaisquer problemas antes da implantação
:::

---
