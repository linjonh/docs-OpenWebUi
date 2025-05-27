---
sidebar_position: 5
title: "🔗 Paramètres URL"
---

Dans Open WebUI, les sessions de chat peuvent être personnalisées grâce à divers paramètres d'URL. Ces paramètres vous permettent de définir des configurations spécifiques, d'activer des fonctionnalités et de définir des réglages de modèle pour chaque session de chat. Cette approche offre flexibilité et contrôle sur les sessions de chat individuelles directement depuis l'URL.

## Vue d'ensemble des paramètres URL

Le tableau suivant liste les paramètres URL disponibles, leur fonction et des exemples d'utilisation.

| **Paramètre**       | **Description**                                                                  | **Exemple**                          |
|-----------------------|----------------------------------------------------------------------------------|--------------------------------------------------------|
| `models`           | Spécifie les modèles à utiliser sous forme de liste séparée par des virgules.    | `/?models=model1,model2`         |
| `model`            | Spécifie un seul modèle à utiliser pour la session de chat.                     | `/?model=model1`                 |
| `youtube`          | Spécifie un ID vidéo YouTube à transcrire dans le chat.                          | `/?youtube=VIDEO_ID`             |
| `web-search`       | Active la fonctionnalité de recherche web si défini sur `true`.                  | `/?web-search=true`              |
| `tools` ou `tool-ids` | Spécifie une liste séparée par des virgules d'IDs d'outils à activer dans le chat. | `/?tools=tool1,tool2`            |
| `call`             | Active une superposition d'appel si défini sur `true`.                        | `/?call=true`                    |
| `q`                | Définit une requête ou un prompt initial pour le chat.                         | `/?q=Hello%20there`              |
| `temporary-chat`   | Marque le chat comme temporaire si défini sur `true`, pour des sessions ponctuelles. | `/?temporary-chat=true`          |

### 1. **Modèles et sélection de modèle**

- **Description** : Les paramètres `models` et `model` vous permettent de spécifier les [modèles linguistiques](/features/workspace/models.md) à utiliser pour une session de chat donnée.
- **Comment configurer** : Vous pouvez utiliser `models` pour plusieurs modèles ou `model` pour un seul modèle.
- **Exemple** :
  - `/?models=model1,model2` – Cela initialise le chat avec `model1` et `model2`.
  - `/?model=model1` – Cela défini `model1` comme unique modèle pour le chat.

### 2. **Transcription YouTube**

- **Description** : Le paramètre `youtube` prend un ID vidéo YouTube, permettant au chat de transcrire la vidéo spécifiée.
- **Comment configurer** : Utilisez l'ID vidéo YouTube comme valeur pour ce paramètre.
- **Exemple** : `/?youtube=VIDEO_ID`
- **Comportement** : Cela déclenche la fonctionnalité de transcription dans le chat pour la vidéo YouTube fournie.

### 3. **Recherche Web**

- **Description** : Activer `web-search` permet à la session de chat d'accéder à la fonctionnalité de [recherche web](/category/-web-search).
- **Comment configurer** : Définissez ce paramètre sur `true` pour activer la recherche web.
- **Exemple** : `/?web-search=true`
- **Comportement** : Si activé, le chat peut récupérer des résultats de recherche web dans ses réponses.

### 4. **Sélection des outils**

- **Description** : Les paramètres `tools` ou `tool-ids` spécifient quels [outils](/features/plugin/tools) activer dans le chat.
- **Comment configurer** : Fournissez une liste séparée par des virgules d'IDs d'outils comme valeur du paramètre.
- **Exemple** : `/?tools=tool1,tool2` ou `/?tool-ids=tool1,tool2`
- **Comportement** : Chaque ID d'outil est associé et activé dans la session pour une interaction utilisateur.

### 5. **Superposition d'appel**

- **Description** : Le paramètre `call` active une superposition vidéo ou d'appel dans l'interface du chat.
- **Comment configurer** : Définissez le paramètre sur `true` pour activer la superposition d'appel.
- **Exemple** : `/?call=true`
- **Comportement** : Active une superposition d'interface d'appel, permettant des fonctionnalités comme la transcription en direct et l'entrée vidéo.

### 6. **Prompt de requête initiale**

- **Description** : Le paramètre `q` permet de définir une requête ou un prompt initial pour le chat.
- **Comment configurer** : Spécifiez le texte de la requête ou du prompt comme valeur du paramètre.
- **Exemple** : `/?q=Hello%20there`
- **Comportement** : Le chat commence avec le prompt spécifié, le soumettant automatiquement comme premier message.

### 7. **Sessions de chat temporaires**

- **Description** : Le paramètre `temporary-chat` marque le chat comme une session temporaire. Cela peut limiter des fonctionnalités comme la sauvegarde de l'historique ou l'application de réglages persistants.
- **Comment configurer** : Définissez ce paramètre sur `true` pour une session de chat temporaire.
- **Exemple** : `/?temporary-chat=true`
- **Comportement** : Cela initie une session de chat jetable sans sauvegarder d'historique ni appliquer de configurations avancées.

<details>
<summary>Exemple d'utilisation</summary>
:::tip **Session de chat temporaire**
Supposons qu'un utilisateur souhaite initier une session de chat rapide sans sauvegarder l'historique. Il peut le faire en définissant `temporary-chat=true` dans l'URL. Cela offre un environnement de chat jetable idéal pour des interactions uniques.
:::
</details>

## Utilisation de Plusieurs Paramètres Ensemble

Ces paramètres d'URL peuvent être combinés pour créer des sessions de chat hautement personnalisées. Par exemple :

```bash
/?models=model1,model2&youtube=VIDEO_ID&web-search=true&tools=tool1,tool2&call=true&q=Hello%20there&temporary-chat=true
```

Cette URL va :

- Initialiser le chat avec `model1` et `model2`.
- Activer la transcription YouTube, la recherche web et les outils spécifiés.
- Afficher une interface d'appel.
- Définir une invite initiale "Hello there."
- Marquer le chat comme temporaire, évitant toute sauvegarde de l'historique.
