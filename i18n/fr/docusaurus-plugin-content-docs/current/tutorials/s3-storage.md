---
sidebar_position: 320
title: "🪣 Changer pour le stockage S3"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas soutenu par l'équipe Open WebUI. Il sert uniquement de démonstration sur la personnalisation d'Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

# 🪣 Changer pour le stockage S3

Ce guide fournit des instructions sur la manière de remplacer le stockage par défaut `local` dans la configuration Open WebUI par Amazon S3.

## Prérequis

Pour suivre ce tutoriel, vous devez disposer des éléments suivants :

- Un compte AWS actif
- Une clé d'accès AWS et une clé secrète AWS actives
- Des autorisations IAM dans AWS pour créer et placer des objets dans S3
- Docker installé sur votre système

## Qu'est-ce qu'Amazon S3

Directement depuis le site Web AWS :

"Amazon S3 est un service de stockage d'objets offrant une évolutivité, une disponibilité des données, une sécurité et des performances de premier plan dans l'industrie. Stockez et protégez n'importe quelle quantité de données pour divers cas d'utilisation, tels que les lacs de données, les sites Web, les applications cloud-native, les sauvegardes, les archives, l'apprentissage automatique et l'analyse. Amazon S3 est conçu pour 99,999999999% (11 9's) de durabilité et stocke des données pour des millions de clients à travers le monde."

Pour en savoir plus sur S3, visitez : [Page officielle d'Amazon S3](https://aws.amazon.com/s3/)

# Comment configurer

## 1. Variables d'environnement requises

Pour configurer cette option, vous devez rassembler les variables d'environnement suivantes :

| **Variable d'environnement Open-WebUI** | **Valeur Exemple**                           |
|-----------------------------------------|--------------------------------------------|
| `S3_ACCESS_KEY_ID`                      | ABC123                                     |
| `S3_SECRET_ACCESS_KEY`                  | SuperSecret                                |
| `S3_ENDPOINT_URL`                       | https://s3.us-east-1.amazonaws.com         |
| `S3_REGION_NAME`                        | us-east-1                                  |
| `S3_BUCKET_NAME`                        | mon-super-nom-de-bucket                   |

- S3_ACCESS_KEY_ID : Il s'agit d'un identifiant pour la clé d'accès de votre compte AWS. Vous l'obtenez depuis la console de gestion AWS ou AWS CLI lors de la création d'une clé d'accès.
- S3_SECRET_ACCESS_KEY : C'est la partie secrète de votre paire de clés d'accès AWS. Elle est fournie lors de la création d'une clé d'accès dans AWS et doit être stockée de manière sécurisée.
- S3_ENDPOINT_URL : Cette URL pointe vers votre point de terminaison de service S3 et peut généralement être trouvée dans la documentation de service AWS ou dans les paramètres de votre compte.
- S3_REGION_NAME : Il s'agit de la région AWS où se trouve votre bucket S3, comme "us-east-1". Vous pouvez l'identifier depuis la console de gestion AWS sous les détails de votre bucket S3.
- S3_BUCKET_NAME : Cela correspond au nom unique de votre bucket S3, que vous avez spécifié lors de la création du bucket sur AWS.

Pour une liste complète des URL de points de terminaison S3 disponibles, voir : [Points de terminaison S3 réguliers d'Amazon](https://docs.aws.amazon.com/general/latest/gr/s3.html)

Voir toutes les options de configuration du `Cloud Storage` ici : [Configuration de stockage cloud Open-WebUI](https://docs.openwebui.com/getting-started/env-configuration#cloud-storage)

## 2. Exécuter Open-WebUI

Avant de lancer notre instance d'Open-WebUI, il reste une dernière variable d'environnement appelée `STORAGE_PROVIDER` que nous devons définir. Cette variable indique à Open-WebUI quel fournisseur vous voulez utiliser. Par défaut, `STORAGE_PROVIDER` est vide, ce qui signifie qu'Open-WebUI utilise le stockage local.

| **Fournisseur de stockage** | **Type** | **Description**                                                                | **Par défaut** |
|----------------------------|----------|-------------------------------------------------------------------------------|----------------|
| `local`                    | str      | Par défaut, utilise le stockage local si une chaîne vide (`' '` ) est fournie | Oui            |
| `s3`                       | str      | Utilise la bibliothèque client S3 et les variables d'environnement mentionnées pour le stockage Amazon S3 | Non            |
| `gcs`                      | str      | Utilise la bibliothèque client GCS et les variables d'environnement mentionnées pour le stockage Google Cloud | Non            |

Pour utiliser Amazon S3, nous devons définir `STORAGE_PROVIDER` sur "s3" ainsi que toutes les variables d'environnement recueillies dans l'Étape 1 (`S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT_URL`, `S3_REGION_NAME`, `S3_BUCKET_NAME`).

Ici, je définis également `ENV` sur "dev", ce qui nous permettra de voir la documentation Swagger d'Open-WebUI afin que nous puissions tester davantage et confirmer que la configuration du stockage S3 fonctionne comme prévu.

```sh
docker run -d \
  -p 3000:8080 \
  -v open-webui:/app/backend/data \
  -e STORAGE_PROVIDER="s3" \
  -e S3_ACCESS_KEY_ID="ABC123" \
  -e S3_SECRET_ACCESS_KEY="SuperSecret" \
  -e S3_ENDPOINT_URL="https://s3.us-east-1.amazonaws.com" \
  -e S3_REGION_NAME="us-east-1" \
  -e S3_BUCKET_NAME="mon-super-nom-de-bucket" \
  -e ENV="dev" \
  --name open-webui \
  ghcr.io/open-webui/open-webui:main
```

## 3. Tester la configuration

Maintenant que nous avons Open-WebUI en fonctionnement, téléchargeons un simple fichier texte `Hello, World` et testons notre configuration.

![Télécharger un fichier dans Open-WebUI](/images/tutorials/amazon-s3/amazon-s3-upload-file.png)

Et confirmons que nous obtenons une réponse du LLM sélectionné.

![Obtenir une réponse dans Open-WebUI](/images/tutorials/amazon-s3/amazon-s3-oui-response.png)

Super ! Tout semble fonctionner comme prévu dans Open-WebUI. Maintenant, vérifions que le fichier texte a bien été téléchargé et stocké dans le bucket S3 spécifié. En utilisant la Console de gestion AWS, nous pouvons voir qu'il y a maintenant un fichier dans le bucket S3. En plus du nom du fichier que nous avons téléchargé (`hello.txt`), vous pouvez voir que le nom de l'objet a été ajouté avec un identifiant unique. C'est ainsi qu'Open-WebUI suit tous les fichiers téléchargés.

![Obtenir une réponse dans Open-WebUI](/images/tutorials/amazon-s3/amazon-s3-object-in-bucket.png)

En utilisant les documents swagger d'Open-WebUI, nous pouvons obtenir toutes les informations relatives à ce fichier via l'endpoint `/api/v1/files/{id}` et en passant l'identifiant unique (4405fabb-603e-4919-972b-2b39d6ad7f5b).

![Inspecter le fichier par ID](/images/tutorials/amazon-s3/amazon-s3-get-file-by-id.png)
