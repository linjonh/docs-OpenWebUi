---
sidebar_position: 2
title: "📚 Synthèses"
---

La section `Synthèses` de l'`Espace de travail` dans Open WebUI permet aux utilisateurs de créer, gérer et partager des synthèses personnalisées. Cette fonctionnalité facilite les interactions avec les modèles d'IA en permettant aux utilisateurs de sauvegarder des synthèses fréquemment utilisées et d'y accéder facilement via des commandes slash.

### Gestion des synthèses

L'interface Synthèses offre plusieurs fonctionnalités clés pour gérer vos synthèses personnalisées :

* **Créer** : Concevez de nouvelles synthèses avec des titres personnalisables, des niveaux d'accès et du contenu.
* **Partager** : Partagez des synthèses avec d'autres utilisateurs en fonction des permissions configurées.
* **Contrôle d'accès** : Définissez la visibilité et les permissions d'utilisation pour chaque synthèse (voir [Permissions](./permissions.md) pour plus de détails).
* **Commandes Slash** : Accédez rapidement aux synthèses en utilisant des commandes slash personnalisées lors des sessions de chat.

### Création et modification de synthèses

Lors de la création ou de la modification d'une synthèse, vous pouvez configurer les paramètres suivants :

* **Titre** : Donnez à votre synthèse un nom descriptif pour une identification facile.
* **Accès** : Définissez le niveau d'accès pour contrôler qui peut voir et utiliser la synthèse.
* **Commande** : Définissez une commande slash qui déclenchera la synthèse (par exemple, `/résumer`).
* **Contenu de la synthèse** : Rédigez le texte réel de la synthèse qui sera envoyé au modèle.

### Variables des synthèses

Open WebUI prend en charge les variables dynamiques de synthèse qui peuvent être incluses dans vos synthèses :

* **Contenu du presse-papiers** : Utilisez `{{CLIPBOARD}}` pour insérer le contenu de votre presse-papiers.
* **Date et heure** :
  * `{{CURRENT_DATE}}` : Date actuelle
  * `{{CURRENT_DATETIME}}` : Date et heure actuelles
  * `{{CURRENT_TIME}}` : Heure actuelle
  * `{{CURRENT_TIMEZONE}}` : Fuseau horaire actuel
  * `{{CURRENT_WEEKDAY}}` : Jour de la semaine actuel
* **Informations utilisateur** :
  * `{{USER_NAME}}` : Nom de l'utilisateur actuel
  * `{{USER_LANGUAGE}}` : Langue sélectionnée par l'utilisateur
  * `{{USER_LOCATION}}` : Localisation de l'utilisateur (nécessite une connexion HTTPS et l'activation via Paramètres > Interface)

### Directives d'utilisation des variables

* Entourez les variables avec double accolades : `{{variable}}`
* La variable `{{USER_LOCATION}}` nécessite :
  * Une connexion HTTPS sécurisée
  * L'activation de la fonctionnalité dans les Paramètres > Interface
* La variable `{{CLIPBOARD}}` nécessite une autorisation d'accès au presse-papiers depuis votre appareil

### Contrôle d'accès et permissions

La gestion des synthèses est contrôlée par les paramètres de permission suivants :

* **Accès aux synthèses** : Les utilisateurs ont besoin de la permission `USER_PERMISSIONS_WORKSPACE_PROMPTS_ACCESS` pour créer et gérer des synthèses.
* Pour des informations détaillées sur la configuration des permissions, consultez la [documentation des permissions](./permissions.md).

### Bonnes pratiques

* Utilisez des titres clairs et descriptifs pour vos synthèses
* Créez des commandes slash intuitives qui reflètent l'objectif de la synthèse
* Documentez toute exigence spécifique ou entrée attendue dans la description de la synthèse
* Testez les synthèses avec différentes combinaisons de variables pour vous assurer qu'elles fonctionnent comme prévu
* Considérez attentivement les niveaux d'accès lorsque vous partagez les synthèses avec d'autres utilisateurs - un partage public signifie qu'elles apparaîtront automatiquement pour tous les utilisateurs lorsqu'ils tapent `/` dans un chat, évitez donc d'en créer trop.
