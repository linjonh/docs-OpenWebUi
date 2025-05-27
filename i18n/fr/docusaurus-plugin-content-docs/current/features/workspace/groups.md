---
sidebar_position: 3
title: "🔐 Groupes"
---

Les groupes permettent aux administrateurs de
* attribuer des autorisations à plusieurs utilisateurs en une seule fois, simplifiant ainsi la gestion des accès
* limiter l'accès à des ressources spécifiques (Modèles, Outils, etc.) en définissant leur accès comme "privé" puis en ouvrant l'accès à des groupes spécifiques
* spécifier l'accès à une ressource pour un groupe en tant que "lecture" ou "écriture" (l'accès en écriture implique l'accès en lecture)

:::info
Notez que le modèle d'autorisations est permissif. Si un utilisateur est membre de deux groupes qui définissent des autorisations différentes pour une ressource, l'autorisation la plus permissive est appliquée.
:::

### Structure du Groupe

Chaque groupe dans Open WebUI contient :

* Un identifiant unique
* Un nom et une description
* Une référence au propriétaire/créateur
* Liste des identifiants des utilisateurs membres
* Configuration des autorisations
* Métadonnées supplémentaires

### Gestion des Groupes

Les groupes peuvent être :

* **Créés manuellement** par les administrateurs via l'interface utilisateur
* **Synchronisés automatiquement** avec des fournisseurs OAuth lorsque `ENABLE_OAUTH_GROUP_MANAGEMENT` est activé
* **Créés automatiquement** à partir des revendications OAuth lorsque `ENABLE_OAUTH_GROUP_MANAGEMENT` et `ENABLE_OAUTH_GROUP_CREATION`
  sont activés

### Intégration des Groupes via OAuth

Lorsque la gestion des groupes OAuth est activée, les appartenances des utilisateurs aux groupes sont synchronisées avec les groupes reçus dans les revendications OAuth :

* Les utilisateurs sont ajoutés aux groupes Open WebUI correspondant à leurs revendications OAuth
* Les utilisateurs sont retirés des groupes absents dans leurs revendications OAuth
* Avec `ENABLE_OAUTH_GROUP_CREATION` activé, les groupes issus des revendications OAuth qui n'existent pas dans Open WebUI sont automatiquement
  créés

## Permissions des Groupes

Les groupes peuvent être utilisés pour rendre un ensemble d'autorisations accessibles aux utilisateurs. Par exemple, un groupe pourrait être créé pour les "Scientifiques de données" qui dispose d'un accès en lecture et écriture à tous les modèles, bases de connaissances et outils.

## Contrôle d'Accès aux Ressources pour les Groupes

Open WebUI implémente un contrôle d'accès granulaire pour des ressources telles que les modèles, bases de connaissances, invites et outils. L'accès peut être
contrôlé au niveau de l'utilisateur et du groupe.

Pour activer le contrôle d'accès à une ressource, définissez son accès à "privé" puis ouvrez l'accès à des groupes spécifiques.

### Structure du Contrôle d'Accès

Les ressources comme les bases de connaissances utilisent une structure de contrôle d'accès qui spécifie les autorisations de lecture et d'écriture pour les utilisateurs
et les groupes :

```json
{
  "read": {
    "group_ids": ["group_id1", "group_id2"],
    "user_ids": ["user_id1", "user_id2"]
  },
  "write": {
    "group_ids": ["group_id1", "group_id2"],
    "user_ids": ["user_id1", "user_id2"]
  }
}
```

Cette structure permet un contrôle précis pour déterminer qui peut consulter et modifier des ressources spécifiques.
