---
sidebar_position: 16
title: "Yacy"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas soutenu par l'équipe Open WebUI. Il sert uniquement à démontrer comment personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous voulez contribuer ? Consultez le tutoriel de contribution.
:::

## API Yacy

### Configuration

1. Accédez à : `Panneau d'administration` -> `Paramètres` -> `Recherche sur le web`
2. Activez `Activer la recherche sur le web`
3. Définissez `Moteur de recherche sur le web` dans le menu déroulant sur `yacy`
4. Définissez `URL de l'instance Yacy` sur l'un des exemples suivants:

    * `http://yacy:8090` (en utilisant le nom du conteneur et le port exposé, adapté aux configurations basées sur Docker)
    * `http://host.docker.internal:8090` (en utilisant le nom DNS `host.docker.internal` et le port hôte, adapté aux configurations basées sur Docker)
    * `https://<yacy.local>:8443` (en utilisant un nom de domaine local, adapté à l'accès au réseau local)
    * `https://yacy.example.com` (en utilisant un nom de domaine personnalisé pour une instance Yacy auto-hébergée, adapté à un accès public ou privé)
    * `https://yacy.example.com:8443` (en utilisant https sur le port https par défaut de Yacy)

5. Facultativement, saisissez votre nom d'utilisateur et mot de passe Yacy si une authentification est requise pour votre instance Yacy. Si les deux champs sont laissés vides, l'authentification par digest sera ignorée
6. Appuyez sur Enregistrer

![Panneau d'administration Open WebUI affichant la configuration Yacy](/images/tutorial_yacy.png)
