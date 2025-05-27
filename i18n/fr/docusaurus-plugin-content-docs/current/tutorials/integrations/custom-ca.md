---
sidebar_position: 14
title: "🛃 Configuration avec Magasin CA Personnalisé"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration sur la manière de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

Si vous obtenez une erreur `[SSL: CERTIFICATE_VERIFY_FAILED]` lors de l'exécution d'OI, il est probable que le problème provienne d'un réseau interceptant le trafic HTTPS (par exemple, un réseau d'entreprise).

Pour résoudre ce problème, vous devrez ajouter le nouveau certificat au magasin de confiance d'OI.

**Pour l'image Docker pré-construite** :

1. Montez le magasin de certificats à partir de votre machine hôte dans le conteneur en passant `--volume=/etc/ssl/certs/ca-certificates.crt:/etc/ssl/certs/ca-certificates.crt:ro` comme une option de ligne de commande à `docker run`
2. Forcez Python à utiliser le magasin de confiance du système en définissant `REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt` (voir https://docs.docker.com/reference/cli/docker/container/run/#env)

Si la variable d'environnement `REQUESTS_CA_BUNDLE` ne fonctionne pas, essayez de définir `SSL_CERT_FILE` (comme indiqué dans la [documentation httpx](https://www.python-httpx.org/environment_variables/#ssl_cert_file)) avec la même valeur.

Exemple de `compose.yaml` de [@KizzyCode](https://github.com/open-webui/open-webui/issues/1398#issuecomment-2258463210) :

```yaml
services:
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    volumes:
      - /var/containers/openwebui:/app/backend/data:rw
      - /etc/containers/openwebui/compusrv.crt:/etc/ssl/certs/ca-certificates.crt:ro
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    environment:
      - WEBUI_NAME=compusrv
      - ENABLE_SIGNUP=False
      - ENABLE_COMMUNITY_SHARING=False
      - WEBUI_SESSION_COOKIE_SAME_SITE=strict
      - WEBUI_SESSION_COOKIE_SECURE=True
      - ENABLE_OLLAMA_API=False
      - REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```

Le drapeau `ro` monte le magasin CA en lecture seule et empêche les modifications accidentelles de votre magasin CA hôte
**Pour le développement local** :

Vous pouvez également ajouter les certificats dans le processus de construction en modifiant le `Dockerfile`. Cela est utile si vous souhaitez apporter des modifications à l'interface utilisateur, par exemple.
Étant donné que la construction se fait en [plusieurs étapes](https://docs.docker.com/build/building/multi-stage/), vous devez ajouter le certificat aux deux étapes suivantes

1. Frontend (étape `build`) :

```dockerfile
COPY package.json package-lock.json <YourRootCert>.crt ./
ENV NODE_EXTRA_CA_CERTS=/app/<YourRootCert>.crt
RUN npm ci
```

2. Backend (étape `base`) :

```dockerfile
COPY <CorporateSSL.crt> /usr/local/share/ca-certificates/
RUN update-ca-certificates
ENV PIP_CERT=/etc/ssl/certs/ca-certificates.crt \
    REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
```
