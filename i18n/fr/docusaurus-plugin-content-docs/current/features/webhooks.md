---
sidebar_position: 17
title: "🪝 Intégrations Webhook"
---

Aperçu
--------

Open WebUI fournit une fonctionnalité de webhook qui vous permet de recevoir automatiquement des notifications chaque fois que de nouveaux utilisateurs s'inscrivent sur votre instance. Cela est réalisé en fournissant une URL de webhook à Open WebUI, qui enverra des notifications à cette URL lorsqu'un nouveau compte utilisateur sera créé.

Configuration des Webhooks dans Open WebUI
------------------------------------------

Vous devrez obtenir une URL de webhook auprès d'un service externe qui prend en charge les webhooks, comme un canal Discord ou un espace de travail Slack. Cette URL sera utilisée pour recevoir les notifications d'Open WebUI.

Pour configurer les webhooks dans Open WebUI, vous avez deux options :

### Option 1 : Configurer via l'interface administrateur

1. Connectez-vous à votre instance Open WebUI en tant qu'administrateur.
2. Accédez au `Admin Panel`.
3. Cliquez sur l'onglet `Settings` situé en haut.
4. À partir de là, accédez à la section `General` des paramètres dans le panneau administrateur.
5. Localisez le champ `Webhook URL` et saisissez l'URL du webhook.
6. Enregistrez les modifications.

### Option 2 : Configurer via les variables d'environnement

Alternativement, vous pouvez configurer l'URL du webhook en définissant la variable d'environnement `WEBHOOK_URL`. Pour plus d'informations sur les variables d'environnement dans Open WebUI, consultez [Configuration des variables d'environnement](https://docs.openwebui.com/getting-started/env-configuration/#webhook_url).

### Étape 3 : Vérifiez le webhook

Pour vérifier que le webhook fonctionne correctement, créez un nouveau compte utilisateur dans Open WebUI. Si le webhook est correctement configuré, vous devriez recevoir une notification à l'URL du webhook spécifiée.

Format de la charge utile du Webhook
------------------------------------

La charge utile envoyée par Open WebUI est en texte brut et contient un simple message de notification concernant le nouveau compte utilisateur. Le format de la charge utile est le suivant :

```
Nouvel utilisateur inscrit : <username>
```

Par exemple, si un utilisateur nommé "Tim" s'inscrit, la charge utile envoyée serait :

```
Nouvel utilisateur inscrit : Tim
```

Dépannage
----------

* Assurez-vous que l'URL du webhook est correcte et correctement formatée.
* Vérifiez que le service de webhook est activé et configuré correctement.
* Consultez les journaux Open WebUI pour détecter toute erreur liée au webhook.
* Vérifiez que la connexion n'a pas été interrompue ou bloquée par un pare-feu ou un proxy.
* Le serveur webhook peut être temporairement indisponible ou rencontrer une forte latence.
* Si une clé API webhook est fournie par le service, vérifiez si elle est invalide, expirée ou révoquée.

Remarque : La fonctionnalité webhook dans Open WebUI est encore en évolution, et nous prévoyons d'ajouter davantage de fonctionnalités et de types d'événements à l'avenir.
