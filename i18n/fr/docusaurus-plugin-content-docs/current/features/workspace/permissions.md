---
sidebar_position: 3
title: "🔒 Autorisations"
---

La section `Autorisations` de l’`Espace de travail` dans Open WebUI permet aux administrateurs de configurer les contrôles d’accès et la disponibilité des fonctionnalités pour les utilisateurs. Ce système puissant permet un contrôle granulaire sur ce que les utilisateurs peuvent consulter et modifier dans l’application.

Les administrateurs peuvent gérer les autorisations de la manière suivante :

1. **Interface utilisateur :** La section Autorisations de l’Espace de travail fournit une interface graphique pour configurer les autorisations.
2. **Variables d’environnement :** Les autorisations peuvent être configurées à l’aide de variables d’environnement, enregistrées sous forme de variables `PersistentConfig`.
3. **Gestion des groupes :** Attribution des utilisateurs à des groupes avec des autorisations prédéfinies.

## Autorisations de l’espace de travail

Les autorisations de l’espace de travail contrôlent l’accès aux composants principaux de la plateforme Open WebUI :

* **Accès aux modèles** : Permettre ou non aux utilisateurs d’accéder et de gérer des modèles personnalisés. (Variable d’environnement : `USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS`)
* **Accès aux connaissances** : Permettre ou non aux utilisateurs d’accéder et de gérer des bases de connaissances. (Variable d’environnement : `USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS`)
* **Accès aux invites** : Permettre ou non aux utilisateurs d’accéder et de gérer des invites enregistrées. (Variable d’environnement : `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS`)
* **Accès aux outils** : Permettre ou non aux utilisateurs d’accéder et de gérer des outils. (Variable d’environnement : `USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS`) *Remarque : Activer cette option permet aux utilisateurs de télécharger du code arbitraire sur le serveur.*

## Autorisations de discussion

Les autorisations de discussion déterminent les actions que les utilisateurs peuvent effectuer dans les conversations :

* **Permettre les contrôles de discussion** : Activer ou non l’accès aux options de contrôle de discussion.
* **Permettre le téléversement de fichiers** : Autoriser ou non les utilisateurs à téléverser des fichiers pendant les discussions. (Variable d’environnement : `USER_PERMISSIONS_CHAT_FILE_UPLOAD`)
* **Permettre la suppression de discussions** : Autoriser ou non les utilisateurs à supprimer des conversations. (Variable d’environnement : `USER_PERMISSIONS_CHAT_DELETE`)
* **Permettre la modification de discussions** : Autoriser ou non les utilisateurs à modifier des messages dans les discussions. (Variable d’environnement : `USER_PERMISSIONS_CHAT_EDIT`)
* **Permettre les discussions temporaires** : Autoriser ou non les utilisateurs à créer des sessions de discussion temporaire. (Variable d’environnement : `USER_PERMISSIONS_CHAT_TEMPORARY`)

## Autorisations des fonctionnalités

Les autorisations des fonctionnalités contrôlent l’accès aux capacités spécialisées d’Open WebUI :

* **Recherche web** : Permettre ou non aux utilisateurs d’effectuer des recherches web pendant les discussions. (Variable d’environnement : `ENABLE_RAG_WEB_SEARCH`)
* **Génération d’images** : Permettre ou non aux utilisateurs de générer des images. (Variable d’environnement : `ENABLE_IMAGE_GENERATION`)
* **Interpréteur de code** : Permettre ou non aux utilisateurs d’utiliser la fonctionnalité d’interpréteur de code. (Variable d’environnement : `USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`)
* **Serveurs d’outils directs** : Permettre ou non aux utilisateurs de se connecter directement aux serveurs d’outils. (Variable d’environnement : `USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS`)

## Paramètres d’autorisation par défaut

Par défaut, Open WebUI applique les paramètres d’autorisation suivants :

**Autorisations de l’espace de travail :**
- Accès aux modèles : Désactivé (`USER_PERMISSIONS_WORKSPACE_MODELS_ACCESS=False`)
- Accès aux connaissances : Désactivé (`USER_PERMISSIONS_WORKSPACE_KNOWLEDGE_ACCESS=False`)
- Accès aux invites : Désactivé (`USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS=False`)
- Accès aux outils : Désactivé (`USER_PERMISSIONS_WORKSPACE_TOOLS_ACCESS=False`)

**Autorisations de discussion :**
- Permettre les contrôles de discussion : Activé
- Permettre le téléversement de fichiers : Activé (`USER_PERMISSIONS_CHAT_FILE_UPLOAD=True`)
- Permettre la suppression de discussion : Activé (`USER_PERMISSIONS_CHAT_DELETE=True`)
- Permettre la modification de discussion : Activé (`USER_PERMISSIONS_CHAT_EDIT=True`)
- Permettre les discussions temporaires : Activé (`USER_PERMISSIONS_CHAT_TEMPORARY=True`)

**Autorisations des fonctionnalités :**
- Recherche web : Activé (`ENABLE_RAG_WEB_SEARCH=True`)
- Génération d’images : Activé (`ENABLE_IMAGE_GENERATION=True`)
- Interpréteur de code : Activé (`USER_PERMISSIONS_FEATURES_CODE_INTERPRETER`)
- Serveurs d’outils directs : Désactivé (`USER_PERMISSIONS_FEATURES_DIRECT_TOOL_SERVERS=False`)

Les administrateurs peuvent modifier les autorisations par défaut dans l’interface utilisateur sous "utilisateurs" dans le panneau d’administration.

## Gestion des autorisations

Les administrateurs peuvent ajuster ces autorisations via l’interface utilisateur ou en configurant les variables d’environnement correspondantes dans la configuration. Toutes les variables d’environnement liées aux autorisations sont marquées comme variables `PersistentConfig`, ce qui signifie qu’elles sont enregistrées en interne après le premier lancement et peuvent être gérées via l’interface Open WebUI.

Cette flexibilité permet aux organisations de mettre en œuvre des politiques de sécurité tout en fournissant aux utilisateurs les outils dont ils ont besoin. Pour plus d’informations détaillées sur les variables d’environnement liées aux autorisations, consultez la documentation [Configuration des variables d’environnement](../../getting-started/env-configuration.md#workspace-permissions).
