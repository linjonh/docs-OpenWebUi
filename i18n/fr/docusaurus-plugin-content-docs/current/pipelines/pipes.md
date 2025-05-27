---
sidebar_position: 2
title: "🔧 Pipes"
---

# Pipes
Les Pipes sont des fonctions qui peuvent être utilisées pour effectuer des actions avant de renvoyer les messages des LLM à l'utilisateur. Des exemples d'actions potentielles que vous pouvez réaliser avec les Pipes sont la Génération Augmentée par Récupération (RAG), l'envoi de requêtes à des fournisseurs de LLM non-OpenAI (tels qu'Anthropic, Azure OpenAI ou Google), ou l'exécution de fonctions directement dans votre interface web. Les Pipes peuvent être hébergés en tant que Fonction ou sur un serveur Pipelines. Une liste d'exemples est maintenue dans le [dépôt Pipelines](https://github.com/open-webui/pipelines/tree/main/examples/pipelines). Le flux de travail général peut être vu dans l'image ci-dessous.

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipes.png" alt="Flux de travail des Pipes" />
  </a>
</p>

Les Pipes définis dans votre WebUI apparaissent comme un nouveau modèle avec une désignation "Externe" attachée. Un exemple de deux modèles de Pipe, `Database RAG Pipeline` et `DOOM`, peut être vu ci-dessous à côté de deux modèles auto-hébergés :

<p align="center">
  <a href="#">
    <img src="/images/pipelines/pipe-model-example.png" alt="Modèles de Pipe dans WebUI" />
  </a>
</p>
