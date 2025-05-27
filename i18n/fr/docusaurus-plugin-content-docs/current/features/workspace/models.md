---
sidebar_position: 0
title: "🤖 Modèles"
---

La section `Modèles` de l'`Espace de travail` dans Open WebUI est un outil puissant qui vous permet de créer et de gérer des modèles personnalisés adaptés à des finalités spécifiques. Cette section sert de plaque tournante centrale pour tous vos fichiers modèles, offrant une gamme de fonctionnalités pour modifier, cloner, partager, exporter et masquer vos modèles.

### Gestion des fichiers modèles

Depuis la section `Modèles`, vous pouvez effectuer les actions suivantes sur vos fichiers modèles :

* **Modifier** : Plongez dans les détails de votre fichier modèle et apportez des modifications à son caractère et plus encore.
* **Cloner** : Créez une copie d'un fichier modèle, qui sera suffixée avec `-clone` à l'`ID du Modèle` cloné. Notez que vous ne pouvez pas cloner un modèle de base ; vous devez d'abord créer un modèle avant de le cloner.
* **Partager** : Partagez votre fichier modèle avec la communauté Open WebUI en cliquant sur le bouton `Partager`, qui vous redirigera vers [https://openwebui.com/models/create](https://openwebui.com/models/create).
* **Exporter** : Téléchargez l'exportation `.json` du fichier modèle sur votre PC.
* **Masquer** : Masquez le fichier modèle dans la liste déroulante du sélecteur de modèles dans les chats.

### Modification des fichiers modèles

Lors de la modification d'un fichier modèle, vous pouvez personnaliser les paramètres suivants :

* **Photo de l'avatar** : Téléchargez une photo d'avatar pour représenter votre fichier modèle.
* **Nom du modèle** : Changez le nom de votre fichier modèle.
* **Invite système** : Fournissez une invite système facultative pour votre fichier modèle.
* **Paramètres du modèle** : Ajustez les paramètres de votre fichier modèle.
* **Suggestions d'invites** : Ajoutez des invites qui seront affichées sur une nouvelle page de chat vierge.
* **Documents** : Ajoutez des documents au fichier modèle (toujours RAG [Retrieval Augmented Generation]).
* **Outils, filtres et actions** : Sélectionnez les outils, filtres et actions qui seront disponibles pour le fichier modèle.
* **Vision** : Activez ou non la fonction `Vision` pour les multi-modaux.
* **Tags** : Ajoutez des tags au fichier modèle qui seront affichés à côté du nom du modèle dans la liste déroulante du sélecteur de modèles.

### Découverte et import/export des modèles

La section `Modèles` inclut également des fonctionnalités pour l'importation et l'exportation de modèles :

* **Importer des modèles** : Utilisez ce bouton pour importer des modèles à partir d'un fichier .json ou d'autres sources.
* **Exporter des modèles** : Utilisez ce bouton pour exporter tous vos fichiers modèles dans un seul fichier .json.

Pour télécharger des modèles, naviguez vers les **Paramètres Ollama** dans l'onglet Connexions.
Alternativement, vous pouvez également télécharger des modèles directement en tapant une commande telle que `ollama run hf.co/[créateur du modèle]/[nom du modèle]` dans la liste déroulante du sélecteur de modèles.
Cette action créera un bouton intitulé "Pull [Nom du modèle]" pour le téléchargement.

### Changement de modèle

   **Exemple** : Passer entre **Mistral**, **LLaVA**, et **GPT-3.5** dans une tâche multi-étapes

* **Scénario** : Une conversation multi-étapes implique différents types de tâches, comme commencer par une FAQ simple, interpréter une image, puis générer une réponse créative.
* **Raison de changer** : L'utilisateur peut tirer parti des forces spécifiques de chaque modèle pour chaque étape :
  * **Mistral** pour les questions générales afin de réduire le temps de calcul et les coûts.
  * **LLaVA** pour les tâches visuelles afin d'obtenir des informations à partir de données basées sur des images.
  * **GPT-3.5** pour générer un langage plus sophistiqué et nuancé.
* **Processus** : L'utilisateur passe entre les modèles, en fonction du type de tâche, pour maximiser l'efficacité et la qualité des réponses.

    **Comment faire :**
    1. **Sélectionnez le modèle** : Dans l'interface de chat, sélectionnez les modèles souhaités dans la liste déroulante du sélecteur de modèles. Vous pouvez sélectionner jusqu'à deux modèles simultanément, et les deux réponses seront générées. Vous pouvez ensuite naviguer entre elles à l'aide des flèches avant et arrière.
    2. **Préservation du contexte** : Open WebUI conserve le contexte de la conversation lors des changements de modèles, permettant des transitions fluides.
