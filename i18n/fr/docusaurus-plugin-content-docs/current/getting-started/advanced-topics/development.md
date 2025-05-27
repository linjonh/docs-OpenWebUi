---
sidebar_position: 5
title: "🛠️ Guide de Développement Local"
---

# Prêt à Contribuer à Open WebUI? Commençons! 🚀

Envie de plonger dans le développement de Open WebUI? Ce guide complet vous guidera à travers la configuration de votre **environnement de développement local** rapidement et facilement. Que vous soyez un développeur expérimenté ou un débutant, nous vous aiderons à être prêt à modifier le frontend, améliorer le backend, et contribuer à l'avenir de Open WebUI! Suivez ces étapes simples et détaillées pour mettre en place votre environnement de développement!

## Prérequis

Avant de commencer, assurez-vous que votre système satisfait ces exigences minimales :

- **Système d'Exploitation:** Linux (ou WSL sur Windows), Windows 11, ou macOS. *(Recommandé pour une meilleure compatibilité)*
- **Python:** Version **3.11 ou supérieure**. *(Requis pour les services backend)*
- **Node.js:** Version **22.10 ou supérieure**. *(Requis pour le développement frontend)*
- **IDE (Recommandé):** Nous recommandons l'utilisation d'un IDE comme [VSCode](https://code.visualstudio.com/) pour l'édition de code, le débogage, et l'accès au terminal intégré. N'hésitez pas à utiliser votre IDE préféré si vous en avez un!
- **[Optionnel] GitHub Desktop:** Pour une gestion plus facile du dépôt Git, surtout si vous n'êtes pas familier avec Git en ligne de commande, envisagez d'installer [GitHub Desktop](https://desktop.github.com/).

## Configuration de Votre Environnement Local

Nous allons configurer à la fois le frontend (interface utilisateur) et le backend (logiciel API et serveur) de Open WebUI.

### 1. Cloner le Dépôt

Tout d'abord, utilisez `git clone` pour télécharger le dépôt Open WebUI sur votre machine locale. Cela créera une copie locale du projet sur votre ordinateur.

1. **Ouvrez votre terminal** (ou Git Bash si vous êtes sur Windows et utilisez Git Bash).
2. **Allez dans le répertoire** où vous souhaitez stocker le projet Open WebUI.
3. **Clonez le dépôt:** Exécutez la commande suivante :

```bash
git clone https://github.com/open-webui/open-webui.git
cd open-webui
```

   La commande `git clone` télécharge les fichiers du projet depuis GitHub. La commande `cd open-webui` vous dirige ensuite dans le répertoire nouvellement créé du projet.

### 2. Configuration Frontend (Interface Utilisateur)

Mettons d'abord en marche l'interface utilisateur (ce que vous voyez dans votre navigateur) :

1. **Configurer les Variables d'Environnement:**
   - Copiez le fichier exemple de l'environnement vers `.env` :

     ```bash
     cp -RPp .env.example .env
     ```

     Cette commande copie le fichier `.env.example` dans un nouveau fichier intitulé `.env`. Le fichier `.env` est où vous configurerez les variables d'environnement pour le frontend.

   - **Personnalisez `.env`** : Ouvrez le fichier `.env` dans votre éditeur de code (comme VSCode). Ce fichier contient les variables de configuration pour le frontend, comme les points de terminaison API et autres paramètres. Pour le développement local, les paramètres par défaut dans `.env.example` sont généralement suffisants pour démarrer. Cependant, vous pouvez les personnaliser si nécessaire.

  **Important:** Ne commettez pas d'informations sensibles dans `.env` si vous contribuez au dépôt.

1. **Installer les Dépendances Frontend:**
   - **Allez dans le répertoire frontend:** Si vous n'êtes pas déjà dans le répertoire racine du projet (`open-webui`), assurez-vous d'y être.

     ```bash
     # Si vous n'êtes pas dans le répertoire racine du projet, exécutez:
     cd open-webui
     ```

   - Installez les bibliothèques JavaScript requises :

     ```bash
     npm install
     ```

     Cette commande utilise `npm` (Node Package Manager) pour lire le fichier `package.json` dans le répertoire racine du projet et télécharger toutes les bibliothèques et outils JavaScript nécessaires pour exécuter le frontend. Cela peut prendre quelques minutes en fonction de votre connexion Internet.

2. **Démarrer le Serveur de Développement Frontend:**

     ```bash
     npm run dev
     ```

     Cette commande lance le serveur de développement frontend. Si les étapes ont été suivies correctement, il indiquera généralement que le serveur est en marche et fournira une URL locale.

     🎉 **Accédez au Frontend:** Ouvrez votre navigateur web et allez sur [http://localhost:5173](http://localhost:5173). Vous devriez voir un message indiquant que le frontend de Open WebUI est en cours d'exécution et attend que le backend soit disponible. Ne vous inquiétez pas de ce message pour le moment! Mettons en place le backend ensuite. **Gardez ce terminal en marche** – il sert votre frontend!

### 3. Configuration Backend (API et Serveur)

Pour une expérience de développement plus fluide, nous **recommandons fortement** d'utiliser des instances de terminal distinctes pour vos processus frontend et backend. Cela garde vos workflows organisés et facilite la gestion de chaque partie de l'application de manière indépendante.

**Pourquoi des Terminaux Séparés?**

- **Isolation des Processus:** Les serveurs de développement frontend et backend sont des programmes distincts. Les exécuter dans des terminaux séparés garantit qu'ils ne se gênent pas mutuellement et permet des redémarrages ou arrêts indépendants.
- **Logs et sorties plus clairs :** Chaque terminal affichera les journaux et sorties spécifiques soit au frontend soit au backend. Cela facilite grandement le débogage et la surveillance, car vous n'avez pas à passer au crible des journaux entremêlés.
- **Réduction de l'encombrement du terminal :** Mélanger les commandes frontend et backend dans un seul terminal peut devenir confus. Des terminaux séparés permettent de conserver l'historique des commandes et les processus actifs bien organisés.
- **Efficacité améliorée du workflow :** Vous pouvez travailler sur les tâches frontend (comme exécuter `npm run dev`) dans un terminal et simultanément gérer les tâches backend (comme démarrer le serveur ou consulter les journaux) dans un autre, sans avoir à changer constamment de contexte au sein d'un seul terminal.

**Utilisation des terminaux intégrés de VSCode (recommandé) :**

La fonction de terminal intégré de VSCode rend la gestion de plusieurs terminaux extrêmement facile. Voici comment l'utiliser pour séparer le frontend et le backend :

1. **Terminal Frontend (vous l'avez probablement déjà) :** Si vous avez suivi les étapes de configuration du frontend, vous avez probablement déjà un terminal ouvert dans VSCode à la racine du projet (répertoire `open-webui`). C'est là que vous exécuterez vos commandes frontend (`npm run dev`, etc.). Assurez-vous d'être dans le répertoire `open-webui` pour les étapes suivantes si ce n'est pas déjà le cas.

2. **Terminal Backend (ouvrez-en un nouveau) :**
   - Dans VSCode, allez dans **Terminal > Nouveau terminal** (ou utilisez le raccourci `Ctrl+Maj+` sous Windows/Linux ou `Cmd+Maj+` sous macOS). Cela ouvrira un nouveau panneau de terminal intégré.
   - **Naviguez vers le répertoire `backend` :** Dans ce *nouveau* terminal, utilisez la commande `cd backend` pour changer le répertoire vers le dossier `backend` au sein de votre projet. Cela garantit que toutes les commandes liées au backend sont exécutées dans le bon contexte.

   Vous avez maintenant **deux instances de terminal distinctes dans VSCode** : une pour le frontend (probablement dans le répertoire `open-webui`) et une spécifiquement pour le backend (dans le répertoire `backend`). Vous pouvez facilement basculer entre ces terminaux dans VSCode pour gérer vos processus frontend et backend de manière indépendante. Cette configuration est fortement recommandée pour un workflow de développement plus propre et plus efficace.

**Étapes de configuration du backend (dans votre terminal *backend*) :**

1. **Naviguez vers le répertoire Backend :** (Vous devriez déjà être dans le répertoire `backend` dans votre *nouveau* terminal depuis l'étape précédente). Si ce n'est pas le cas, exécutez :

   ```bash
   cd backend
   ```

2. **Créer et activer un environnement Conda (recommandé) :**
   - Nous recommandons fortement d'utiliser Conda pour gérer les dépendances Python et isoler l'environnement de votre projet. Cela évite les conflits avec d'autres projets Python sur votre système et garantit que vous disposez de la version correcte de Python et des bibliothèques.

     ```bash
     conda create --name open-webui python=3.11
     conda activate open-webui
     ```

     - `conda create --name open-webui python=3.11` : Cette commande crée un nouvel environnement Conda nommé `open-webui` utilisant Python version 3.11. Si vous choisissez une version différente de Python 3.11.x, cela fonctionne également.
     - `conda activate open-webui` : Cette commande active l'environnement Conda nouvellement créé. Une fois activé, l'invite de votre terminal change généralement pour indiquer que vous êtes dans l'environnement `open-webui` (par exemple, il peut afficher `(open-webui)` au début de la ligne).
  
    **Assurez-vous d'activer l'environnement dans votre terminal backend avant de continuer.**

     *(L'utilisation de Conda est facultative mais fortement recommandée pour gérer les dépendances Python et éviter les conflits.)* Si vous choisissez de ne pas utiliser Conda, assurez-vous d'utiliser Python 3.11 ou version supérieure et passez à l'étape suivante, mais soyez conscient des conflits de dépendances potentiels.

1. **Installer les dépendances Backend :**
     - Dans votre *terminal backend* (et avec l'environnement Conda activé si vous utilisez Conda), exécutez :

     ```bash
     pip install -r requirements.txt -U
     ```

     Cette commande utilise `pip` (installateur de packages Python) pour lire le fichier `requirements.txt` dans le répertoire `backend`. `requirements.txt` liste toutes les bibliothèques Python nécessaires au fonctionnement du backend. `pip install` télécharge et installe ces bibliothèques dans votre environnement Python actif (votre environnement Conda si vous l'utilisez, ou votre environnement Python système sinon). L'option `-U` garantit que vous obtenez les dernières versions compatibles des bibliothèques.

2. **Démarrez le serveur de développement Backend :**
     - Dans votre *terminal backend*, exécutez :

     ```bash
     sh dev.sh
     ```

     Cette commande exécute le script `dev.sh`. Ce script contient probablement la commande pour démarrer le serveur de développement backend. *(Vous pouvez ouvrir et examiner le fichier `dev.sh` dans votre éditeur de code pour voir exactement quelle commande est exécutée si vous êtes curieux.)* Le serveur backend démarre généralement et imprime quelques sorties dans le terminal.

     📄 **Explorez la documentation de l'API :** Une fois le backend en cours d'exécution, vous pouvez accéder à la documentation API générée automatiquement dans votre navigateur Web à l'adresse [http://localhost:8080/docs](http://localhost:8080/docs). Cette documentation est extrêmement précieuse pour comprendre les points de terminaison de l'API backend, interagir avec le backend, et savoir quelles données il attend ou renvoie. Gardez cette documentation à portée de main pendant le développement !

🎉 **Félicitations !** Si vous avez suivi toutes les étapes, vous devriez maintenant avoir les serveurs de développement frontend et backend fonctionnant localement. Retournez à votre onglet de navigateur où vous avez accédé au frontend (généralement [http://localhost:5173](http://localhost:5173)). **Actualisez la page.** Vous devriez maintenant voir l'application complète Open WebUI fonctionner dans votre navigateur, connectée à votre backend local !

## Résolution des problèmes courants

Voici des solutions à certains problèmes courants que vous pourriez rencontrer lors de l'installation ou du développement :

### 💥 "ERREUR FATALE : Limite de tas atteinte" (Frontend)

Cette erreur, souvent vue lors du développement frontend, indique que Node.js manque de mémoire pendant le processus de construction, notamment avec des applications frontend volumineuses.

**Solution :** Augmenter la taille du tas de Node.js. Cela donne à Node.js plus de mémoire pour fonctionner. Vous avez plusieurs options :

1. **Utiliser la variable d'environnement `NODE_OPTIONS` (recommandé pour le développement) :**
   - C'est un moyen temporaire d'augmenter la limite de mémoire pour la session de terminal actuelle. Avant d'exécuter `npm run dev` ou `npm run build` dans votre terminal *frontend*, définissez la variable d'environnement `NODE_OPTIONS` :

     ```bash
     export NODE_OPTIONS="--max-old-space-size=4096" # Pour Linux/macOS (bash, zsh)
     # set NODE_OPTIONS=--max-old-space-size=4096 # Pour Windows (Command Prompt)
     # $env:NODE_OPTIONS="--max-old-space-size=4096" # Pour Windows (PowerShell)
     npm run dev
     ```

     Choisissez la commande appropriée pour votre système d'exploitation et terminal. `4096` représente 4 Go de mémoire. Vous pouvez essayer d'augmenter cette valeur davantage si nécessaire (par exemple, `8192` pour 8 Go). Ce paramètre s'appliquera uniquement aux commandes exécutées dans la session de terminal actuelle.

2. **Modifier le `Dockerfile` (pour les environnements Docker) :**
   - Si vous travaillez avec Docker, vous pouvez définir de manière permanente la variable d'environnement `NODE_OPTIONS` dans votre `Dockerfile`. Ceci est utile pour une allocation de mémoire cohérente dans les environnements Docker, comme indiqué dans l'exemple du guide original :

     ```dockerfile
     ENV NODE_OPTIONS=--max-old-space-size=4096
     ```

   - **Allouer suffisamment de RAM :** Quelle que soit la méthode, assurez-vous que votre système ou conteneur Docker dispose de suffisamment de RAM disponible pour Node.js. **Au moins 4 Go de RAM sont recommandés**, et il pourrait en falloir davantage pour des projets plus volumineux ou des constructions complexes. Fermez les applications inutiles pour libérer de la RAM.

### ⚠️ Conflits de ports (Frontend & Backend)

Si vous voyez des erreurs liées aux ports, comme "Adresse déjà utilisée" ou "Port déjà occupé," cela signifie qu'une autre application sur votre système utilise déjà le port `5173` (par défaut pour le frontend) ou `8080` (par défaut pour le backend). Une seule application peut utiliser un port spécifique à la fois.

**Solution :**

1. **Identifier le processus en conflit :** Vous devez découvrir quelle application utilise le port dont vous avez besoin.
   - **Linux/macOS :** Ouvrez un nouveau terminal et utilisez les commandes `lsof` ou `netstat` :
     - `lsof -i :5173` (ou `:8080` pour le port backend)
     - `netstat -tulnp | grep 5173` (ou `8080`)
     Ces commandes listeront l'ID du processus (PID) et le nom du processus utilisant le port spécifié.
   - **Windows :** Ouvrez l'Invite de commandes ou PowerShell en tant qu'administrateur et utilisez `netstat` ou `Get-NetTCPConnection` :
     - `netstat -ano | findstr :5173` (ou `:8080`) (Invite de commandes)
     - `Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess` (PowerShell)
     Ces commandes montreront également le PID du processus utilisant le port.

2. **Terminer le processus en conflit :** Une fois que vous identifiez l'ID de processus (PID), vous pouvez arrêter l'application qui utilise ce port. **Soyez prudent lorsque vous terminez des processus, surtout si vous ne savez pas ce qu'ils sont.**
   - **Linux/macOS :** Utilisez la commande `kill` : `kill <PID>` (remplacez `<PID>` par l'ID du processus réel). Si le processus ne se termine pas avec `kill`, vous pouvez utiliser `kill -9 <PID>` (arrêt forcé), mais utilisez cela avec prudence.
   - **Windows :** Utilisez la commande `taskkill` dans l'Invite de commandes ou PowerShell en tant qu'administrateur : `taskkill /PID <PID> /F` (remplacez `<PID>` par l'ID du processus). Le flag `/F` force la terminaison.

3. **Changer les ports (Avancé) :**
   - Si vous ne pouvez pas terminer le processus en conflit (par exemple, c'est un service système dont vous avez besoin), vous pouvez configurer Open WebUI pour utiliser des ports différents pour le frontend et/ou le backend. Cela implique généralement de modifier les fichiers de configuration.
     - **Port du frontend :** Consultez la documentation ou les fichiers de configuration du frontend (souvent dans `vite.config.js` ou similaire) pour savoir comment changer le port du serveur de développement. Vous devrez peut-être également ajuster le fichier `.env` si le frontend utilise des variables d'environnement pour le port.
     - **Port du Backend:** Examinez le script `dev.sh` ou les fichiers de configuration du backend pour voir comment le port du backend est défini. Vous devrez peut-être modifier la commande de démarrage ou un fichier de configuration pour changer le port du backend. Si vous modifiez le port du backend, vous devrez probablement mettre à jour le fichier `.env` du frontend pour pointer vers la nouvelle URL du backend.

### 🔄 Le rechargement à chaud ne fonctionne pas

Le rechargement à chaud (ou remplacement des modules à chaud - HMR) est une fonction de développement fantastique qui actualise automatiquement votre navigateur lorsque vous apportez des modifications au code. Si cela ne fonctionne pas, cela peut ralentir considérablement votre flux de travail de développement.

**Étapes de dépannage :**

1. **Vérifiez si les serveurs de développement sont actifs :** Assurez-vous que `npm run dev` (frontend) et `sh dev.sh` (backend) fonctionnent bien dans leurs terminaux respectifs et qu'ils n'ont rencontré aucune erreur. Consultez les messages dans la sortie du terminal pour vérifier qu'ils sont en mode "watch" ou "mode développement." En cas d'erreurs, résolvez-les en priorité.
2. **Vérifiez les messages concernant le mode "Watch"/HMR :** Lors du démarrage des serveurs de développement, des messages indiquant que le rechargement à chaud ou le mode de surveillance des fichiers sont activés devraient apparaître. Recherchez des phrases comme "HMR activé," "surveillance de modifications des fichiers," ou similaires. Si vous ne voyez pas ces messages, il pourrait y avoir un problème de configuration.
3. **Cache du navigateur :** Parfois, le cache de votre navigateur peut vous empêcher de voir les dernières modifications, même si le rechargement à chaud fonctionne. Essayez un **rafraîchissement forcé** dans votre navigateur :
   - **Windows/Linux :** Ctrl+Shift+R
   - **macOS :** Cmd+Shift+R
   - Vous pouvez également essayer de vider le cache de votre navigateur ou d'ouvrir le frontend dans une fenêtre de navigation privée/incognito.
4. **Problèmes de dépendances (Frontend) :** Des dépendances obsolètes ou corrompues peuvent parfois interférer avec le rechargement à chaud. Essayez de réinstaller les dépendances pour le frontend :
   - Dans votre terminal *frontend*, exécutez :
  
     ```bash
     rm -rf node_modules && npm install
     ```

     Cette commande supprime le répertoire `node_modules` (où sont stockées les dépendances) et les réinstalle depuis le début. Cela peut résoudre les problèmes causés par des packages corrompus ou obsolètes.
5. **Redémarrage du backend requis (pour les modifications backend) :** Le rechargement à chaud fonctionne généralement mieux pour les modifications du code frontend (interface utilisateur, styles, composants). Pour des modifications importantes du code backend (notamment les modifications de la logique serveur, des points d'API ou des dépendances), il peut être nécessaire de **redémarrer manuellement le serveur backend** (arrêtez `sh dev.sh` dans votre terminal backend et relancez-le). Le rechargement à chaud pour les modifications backend est souvent moins fiable ou non configuré automatiquement dans de nombreuses configurations de développement backend.
6. **Problèmes avec l'IDE/l'éditeur de code :** Dans de rares cas, des problèmes avec votre IDE ou éditeur de code peuvent empêcher la détection correcte des modifications de fichiers par les serveurs de développement. Essayez de redémarrer votre IDE ou assurez-vous que les fichiers sont sauvegardés correctement.
7. **Problèmes de configuration (avancé) :** Si aucune des étapes ci-dessus ne fonctionne, il pourrait y avoir un problème de configuration plus complexe avec le serveur de développement du frontend ou du backend. Consultez la documentation du projet, les fichiers de configuration (par exemple, `vite.config.js` pour le frontend, les fichiers de configuration du serveur backend), ou cherchez de l'aide auprès de la communauté ou des mainteneurs d'Open WebUI.

## Contribuer à Open WebUI

Nous accueillons chaleureusement vos contributions à Open WebUI ! Votre aide est précieuse pour améliorer ce projet. Voici un guide rapide pour un flux de contribution fluide et efficace :

1. **Comprendre la structure du projet :** Prenez le temps de vous familiariser avec la structure des dossiers du projet, en particulier les dossiers `frontend` et `backend`. Regardez le code, les fichiers de configuration et la documentation pour comprendre comment tout est organisé.
2. **Commencez par de petites contributions :** Si vous êtes nouveau dans le projet, envisagez de commencer par de petites contributions telles que :
   - **Améliorations de la documentation :** Corrigez les fautes de frappe, clarifiez les explications, ajoutez plus de détails à la documentation.
   - **Corrections de bugs :** Résolvez les bugs ou problèmes signalés.
   - **Petites améliorations de l'interface utilisateur :** Améliorez le style, corrigez des problèmes mineurs de mise en page.
   Ces petites contributions sont un excellent moyen de se familiariser avec le code du projet et le processus de contribution.
3. **Discutez d'abord des changements importants :** Si vous prévoyez d'implémenter une nouvelle fonctionnalité importante ou de réaliser des modifications substantielles, il est fortement recommandé de **discuter de vos idées avec les mainteneurs ou la communauté du projet au préalable.** Vous pouvez le faire en :
   - **Ouvrant une issue** sur le dépôt GitHub pour proposer votre fonctionnalité ou changement.
   - **Rejoignant les canaux communautaires d'Open WebUI** (s'ils sont disponibles, consultez le README ou le site Web du projet pour les liens) et en discutant de vos idées là-bas.
   Cela permet de garantir que votre contribution correspond aux objectifs du projet et évite de consacrer des efforts à des fonctionnalités qui pourraient ne pas être acceptées.
4. **Créez une branche séparée pour votre travail :** **Ne validez jamais directement dans la branche `dev`.** Créez toujours une nouvelle branche pour chaque fonctionnalité ou correction de bug sur laquelle vous travaillez. Cela permet de garder vos modifications isolées et facilite la gestion et la soumission des pull requests.
   - Pour créer une nouvelle branche (par exemple, nommée `my-feature-branch`) basée sur la branche `dev` :
  
     ```bash
     git checkout dev
     git pull origin dev # Assurez-vous que votre branche locale dev est à jour
     git checkout -b ma-branche-fonctionnalité
     ```

5. **Commitez fréquemment et écrivez des messages clairs pour vos commits:** Faites des commits petits et logiques lorsque vous développez des fonctionnalités ou corrigez des bugs. **Écrivez des messages de commit clairs et concis** qui expliquent les changements effectués et pourquoi. De bons messages de commit facilitent la compréhension de l'historique des changements et sont essentiels pour la collaboration.
   - Exemple d'un bon message de commit : `Fix: Correction d'une faute de frappe dans la documentation pour la configuration du backend`
   - Exemple d'un bon message de commit : `Feat: Implémentation de la page de profil utilisateur avec affichage des informations de base`
6. **Restez synchronisé régulièrement avec la branche `dev` :** Pendant que vous travaillez sur votre branche, synchronisez périodiquement votre branche avec les derniers changements de la branche `dev` pour minimiser les conflits de fusion par la suite :

   ```bash
   git checkout dev
   git pull origin dev
   git checkout ma-branche-fonctionnalité
   git merge dev
   ```

   Résolvez tout conflit de fusion qui pourrait survenir lors de l'étape `git merge`.
7. **Exécutez les tests (si disponibles) avant de pousser vos changements :** Bien que ce guide ne détaille pas les procédures de test spécifiques pour Open WebUI, il est recommandé de lancer les tests disponibles avant de pousser votre code. Consultez la documentation du projet ou le fichier `package.json` (pour le frontend) et les fichiers du backend pour les commandes liées aux tests (par exemple, `npm run test`, `pytest`, etc.). Exécuter des tests permet de s’assurer que vos changements n’ont pas introduit de régressions ou cassé des fonctionnalités existantes.
8. **Soumettre une Pull Request (PR) :** Une fois que vous avez terminé votre travail, testé (si applicable), et êtes prêt à contribuer vos changements, soumettez une pull request (PR) vers la branche `dev` du dépôt Open WebUI sur GitHub.
   - **Rendez-vous sur le dépôt Open WebUI sur GitHub.**
   - **Naviguez vers votre branche.**
   - **Cliquez sur le bouton "Contribuer" ou "Pull Request"** (généralement vert).
   - **Remplissez le formulaire de PR :**
     - **Titre :** Donnez à votre PR un titre clair et descriptif qui résume vos changements (par exemple, "Fix: Résolution du problème avec la validation du formulaire de connexion").
     - **Description :** Fournissez une description plus détaillée de vos changements, du problème que vous résolvez (si applicable) et de tout contexte pertinent. Faites un lien vers les issues associées s'il y en a.
   - **Soumettez la PR.**

   Les mainteneurs du projet examineront votre pull request, fourniront des commentaires et éventuellement fusionneront vos changements. Soyez réactif aux commentaires et prêt à effectuer des modifications si nécessaire.

**Merci d'avoir lu ce guide complet et pour votre intérêt à contribuer à Open WebUI ! Nous sommes ravis de voir vos contributions et de vous accueillir dans la communauté Open WebUI !** 🎉 Bon codage !
