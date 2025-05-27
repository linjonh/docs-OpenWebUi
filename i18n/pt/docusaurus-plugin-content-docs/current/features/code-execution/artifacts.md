---
sidebar_position: 1
title: "🏺 Artefatos"
---


# O que são Artefatos e como usá-los no Open WebUI?

Os Artefatos no Open WebUI são um recurso inovador inspirado nos Artefatos do Claude.AI, permitindo que você interaja com conteúdo significativo e autônomo gerado por um LLM dentro de um chat. Eles possibilitam visualizar, modificar, desenvolver ou referenciar partes substanciais de conteúdo separadamente da conversa principal, facilitando o trabalho com saídas complexas e garantindo que você possa revisitar informações importantes posteriormente.

## Quando o Open WebUI usa Artefatos?

O Open WebUI cria um Artefato quando o conteúdo gerado atende a critérios específicos adaptados à nossa plataforma:

1. **Renderizável**: Para ser exibido como um Artefato, o conteúdo deve estar em um formato que o Open WebUI suporte para renderização. Isso inclui:

* Websites HTML de página única
* Imagens em Scalable Vector Graphics (SVG)
* Páginas web completas, que incluem HTML, JavaScript e CSS no mesmo Artefato. Observe que o HTML é necessário ao gerar uma página web completa.
* Visualizações ThreeJS e outras bibliotecas de visualização JavaScript, como D3.js.

Outros tipos de conteúdo, como Documentos (Markdown ou Texto Plano), trechos de Código e componentes React não são renderizados como Artefatos pelo Open WebUI.

## Como o modelo do Open WebUI cria Artefatos?

Para usar artefatos no Open WebUI, um modelo deve fornecer conteúdo que acione o processo de renderização para criar um artefato. Isso envolve a geração de HTML válido, código SVG ou outros formatos suportados para renderização de artefatos. Quando o conteúdo gerado atende aos critérios mencionados acima, o Open WebUI o exibirá como um Artefato interativo.

## Como usar Artefatos no Open WebUI?

Quando o Open WebUI cria um Artefato, você verá o conteúdo exibido em uma janela dedicada de Artefatos no lado direito do chat principal. Veja como interagir com Artefatos:

* **Editar e iterar**: Solicite a um LLM dentro do chat que edite ou itere sobre o conteúdo, e essas atualizações serão exibidas diretamente na janela de Artefatos. Você pode alternar entre versões usando o seletor de versões no canto inferior esquerdo do Artefato. Cada edição cria uma nova versão, permitindo rastrear mudanças usando o seletor de versões.
* **Atualizações**: O Open WebUI pode atualizar um Artefato existente com base em suas mensagens. A janela de Artefatos exibirá o conteúdo mais recente.
* **Ações**: Acesse ações adicionais para o Artefato, como copiar o conteúdo ou abrir o artefato em tela cheia, localizado no canto inferior direito do Artefato.

## Editando Artefatos

1. **Atualizações direcionadas**: Descreva o que você deseja alterar e onde. Por exemplo:

* "Mude a cor da barra no gráfico de azul para vermelho."
* "Atualize o título da imagem SVG para 'Novo Título'."

2. **Reescritas completas**: Solicite mudanças significativas que afetem a maior parte do conteúdo para reestruturações substanciais ou atualizações em várias seções. Por exemplo:

* "Reescreva este website HTML de página única para ser uma página de destino."
* "Redesenhe este SVG para que seja animado usando ThreeJS."

**Melhores Práticas**:

* Seja específico sobre qual parte do Artefato você deseja alterar.
* Referencie um texto identificador único ao redor da mudança desejada para atualizações direcionadas.
* Considere se uma pequena atualização ou uma reescrita completa é mais apropriada para suas necessidades.

## Casos de Uso

Os Artefatos no Open WebUI capacitam diversas equipes a criar produtos de trabalho de alta qualidade de forma rápida e eficiente. Aqui estão alguns exemplos adaptados à nossa plataforma:

* **Designers**:
  * Criar gráficos SVG interativos para design de UI/UX.
  * Projetar websites HTML de página única ou páginas de destino.
* **Desenvolvedores**: Criar protótipos HTML simples ou gerar ícones SVG para projetos.
* **Profissionais de Marketing**:
  * Projetar páginas de destino de campanhas com métricas de desempenho.
  * Criar gráficos SVG para criativos de anúncios ou posts em mídia social.

## Exemplos de Projetos que você pode criar com os Artefatos do Open WebUI

Os Artefatos no Open WebUI capacitam diversas equipes e indivíduos a criar produtos de trabalho de alta qualidade de forma rápida e eficiente. Aqui estão alguns exemplos adaptados à nossa plataforma, mostrando a versatilidade dos artefatos e inspirando você a explorar seu potencial:

1. **Visualizações Interativas**

* Componentes utilizados: ThreeJS, D3.js e SVG
* Benefícios: Crie histórias de dados imersivas com visualizações interativas. Os Artefatos do Open WebUI permitem alternar entre versões, facilitando o teste de diferentes abordagens de visualização e o rastreamento de mudanças.

Exemplo de Projeto: Construir um gráfico de linha interativo usando ThreeJS para visualizar preços de ações ao longo do tempo. Atualize as cores e escalas do gráfico em versões separadas para comparar diferentes estratégias de visualização.

2. **Aplicações Web de Página Única**

* Componentes utilizados: HTML, CSS e JavaScript
* Benefícios: Desenvolva aplicações web de página única diretamente no Open WebUI. Edite e itere sobre o conteúdo usando atualizações direcionadas e reescritas completas.

Projeto de Exemplo: Projetar um aplicativo de lista de tarefas com uma interface de usuário construída usando HTML e CSS. Use JavaScript para adicionar funcionalidade interativa. Atualize o layout e a UI/UX do aplicativo usando atualizações direcionadas e revisões completas.

3. **Gráficos SVG Animados**

* Componentes usados: SVG e ThreeJS
* Benefícios: Crie gráficos SVG animados envolventes para campanhas de marketing, mídias sociais ou design web. Os Artifacts do Open WebUI permitem editar e iterar os gráficos em uma única janela.

Projeto de Exemplo: Desenhar um logotipo animado em SVG para uma marca de empresa. Use o ThreeJS para adicionar efeitos de animação e as atualizações direcionadas do Open WebUI para refinar as cores e o design do logotipo.

4. **Protótipos de Páginas da Web**

* Componentes usados: HTML, CSS e JavaScript
* Benefícios: Construa e teste protótipos de páginas da web diretamente no Open WebUI. Alterne entre versões para comparar diferentes abordagens de design e refinar o protótipo.

Projeto de Exemplo: Desenvolver um protótipo para um novo site de comércio eletrônico usando HTML, CSS e JavaScript. Use as atualizações direcionadas do Open WebUI para refinar a navegação, o layout e a UI/UX.

5. **Narrativa Interativa**

* Componentes usados: HTML, CSS e JavaScript
* Benefícios: Crie histórias interativas com efeitos de rolagem, animações e outros elementos interativos. Os Artifacts do Open WebUI permitem refinar a história e testar diferentes versões.

Projeto de Exemplo: Construir uma história interativa sobre a história de uma empresa, usando efeitos de rolagem e animações para envolver o leitor. Use atualizações direcionadas para refinar a narrativa da história e o seletor de versões do Open WebUI para testar diferentes versões.
