---
sidebar_position: 25
title: "🔠 Intégration de LibreTranslate"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration pour personnaliser Open WebUI selon votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

Vue d'ensemble
---------------

LibreTranslate est une API de traduction automatique gratuite et open-source qui prend en charge un large éventail de langues. LibreTranslate peut être auto-hébergé, fonctionne hors ligne, est facile à configurer, et contrairement à d'autres API, il ne dépend pas de fournisseurs propriétaires comme Google ou Azure pour effectuer des traductions. Son moteur de traduction repose sur la bibliothèque open source [Argos Translate](https://github.com/argosopentech/argos-translate). Vous pouvez intégrer LibreTranslate à Open WebUI pour exploiter ses capacités de traduction automatique. Cette documentation fournit un guide étape par étape pour configurer LibreTranslate dans Docker et intégrer l'outil dans Open WebUI.

Configuration de LibreTranslate dans Docker
------------------------------------------

Pour configurer LibreTranslate dans Docker, suivez ces étapes :

### Étape 1 : Créer un fichier Docker Compose

Créez un nouveau fichier nommé `docker-compose.yml` dans un répertoire de votre choix. Ajoutez la configuration suivante au fichier :

```yml
services:
  libretranslate:
    container_name: libretranslate
    image: libretranslate/libretranslate:v1.6.0
    restart: unless-stopped
    ports:
      - "5000:5000"
    env_file:
      - stack.env
    volumes:
      - libretranslate_api_keys:/app/db
      - libretranslate_models:/home/libretranslate/.local:rw
    tty: true
    stdin_open: true
    healthcheck:
      test: [CMD-SHELL, ./venv/bin/python scripts/healthcheck.py]
      
volumes:
  libretranslate_models:
  libretranslate_api_keys:
```

### Étape 2 : Créer un fichier `stack.env`

Créez un nouveau fichier nommé `stack.env` dans le même répertoire que votre fichier `docker-compose.yml`. Ajoutez la configuration suivante au fichier :

```bash
# LibreTranslate
LT_DEBUG="false"
LT_UPDATE_MODELS="true"
LT_SSL="false"
LT_SUGGESTIONS="false"
LT_METRICS="false"
LT_HOST="0.0.0.0"

LT_API_KEYS="false"

LT_THREADS="12"
LT_FRONTEND_TIMEOUT="2000"
```

### Étape 3 : Exécuter le fichier Docker Compose

Exécutez la commande suivante pour démarrer le service LibreTranslate :

```bash
docker-compose up -d
```

Cela démarrera le service LibreTranslate en mode détaché.

Configuration de l'intégration dans Open WebUI
---------------------------------------------

Une fois que vous avez démarré LibreTranslate dans Docker, vous pouvez configurer son intégration dans Open WebUI. Plusieurs intégrations communautaires sont disponibles, notamment :

* [Fonction de Filtre LibreTranslate](https://openwebui.com/f/iamg30/libretranslate_filter)
* [Fonction d'Action LibreTranslate](https://openwebui.com/f/jthesse/libretranslate_action)
* [Fonction d'Action Multilingue LibreTranslate](https://openwebui.com/f/iamg30/multilanguage_libretranslate_action)
* [Pipeline de Filtrage LibreTranslate](https://github.com/open-webui/pipelines/blob/main/examples/filters/libretranslate_filter_pipeline.py)

Choisissez l'intégration qui correspond le mieux à vos besoins et suivez les instructions pour la configurer dans Open WebUI.

Langues prises en charge pour le pipeline et les fonctions LibreTranslate :
Pratiquement toutes les langues disponibles dans LibreTranslate, mais voici la liste :
```
Albanais, Arabe, Azerbaïdjanais, Bengali, Bulgare, Catalan, Valencien, Chinois, Tchèque, Danois, Néerlandais, Anglais, Flamand, Espéranto, Estonien, Finnois, Français, Allemand, Grec, Hébreu, Hindi, Hongrois, Indonésien, Irlandais, Italien, Japonais, Coréen, Letton, Lituanien, Malais, Persan, Polonais, Portugais, Roumain, Moldave, Russe, Slovaque, Slovène, Espagnol, Castillan, Suédois, Tagalog, Thaï, Turc, Ukrainien, Ourdou
```

Dépannage
----------

* Assurez-vous que le service LibreTranslate est en cours d'exécution et accessible.
* Vérifiez que la configuration de Docker est correcte.
* Consultez les journaux de LibreTranslate pour détecter d'éventuelles erreurs.

Avantages de l'intégration
--------------------------

Intégrer LibreTranslate à Open WebUI offre plusieurs avantages, notamment :

* Des capacités de traduction automatique pour un large éventail de langues.
* Une analyse et un traitement améliorés des textes.
* Des fonctionnalités accrues pour les tâches liées aux langues.

Conclusion
----------

Intégrer LibreTranslate à Open WebUI est un processus simple qui peut améliorer les fonctionnalités de votre instance Open WebUI. En suivant les étapes décrites dans cette documentation, vous pouvez configurer LibreTranslate dans Docker et intégrer l'outil dans Open WebUI.
