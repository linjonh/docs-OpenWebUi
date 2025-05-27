---
sidebar_position: 4
title: "⚙️ Paramètres de Chat"
---

Dans Open WebUI, il existe trois niveaux pour définir un **Prompt Système** et des **Paramètres Avancés** : par conversation, par modèle et par compte. Ce système hiérarchique permet une flexibilité tout en maintenant une administration et un contrôle structurés.

## Diagramme Hiérarchique des Prompts Système et des Paramètres Avancés

| **Niveau** | **Définition** | **Permissions de Modification** | **Capacités d'Outrepasser** |
| --- | --- | --- | --- |
| **Par Conversation** | Prompt système et paramètres avancés pour une conversation spécifique | Les utilisateurs peuvent modifier, mais ne peuvent pas outrepasser les paramètres spécifiques au modèle | Limité pour ne pas outrepasser les paramètres spécifiques au modèle |
| **Par Compte** | Prompt système par défaut et paramètres avancés pour un compte utilisateur spécifique | Les utilisateurs peuvent définir, mais peuvent être outrepassés par les paramètres spécifiques au modèle | Les paramètres utilisateur peuvent être outrepassés par les paramètres spécifiques au modèle |
| **Par Modèle** | Prompt système par défaut et paramètres avancés pour un modèle spécifique | Les administrateurs peuvent définir, les utilisateurs ne peuvent pas modifier | Les paramètres administrateur ont priorité, les paramètres utilisateur peuvent être outrepassés |

### 1. **Par Conversation :**

- **Description** : Le paramètre par conversation concerne le prompt système et les paramètres avancés configurés pour une instance de conversation spécifique. Ces paramètres sont uniquement applicables à la conversation en cours et n'affectent pas les futures conversations.
- **Comment définir** : Les utilisateurs peuvent modifier le prompt système et les paramètres avancés pour une instance de conversation spécifique dans la section **Contrôles de Chat** de la barre latérale droite d'Open WebUI.
- **Capacités d'Outrepasser** : Les utilisateurs ne peuvent pas outrepasser le **Prompt Système** ou les **Paramètres Avancés** spécifiques déjà définis par un administrateur sur une base par modèle (**#2**). Cela garantit la cohérence et le respect des paramètres spécifiques au modèle.

<details>
<summary>Exemple d'Utilisation</summary>
:::tip **Par Conversation** :
Supposons qu'un utilisateur souhaite définir un prompt système personnalisé pour une conversation spécifique. Il peut le faire en accédant à la section **Contrôles de Chat** et en modifiant le champ **Prompt Système**. Ces modifications s'appliqueront uniquement à la session de chat en cours.
:::
</details>

### 2. **Par Compte :**

- **Description** : Le paramètre par compte concerne le prompt système par défaut et les paramètres avancés configurés pour un compte utilisateur spécifique. Les modifications spécifiques à l'utilisateur peuvent servir de solution de secours dans les situations où les paramètres de niveau inférieur ne sont pas définis.
- **Comment définir** : Les utilisateurs peuvent définir leur propre prompt système et paramètres avancés pour leur compte dans la section **Général** du menu **Paramètres** d'Open WebUI.
- **Capacités d'Outrepasser** : Les utilisateurs ont la possibilité de définir leur propre prompt système sur leur compte, mais ils doivent être conscients que ces paramètres peuvent toujours être outrepassés si un administrateur a déjà défini le **Prompt Système** ou des **Paramètres Avancés** spécifiques sur une base par modèle pour le modèle particulier utilisé.

<details>
<summary>Exemple d'Utilisation</summary>
:::tip **Par Compte** :
Supposons qu'un utilisateur souhaite définir son propre prompt système pour son compte. Il peut le faire en accédant au menu **Paramètres** et en modifiant le champ **Prompt Système**.
:::
</details>

### 3. **Par Modèle :**

- **Description** : Le paramètre par modèle concerne le prompt système par défaut et les paramètres avancés configurés pour un modèle spécifique. Ces paramètres sont applicables à toutes les instances de chat utilisant ce modèle.
- **Comment définir** : Les administrateurs peuvent définir le prompt système par défaut et les paramètres avancés pour un modèle spécifique dans la section **Modèles** de **Workspace** d'Open WebUI.
- **Capacités d'Outrepasser** : Les **comptes utilisateur** ne peuvent pas modifier le **Prompt Système** ou les **Paramètres Avancés** spécifiques sur une base par modèle (**#3**). Cette restriction empêche les utilisateurs de modifier de manière inappropriée les paramètres par défaut.
- **Preservation de la taille du contexte** : Lorsque le **Prompt Système** ou des **Paramètres Avancés** spécifiques d'un modèle sont configurés manuellement dans la section **Workspace** par un administrateur, le **Prompt Système** ou les **Paramètres Avancés** définis manuellement ne peuvent pas être outrepassés ou ajustés sur une base par compte dans les paramètres **Général** ou la section **Contrôles de Chat** par un compte utilisateur. Cela garantit la cohérence et empêche le rechargement excessif du modèle à chaque fois qu'un utilisateur modifie les paramètres de taille du contexte.
- **Priorité du modèle** : Si la valeur du **Prompt Système** ou des **Paramètres Avancés** d'un modèle est prédéfinie dans la section Workspace par un administrateur, tout changement de taille du contexte effectué par un compte utilisateur dans les paramètres **Général** ou la section **Contrôles de Chat** sera ignoré, en maintenant la valeur préconfigurée pour ce modèle. Notez que les paramètres laissés intacts par un compte administrateur peuvent toujours être ajustés manuellement par un compte utilisateur sur une base par compte ou par conversation.

<details>
<summary>Exemple d'utilisation</summary>
:::astuce **Par modèle** :
Supposons qu'un administrateur souhaite définir une invite système par défaut pour un modèle spécifique. Il peut le faire en accédant à la section **Modèles** et en modifiant le champ **Invite Système** pour le modèle correspondant. Tous les instances de chat utilisant ce modèle utiliseront automatiquement l'invite système et les paramètres avancés du modèle.
:::
</details>


## **Optimisez les paramètres d’invite système pour une flexibilité maximale**

:::astuce **Conseils bonus**
**Ce conseil s'applique à la fois aux administrateurs et aux utilisateurs. Pour obtenir une flexibilité maximale avec vos invites système, nous recommandons de considérer la configuration suivante :**

- Assignez votre invite système principale (**c'est-à-dire pour donner un caractère défini à un LLM**) que vous souhaitez utiliser dans le champ **Invite Système** des paramètres **Généraux**. Cela le configure au niveau du compte et permet de l'utiliser comme invite système pour tous vos LLM sans nécessiter d'ajustements dans un modèle à partir de la section **Espace de Travail**.

- Pour votre invite système secondaire (**c'est-à-dire pour donner une tâche à un LLM**), choisissez si vous préférez la placer dans le champ **Invite Système** de la barre latérale **Contrôles de Chat** (au niveau de chaque chat) ou la section **Modèles** de l'**Espace de Travail** (au niveau de chaque modèle) pour les administrateurs, ce qui vous permet de les définir directement. Cela permet à votre invite système au niveau du compte de fonctionner en conjonction avec l'invite système au niveau du chat fournie par les **Contrôles de Chat**, ou avec l'invite système au niveau du modèle fournie par les **Modèles**.

- En tant qu'administrateur, vous devriez assigner vos paramètres LLM au niveau de chaque modèle en utilisant la section **Modèles** pour une flexibilité optimale. Pour ces deux invites système secondaires, veillez à les définir d'une manière qui maximise la flexibilité et minimise les ajustements nécessaires entre les différentes instances de compte ou de chat. Il est essentiel que votre compte Administrateur ainsi que tous les comptes Utilisateurs comprennent l'ordre de priorité par lequel les invites système dans les **Contrôles de Chat** et la section **Modèles** seront appliquées au **LLM**.
:::
