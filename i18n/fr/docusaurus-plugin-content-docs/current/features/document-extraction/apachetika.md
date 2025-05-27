---
sidebar_position: 4000
title: "🪶 Apache Tika Extraction"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration sur la manière de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

## 🪶 Extraction Apache Tika

Cette documentation fournit un guide étape par étape pour intégrer Apache Tika avec Open WebUI. Apache Tika est un outil d'analyse de contenu qui peut être utilisé pour détecter et extraire des métadonnées et du texte de plus d'un millier de types de fichiers différents. Tous ces types de fichiers peuvent être analysés via une seule interface, ce qui rend Tika utile pour l'indexation des moteurs de recherche, l'analyse de contenu, la traduction et bien plus encore.

Prérequis
------------

* Instance Open WebUI
* Docker installé sur votre système
* Réseau Docker configuré pour Open WebUI

Étapes d'Intégration
----------------

### Étape 1: Créer un fichier Docker Compose ou exécuter la commande Docker pour Apache Tika

Vous avez deux options pour exécuter Apache Tika :

**Option 1 : Utiliser Docker Compose**

Créez un nouveau fichier nommé `docker-compose.yml` dans le même répertoire que votre instance Open WebUI. Ajoutez la configuration suivante au fichier :

```yml
services:
  tika:
    image: apache/tika:latest-full
    container_name: tika
    ports:
      - "9998:9998"
    restart: unless-stopped
```

Exécutez le fichier Docker Compose en utilisant la commande suivante :

```bash
docker-compose up -d
```

**Option 2 : Utiliser la commande Docker Run**

Alternativement, vous pouvez exécuter Apache Tika en utilisant la commande Docker suivante :

```bash
docker run -d --name tika \
  -p 9998:9998 \
  --restart unless-stopped \
  apache/tika:latest-full
```

Notez que si vous choisissez d'utiliser la commande Docker run, vous devrez spécifier l'option `--network` si vous souhaitez exécuter le conteneur dans le même réseau que votre instance Open WebUI.

### Étape 2: Configurer Open WebUI pour utiliser Apache Tika

Pour utiliser Apache Tika comme moteur d'extraction de contenu dans Open WebUI, suivez ces étapes :

* Connectez-vous à votre instance Open WebUI.
* Accédez au menu des paramètres dans le `Panneau d'administration`.
* Cliquez sur `Paramètres`.
* Cliquez sur l'onglet `Documents`.
* Modifiez le menu déroulant du moteur d'extraction de contenu `Par défaut` pour sélectionner `Tika`.
* Mettez à jour l'URL du moteur d'extraction de contenu avec `http://tika:9998`.
* Enregistrez les modifications.

 Vérification d'Apache Tika sous Docker
=====================================

Pour vérifier qu'Apache Tika fonctionne correctement dans un environnement Docker, vous pouvez suivre ces étapes :

### 1. Démarrez le conteneur Docker Apache Tika

Tout d'abord, assurez-vous que le conteneur Docker Apache Tika est en cours d'exécution. Vous pouvez le démarrer en utilisant la commande suivante :

```bash
docker run -p 9998:9998 apache/tika
```

Cette commande démarre le conteneur Apache Tika et mappe le port 9998 du conteneur au port 9998 de votre machine locale.

### 2. Vérifiez que le serveur est en cours d'exécution

Vous pouvez vérifier que le serveur Apache Tika fonctionne en envoyant une requête GET :

```bash
curl -X GET http://localhost:9998/tika
```

Cette commande doit renvoyer la réponse suivante :

```
This is Tika Server. Please PUT
```

### 3. Vérifiez l'intégration

Alternativement, vous pouvez également essayer d'envoyer un fichier pour analyse afin de tester l'intégration. Vous pouvez tester Apache Tika en envoyant un fichier pour analyse à l'aide de la commande `curl` :

```bash
curl -T test.txt http://localhost:9998/tika
```

Remplacez `test.txt` par le chemin d'un fichier texte situé sur votre machine locale.

Apache Tika répondra avec les métadonnées détectées et le type de contenu du fichier.

### Utilisation d'un script pour vérifier Apache Tika

Si vous souhaitez automatiser le processus de vérification, ce script envoie un fichier à Apache Tika et vérifie la réponse pour les métadonnées attendues. Si les métadonnées sont présentes, le script affichera un message de succès ainsi que les métadonnées du fichier ; sinon, il affichera un message d'erreur et la réponse d'Apache Tika.

```python
import requests

def verify_tika(file_path, tika_url):
    try:
        # Envoyer le fichier à Apache Tika et vérifier la réponse
        response = requests.put(tika_url, files={file: open(file_path, rb)})

        if response.status_code == 200:
            print("Apache Tika a analysé le fichier avec succès.")
            print("Réponse d'Apache Tika :")
            print(response.text)
        else:
            print("Erreur lors de l'analyse du fichier :")
            print(f"Code de statut : {response.status_code}")
            print(f"Réponse d'Apache Tika : {response.text}")
    except Exception as e:
        print(f"Une erreur est survenue : {e}")

if __name__ == "__main__":
    file_path = "test.txt"  # Remplacez par le chemin de votre fichier
    tika_url = "http://localhost:9998/tika"

    verify_tika(file_path, tika_url)
```

Instructions pour exécuter le script :

### Prérequis

* Python 3.x doit être installé sur votre système
* La bibliothèque `requests` doit être installée (vous pouvez l'installer avec pip : `pip install requests`)
* Le conteneur Docker Apache Tika doit être en cours d'exécution (utilisez la commande `docker run -p 9998:9998 apache/tika`)
* Remplacez `"test.txt"` par le chemin du fichier que vous souhaitez envoyer à Apache Tika

### Exécution du script

1. Enregistrez le script sous le nom `verify_tika.py` (par exemple, en utilisant un éditeur de texte comme Notepad ou Sublime Text)
2. Ouvrez un terminal ou une invite de commandes
3. Accédez au répertoire où vous avez enregistré le script (en utilisant la commande `cd`)
4. Exécutez le script avec la commande suivante : `python verify_tika.py`
5. Le script affichera un message indiquant si Apache Tika fonctionne correctement

Remarque : En cas de problème, assurez-vous que le conteneur Apache Tika fonctionne correctement et que le fichier est envoyé à l'URL correcte.

### Conclusion

En suivant ces étapes, vous pouvez vérifier qu'Apache Tika fonctionne correctement dans un environnement Docker. Vous pouvez tester la configuration en envoyant un fichier pour analyse, en vérifiant que le serveur est opérationnel avec une requête GET, ou en utilisant un script pour automatiser le processus. En cas de problème, assurez-vous que le conteneur Apache Tika fonctionne correctement et que le fichier est envoyé à l'URL correcte.

Dépannage
--------------

* Assurez-vous que le service Apache Tika est en cours d'exécution et accessible depuis l'instance Open WebUI.
* Vérifiez les journaux Docker pour détecter toute erreur ou problème lié au service Apache Tika.
* Vérifiez que l'URL du moteur d'extraction de contexte est correctement configurée dans Open WebUI.

Avantages de l'intégration
----------------------

L'intégration d'Apache Tika avec Open WebUI offre plusieurs avantages, notamment :

* **Amélioration de l'extraction de métadonnées** : Les capacités avancées d'extraction de métadonnées d'Apache Tika peuvent vous aider à extraire des données précises et pertinentes de vos fichiers.
* **Prise en charge de plusieurs formats de fichiers** : Apache Tika prend en charge une large gamme de formats de fichiers, ce qui en fait une solution idéale pour les organisations travaillant avec divers types de fichiers.
* **Amélioration de l'analyse de contenu** : Les capacités avancées d'analyse de contenu d'Apache Tika peuvent vous aider à extraire des informations précieuses de vos fichiers.

Conclusion
----------

L'intégration d'Apache Tika avec Open WebUI est un processus simple qui peut améliorer les capacités d'extraction de métadonnées de votre instance Open WebUI. En suivant les étapes décrites dans cette documentation, vous pouvez facilement configurer Apache Tika en tant que moteur d'extraction de contexte pour Open WebUI.
