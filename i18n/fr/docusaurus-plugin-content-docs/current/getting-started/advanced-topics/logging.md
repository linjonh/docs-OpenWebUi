---
sidebar_position: 5
title: "📜 Journalisation dans Open WebUI"
---

# Comprendre la journalisation d'Open WebUI 🪵

La journalisation est essentielle pour le débogage, la surveillance et la compréhension du fonctionnement d'Open WebUI. Ce guide explique le fonctionnement de la journalisation à la fois sur le **client navigateur** (frontend) et sur le **serveur/application backend**.

## 🖥️ Journalisation côté client navigateur (Frontend)

Pour le développement et le débogage en frontend, Open WebUI utilise la journalisation standard de la console des navigateurs. Cela signifie que vous pouvez voir les journaux directement dans les outils de développement intégrés à votre navigateur.

**Comment accéder aux journaux du navigateur :**

1. **Ouvrir les outils de développement :** Dans la plupart des navigateurs, vous pouvez ouvrir les outils de développement en :
   - **Cliquant droit** n'importe où sur la page Open WebUI et en sélectionnant "Inspecter" ou "Inspecter l'élément".
   - Appuyant sur **F12** (ou Cmd+Opt+I sur macOS).

2. **Naviguer vers l'onglet "Console" :** Dans le panneau des outils de développement, trouvez et cliquez sur l'onglet "Console".

**Types de journaux du navigateur :**

Open WebUI utilise principalement le [`console.log()`](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static) de JavaScript pour la journalisation côté client. Vous verrez différents types de messages dans la console, notamment :

- **Messages informatifs :** Flux et état général de l'application.
- **Avertissements :** Problèmes potentiels ou erreurs non critiques.
- **Erreurs :** Problèmes pouvant affecter les fonctionnalités.

**Outils de développement spécifiques aux navigateurs :**

Les différents navigateurs proposent des outils de développement légèrement différents, mais tous offrent une console pour afficher les journaux JavaScript. Voici des liens vers la documentation des navigateurs populaires :

- **[Blink] Chrome/Chromium (par exemple, Chrome, Edge) :** [Documentation sur Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- **[Gecko] Firefox :** [Documentation sur les outils de développement Firefox](https://firefox-source-docs.mozilla.org/devtools-user/)
- **[WebKit] Safari :** [Documentation sur les outils de développement Safari](https://developer.apple.com/safari/tools/)

## ⚙️ Journalisation côté serveur/application backend (Python)

Le backend d'Open WebUI utilise le module intégré de Python `logging` pour enregistrer les événements et informations côté serveur. Ces journaux sont cruciaux pour comprendre le comportement du serveur, diagnostiquer les erreurs et surveiller les performances.

**Principes clés :**

- **Module de journalisation Python :** Open WebUI exploite la bibliothèque standard `logging` de Python. Si vous êtes familier avec la journalisation Python, cette section sera simple à comprendre. (Pour des informations plus détaillées, consultez la [Documentation sur la journalisation de Python](https://docs.python.org/3/howto/logging.html#logging-levels)).
- **Sortie console :** Par défaut, les journaux du backend sont envoyés à la console (sortie standard), ce qui les rend visibles dans votre terminal ou les journaux de conteneurs Docker.
- **Niveaux de journalisation :** Les niveaux de journalisation contrôlent la granularité des journaux. Vous pouvez configurer Open WebUI pour afficher plus ou moins de détails en fonction de ces niveaux.

### 🚦 Les niveaux de journalisation expliqués

La journalisation Python utilise une hiérarchie de niveaux pour classer les messages dans les journaux en fonction de leur gravité. Voici une description des niveaux, de la gravité la plus élevée à la plus faible :

| Niveau       | Valeur numérique | Description                                                                 | Cas d'utilisation                                                         |
| ------------ | ---------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `CRITICAL`   | 50               | **Erreurs graves** pouvant entraîner l'arrêt de l'application.            | Échecs catastrophiques, corruption de données.                            |
| `ERROR`      | 40               | **Erreurs** indiquant des problèmes mais l'application peut encore fonctionner. | Erreurs récupérables, opérations échouées.                                |
| `WARNING`    | 30               | **Problèmes potentiels** ou situations inattendues nécessitant une enquête. | Avertissements sur les fonctions obsolètes, contraintes de ressources.     |
| `INFO`       | 20               | **Messages informatifs généraux** sur le fonctionnement de l'application. | Messages de démarrage, événements clés, flux de fonctionnement normal.     |
| `DEBUG`      | 10               | **Informations détaillées pour le débogage.**                              | Appels de fonction, valeurs de variables, étapes détaillées d'exécution.  |
| `NOTSET`     | 0                | **Tous les messages sont enregistrés.** (Par défaut sur `WARNING` si non défini). | Utile pour capturer absolument tout, généralement pour un débogage très spécifique. |

**Niveau par défaut :** Le niveau de journalisation par défaut d'Open WebUI est `INFO`.

### 🌍 Niveau de journalisation global (`GLOBAL_LOG_LEVEL`)

Vous pouvez modifier le niveau de journalisation **global** pour l'ensemble du backend d'Open WebUI en utilisant la variable d'environnement `GLOBAL_LOG_LEVEL`. C'est le moyen le plus simple de contrôler la granularité des journaux.

**Comment cela fonctionne :**

Définir `GLOBAL_LOG_LEVEL` configure le logger racine en Python, affectant tous les loggers dans Open WebUI et potentiellement certaines bibliothèques tierces qui utilisent [basicConfig](https://docs.python.org/3/library/logging.html#logging.basicConfig). Il utilise `logging.basicConfig(force=True)`, ce qui signifie qu'il remplacera toute configuration existante du logger racine.

**Exemple : Définir à `DEBUG`**

- **Paramètre Docker :**

  ```bash
  --env GLOBAL_LOG_LEVEL="DEBUG"
  ```

- **Docker Compose (`docker-compose.yml`):**

  ```yaml
  environment:
    - GLOBAL_LOG_LEVEL=DEBUG
  ```

**Impact :** Définir `GLOBAL_LOG_LEVEL` sur `DEBUG` produira les journaux les plus détaillés, incluant des informations utiles pour le développement et le dépannage. Pour les environnements de production, `INFO` ou `WARNING` pourraient être plus appropriés pour réduire le volume des journaux.

### ⚙️ Niveaux de journalisation spécifiques à l'application/backend

Pour un contrôle plus granulaire, Open WebUI fournit des variables d'environnement pour définir les niveaux de journalisation des composants backend spécifiques. La journalisation est un travail en cours, mais un certain niveau de contrôle est disponible via ces variables d'environnement. Ces variables vous permettent d'affiner la journalisation pour différentes parties de l'application.

**Variables d'environnement disponibles :**

| Variable d'environnement | Composant/Module                                                    | Description                                                                                                  |
| -------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `AUDIO_LOG_LEVEL`          | Traitement audio                                                   | Journalisation liée à la transcription audio (faster-whisper), la synthèse vocale (TTS) et la gestion audio. |
| `COMFYUI_LOG_LEVEL`        | Intégration ComfyUI                                                | Journalisation pour les interactions avec ComfyUI, si vous utilisez cette intégration.                       |
| `CONFIG_LOG_LEVEL`         | Gestion de la configuration                                         | Journalisation liée au chargement et au traitement des fichiers de configuration Open WebUI.                 |
| `DB_LOG_LEVEL`             | Opérations sur la base de données (Peewee)                         | Journalisation des interactions avec la base de données utilisant l'ORM Peewee (Mapper Objet-Relationnel).   |
| `IMAGES_LOG_LEVEL`         | Génération d'images (AUTOMATIC1111/Stable Diffusion)               | Journalisation des tâches de génération d'images, notamment avec l'intégration AUTOMATIC1111 Stable Diffusion. |
| `MAIN_LOG_LEVEL`           | Exécution principale de l'application (Logger racine)              | Journalisation à partir du point d'entrée principal de l'application et du logger racine.                    |
| `MODELS_LOG_LEVEL`         | Gestion des modèles                                                | Journalisation liée au chargement, à la gestion et aux interactions avec les modèles linguistiques (LLMs), y compris l'authentification. |
| `OLLAMA_LOG_LEVEL`         | Intégration du backend Ollama                                      | Journalisation des communications et interactions avec le backend Ollama.                                   |
| `OPENAI_LOG_LEVEL`         | Intégration de l'API OpenAI                                        | Journalisation des interactions avec l'API OpenAI (par exemple, pour des modèles comme GPT).                 |
| `RAG_LOG_LEVEL`            | Génération augmentée par récupération (RAG)                        | Journalisation pour le pipeline RAG, notamment la base de données vectorielle Chroma et Sentence-Transformers. |
| `WEBHOOK_LOG_LEVEL`        | Webhook d'authentification                                         | Journalisation étendue pour la fonctionnalité du webhook d'authentification.                                |

**Comment utiliser :**

Vous pouvez définir ces variables d'environnement de la même manière que `GLOBAL_LOG_LEVEL` (paramètres Docker, section `environment` de Docker Compose). Par exemple, pour obtenir une journalisation plus détaillée des interactions avec Ollama, vous pourriez définir :

```yaml
environment:
  - OLLAMA_LOG_LEVEL=DEBUG
```

**Note importante :** Contrairement à `GLOBAL_LOG_LEVEL`, ces variables spécifiques à l'application peuvent ne pas affecter la journalisation de *tous* les modules tiers. Elles contrôlent principalement la journalisation au sein du code Open WebUI.

En comprenant et en utilisant ces mécanismes de journalisation, vous pouvez surveiller, déboguer et obtenir des informations sur votre instance Open WebUI de manière efficace.
