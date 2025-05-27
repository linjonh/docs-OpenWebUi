---
sidebar_position: 31
title: "🛌 Intégration avec Amazon Bedrock"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration sur la manière de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

---

# Intégrer Open-WebUI avec Amazon Bedrock

Dans ce tutoriel, nous allons explorer l'une des approches les plus courantes et populaires pour intégrer Open-WebUI avec Amazon Bedrock.

## Prérequis


Pour suivre ce tutoriel, vous devez avoir les éléments suivants :

- Un compte AWS actif
- Une clé d'accès AWS et une clé secrète actives
- Permissions IAM dans AWS pour activer les modèles Bedrock ou modèles déjà activés
- Docker installé sur votre système


## Qu'est-ce qu'Amazon Bedrock ?

Directement sur le site Web AWS :

"Amazon Bedrock est un service entièrement géré qui offre un choix de modèles de base (FMs) performants de grandes entreprises d'IA telles que AI21 Labs, Anthropic, Cohere, Luma, Meta, Mistral AI, poolside (bientôt disponible), Stability AI, et Amazon via une seule API, accompagné d'un large ensemble de capacités nécessaires pour créer des applications d'IA générative avec sécurité, confidentialité et IA responsable. Avec Amazon Bedrock, vous pouvez facilement expérimenter et évaluer les meilleurs FMs pour votre cas d'utilisation, les personnaliser de manière privée avec vos données à l'aide de techniques comme l'affinage et la génération augmentée par récupération (RAG), et construire des agents qui exécutent des tâches en utilisant vos systèmes d'entreprise et sources de données. Étant donné qu'Amazon Bedrock est sans serveur, vous n'avez pas besoin de gérer une infrastructure et vous pouvez intégrer et déployer en toute sécurité des capacités d'IA générative dans vos applications en utilisant les services AWS que vous connaissez déjà."

Pour en savoir plus sur Bedrock, visitez : [Page officielle d'Amazon Bedrock](https://aws.amazon.com/bedrock/)

# Étapes d'intégration

## Étape 1 : Vérifier l'accès aux modèles de base d'Amazon Bedrock

Avant de pouvoir intégrer Bedrock, vous devez d'abord vérifier que vous avez accès à au moins un, mais de préférence plusieurs, des modèles de base disponibles. À ce jour (février 2025), il y avait 47 modèles de base disponibles. Vous pouvez voir dans la capture d'écran ci-dessous que j'ai accès à plusieurs modèles. Vous saurez si vous avez accès à un modèle si cela indique "✅ Accès accordé" à côté du modèle. Si vous n'avez accès à aucun modèle, vous obtiendrez une erreur à l'étape suivante.

AWS fournit une bonne documentation pour demander l'accès à ces modèles ici : [Documentation sur l'accès au modèle Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html)

![Modèles de base Amazon Bedrock](/images/tutorials/amazon-bedrock/amazon-bedrock-base-models.png)


## Étape 2 : Configurer la passerelle d'accès Bedrock

Maintenant que nous avons accès à au moins un modèle de base Bedrock, nous devons configurer la passerelle d'accès Bedrock (BAG). Vous pouvez considérer le BAG comme une sorte de proxy ou middleware développé par AWS qui enveloppe les points de terminaison/SDK natifs AWS pour Bedrock et, à son tour, expose des points de terminaison compatibles avec le schéma d'OpenAI, ce dont Open-WebUI nécessite.

À titre de référence, voici une correspondance simple entre les points de terminaison :


| Point de terminaison OpenAI | Méthode Bedrock          |
|----------------------------|--------------------------|
| `/models`                 | list_inference_profiles |
| `/models/{model_id}`      | list_inference_profiles |
| `/chat/completions`       | converse ou converse_stream |
| `/embeddings`             | invoke_model            |

Le dépôt BAG peut être trouvé ici : [Dépôt Bedrock Access Gateway](https://github.com/aws-samples/bedrock-access-gateway)

Pour configurer le BAG, suivez les étapes ci-dessous :
- Clonez le dépôt BAG
- Supprimez le `dockerfile` par défaut
- Changez le nom du fichier `Dockerfile_ecs` en `Dockerfile`

Nous sommes maintenant prêts à construire et lancer le conteneur Docker en utilisant :

```bash
docker build . -f Dockerfile -t bedrock-gateway

docker run -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN -e AWS_REGION=us-east-1 -d -p 8000:80 bedrock-gateway
```

Vous devriez maintenant pouvoir accéder à la page swagger du BAG à : http://localhost:8000/docs

![Swagger Bedrock Access Gateway](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-api.png)

## Étape 3 : Ajouter une connexion dans Open-WebUI

Maintenant que le BAG est opérationnel, il est temps de l'ajouter en tant que nouvelle connexion dans Open-WebUI.

- Sous le panneau d'administration, accédez à Paramètres -> Connexions.
- Utilisez le bouton "+" (plus) pour ajouter une nouvelle connexion sous OpenAI.
- Pour l'URL, utilisez "http://host.docker.internal:8000/api/v1"
- Pour le mot de passe, le mot de passe par défaut défini dans BAG est "bedrock". Vous pouvez toujours modifier ce mot de passe dans les paramètres BAG (voir DEFAULT_API_KEYS)
- Cliquez sur le bouton "Vérifier la connexion" et vous devriez voir une alerte "Connexion au serveur vérifiée" en haut à droite

![Ajouter une nouvelle connexion](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-connection.png)

## Étape 4 : Commencez à utiliser les modèles de base Bedrock

Vous devriez maintenant voir tous vos modèles Bedrock disponibles !

![Utilisez les modèles Bedrock](/images/tutorials/amazon-bedrock/amazon-bedrock-models-in-oui.png)

## Autres tutoriels utiles

Voici quelques autres tutoriels très utiles pour intégrer Open-WebUI avec Amazon Bedrock.

- https://gauravve.medium.com/connecting-open-webui-to-aws-bedrock-a1f0082c8cb2
- https://jrpospos.blog/posts/2024/08/using-amazon-bedrock-with-openwebui-when-working-with-sensitive-data/
