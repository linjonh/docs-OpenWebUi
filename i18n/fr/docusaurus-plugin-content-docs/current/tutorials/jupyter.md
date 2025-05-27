---
sidebar_position: 321
title: "🐍 Intégration Jupyter Notebook"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement d'exemple pour montrer comment personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous voulez contribuer ? Consultez le tutoriel de contribution.
:::

> [!WARNING]
> Cette documentation a été créée sur la base de la version actuelle (0.5.16) et est constamment mise à jour.


# Intégration Jupyter Notebook

À partir de la version v0.5.11, Open-WebUI a introduit une nouvelle fonctionnalité appelée `Support Jupyter Notebook dans Code Interpreter`. Cette fonctionnalité permet d'intégrer Open-WebUI avec Jupyter. Plusieurs améliorations ont déjà été apportées à cette fonctionnalité dans les versions ultérieures, il est donc conseillé de consulter attentivement les notes de version.

Ce tutoriel vous guide à travers les bases pour configurer la connexion entre les deux services.

- [Voir les notes de version v0.5.11](https://github.com/open-webui/open-webui/releases/tag/v0.5.11)
- [Voir les notes de version v0.5.15](https://github.com/open-webui/open-webui/releases/tag/v0.5.14)

## Qu'est-ce que les Jupyter Notebooks ?

Jupyter Notebook est une application web open-source qui permet aux utilisateurs de créer et de partager des documents contenant du code exécutable, des équations, des visualisations et du texte narratif. C'est particulièrement populaire dans les domaines de la science des données, du calcul scientifique et de l'éducation, car il permet aux utilisateurs de combiner du code exécutable (dans des langages comme Python, R ou Julia) avec un texte explicatif, des images et des visualisations interactives dans un même document. Les Jupyter Notebooks sont particulièrement utiles pour l'analyse et l'exploration des données, car ils permettent aux utilisateurs d'exécuter du code en petites sections gérables tout en documentant leur processus de réflexion et leurs conclusions. Ce format facilite l'expérimentation, le débogage du code et la création de rapports complets et partageables qui illustrent à la fois le processus d'analyse et les résultats.

Voir le site de Jupyter pour plus d'infos : [Project Jupyter](https://jupyter.org/)

## Étape 0 : Résumé de la configuration

Voici la configuration cible que nous allons mettre en place dans ce tutoriel.

![Configuration d'exécution du code](/images/tutorials/jupyter/jupyter-code-execution.png)

# Étape 1 : Lancer OUI et Jupyter

Pour cela, j'ai utilisé `docker-compose` pour lancer une pile incluant les deux services ainsi que mes LLMs, mais cela devrait également fonctionner si vous exécutez chaque conteneur Docker séparément.

```yaml title="docker-compose.yml"
version: "3.8"

services:
open-webui:
image: ghcr.io/open-webui/open-webui:latest
container_name: open-webui
ports:
- "3000:8080"
volumes:
- open-webui:/app/backend/data

jupyter:
image: jupyter/minimal-notebook:latest
container_name: jupyter-notebook
ports:
- "8888:8888"
volumes:
- jupyter_data:/home/jovyan/work
environment:
- JUPYTER_ENABLE_LAB=yes
- JUPYTER_TOKEN=123456

volumes:
open-webui:
jupyter_data:
```

Vous pouvez lancer la pile ci-dessus en exécutant la commande ci-dessous dans le répertoire où le fichier `docker-compose` est enregistré :

```bash title="Exécuter docker-compose"
docker-compose up -d
```

Vous devriez maintenant pouvoir accéder aux deux services aux URL suivantes :

| Service | URL |
| ---------- | ----------------------- |
| Open-WebUI | `http://localhost:3000` |
| Jupyter | `http://localhost:8888` |

En accédant au service Jupyter, vous aurez besoin du `JUPYTER_TOKEN` défini ci-dessus. Pour ce tutoriel, j'ai choisi une valeur de jeton fictif de `123456`.

![Configuration d'exécution du code](/images/tutorials/jupyter/jupyter-token.png)

# Étape 2 : Configurer l'exécution de code pour Jupyter

Maintenant que nous avons Open-WebUI et Jupyter en cours d'exécution, nous devons configurer l'exécution de code d'Open-WebUI pour utiliser Jupyter sous Admin Panel -> Settings -> Code Execution. Comme Open-WebUI libère et améliore constamment cette fonctionnalité, je recommande de toujours consulter les configurations possibles dans le fichier [`configs.py`](https://github.com/open-webui/open-webui/blob/6fedd72e3973e1d13c9daf540350cd822826bf27/backend/open_webui/routers/configs.py#L72) pour les dernières mises à jour. En v0.5.16, cela inclut les éléments suivants :

| Variable d'environnement d'Open-WebUI | Valeur |
| ------------------------------------- | -------------------------------- |
| `ENABLE_CODE_INTERPRETER` | True |
| `CODE_EXECUTION_ENGINE` | jupyter |
| `CODE_EXECUTION_JUPYTER_URL` | http://host.docker.internal:8888 |
| `CODE_EXECUTION_JUPYTER_AUTH` | token |
| `CODE_EXECUTION_JUPYTER_AUTH_TOKEN` | 123456 |
| `CODE_EXECUTION_JUPYTER_TIMEOUT` | 60 |
| `CODE_INTERPRETER_ENGINE` | jupyter |
| `CODE_INTERPRETER_JUPYTER_URL` | http://host.docker.internal:8888 |
| `CODE_INTERPRETER_JUPYTER_AUTH` | token |
| `CODE_INTERPRETER_JUPYTER_AUTH_TOKEN` | 123456 |
| `CODE_INTERPRETER_JUPYTER_TIMEOUT` | 60 |

## Étape 3 : Tester la connexion

Pour commencer, vérifions ce qui se trouve dans notre répertoire Jupyter. Comme vous pouvez le voir sur l'image ci-dessous, nous avons seulement un dossier `work` vide.

![Configuration d'exécution du code](/images/tutorials/jupyter/jupyter-empty.png)

### Créer un fichier CSV

Exécutons notre première instruction. Assurez-vous d'avoir sélectionné le bouton `Code Execution`.

```
Instruction : Créez deux fichiers CSV en utilisant des données fictives. Le premier CSV doit être créé en utilisant Python standard et le deuxième CSV doit être créé en utilisant la bibliothèque pandas. Nommez les fichiers CSV data1.csv et data2.csv
```

![Configuration d'exécution du Code](/images/tutorials/jupyter/jupyter-create-csv.png)

Nous pouvons voir que les fichiers CSV ont été créés et sont désormais accessibles dans Jupyter.

![Configuration d'exécution du Code](/images/tutorials/jupyter/jupyter-view-csv.png)

### Créer une visualisation

Exécutons notre deuxième instruction. Encore une fois, assurez-vous d'avoir sélectionné le bouton `Code Execution`.

```
Instruction : Créez plusieurs visualisations en Python en utilisant matplotlib et seaborn et sauvegardez-les dans Jupyter
```

![Configuration d'exécution du Code](/images/tutorials/jupyter/jupyter-create-viz.png)

Nous pouvons voir que les visualisations ont été créées et sont désormais accessibles dans Jupyter.

![Configuration d'exécution du Code](/images/tutorials/jupyter/jupyter-view-viz.png)

### Créer un notebook

Exécutons notre dernière instruction ensemble. Dans cette instruction, nous allons créer tout un nouveau notebook en utilisant une simple instruction.

```
Instruction : Écrivez du code python pour lire et écrire des fichiers JSON et sauvegardez-le dans mon notebook appelé notebook.ipynb
```

![Configuration d'exécution du Code](/images/tutorials/jupyter/jupyter-create-notebook.png)

Nous pouvons voir que les visualisations ont été créées et sont désormais accessibles dans Jupyter.

![Configuration d'exécution du Code](/images/tutorials/jupyter/jupyter-view-notebook.png)

## Note sur le flux de travail

En testant cette fonctionnalité, j'ai remarqué plusieurs fois qu'Open-WebUI ne sauvegardait pas automatiquement le code ou la sortie générée dans Open-WebUI vers mon instance de Jupyter. Pour forcer la sauvegarde du fichier/article que j'ai créé, j'ai souvent suivi cette démarche en deux étapes, qui crée d'abord l'artéfact de code souhaité, puis demande de le sauvegarder dans mon instance de Jupyter.

![Configuration d'exécution du Code](/images/tutorials/jupyter/jupyter-workflow.png)

## Comment utilisez-vous cette fonctionnalité ?

Utilisez-vous la fonctionnalité d'exécution de code et/ou Jupyter ? Si oui, veuillez me contacter. J'aimerais savoir comment vous l'utilisez afin de continuer à ajouter des exemples à ce tutoriel sur d'autres façons intéressantes d'utiliser cette fonctionnalité !
