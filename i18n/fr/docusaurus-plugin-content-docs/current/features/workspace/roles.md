---
sidebar_position: 3
title: "🔑 Rôles"
---

Open WebUI met en œuvre un système structuré de contrôle d'accès basé sur les rôles avec trois principaux rôles utilisateur :

| **Rôle**        | **Description**                                   | **Création Par Défaut**          |
|-----------------|--------------------------------------------------|----------------------------------|
| Administrateur  | Administrateur système avec contrôle total       | Premier compte utilisateur       |
| Utilisateur Régulier | Utilisateur standard avec autorisations limitées | Utilisateurs approuvés suivants  |
| En Attente      | Utilisateur non approuvé en attente d'activation par un administrateur | Nouvelles inscriptions (configurable) |

### Attribution des Rôles

* **Premier Utilisateur :** Le premier compte créé sur une nouvelle instance d'Open WebUI reçoit automatiquement
  les privilèges d'Administrateur.
* **Utilisateurs Suivants :** Les nouveaux utilisateurs inscrits se voient attribuer un rôle par défaut basé sur la configuration
  de `DEFAULT_USER_ROLE`.

Le rôle par défaut des nouvelles inscriptions peut être configuré en utilisant la variable d'environnement `DEFAULT_USER_ROLE` :

```.dotenv
DEFAULT_USER_ROLE=pending  # Options : pending, user, admin
```

Lorsqu'elle est définie sur "pending", les nouveaux utilisateurs doivent être approuvés manuellement par un administrateur avant d'obtenir l'accès au système.

## Groupes d'Utilisateurs

Les groupes permettent aux administrateurs de
* attribuer des autorisations à plusieurs utilisateurs à la fois, simplifiant ainsi la gestion des accès
* limiter l'accès à des ressources spécifiques (Modèles, Outils, etc.) en définissant leur accès en tant que "privé", puis en
ouvrant l'accès à des groupes spécifiques
* L'accès d'un groupe à une ressource peut être défini comme "lecture" ou "écriture"

### Structure des Groupes

Chaque groupe dans Open WebUI contient :

* Un identifiant unique
* Un nom et une description
* Une référence du propriétaire/créateur
* Une liste des identifiants des utilisateurs membres
* Une configuration des autorisations
* Des métadonnées supplémentaires

### Gestion des Groupes

Les groupes peuvent être :

* **Créés manuellement** par les administrateurs via l'interface utilisateur
* **Synchronisés automatiquement** depuis les fournisseurs OAuth lorsque `ENABLE_OAUTH_GROUP_MANAGEMENT` est activé
* **Créés automatiquement** à partir des revendications OAuth lorsque `ENABLE_OAUTH_GROUP_MANAGEMENT` et
`ENABLE_OAUTH_GROUP_CREATION` sont activés

### Intégration des Groupes OAuth

Lorsque la gestion des groupes OAuth est activée, les appartenances aux groupes des utilisateurs sont synchronisées avec les groupes reçus dans les revendications OAuth :

* Les utilisateurs sont ajoutés aux groupes Open WebUI correspondant à leurs revendications OAuth
* Les utilisateurs sont retirés des groupes non présents dans leurs revendications OAuth
* Avec `ENABLE_OAUTH_GROUP_CREATION` activé, les groupes provenant des revendications OAuth qui n'existent pas dans
Open WebUI sont automatiquement créés
