---
title: "🕵🏻‍♀️ Surveillez vos requêtes LLM avec Helicone"
sidebar_position: 19
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement à démontrer comment personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

# Intégration de Helicone avec Open WebUI

Helicone est une plateforme open-source d'observabilité LLM destinée aux développeurs pour surveiller, déboguer et améliorer des applications **prêtes à la production**, y compris votre déploiement Open WebUI.

En activant Helicone, vous pouvez enregistrer les requêtes LLM, évaluer et expérimenter avec les invites, et obtenir des informations instantanées qui vous aident à apporter des modifications en production en toute confiance.

- **Surveillance en temps réel avec une vue consolidée sur différents types de modèles** : Surveillez à la fois les modèles Ollama locaux et les API cloud via une interface unique
- **Visualisation et relecture des requêtes** : Visualisez exactement quelles invites ont été envoyées à chaque modèle dans Open WebUI et les sorties générées par les LLM pour évaluation
- **Suivi des performances des LLM locaux** : Mesurez les temps de réponse et le débit de vos modèles auto-hébergés
- **Analytique d'utilisation par modèle** : Comparez les schémas d'utilisation entre différents modèles dans votre configuration Open WebUI
- **Analytique utilisateur** pour comprendre les schémas d'interaction
- **Capacités de débogage** pour résoudre les problèmes liés aux réponses des modèles
- **Suivi des coûts** pour votre utilisation des LLM auprès des différents fournisseurs


## Comment intégrer Helicone avec OpenWebUI

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/8iVHOkUrpSA?si=Jt1GVqA0wY4UI7sF"
  title="Lecteur vidéo YouTube"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>

### Étape 1 : Créez un compte Helicone et générez votre clé API

Créez un [compte Helicone](https://www.helicone.ai/) et connectez-vous pour générer une [clé API ici](https://us.helicone.ai/settings/api-keys).

*— Assurez-vous de générer une [clé API en écriture seule](https://docs.helicone.ai/helicone-headers/helicone-auth). Cela garantit que vous permettez uniquement l'enregistrement des données dans Helicone sans accès en lecture à vos données privées.*

### Étape 2 : Créez un compte OpenAI et générez votre clé API

Créez un compte OpenAI et connectez-vous au [Portail Développeur d'OpenAI](https://platform.openai.com/account/api-keys) pour générer une clé API.

### Étape 3 : Exécutez votre application Open WebUI en utilisant l'URL de base d'Helicone

Pour lancer votre première application Open WebUI, utilisez la commande des [docs Open WebUI](https://docs.openwebui.com/) en incluant l'API BASE URL d'Helicone afin que vous puissiez interroger et surveiller automatiquement.

```bash
   # Configurez vos variables d'environnement
   export HELICONE_API_KEY=<VOTRE_CLE_API>
   export OPENAI_API_KEY=<VOTRE_CLE_API_OPENAI>

   # Exécutez Open WebUI avec l'intégration Helicone
   docker run -d -p 3000:8080 \
     -e OPENAI_API_BASE_URL="https://oai.helicone.ai/v1/$HELICONE_API_KEY" \
     -e OPENAI_API_KEY="$OPENAI_API_KEY" \
     --name open-webui \
     ghcr.io/open-webui/open-webui
```

Si vous avez déjà une application Open WebUI déployée, rendez-vous dans le `Panneau d'administration` > `Paramètres` > `Connexions` et cliquez sur le bouton `+` pour "Gérer les connexions API OpenAI". Mettez à jour les paramètres suivants :

- Votre `URL Base API` serait ``https://oai.helicone.ai/v1/<YOUR_HELICONE_API_KEY>``
- La `CLÉ API` serait votre clé API OpenAI.

![Configuration Open WebUI Helicone](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272273/openwebui-helicone-setup_y4ssca.gif)

### Étape 4 : Assurez-vous que la surveillance fonctionne

Pour vous assurer que votre intégration fonctionne, connectez-vous au tableau de bord d'Helicone et consultez l'onglet "Requêtes".

Vous devriez voir les requêtes effectuées via votre interface Open WebUI déjà enregistrées dans Helicone.

![Exemple de traçage Helicone](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272747/CleanShot_2025-04-21_at_17.57.46_2x_wpkpyf.png)

## En savoir plus

Pour un guide complet sur Helicone, vous pouvez consulter [la documentation Helicone ici](https://docs.helicone.ai/getting-started/quick-start).
