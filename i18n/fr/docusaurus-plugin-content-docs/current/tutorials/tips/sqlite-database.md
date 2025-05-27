---
sidebar_position: 11
title: "💠 Aperçu de la base de données SQLite"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas soutenu par l'équipe Open WebUI. Il sert uniquement à démontrer comment personnaliser Open WebUI pour vos cas d'utilisation spécifiques. Vous souhaitez contribuer ? Consultez le tutoriel pour contribuer.
:::

> [!WARNING]  
> Cette documentation a été créée à partir de la version actuelle (0.5.11) et est continuellement mise à jour.

# Base de données SQLite interne de Open-WebUI

Pour Open-WebUI, la base de données SQLite sert de colonne vertébrale pour la gestion des utilisateurs, l'historique de chat, le stockage de fichiers et diverses autres fonctionnalités de base. Comprendre cette structure est essentiel pour quiconque souhaite contribuer ou maintenir efficacement le projet.

## Emplacement interne de SQLite

Vous pouvez trouver la base de données SQLite à `root` -> `data` -> `webui.db`

```
📁 Root (/)
├── 📁 data
│   ├── 📁 cache
│   ├── 📁 uploads
│   ├── 📁 vector_db
│   └── 📄 webui.db
├── 📄 dev.sh
├── 📁 open_webui
├── 📄 requirements.txt
├── 📄 start.sh
└── 📄 start_windows.bat
```

## Copier la base de données localement

Si vous souhaitez copier la base de données SQLite Open-WebUI exécutée dans le conteneur sur votre machine locale, vous pouvez utiliser :

```bash
docker cp open-webui:/app/backend/data/webui.db ./webui.db
```

Alternativement, vous pouvez accéder à la base de données dans le conteneur en utilisant :

```bash
docker exec -it open-webui /bin/sh
```

## Aperçu des tables

Voici une liste complète des tables de la base de données SQLite de Open-WebUI. Les tables sont listées par ordre alphabétique et numérotées pour plus de commodité.

| **N°** | **Nom de la table**   | **Description**                                              |
| ------- | -------------------- | ----------------------------------------------------------- |
| 01      | auth                | Stocke les informations d'authentification et de connexion des utilisateurs |
| 02      | channel             | Gère les canaux de chat et leurs configurations             |
| 03      | channel_member      | Suit l'appartenance des utilisateurs et les permissions dans les canaux |
| 04      | chat                | Stocke les sessions de chat et leurs métadonnées            |
| 05      | chatidtag           | Associe les relations entre les chats et leurs tags associés |
| 06      | config              | Conserve les paramètres de configuration système            |
| 07      | document            | Stocke les documents et leurs métadonnées pour la gestion des connaissances |
| 08      | feedback            | Capture les retours et évaluations des utilisateurs         |
| 09      | file                | Gère les fichiers téléchargés et leurs métadonnées          |
| 10      | folder              | Organise les fichiers et le contenu dans des structures hiérarchiques      |
| 11      | function            | Stocke des fonctions personnalisées et leurs configurations       |
| 12      | group               | Gère les groupes d'utilisateurs et leurs permissions               |
| 13      | knowledge           | Stocke les entrées de la base de connaissances et les informations associées            |
| 14      | memory              | Conserve l'historique des chats et la mémoire contextuelle                   |
| 15      | message             | Stocke les messages de chat individuels et leur contenu                     |
| 16      | message_reaction    | Enregistre les réactions des utilisateurs (émoticônes/réponses) aux messages        |
| 17      | migrate_history     | Suit la version du schéma de base de données et les enregistrements de migration         |
| 18      | model               | Gère les configurations et paramètres des modèles d'IA                |
| 19      | prompt              | Stocke les modèles et configurations pour les invites AI           |
| 20      | tag                 | Gère les tags/labels pour la catégorisation du contenu               |
| 21      | tool                | Stocke les configurations des outils système et des intégrations      |
| 22      | user                | Conserve les profils d'utilisateurs et les informations de compte              |

Remarque : Il existe deux tables supplémentaires dans la base de données SQLite de Open-WebUI qui ne sont pas liées aux fonctionnalités de base de Open-WebUI, et qui ont été exclues :

- Table de version Alembic
- Table d'historique de migration

Maintenant que nous avons toutes les tables, comprenons la structure de chaque table.

## Table Auth

| **Nom de colonne**  | **Type de données** | **Contraintes**   | **Description**     |
| ------------------- | ------------------ | ----------------- | ------------------- |
| id                 | String             | PRIMARY KEY       | Identifiant unique  |
| email              | String             | -                 | Email de l'utilisateur |
| password           | Text               | -                 | Mot de passe haché  |
| active             | Boolean            | -                 | Statut du compte    |

Informations importantes sur la table auth :

- Utilise UUID pour la clé primaire
- Relation un-à-un avec la table `users` (id partagé)

## Table Channel

| **Nom de colonne**  | **Type de données** | **Contraintes**   | **Description**                     |
| ------------------- | ------------------ | ----------------- | ----------------------------------- |
| id              | Text          | PRIMARY KEY     | Identifiant unique (UUID)                  |
| user_id         | Text          | -               | Propriétaire/créateur du canal             |
| type            | Text          | nullable        | Type de canal                              |
| name            | Text          | -               | Nom du canal                               |
| description     | Text          | nullable        | Description du canal                       |
| data            | JSON          | nullable        | Stockage flexible de données               |
| meta            | JSON          | nullable        | Métadonnées du canal                       |
| access_control  | JSON          | nullable        | Paramètres des permissions                 |
| created_at      | BigInteger    | -               | Horodatage de création (nanosecondes)      |
| updated_at      | BigInteger    | -               | Dernière mise à jour (nanosecondes)        |

Points importants concernant la table d'authentification :

- Utilise UUID comme clé primaire
- Noms de canaux insensibles à la casse (stockés en minuscules)

## Table des membres du canal

| **Nom de colonne** | **Type de données** | **Contraintes** | **Description**                            |
| ----------------- | ------------------- | --------------- | ------------------------------------------ |
| id                | TEXT                | NOT NULL        | Identifiant unique de l'adhésion au canal  |
| channel_id        | TEXT                | NOT NULL        | Référence au canal                         |
| user_id           | TEXT                | NOT NULL        | Référence à l'utilisateur                  |
| created_at        | BIGINT              | -               | Horodatage de la création de l'adhésion    |

## Table de chat

| **Nom de colonne** | **Type de données** | **Contraintes**         | **Description**             |
| ----------------- | ------------------- | ----------------------- | --------------------------- |
| id                | String              | PRIMARY KEY             | Identifiant unique (UUID)   |
| user_id           | String              | -                       | Propriétaire du chat        |
| title             | Text                | -                       | Titre du chat               |
| chat              | JSON                | -                       | Contenu et historique du chat |
| created_at        | BigInteger          | -                       | Horodatage de création      |
| updated_at        | BigInteger          | -                       | Dernière mise à jour        |
| share_id          | Text                | UNIQUE, nullable        | Identifiant unique de partage |
| archived          | Boolean             | default=False           | Statut d'archivage          |
| pinned            | Boolean             | default=False, nullable | Statut d'épinglage          |
| meta              | JSON                | server_default="{}"     | Métadonnées incluant des tags |
| folder_id         | Text                | nullable                | Identifiant du dossier parent |

## Table d'identification des tags de chat

| **Nom de colonne** | **Type de données** | **Contraintes** | **Description**       |
| ----------------- | ------------------- | --------------- | --------------------- |
| id                | VARCHAR(255)        | NOT NULL        | Identifiant unique    |
| tag_name          | VARCHAR(255)        | NOT NULL        | Nom du tag            |
| chat_id           | VARCHAR(255)        | NOT NULL        | Référence au chat     |
| user_id           | VARCHAR(255)        | NOT NULL        | Référence à l'utilisateur |
| timestamp         | INTEGER             | NOT NULL        | Horodatage de création |

## Configuration

| **Nom de colonne** | **Type de données** | **Contraintes** | **Valeur par défaut** | **Description**        |
| ----------------- | ------------------- | ---------------- | --------------------- | ---------------------- |
| id                | INTEGER             | NOT NULL         | -                     | Identifiant de clé primaire |
| data              | JSON                | NOT NULL         | -                     | Données de configuration |
| version           | INTEGER             | NOT NULL         | -                     | Numéro de version de la configuration |
| created_at        | DATETIME            | NOT NULL         | CURRENT_TIMESTAMP     | Horodatage de création |
| updated_at        | DATETIME            | -                | CURRENT_TIMESTAMP     | Dernière mise à jour    |

## Table de feedback

| **Nom de colonne** | **Type de données** | **Contraintes** | **Description**                    |
| ----------------- | ------------------- | --------------- | ---------------------------------- |
| id                | Text                | PRIMARY KEY     | Identifiant unique (UUID)          |
| user_id           | Text                | -               | Utilisateur ayant donné le feedback |
| version           | BigInteger          | default=0       | Numéro de version du feedback      |
| type              | Text                | -               | Type de feedback                   |
| data              | JSON                | nullable        | Données du feedback incluant des évaluations |
| meta              | JSON                | nullable        | Métadonnées (arène, chat_id, etc.) |
| snapshot          | JSON                | nullable        | Capture d'écran associée au chat    |
| created_at      | BigInteger    | -               | Horodatage de création               |
| updated_at      | BigInteger    | -               | Horodatage de la dernière mise à jour |

# Table des fichiers

| **Nom de colonne** | **Type de données** | **Contraintes** | **Description**        |
| ------------------ | ------------------- | --------------- | ---------------------- |
| id                | String              | PRIMARY KEY     | Identifiant unique     |
| user_id           | String              | -               | Propriétaire du fichier|
| hash              | Text                | nullable        | Hachage/somme de contrôle du fichier |
| filename          | Text                | -               | Nom du fichier         |
| path              | Text                | nullable        | Chemin dans le système de fichiers |
| data              | JSON                | nullable        | Données associées au fichier      |
| meta              | JSON                | nullable        | Métadonnées du fichier |
| access_control    | JSON                | nullable        | Paramètres de permissions         |
| created_at        | BigInteger          | -               | Horodatage de création    |
| updated_at        | BigInteger          | -               | Horodatage de la dernière mise à jour |

Structure attendue pour le champ `meta`:

```python
{
    "name": string,          # Nom d'affichage facultatif
    "content_type": string,  # Type MIME
    "size": integer,         # Taille du fichier en octets
    # Métadonnées supplémentaires prises en charge via ConfigDict(extra="allow")
}
```

## Table des dossiers

| **Nom de colonne** | **Type de données** | **Contraintes** | **Description**                |
| ------------------ | ------------------- | --------------- | ------------------------------ |
| id                | Text                | PRIMARY KEY     | Identifiant unique (UUID)       |
| parent_id         | Text                | nullable        | ID du dossier parent pour la hiérarchie |
| user_id           | Text                | -               | Propriétaire du dossier         |
| name              | Text                | -               | Nom du dossier                  |
| items             | JSON                | nullable        | Contenu du dossier              |
| meta              | JSON                | nullable        | Métadonnées du dossier          |
| is_expanded       | Boolean             | default=False   | État d'expansion de l'interface utilisateur |
| created_at        | BigInteger          | -               | Horodatage de création          |
| updated_at        | BigInteger          | -               | Horodatage de la dernière mise à jour |

Points importants à savoir sur la table des dossiers:

- Les dossiers peuvent être imbriqués (référence parent_id)
- Les dossiers racine ont un parent_id nul
- Les noms de dossiers doivent être uniques dans le même parent

## Table des fonctions

| **Nom de colonne** | **Type de données** | **Contraintes** | **Description**           |
| ------------------ | ------------------- | --------------- | ------------------------- |
| id                | String              | PRIMARY KEY     | Identifiant unique         |
| user_id           | String              | -               | Propriétaire de la fonction|
| name              | Text                | -               | Nom de la fonction         |
| type              | Text                | -               | Type de fonction           |
| content           | Text                | -               | Contenu/code de la fonction |
| meta              | JSON                | -               | Métadonnées de la fonction |
| valves            | JSON                | -               | Paramètres de contrôle de la fonction |
| is_active         | Boolean             | -               | État actif de la fonction  |
| is_global         | Boolean             | -               | Indicateur de disponibilité globale |
| created_at        | BigInteger          | -               | Horodatage de création     |
| updated_at        | BigInteger          | -               | Horodatage de la dernière mise à jour |

Points importants à savoir sur la table des dossiers:

- `type` ne peut être que: ["filter", "action"]

## Table des groupes

| **Nom de colonne** | **Type de données** | **Contraintes** | **Description**            |
| ------------------ | ------------------- | --------------- | -------------------------- |
| id                | Text                | PRIMARY KEY, UNIQUE | Identifiant unique (UUID) |
| user_id           | Text                | -                   | Propriétaire/créateur du groupe |
| name              | Text                | -                   | Nom du groupe             |
| description       | Text                | -                   | Description du groupe      |
| data              | JSON                | nullable            | Données supplémentaires du groupe |
| meta              | JSON                | nullable            | Métadonnées du groupe      |
| permissions       | JSON                | nullable            | Configuration des permissions |
| user_ids          | JSON                | nullable            | Liste des ID des utilisateurs membres |
| created_at        | BigInteger          | -                   | Horodatage de création     |
| updated_at        | BigInteger          | -                   | Horodatage de la dernière mise à jour |

## Table des connaissances

| **Nom de colonne** | **Type de données** | **Contraintes**     | **Description**            |
| ------------------ | ------------------- | ------------------- | -------------------------- |
| id              | Texte         | PRIMARY KEY, UNIQUE | Identifiant unique (UUID)          |
| user_id         | Texte         | -                   | Propriétaire de la base de connaissances |
| name            | Texte         | -                   | Nom de la base de connaissances    |
| description     | Texte         | -                   | Description de la base de connaissances |
| data            | JSON          | nullable            | Contenu de la base de connaissances |
| meta            | JSON          | nullable            | Métadonnées supplémentaires        |
| access_control  | JSON          | nullable            | Règles de contrôle d'accès         |
| created_at      | BigInteger    | -                   | Timestamp de création              |
| updated_at      | BigInteger    | -                   | Timestamp de la dernière mise à jour |

La structure attendue des champs `access_control`:

```python
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

## Table Mémoire

| **Nom de Colonne** | **Type de Donnée** | **Contraintes** | **Description**              |
| ------------------- | ------------------ | --------------- | ---------------------------- |
| id                 | String             | PRIMARY KEY     | Identifiant unique (UUID)    |
| user_id            | String             | -               | Propriétaire de la mémoire   |
| content            | Texte              | -               | Contenu de la mémoire        |
| created_at         | BigInteger         | -               | Timestamp de création        |
| updated_at         | BigInteger         | -               | Timestamp de la dernière mise à jour |

## Table Messages

| **Nom de Colonne** | **Type de Donnée** | **Contraintes** | **Description**                     |
| ------------------- | ------------------ | --------------- | ----------------------------------- |
| id                 | Texte              | PRIMARY KEY     | Identifiant unique (UUID)            |
| user_id            | Texte              | -               | Auteur du message                   |
| channel_id         | Texte              | nullable        | Canal associé                       |
| parent_id          | Texte              | nullable        | Message parent pour les threads     |
| content            | Texte              | -               | Contenu du message                  |
| data               | JSON               | nullable        | Données supplémentaires du message  |
| meta               | JSON               | nullable        | Métadonnées du message              |
| created_at         | BigInteger         | -               | Timestamp de création (nanosecondes) |
| updated_at         | BigInteger         | -               | Timestamp de la dernière mise à jour (nanosecondes) |

## Table Réactions Messages

| **Nom de Colonne** | **Type de Donnée** | **Contraintes** | **Description**              |
| ------------------- | ------------------ | --------------- | ---------------------------- |
| id                 | Texte              | PRIMARY KEY     | Identifiant unique (UUID)    |
| user_id            | Texte              | -               | Utilisateur ayant réagi      |
| message_id         | Texte              | -               | Message associé              |
| name               | Texte              | -               | Nom/réaction émoji           |
| created_at         | BigInteger         | -               | Timestamp de la réaction     |

## Table Modèles

| **Nom de Colonne** | **Type de Donnée** | **Contraintes** | **Description**          |
| ------------------- | ------------------ | --------------- | ------------------------ |
| id                 | Texte              | PRIMARY KEY     | Identifiant du modèle    |
| user_id            | Texte              | -               | Propriétaire du modèle   |
| base_model_id      | Texte              | nullable        | Référence du modèle parent |
| name               | Texte              | -               | Nom d'affichage          |
| params             | JSON               | -               | Paramètres du modèle     |
| meta               | JSON               | -               | Métadonnées du modèle    |
| access_control     | JSON               | nullable        | Permissions d'accès      |
| is_active          | Boolean            | default=True    | Statut actif            |
| created_at         | BigInteger         | -               | Timestamp de création    |
| updated_at         | BigInteger         | -               | Timestamp de la dernière mise à jour |

## Table Requêtes

| **Nom de Colonne** | **Type de Donnée** | **Contraintes** | **Description**             |
| ------------------- | ------------------ | --------------- | --------------------------- |
| command            | String             | PRIMARY KEY     | Identifiant unique de commande |
| user_id            | String             | -               | Propriétaire de la requête   |
| title              | Texte              | -               | Titre de la requête          |
| content            | Texte              | -               | Contenu/modèle de la requête |
| timestamp          | BigInteger         | -               | Timestamp de la dernière mise à jour |
| access_control     | JSON               | nullable        | Permissions d'accès          |

## Table Tags

| **Nom de la Colonne** | **Type de Donnée** | **Contraintes** | **Description**                |
| --------------------- | ------------------ | --------------- | ----------------------------- |
| id                    | String             | PK (composite)  | Identifiant normalisé de tag  |
| name                  | String             | -               | Nom affiché                  |
| user_id               | String             | PK (composite)  | Propriétaire du tag          |
| meta                  | JSON               | nullable        | Métadonnées du tag           |

Informations importantes sur la table des tags :

- La clé primaire est composite (id, user_id)

## Table des Outils

| **Nom de la Colonne** | **Type de Donnée** | **Contraintes** | **Description**          |
| --------------------- | ------------------ | --------------- | ------------------------ |
| id                    | String             | PRIMARY KEY     | Identifiant unique       |
| user_id               | String             | -               | Propriétaire de l'outil  |
| name                  | Text               | -               | Nom de l'outil           |
| content               | Text               | -               | Contenu/code de l'outil  |
| specs                 | JSON               | -               | Spécifications de l'outil|
| meta                  | JSON               | -               | Métadonnées de l'outil   |
| valves                | JSON               | -               | Paramètres de contrôle   |
| access_control        | JSON               | nullable        | Permissions d'accès      |
| created_at            | BigInteger         | -               | Date de création         |
| updated_at            | BigInteger         | -               | Date de dernière mise à jour |

## Table des Utilisateurs

| **Nom de la Colonne**   | **Type de Donnée** | **Contraintes**  | **Description**               |
| ----------------------- | ------------------ | ---------------- | ---------------------------  |
| id                      | String             | PRIMARY KEY      | Identifiant unique           |
| name                    | String             | -                | Nom de l'utilisateur         |
| email                   | String             | -                | Email de l'utilisateur       |
| role                    | String             | -                | Rôle de l'utilisateur        |
| profile_image_url       | Text               | -                | Chemin de l'image de profil  |
| last_active_at          | BigInteger         | -                | Dernière activité            |
| updated_at              | BigInteger         | -                | Date de dernière mise à jour |
| created_at              | BigInteger         | -                | Date de création             |
| api_key                 | String             | UNIQUE, nullable | Clé d'authentification API   |
| settings                | JSON               | nullable         | Préférences de l'utilisateur|
| info                    | JSON               | nullable         | Informations supplémentaires |
| oauth_sub               | Text               | UNIQUE           | Identifiant sujet OAuth      |

# Diagramme de Relation d'Entités

Pour visualiser les relations entre les tables, référez-vous au diagramme de relation d'entités (ERD) ci-dessous généré avec Mermaid.

```mermaid
erDiagram
    %% Utilisateur et Authentification
    user ||--o{ auth : "a"
    user ||--o{ chat : "possède"
    user ||--o{ channel : "possède"
    user ||--o{ message : "crée"
    user ||--o{ folder : "possède"
    user ||--o{ file : "possède"
    user ||--o{ feedback : "donne"
    user ||--o{ function : "gère"
    user ||--o{ group : "gère"
    user ||--o{ knowledge : "gère"
    user ||--o{ memory : "possède"
    user ||--o{ model : "gère"
    user ||--o{ prompt : "crée"
    user ||--o{ tag : "crée"
    user ||--o{ tool : "gère"

    %% Relations de Contenu
    message ||--o{ message_reaction : "a"
    chat ||--o{ tag : "tagué par"
    chat }|--|| folder : "organisé dans"
    channel ||--o{ message : "contient"
    message ||--o{ message : "répond"

    user {
        string id PK
        string name
        string email
        string role
        text profile_image_url
        bigint last_active_at
        string api_key
        json settings
        json info
        text oauth_sub
    }

    auth {
        string id PK
        string email
        text password
        boolean active
    }

    chat {
        string id PK
        string user_id FK
        string title
        json chat
        text share_id
        boolean archived
        boolean pinned
        json meta
        text folder_id FK
    }

    channel {
        text id PK
        text user_id FK
        text name
        text description
        json data
        json meta
        json access_control
    }

    message {
        text id PK
        text user_id FK
        text channel_id FK
        text parent_id FK
        text content
        json data
        json meta
    }

    message_reaction {
        text id PK
        text user_id FK
        text message_id FK
        text name
    }

    feedback {
        text id PK
        text user_id FK
        bigint version
        text type
        json data
        json meta
        json snapshot
    }

    file {
        string id PK
        string user_id FK
        text hash
        text filename
        text path
        json data
        json meta
        json contrôle_d'accès
    }

    dossier {
        texte id PK
        texte parent_id FK
        texte user_id FK
        texte nom
        json éléments
        json méta
        booléen est_déployé
    }

    fonction {
        chaîne id PK
        chaîne user_id FK
        texte nom
        texte contenu
        json méta
        json valves
        booléen est_actif
        booléen est_global
    }

    groupe {
        texte id PK
        texte user_id FK
        texte nom
        texte description
        json données
        json méta
        json autorisations
        json ids_utilisateur
    }

    connaissance {
        texte id PK
        texte user_id FK
        texte nom
        texte description
        json données
        json méta
        json contrôle_d'accès
    }

    mémoire {
        chaîne id PK
        chaîne user_id FK
        texte contenu
    }

    modèle {
        texte id PK
        texte user_id FK
        texte base_model_id FK
        texte nom
        json paramètres
        json méta
        json contrôle_d'accès
        booléen est_actif
    }

    invite {
        chaîne commande PK
        chaîne user_id FK
        texte titre
        texte contenu
        json contrôle_d'accès
    }

    étiquette {
        chaîne id PK "composite"
        chaîne user_id PK "composite"
        chaîne nom
        json méta
    }

    outil {
        chaîne id PK
        chaîne user_id FK
        texte nom
        texte contenu
        json spécifications
        json méta
        json valves
        json contrôle_d'accès
    }
```
