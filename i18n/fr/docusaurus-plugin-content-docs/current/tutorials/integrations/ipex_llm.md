---
sidebar_position: 11
title: "🖥️ Configuration locale de LLM avec IPEX-LLM sur GPU Intel"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas soutenu par l'équipe d'Open WebUI. Il sert uniquement de démonstration sur la personnalisation d'Open WebUI pour vos besoins spécifiques. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

:::note
Ce guide est vérifié avec Open WebUI installé via [Installation Manuelle](/getting-started/index.md).
:::

# Configuration locale de LLM avec IPEX-LLM sur GPU Intel

:::info
[**IPEX-LLM**](https://github.com/intel-analytics/ipex-llm) est une bibliothèque PyTorch permettant d'exécuter des LLM sur CPU et GPU Intel (par exemple, un PC local avec iGPU, des GPU discrets comme Arc A-Series, Flex et Max) avec une latence très faible.
:::

Ce tutoriel montre comment configurer Open WebUI avec un **back-end Ollama accéléré par IPEX-LLM hébergé sur GPU Intel**. En suivant ce guide, vous pourrez configurer Open WebUI même sur un PC à faible coût (c'est-à-dire uniquement avec un GPU intégré) avec une expérience fluide.

## Lancer le serveur Ollama sur GPU Intel

Consultez [ce guide](https://ipex-llm.readthedocs.io/en/latest/doc/LLM/Quickstart/ollama_quickstart.html) issu de la documentation officielle de IPEX-LLM pour savoir comment installer et exécuter le serveur Ollama accéléré par IPEX-LLM sur GPU Intel.

:::tip
Si vous souhaitez accéder au service Ollama depuis une autre machine, assurez-vous de définir ou d'exporter la variable d'environnement `OLLAMA_HOST=0.0.0.0` avant d'exécuter la commande `ollama serve`.
:::

## Configurer Open WebUI

Accédez aux paramètres Ollama via **Paramètres -> Connexions** dans le menu. Par défaut, l'**URL de Base Ollama** est prédéfinie sur `https://localhost:11434`, comme illustré dans la capture ci-dessous. Pour vérifier l'état de la connexion au service Ollama, cliquez sur le **bouton Rafraîchir** situé à côté de la zone de texte. Si le WebUI ne parvient pas à établir une connexion avec le serveur Ollama, un message d'erreur s'affichera indiquant, `WebUI ne peut pas se connecter à Ollama`.

![Échec de la configuration d'Open WebUI Ollama](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings_0.png)

Si la connexion est réussie, un message indiquera `Connexion au service vérifiée`, comme illustré ci-dessous.

![Succès de la configuration d'Open WebUI Ollama](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings.png)

:::tip
Si vous souhaitez utiliser un serveur Ollama hébergé à une autre URL, mettez simplement à jour l'**URL de Base Ollama** avec la nouvelle URL et appuyez sur le bouton **Rafraîchir** pour confirmer à nouveau la connexion à Ollama.
:::
