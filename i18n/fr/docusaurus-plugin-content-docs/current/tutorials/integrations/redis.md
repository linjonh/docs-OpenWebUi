---
sidebar_position: 30
title: "🔗 Prise en charge des Websockets Redis"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration sur la manière de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous voulez contribuer ? Consultez le tutoriel de contribution.
:::

# 🔗 Prise en charge des Websockets Redis

## Aperçu

Cette page de documentation détaille les étapes nécessaires pour intégrer Redis avec Open WebUI pour la prise en charge des websockets. En suivant ces étapes, vous pourrez activer la fonctionnalité websocket dans votre instance Open WebUI, permettant une communication en temps réel et des mises à jour entre les clients et votre application.

### Prérequis

* Une instance valide de Open WebUI (fonctionnant avec la version 1.0 ou supérieure)
* Un conteneur Redis (nous utiliserons `docker.io/valkey/valkey:8.0.1-alpine` dans cet exemple, basé sur la dernière version Redis 7.x)
* Docker Composer (version 2.0 ou supérieure) installé sur votre système
* Un réseau Docker pour la communication entre Open WebUI et Redis
* Une connaissance de base de Docker, Redis et Open WebUI

## Configuration de Redis

Pour configurer Redis pour la prise en charge des websockets, vous devrez créer un fichier `docker-compose.yml` avec le contenu suivant :

```yml
version: 3.9
services:
  redis:
    image: docker.io/valkey/valkey:8.0.1-alpine
    container_name: redis-valkey
    volumes:
      - redis-data:/data
    command: "valkey-server --save 30 1"
    healthcheck:
      test: "[ $$(valkey-cli ping) = PONG ]"
      start_period: 5s
      interval: 1s
      timeout: 3s
      retries: 5
    restart: unless-stopped
    cap_drop:
      - ALL
    cap_add:
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
    networks:
      - openwebui-network

volumes:
  redis-data:

networks:
  openwebui-network:
    external: true
```

:::info Notes

La directive `ports` n'est pas incluse dans cette configuration, car elle n'est généralement pas nécessaire. Le service Redis sera toujours accessible depuis le réseau Docker par le service Open WebUI. Cependant, si vous devez accéder à l'instance Redis depuis l'extérieur du réseau Docker (par exemple, pour le débogage ou la surveillance), vous pouvez ajouter la directive `ports` pour exposer le port Redis (par exemple, `6379:6379`).

La configuration ci-dessus met en place un conteneur Redis nommé `redis-valkey` et monte un volume pour la persistance des données. La directive `healthcheck` garantit que le conteneur est redémarré s'il ne répond pas à la commande `ping`. L'option de commande `--save 30 1` sauvegarde la base de données Redis sur le disque toutes les 30 minutes si au moins une clé a changé.

:::

Pour créer un réseau Docker pour la communication entre Open WebUI et Redis, exécutez la commande suivante :

```bash
docker network create openwebui-network
```

## Configuration d'Open WebUI

Pour activer la prise en charge des websockets dans Open WebUI, vous devez définir les variables d'environnement suivantes pour votre instance Open WebUI :

```bash
ENABLE_WEBSOCKET_SUPPORT="true"
WEBSOCKET_MANAGER="redis"
WEBSOCKET_REDIS_URL="redis://redis:6379/1"
```

Ces variables d'environnement activent la prise en charge des websockets, spécifient Redis comme gestionnaire de websockets et définissent l'URL Redis. Assurez-vous de remplacer la valeur de `WEBSOCKET_REDIS_URL` par l'adresse IP réelle de votre instance Redis.

Lors de l'exécution d'Open WebUI avec Docker, vous devez le connecter au même réseau Docker :

```bash
docker run -d \
  --name open-webui \
  --network openwebui-network \
  -v open-webui:/app/backend/data \
  -e ENABLE_WEBSOCKET_SUPPORT="true" \
  -e WEBSOCKET_MANAGER="redis" \
  -e WEBSOCKET_REDIS_URL="redis://127.0.0.1:6379/1" \
  ghcr.io/open-webui/open-webui:main
```

Remplacez `127.0.0.1` par l'adresse IP réelle de votre conteneur Redis dans le réseau Docker.

## Vérification

Si vous avez correctement configuré Redis et Open WebUI, vous devriez voir le message de journal suivant lorsque vous démarrez votre instance Open WebUI :

`DEBUG:open_webui.socket.main:Using Redis to manage websockets.`

Cela confirme qu'Open WebUI utilise Redis pour la gestion des websockets. Vous pouvez également utiliser la commande `docker exec` pour vérifier que l'instance Redis fonctionne et accepte les connexions :

```bash
docker exec -it redis-valkey redis-cli -p 6379 ping
```

Cette commande devrait retourner `PONG` si l'instance Redis fonctionne correctement. Si cette commande échoue, vous pouvez essayer celle-ci à la place :

```bash
docker exec -it redis-valkey valkey-cli -p 6379 ping
```

## Résolution des problèmes

Si vous rencontrez des problèmes avec Redis ou la prise en charge des websockets dans Open WebUI, vous pouvez consulter les ressources suivantes pour obtenir de l'aide :

* [Documentation Redis](https://redis.io/docs)
* [Documentation Docker Compose](https://docs.docker.com/compose/overview/)
* [Documentation sysctl](https://man7.org/linux/man-pages/man8/sysctl.8.html)
