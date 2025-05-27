---
sidebar_position: 16
title: "🌐 Moteur de Recherche du Navigateur"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement à titre de démonstration sur la façon de personnaliser Open WebUI pour vos cas d'utilisation spécifiques. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

# Intégration du Moteur de Recherche du Navigateur

Open WebUI vous permet de vous intégrer directement dans votre navigateur web. Ce tutoriel vous guidera à travers le processus de configuration d'Open WebUI en tant que moteur de recherche personnalisé, vous permettant d'exécuter des requêtes facilement depuis la barre d'adresse de votre navigateur.

## Configuration d'Open WebUI en tant que Moteur de Recherche

### Prérequis

Avant de commencer, assurez-vous que :

- Vous avez installé Chrome ou un autre navigateur pris en charge.
- La variable d'environnement `WEBUI_URL` est correctement configurée, soit en utilisant des variables d'environnement Docker, soit dans le fichier `.env` comme spécifié dans le guide [Démarrage](/getting-started/env-configuration).

### Étape 1 : Configurer la Variable d'Environnement WEBUI_URL

Configurer la variable d'environnement `WEBUI_URL` garantit que votre navigateur sait où diriger les requêtes.

#### Utilisation des Variables d'Environnement Docker

Si vous exécutez Open WebUI à l'aide de Docker, vous pouvez définir la variable d'environnement dans votre commande `docker run` :

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  -e WEBUI_URL="https://<votre-url-open-webui>" \
  ghcr.io/open-webui/open-webui:main
```

Sinon, vous pouvez ajouter la variable à votre fichier `.env` :

```plaintext
WEBUI_URL=https://<votre-url-open-webui>
```

### Étape 2 : Ajouter Open WebUI en tant que Moteur de Recherche Personnalisé

### Pour Chrome

1. Ouvrez Chrome et accédez à **Paramètres**.
2. Sélectionnez **Moteur de recherche** dans la barre latérale, puis cliquez sur **Gérer les moteurs de recherche**.
3. Cliquez sur **Ajouter** pour créer un nouveau moteur de recherche.
4. Remplissez les détails comme suit :
    - **Moteur de recherche** : Recherche Open WebUI
    - **Mot-clé** : webui (ou tout autre mot-clé de votre choix)
    - **URL avec %s à la place de la requête** :

      ```
      https://<votre-url-open-webui>/?q=%s
      ```

5. Cliquez sur **Ajouter** pour enregistrer la configuration.

### Pour Firefox

1. Accédez à Open WebUI dans Firefox.
2. Développez la barre d'adresse en cliquant dessus.
3. Cliquez sur l'icône plus entourée d'un cercle vert en bas de la barre d'adresse développée. Cela ajoute la recherche d'Open WebUI aux moteurs de recherche dans vos préférences.

Sinon :

1. Accédez à Open WebUI dans Firefox.
2. Cliquez avec le bouton droit sur la barre d'adresse.
3. Sélectionnez "Ajouter Open WebUI" (ou similaire) dans le menu contextuel.

### Optionnel : Utilisation de Modèles Spécifiques

Si vous souhaitez utiliser un modèle spécifique pour votre recherche, modifiez le format de l'URL pour inclure l'identifiant du modèle :

```
https://<votre-url-open-webui>/?models=<model_id>&q=%s
```

**Remarque :** L'identifiant du modèle devra être encodé dans l'URL. Les caractères spéciaux comme les espaces ou les barres doivent être encodés (par exemple, `mon modèle` devient `mon%20modèle`).

## Exemple d'Utilisation

Une fois le moteur de recherche configuré, vous pouvez effectuer des recherches directement depuis la barre d'adresse. Tapez simplement votre mot-clé choisi suivi de votre requête :

```
webui votre requête de recherche
```

Cette commande vous redirigera vers l'interface Open WebUI avec vos résultats de recherche.

## Dépannage

Si vous rencontrez des problèmes, vérifiez les points suivants :

- Assurez-vous que le `WEBUI_URL` est correctement configuré et pointe vers une instance valide d'Open WebUI.
- Vérifiez que le format de l'URL du moteur de recherche est correctement entré dans les paramètres de votre navigateur.
- Confirmez que votre connexion Internet est active et que le service Open WebUI fonctionne correctement.
