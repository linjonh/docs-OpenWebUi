---
sidebar_position: 3
title: "🔎 Tutoriel Open WebUI RAG"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas soutenu par l'équipe Open WebUI. Il sert uniquement de démonstration pour montrer comment personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

# Tutoriel : Configuration de RAG avec Open WebUI Documentation

Dans ce tutoriel, vous apprendrez à utiliser **Retrieval-Augmented Generation (RAG)** avec Open WebUI pour charger une documentation réelle en tant que base de connaissances. Nous vous guiderons pour utiliser la dernière **Documentation Open WebUI** comme exemple pour cette configuration.

---

## Aperçu

### Qu'est-ce que RAG ?

Retrieval-Augmented Generation (RAG) combine des **LLMs** avec des **connaissances récupérées** à partir de sources externes. Le système récupère les données pertinentes des documents téléchargés ou des bases de connaissances, améliorant ainsi la qualité et la précision des réponses.

Ce tutoriel montre comment :

- Télécharger la dernière Documentation Open WebUI comme base de connaissances.
- La connecter à un modèle personnalisé.
- Interroger la base de connaissances pour une assistance améliorée.

---

## Configuration

### Configuration étape par étape : Documentation Open WebUI comme base de connaissances

Suivez ces étapes pour configurer RAG avec **Open WebUI Documentation** :

1. **Télécharger la documentation** :
   - Téléchargez la dernière documentation :
     [https://github.com/open-webui/docs/archive/refs/heads/main.zip](https://github.com/open-webui/docs/archive/refs/heads/main.zip)

2. **Extraire les fichiers** :
   - Extrayez le fichier `main.zip` pour obtenir tous les fichiers de documentation.

3. **Localiser les fichiers Markdown** :
   - Dans le dossier extrait, localisez tous les fichiers avec les extensions `.md` et `.mdx` (astuce : recherchez `*.md*`).

4. **Créer une base de connaissances** :
   - Allez dans **Espace de travail** > **Connaissances** > **+ Créer une base de connaissances**.
   - Nom : `Documentation Open WebUI`
   - Objet : **Assistance**

   > Cliquez sur **Créer une connaissance**.

5. **Télécharger les fichiers** :
   - Glissez et déposez les fichiers `.md` et `.mdx` du dossier extrait dans la base de connaissances **Documentation Open WebUI**.

---

## Créer et configurer le modèle

### Créer un modèle personnalisé avec la base de connaissances

1. **Naviguer vers les modèles** :
   - Allez dans **Espace de travail** > **Modèles** > **+ Ajouter un nouveau modèle**.

2. **Configurer le modèle** :
   - **Nom** : `Open WebUI`
   - **Modèle de base** : *(Sélectionnez le modèle Llama ou tout autre modèle disponible)*
   - **Source de connaissances** : Sélectionnez **Documentation Open WebUI** dans le menu déroulant.

3. **Enregistrer le modèle**.

---

## Exemples et utilisation

### Interroger le modèle Documentation Open WebUI

1. **Démarrer un nouveau chat** :
   - Accédez à **Nouveau chat** et sélectionnez le modèle `Open WebUI`.

2. **Exemples de requêtes** :

   ```
   Utilisateur : "Comment configurer les variables d'environnement ?"
   Système : "Consultez la Section 3.2 : Utilisez le fichier `.env` pour gérer les configurations."
   ```

   ```
   Utilisateur : "Comment mettre à jour Open WebUI en utilisant Docker ?"
   Système : "Consultez `docker/updating.md` : Utilisez `docker pull` et redémarrez le conteneur."
   ```

   Avec le modèle RAG, le système récupère les sections les plus pertinentes de la documentation pour répondre à votre requête.

---

## Prochaines étapes

### Prochaines étapes

- **Ajouter plus de connaissances** : Continuez à enrichir votre base de connaissances en ajoutant davantage de documents.

---

Avec cette configuration, vous pouvez utiliser efficacement la **Documentation Open WebUI** afin d'assister les utilisateurs en récupérant des informations pertinentes pour leurs requêtes. Amusez-vous à construire et interroger vos modèles personnalisés enrichis en connaissances !
