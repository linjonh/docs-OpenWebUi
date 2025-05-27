---
sidebar_position: 1
title: "🚰 Filtres"
---

# Filtres

Les filtres sont utilisés pour effectuer des actions sur les messages entrants des utilisateurs et les messages sortants de l'assistant (LLM). Les actions possibles dans un filtre incluent l'envoi de messages vers des plateformes de supervision (comme Langfuse ou DataDog), la modification du contenu des messages, le blocage des messages toxiques, la traduction de messages dans une autre langue, ou la limitation du débit des messages de certains utilisateurs. Une liste d'exemples est conservée dans le [repo Pipelines](https://github.com/open-webui/pipelines/tree/main/examples/filters). Les filtres peuvent être exécutés en tant que Fonction ou sur un serveur de Pipelines. Le flux de travail général peut être vu dans l'image ci-dessous.

<p align="center">
  <a href="#">
    <img src="/images/pipelines/filters.png" alt="Flux de travail des filtres" />
  </a>
</p>

Lorsqu'un pipeline de filtres est activé sur un modèle ou un tuyau, le message entrant de l'utilisateur (ou "inlet") est transmis au filtre pour traitement. Le filtre exécute l'action souhaitée sur le message avant de demander la complétion de chat au modèle LLM. Enfin, le filtre effectue un post-traitement sur le message LLM sortant (ou "outlet") avant qu'il ne soit envoyé à l'utilisateur.
