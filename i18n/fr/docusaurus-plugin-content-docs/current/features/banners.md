---
sidebar_position: 13
title: "🔰 Bannières Personnalisables"
---

Aperçu
--------

Open WebUI offre une fonctionnalité permettant aux administrateurs de créer des bannières personnalisables avec persistance dans le fichier `config.json`. Ces bannières peuvent inclure des options de contenu, couleur de fond (info, avertissement, erreur ou succès) et possibilité de fermeture. Les bannières sont accessibles uniquement aux utilisateurs connectés, garantissant ainsi la confidentialité des informations sensibles.

Configurer des Bannières via le Panneau d'Administration
---------------------------------------------

Pour configurer des bannières via le panneau d'administration, suivez ces étapes :

1. Connectez-vous à votre instance Open WebUI en tant qu'administrateur.
2. Accédez au `Panneau d'Administration` -> `Paramètres` -> `Interface`.
3. Repérez l'option `Bannières` juste au-dessus de l'option `Suggestions de Prompts par Défaut`.
4. Cliquez sur l'icône `+` pour ajouter une nouvelle bannière.
5. Sélectionnez le type de bannière et définissez le texte de la bannière selon vos besoins.
6. Choisissez si la bannière est clôturable ou non.
7. Définissez le timestamp pour la bannière (optionnel).
8. Appuyez sur `Enregistrer` en bas de la page pour sauvegarder la bannière.

Configurer des Bannières via les Variables d'Environnement
------------------------------------------------

Alternativement, vous pouvez configurer des bannières via les variables d'environnement. Pour ce faire, vous devrez définir la variable d'environnement `WEBUI_BANNERS` avec une liste de dictionnaires dans le format suivant :

```json
[{"id": "string","type": "string [info, success, warning, error]","title": "string","content": "string","dismissible": False,"timestamp": 1000}]
```

Pour plus d'informations sur la configuration des variables d'environnement dans Open WebUI, consultez [Configuration des Variables d'Environnement](https://docs.openwebui.com/getting-started/env-configuration#webui_banners).

Description des Variables d'Environnement
---------------------------------

* `WEBUI_BANNERS` :
  * Type : liste de dictionnaires
  * Valeur par défaut : `[]`
  * Description : Liste des bannières à afficher aux utilisateurs.

Options de Bannière
----------------

* `id` : Identifiant unique pour la bannière.
* `type` : Couleur de fond de la bannière (info, succès, avertissement, erreur).
* `title` : Titre de la bannière.
* `content` : Contenu de la bannière.
* `dismissible` : Indique si la bannière peut être clôturée ou non.
* `timestamp` : Timestamp pour la bannière (optionnel).

FAQ
----

* Q : Puis-je configurer des bannières via le panneau d'administration ?
A : Oui, vous pouvez configurer des bannières via le panneau d'administration en accédant à `Panneau d'Administration` -> `Paramètres` -> `Interface` et en cliquant sur l'icône `+` pour ajouter une nouvelle bannière.
* Q : Puis-je configurer des bannières via les variables d'environnement ?
A : Oui, vous pouvez configurer des bannières via les variables d'environnement en définissant la variable d'environnement `WEBUI_BANNERS` avec une liste de dictionnaires.
* Q : Quel est le format de la variable d'environnement `WEBUI_BANNERS` ?
A : Le format de la variable d'environnement `WEBUI_BANNERS` est une liste de dictionnaires avec les clés suivantes : `id`, `type`, `title`, `content`, `dismissible` et `timestamp`.
* Q : Puis-je rendre les bannières clôturables ?
A : Oui, vous pouvez rendre les bannières clôturables en définissant la clé `dismissible` sur `True` dans la configuration de la bannière ou en activant la clôturabilité pour une bannière dans l'interface utilisateur.
