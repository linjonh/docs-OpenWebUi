---
sidebar_position: 40
title: "🔗 Intégration Okta OIDC SSO"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas supporté par l'équipe Open WebUI. Il sert uniquement de démonstration sur la manière de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous voulez contribuer ? Consultez le tutoriel de contribution.
:::

# 🔗 Intégration Okta OIDC SSO

## Vue d'ensemble

Cette page de documentation décrit les étapes nécessaires pour intégrer la connexion unique (SSO) Okta OIDC avec Open WebUI. Elle couvre également les fonctionnalités **optionnelles** de gestion des groupes d'utilisateurs d'Open WebUI en fonction de l'appartenance aux groupes Okta, y compris la **création de groupe Just-in-Time (JIT)**. En suivant ces étapes, vous permettrez aux utilisateurs de se connecter à Open WebUI en utilisant leurs identifiants Okta. Si vous choisissez d'activer la synchronisation des groupes (`ENABLE_OAUTH_GROUP_MANAGEMENT`), les utilisateurs seront automatiquement affectés aux groupes pertinents dans Open WebUI en fonction de leurs groupes Okta lors de la connexion. Si vous *activez également* la création de groupe JIT (`ENABLE_OAUTH_GROUP_CREATION`), les groupes présents dans les assertions Okta mais absents dans Open WebUI seront créés automatiquement lors de la connexion.

### Prérequis

*   Une instance d'Open WebUI nouvelle ou existante.
*   Un compte Okta avec des privilèges administratifs pour créer et configurer des applications.
*   Compréhension de base d'OIDC, de la configuration des applications Okta et des variables d'environnement Open WebUI.

## Configuration d'Okta

Tout d'abord, vous devez configurer une application OIDC dans votre organisation Okta et configurer une assertion de groupes pour transmettre les informations de groupe à Open WebUI.

### 1. Créer/Configurer une application OIDC sur Okta

1.  Connectez-vous à votre console d'administration Okta.
2.  Accédez à **Applications > Applications**.
3.  Créez une nouvelle application **OIDC - OpenID Connect** (choisissez **Application Web** comme type) ou sélectionnez une application existante que vous souhaitez utiliser pour Open WebUI.
4.  Lors de la configuration ou dans l'onglet **Paramètres généraux** de l'application, configurez les **URIs de redirection de connexion**. Ajoutez l'URI de votre instance Open WebUI, suivi de `/oauth/oidc/callback`. Exemple : `https://your-open-webui.com/oauth/oidc/callback`.
5.  Notez l’**ID client** et le **secret client** fournis dans l'onglet **Général** de l'application. Vous en aurez besoin pour la configuration d'Open WebUI.
6.  Assurez-vous que les utilisateurs ou groupes appropriés sont assignés à cette application dans l'onglet **Affectations**.

### 2. Ajouter une assertion de groupes au token ID

**(Optionnel)** Pour activer la gestion automatique des groupes dans Open WebUI en fonction des groupes Okta, vous devez configurer Okta pour envoyer les appartenances aux groupes de l'utilisateur dans le token ID. Si vous avez seulement besoin de la connexion SSO et préférez gérer les groupes manuellement dans Open WebUI, vous pouvez passer cette section.

1.  Dans la console d'administration, accédez à **Applications > Applications** et sélectionnez votre application cliente OIDC.
2.  Allez dans l'onglet **Connexion** et cliquez sur **Modifier** dans la section **Token ID OpenID Connect**.
3.  Dans la section **Type d'assertion de groupes**, sélectionnez **Filtrer**.
4.  Dans la section **Filtre des assertions de groupes** :
    *   Entrez `groups` comme nom de l'assertion (ou utilisez la valeur par défaut si présente).
    *   Sélectionnez **Correspond à l'expression régulière** dans le menu déroulant.
    *   Entrez `.*` dans le champ de l'expression régulière. Cela inclura tous les groupes dont l'utilisateur est membre. Vous pouvez utiliser une expression régulière plus spécifique si nécessaire.
5.  Cliquez sur **Enregistrer**.
6.  Cliquez sur le lien **Retour aux applications**.
7.  À partir du menu déroulant du bouton **Plus** pour votre application, cliquez sur **Actualiser les données de l'application**.

*Pour des configurations plus avancées des assertions de groupes, consultez la documentation Okta sur [la personnalisation des tokens](https://developer.okta.com/docs/guides/customize-tokens-returned-from-okta/main/) et [les fonctions de groupes](https://developer.okta.com/docs/reference/okta-expression-language/#group-functions).*

## Configuration d'Open WebUI

Pour activer Okta OIDC SSO dans Open WebUI, vous devez définir les variables d'environnement principales suivantes. Des variables supplémentaires sont requises si vous souhaitez activer la fonction optionnelle de gestion des groupes.

```bash
# --- Paramètres de base OIDC ---
# Activez l'inscription OAuth si vous souhaitez que les utilisateurs puissent créer des comptes via Okta
# ENABLE_OAUTH_SIGNUP="true"

# L'ID client de votre application Okta
OAUTH_CLIENT_ID="YOUR_OKTA_CLIENT_ID"

# Le secret client de votre application Okta
OAUTH_CLIENT_SECRET="YOUR_OKTA_CLIENT_SECRET"

# L'URL de découverte OIDC de votre organisation Okta
# Format : https://<your-okta-domain>/.well-known/openid-configuration
# Ou pour un serveur d'autorisation spécifique : https://<your-okta-domain>/oauth2/<auth-server-id>/.well-known/openid-configuration
OPENID_PROVIDER_URL="YOUR_OKTA_OIDC_DISCOVERY_URL"

# Nom affiché sur le bouton de connexion (ex. : "Connexion avec Okta")
OAUTH_PROVIDER_NAME="Okta"

# Portée à demander (la valeur par défaut est généralement suffisante)
# OAUTH_SCOPES="openid email profile groups" # Assurez-vous que groups est inclus si ce n'est pas par défaut

# --- Gestion des groupes OAuth (Optionnel) ---
# Réglez sur "true" uniquement si vous avez configuré l'assertion de groupes dans Okta (Étape 2)
# et vous souhaitez que les groupes Open WebUI soient gérés en fonction des groupes Okta lors de la connexion.
# Cela synchronise les groupes existants. Les utilisateurs seront ajoutés/supprimés des groupes Open WebUI
# pour correspondre à leurs revendications de groupe Okta.
# ENABLE_OAUTH_GROUP_MANAGEMENT="true"

# Nécessaire uniquement si ENABLE_OAUTH_GROUP_MANAGEMENT est vrai.
# Le nom de la revendication dans le jeton ID contenant l'information sur les groupes (doit correspondre à la configuration Okta)
# OAUTH_GROUP_CLAIM="groups"

# Optionnel : Activer la création Just-in-Time (JIT) de groupes s'ils existent dans les revendications Okta mais pas dans Open WebUI.
# Requiert ENABLE_OAUTH_GROUP_MANAGEMENT="true".
# Si réglé sur false (par défaut), seuls les groupes existants seront synchronisés.
# ENABLE_OAUTH_GROUP_CREATION="false"
```

Remplacez `YOUR_OKTA_CLIENT_ID`, `YOUR_OKTA_CLIENT_SECRET` et `YOUR_OKTA_OIDC_DISCOVERY_URL` par les valeurs réelles de la configuration de votre application Okta.

Pour activer la synchronisation des groupes en fonction des revendications Okta, réglez `ENABLE_OAUTH_GROUP_MANAGEMENT="true"` et assurez-vous que `OAUTH_GROUP_CLAIM` correspond au nom de la revendication configurée dans Okta (par défaut, `groups`).

Pour *également* activer la création automatique Just-in-Time (JIT) de groupes qui existent dans Okta mais pas encore dans Open WebUI, réglez `ENABLE_OAUTH_GROUP_CREATION="true"`. Vous pouvez laisser cette valeur à `false` si vous souhaitez uniquement gérer les adhésions aux groupes qui existent déjà dans Open WebUI.

:::warning Gestion des adhésions aux groupes
Lorsque `ENABLE_OAUTH_GROUP_MANAGEMENT` est défini sur `true`, les appartenances aux groupes d'un utilisateur dans Open WebUI seront **strictement synchronisées** avec les groupes reçus dans leurs revendications Okta lors de chaque connexion. Cela signifie :
*   Les utilisateurs seront **ajoutés** aux groupes Open WebUI correspondant à leurs revendications Okta.
*   Les utilisateurs seront **supprimés** de tous les groupes Open WebUI (y compris ceux créés ou attribués manuellement dans Open WebUI) si ces groupes **ne sont pas** présents dans leurs revendications Okta pour cette session de connexion.

Assurez-vous que tous les groupes nécessaires sont correctement configurés et attribués dans Okta et inclus dans la revendication de groupe.
:::

:::info Persistance de session dans les déploiements multi-nœuds

Lors du déploiement d'Open WebUI sur plusieurs nœuds (par exemple, dans un cluster Kubernetes ou derrière un équilibrage de charge), il est crucial d'assurer la persistance des sessions pour une expérience utilisateur fluide, en particulier avec SSO. Définissez la variable d'environnement `WEBUI_SECRET_KEY` à une **valeur sécurisée et unique** identique sur **toutes** les instances Open WebUI.
:::

```bash
# Exemple : Générer une clé secrète forte (par exemple, en utilisant openssl rand -hex 32)
WEBUI_SECRET_KEY="YOUR_UNIQUE_AND_SECURE_SECRET_KEY"
```

Si cette clé n'est pas cohérente sur tous les nœuds, les utilisateurs peuvent être obligés de se reconnecter si leur session est routée vers un autre nœud, car le jeton de session signé par un nœud ne sera pas valide sur un autre. Par défaut, l'image Docker génère une clé aléatoire au premier démarrage, ce qui est inadapté aux configurations multi-nœuds.

:::tip Désactivation du formulaire de connexion standard

Si vous souhaitez *uniquement* autoriser les connexions via Okta (et potentiellement d'autres fournisseurs OAuth configurés), vous pouvez désactiver le formulaire standard de connexion par email/mot de passe en définissant la variable d'environnement suivante :
:::


```bash
ENABLE_LOGIN_FORM="false"
```

:::danger Prérequis Important
Définir `ENABLE_LOGIN_FORM="false"` **requiert** que `ENABLE_OAUTH_SIGNUP="true"` soit également défini. Si vous désactivez le formulaire de connexion sans activer l'inscription OAuth, **les utilisateurs (y compris les administrateurs) ne pourront pas se connecter.** Assurez-vous qu'au moins un fournisseur OAuth est configuré et que `ENABLE_OAUTH_SIGNUP` est activé avant de désactiver le formulaire de connexion standard.
:::

Redémarrez votre instance Open WebUI après avoir défini ces variables d'environnement.

## Vérification

1.  Accédez à la page de connexion Open WebUI. Vous devriez voir un bouton intitulé "Connexion avec Okta" (ou ce que vous avez défini pour `OAUTH_PROVIDER_NAME`).
2.  Cliquez sur le bouton et authentifiez-vous via le processus de connexion Okta.
3.  Après une authentification réussie, vous devriez être redirigé vers Open WebUI et connecté.
4.  Si `ENABLE_OAUTH_GROUP_MANAGEMENT` est vrai, connectez-vous en tant qu'utilisateur non-admin. Leurs groupes dans Open WebUI devraient maintenant strictement refléter leurs appartenances actuelles aux groupes dans Okta (toute appartenance à des groupes *non* présents dans la revendication Okta sera supprimée). Si `ENABLE_OAUTH_GROUP_CREATION` est également vrai, tout groupe présent dans les revendications Okta de l'utilisateur qui n'existait pas auparavant dans Open WebUI devrait maintenant être créé automatiquement. Notez que les groupes des utilisateurs admin ne sont pas mis à jour automatiquement via SSO.
5.  Vérifiez les journaux du serveur Open WebUI pour tout problème lié à OIDC ou aux groupes si vous rencontrez des erreurs.

## Dépannage

*   **400 Bad Request/Redirect URI Mismatch:** Vérifiez que l'**URI de redirection de connexion** dans votre application Okta correspond exactement à `<your-open-webui-url>/oauth/oidc/callback`.
*   **Groupes non synchronisés :** Vérifiez que la variable d'environnement `OAUTH_GROUP_CLAIM` correspond au nom de revendication configuré dans les paramètres du jeton ID Okta. Assurez-vous que l'utilisateur s'est déconnecté puis reconnecté après des modifications de groupe - un processus de connexion est nécessaire pour mettre à jour OIDC. N'oubliez pas que les groupes admin ne sont pas synchronisés.
*   **Erreurs de configuration :** Consultez les journaux du serveur Open WebUI pour des messages d'erreur détaillés concernant la configuration OIDC.
*   Consultez la [Documentation officielle SSO d'Open WebUI](/features/sso.md).
*   Référez-vous à la [Documentation développeur d'Okta](https://developer.okta.com/docs/).