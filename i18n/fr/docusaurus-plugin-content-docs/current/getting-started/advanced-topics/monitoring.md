---
sidebar_position: 6
title: "📊 Surveillance de votre Open WebUI"
---

# Maintenez votre Open WebUI en bonne santé grâce à la surveillance 🩺

Surveiller votre instance Open WebUI est essentiel pour garantir qu'elle fonctionne de manière fiable, performante, et pour vous permettre d'identifier et de résoudre rapidement tout problème. Ce guide décrit trois niveaux de surveillance, allant des contrôles de disponibilité de base aux tests approfondis de réponse des modèles.

**Pourquoi surveiller ?**

* **Assurer la disponibilité :** Détecter de manière proactive les pannes et interruptions de service.
* **Perspectives de performance :** Suivre les temps de réponse et identifier les goulots d'étranglement potentiels.
* **Détection précoce des problèmes :** Identifier les problèmes avant qu'ils n'affectent de manière significative les utilisateurs.
* **Tranquillité d'esprit :** Acquérir la confiance que votre instance Open WebUI fonctionne correctement.

## 🚦 Niveaux de surveillance

Nous couvrirons trois niveaux de surveillance, progressant du plus simple au plus complet :

1. **Vérification de santé de base :** Vérifie si le service Open WebUI fonctionne et répond.
2. **Vérification de la connectivité des modèles :** Confirme qu'Open WebUI peut se connecter et répertorier vos modèles configurés.
3. **Test de réponse des modèles (Vérification approfondie) :** Assure que les modèles peuvent effectivement traiter les requêtes et générer des réponses.

## Niveau 1 : Vérification de santé de base ✅

Le niveau le plus simple de surveillance consiste à vérifier le point de terminaison `/health`. Ce point de terminaison est accessible publiquement (aucune authentification requise) et renvoie un code de statut `200 OK` lorsque le service Open WebUI fonctionne correctement.

**Comment tester :**

Vous pouvez utiliser `curl` ou tout client HTTP pour vérifier ce point de terminaison :

```bash
   # Vérification de santé de base - aucune authentification requise
   curl https://your-open-webui-instance/health
```

**Résultat attendu :** Une vérification réussie de la santé retournera un code de statut HTTP `200 OK`. Le contenu du corps de la réponse n'est généralement pas important pour une vérification de santé de base.

### Utiliser Uptime Kuma pour les vérifications de santé de base 🐻

[Uptime Kuma](https://github.com/louislam/uptime-kuma) est un excellent outil de surveillance de disponibilité auto-hébergé, open-source et facile à utiliser. Il est fortement recommandé pour surveiller Open WebUI.

**Étapes pour configurer dans Uptime Kuma :**

1. **Ajouter un nouveau moniteur :** Dans votre tableau de bord Uptime Kuma, cliquez sur "Add New Monitor".
2. **Configurer les paramètres du moniteur :**
   * **Type de moniteur :** Sélectionnez "HTTP(s)".
   * **Nom :** Donnez un nom descriptif à votre moniteur, par exemple, "Vérification de santé Open WebUI".
   * **URL :** Entrez l'URL du point de terminaison de vérification de santé : `http://your-open-webui-instance:8080/health` (Remplacez `your-open-webui-instance:8080` par l'adresse et le port réels de votre Open WebUI).
   * **Intervalle de surveillance :** Définissez la fréquence des vérifications (par exemple, `60 seconds` pour chaque minute).
   * **Nombre de tentatives :** Définissez le nombre de tentatives avant de considérer le service comme hors-service (par exemple, `3` tentatives).

**Ce que cette vérification garantit :**

* **Disponibilité du serveur web :** Assure que le serveur web (par exemple, Nginx, Uvicorn) répond aux requêtes.
* **Application en cours d'exécution :** Confirme que l'application Open WebUI elle-même est en cours d'exécution et initialisée.
* **Connectivité de base aux bases de données :** Inclut généralement une vérification de base pour s'assurer que l'application peut se connecter à la base de données.

## Niveau 2 : Connectivité des modèles Open WebUI 🔗

Pour aller au-delà de la disponibilité basique, vous pouvez surveiller le point de terminaison `/api/models`. Ce point de terminaison **nécessite une authentification** et vérifie qu'Open WebUI peut communiquer avec succès avec vos fournisseurs de modèles configurés (par exemple, Ollama, OpenAI) et récupérer une liste des modèles disponibles.

**Pourquoi surveiller la connectivité des modèles ?**

* **Problèmes de fournisseur de modèles :** Détecter des problèmes avec vos services fournisseurs de modèles (par exemple, pannes d'API, échecs d'authentification).
* **Erreurs de configuration :** Identifier des erreurs de configuration dans les paramètres des fournisseurs de modèles d'Open WebUI.
* **Assurer la disponibilité des modèles :** Confirmer que les modèles que vous souhaitez disponibles sont effectivement accessibles à Open WebUI.

**Détails du point de terminaison de l'API :**

Reportez-vous à la [documentation de l'API Open WebUI](https://docs.openwebui.com/getting-started/api-endpoints/#-retrieve-all-models) pour des détails complets sur le point de terminaison `/api/models` et sa structure de réponse.

**Comment tester avec `curl` (authentifié) :**

Vous aurez besoin d'une clé API pour accéder à ce point de terminaison. Voir la section « Configurer l'authentification » ci-dessous pour les instructions sur la génération d'une clé API.

```bash
   # Vérification de la connectivité des modèles avec authentification
   curl -H "Authorization: Bearer YOUR_API_KEY" https://your-open-webui-instance/api/models
```

*(Remplacez `YOUR_API_KEY` par votre clé API réelle et `your-open-webui-instance` par l'adresse de votre Open WebUI.)*

**Résultat attendu :** Une requête réussie retournera un code de statut `200 OK` et une réponse JSON contenant une liste de modèles.

### Configuration de l'authentification pour la clé API 🔑

Avant de pouvoir surveiller le point de terminaison `/api/models`, vous devez activer les clés API dans Open WebUI et en générer une :

1. **Activer les clés API (Admin requis) :**
   * Connectez-vous à Open WebUI en tant qu'administrateur.
   * Accédez à **Paramètres administrateur** (généralement dans le menu en haut à droite) > **Général**.
   * Recherchez le paramètre "Activer la clé API" et **activez-le**.
   * Cliquez sur **Sauvegarder les modifications**.

2. **Générer une clé API (Paramètres utilisateur) :**
   * Accédez à vos **Paramètres utilisateur** (généralement en cliquant sur l'icône de profil en haut à droite).
   * Allez dans la section **Compte**.
   * Cliquez sur **Générer une nouvelle clé API**.
   * Donnez à la clé API un nom descriptif (par ex., "Clé API de monitoring").
   * **Copiez la clé API générée** et conservez-la en sécurité. Vous en aurez besoin pour votre configuration de monitoring.

   *(Optionnel mais recommandé) :* Pour des pratiques de sécurité optimales, envisagez de créer un **compte utilisateur non administrateur** spécifiquement pour le monitoring et de générer une clé API pour cet utilisateur. Cela limite l'impact potentiel en cas de compromission de la clé API de monitoring.

   *Si vous ne voyez pas l'option de génération de clé API dans vos paramètres, contactez votre administrateur Open WebUI pour s'assurer que les clés API sont activées.*

### Utiliser Uptime Kuma pour surveiller la connectivité des modèles 🐻

1. **Créer un nouveau monitor dans Uptime Kuma :**
   * Type de monitor : "HTTP(s) - JSON Query".
   * Nom : "Vérification de la connectivité des modèles Open WebUI".
   * URL : `http://votre-instance-open-webui:8080/api/models` (Remplacez par votre URL).
   * Méthode : "GET".
   * Code de statut attendu : `200`.

2. **Configurer la requête JSON (Vérifier la liste des modèles) :**
   * **Requête JSON :**  `$count(data[*])>0`
     * **Explication :** Cette requête JSONata vérifie si le tableau `data` dans la réponse API (qui contient la liste des modèles) a un comptage supérieur à 0. En d'autres termes, elle confirme qu'au moins un modèle est retourné.
   * **Valeur attendue :** `true` (La requête doit retourner `true` si des modèles sont listés).

3. **Ajouter des en-têtes d'authentification :**
   * Dans la section "Headers" de la configuration du monitor Uptime Kuma, cliquez sur "Add Header".
   * **Nom de l'en-tête :** `Authorization`
   * **Valeur de l'en-tête :** `Bearer YOUR_API_KEY` (Remplacez `YOUR_API_KEY` par la clé API que vous avez générée).

4. **Définir l'intervalle de surveillance :** Intervalle recommandé : `300 secondes` (5 minutes) ou plus, car les listes de modèles ne changent généralement pas très fréquemment.

**Requêtes JSON alternatives (avancées) :**

Vous pouvez utiliser des requêtes JSONata plus spécifiques pour vérifier certains modèles ou fournisseurs. Voici quelques exemples :

* **Vérifier au moins un modèle Ollama :**  `$count(data[owned_by=ollama])>0`
* **Vérifier si un modèle spécifique existe (par ex., gpt-4o) :** `$exists(data[id=gpt-4o])`
* **Vérifier si plusieurs modèles spécifiques existent (par ex., gpt-4o et gpt-4o-mini) :** `$count(data[id in [gpt-4o, gpt-4o-mini]]) = 2`

Vous pouvez tester et affiner vos requêtes JSONata sur [jsonata.org](https://try.jsonata.org/) en utilisant une réponse API d'exemple pour vous assurer qu'elles fonctionnent comme prévu.

## Niveau 3 : Test de réponse des modèles (Vérification approfondie) 🤖

Pour une surveillance la plus complète, vous pouvez tester si les modèles sont réellement capables de traiter des requêtes et de générer des réponses. Cela implique d'envoyer une simple requête de complétion de chat au point de terminaison `/api/chat/completions`.

**Pourquoi tester les réponses des modèles ?**

* **Vérification de bout en bout :**  Confirme que toute la pipeline des modèles fonctionne, depuis la requête API jusqu'à la réponse du modèle.
* **Problèmes de chargement des modèles :**  Détecte les problèmes avec des modèles spécifiques échouant à se charger ou à répondre.
* **Erreurs de traitement backend :**  Capture les erreurs dans la logique backend pouvant empêcher les modèles de générer des complétions.

**Comment tester avec `curl` (Requête POST authentifiée) :**

Ce test nécessite une clé API et envoie une requête POST avec un message simple au point de terminaison des complétions de chat.

```bash
# Tester la réponse des modèles - requête POST authentifiée
curl -X POST https://votre-instance-open-webui/api/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d {
    "messages": [{"role": "user", "content": "Répondez avec le mot HEALTHY"}],
    "model": "llama3.1",  # Remplacez par un modèle que vous attendez disponible
    "temperature": 0      # Réglez la température à 0 pour des réponses cohérentes
  }
```

*(Remplacez `YOUR_API_KEY`, `votre-instance-open-webui` et `llama3.1` par vos valeurs réelles.)*

**Sortie attendue :** Une requête réussie retournera un statut `200 OK` et une réponse JSON contenant une complétion de chat. Vous pouvez vérifier que la réponse inclut le mot "HEALTHY" (ou une réponse similaire attendue en fonction de votre message d'invite).

**Configurer le niveau 3 de surveillance dans Uptime Kuma impliquerait de configurer un monitor HTTP(s) avec une requête POST, un corps JSON, des en-têtes d'authentification et potentiellement une requête JSON pour valider le contenu de la réponse. Il s'agit d'une configuration plus avancée pouvant être personnalisée selon vos besoins spécifiques.**

En implémentant ces niveaux de surveillance, vous pouvez assurer de manière proactive la santé, la fiabilité et la performance de votre instance Open WebUI, offrant une expérience constamment positive pour les utilisateurs.
