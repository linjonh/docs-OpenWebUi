---
sidebar_position: 4000
title: "🐤 Extraction de Documents Docling"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration sur la manière de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel pour contribuer.
:::

## 🐤 Extraction de Documents Docling

Cette documentation fournit un guide étape par étape pour intégrer Docling à Open WebUI. Docling est une bibliothèque de traitement de documents conçue pour transformer une large gamme de formats de fichiers, y compris les PDF, les documents Word, les feuilles de calcul, le HTML et les images, en données structurées telles que JSON ou Markdown. Avec un support intégré pour la détection de mise en page, l’analyse de tableaux et le traitement tenant compte de la langue, Docling simplifie la préparation des documents pour des applications d'IA comme la recherche, le résumé et la génération augmentée par récupération, le tout via une interface unifiée et extensible.

Prérequis
------------

* Instance Open WebUI
* Docker installé sur votre système
* Réseau Docker configuré pour Open WebUI

Étapes d'Intégration
----------------

### Étape 1 : Exécuter la commande Docker pour Docling-Serve

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

*Avec support GPU :
```bash
docker run --gpus all -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

### Étape 2 : Configurer Open WebUI pour utiliser Docling

* Connectez-vous à votre instance Open WebUI.
* Accédez au menu des paramètres du `Panneau d'Administration`.
* Cliquez sur `Paramètres`.
* Cliquez sur l'onglet `Documents`.
* Modifiez le menu déroulant du moteur d'extraction de contenu `Par défaut` en `Docling`.
* Mettez à jour l'URL du moteur d'extraction de contexte à `http://host.docker.internal:5001`.
* Enregistrez les modifications.

Vérification de Docling dans Docker
=====================================

Pour vérifier que Docling fonctionne correctement dans un environnement Docker, vous pouvez suivre ces étapes :

### 1. Démarrer le Conteneur Docker de Docling

Tout d'abord, assurez-vous que le conteneur Docker de Docling est en cours d'exécution. Vous pouvez le démarrer à l'aide de la commande suivante :

```bash
docker run -p 5001:5001 -e DOCLING_SERVE_ENABLE_UI=true quay.io/docling-project/docling-serve
```

Cette commande démarre le conteneur Docling et mappe le port 5001 du conteneur au port 5001 de votre machine locale.

### 2. Vérifier que le Serveur est Actif

* Allez à `http://127.0.0.1:5001/ui/` 
* L'URL devrait mener à une interface utilisateur pour utiliser Docling

### 3. Vérifier l'Intégration 

* Vous pouvez essayer de téléverser des fichiers via l'interface utilisateur, qui devrait renvoyer un résultat au format MD ou dans le format désiré

### Conclusion

Intégrer Docling avec Open WebUI est un moyen simple et efficace d'améliorer les capacités de traitement des documents et d'extraction de contenu. En suivant les étapes de ce guide, vous pouvez configurer Docling comme moteur d'extraction par défaut et vérifier son bon fonctionnement dans un environnement Docker. Une fois configuré, Docling permet une analyse robuste et indépendante du format des documents pour prendre en charge des fonctionnalités d'IA plus avancées dans Open WebUI.
