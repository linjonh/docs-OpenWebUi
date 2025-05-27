---
sidebar_position: 2
title: "🐍 Exécution de code Python"
---

# 🐍 Exécution de code Python

## Vue d'ensemble

Open WebUI permet l'exécution côté client de code Python dans le navigateur, en utilisant Pyodide pour exécuter des scripts dans un bloc de code au sein d'un chat. Cette fonctionnalité permet aux modèles de langage avancés (LLMs) de générer des scripts Python qui peuvent être exécutés directement dans le navigateur, en tirant parti d'une gamme de bibliothèques prises en charge par Pyodide.

Pour maintenir la confidentialité et la flexibilité des utilisateurs, Open WebUI reflète les packages PyPI, évitant ainsi les requêtes réseau externes directes. Cette approche permet également l'utilisation de Pyodide dans des environnements sans accès à Internet.

Le frontend d'Open WebUI inclut un environnement Python autonome WASM (WebAssembly), alimenté par Pyodide, qui peut exécuter des scripts Python basiques générés par les LLMs. Cet environnement est conçu pour une utilisation aisée, ne nécessitant aucune configuration ou installation supplémentaire.

## Bibliothèques prises en charge

L'exécution de code Pyodide est configurée pour charger uniquement les packages configurés dans scripts/prepare-pyodide.js et ensuite ajoutés à "CodeBlock.svelte". Les packages Pyodide suivants sont actuellement pris en charge dans Open WebUI :

* micropip
* packaging
* requests
* beautifulsoup4
* numpy
* pandas
* matplotlib
* scikit-learn
* scipy
* regex

Ces bibliothèques peuvent être utilisées pour réaliser diverses tâches, telles que la manipulation de données, l'apprentissage automatique et le web scraping. Si le package que vous souhaitez exécuter n'est pas compilé dans le Pyodide que nous fournissons avec Open WebUI, ce package ne pourra pas être utilisé.

## Invocation de l'exécution de code Python

Pour exécuter du code Python, demandez à un LLM dans un chat de rédiger un script Python pour vous. Une fois que le LLM a généré le code, un bouton `Exécuter` apparaîtra en haut à droite du bloc de code. En cliquant sur ce bouton, vous exécuterez le code en utilisant Pyodide. Pour afficher le résultat au bas d'un bloc de code, assurez-vous qu'il y ait au moins une instruction print dans le code pour afficher un résultat.

## Conseils pour utiliser l'exécution de code Python

* Lorsque vous écrivez du code Python, gardez à l'esprit que le code sera exécuté dans un environnement Pyodide. Vous pouvez en informer le LLM en mentionnant "environnement Pyodide" lors de la demande du code.
* Consultez la documentation de Pyodide pour comprendre les capacités et les limites de l'environnement.
* Expérimentez avec différentes bibliothèques et scripts pour explorer les possibilités d'exécution de code Python dans Open WebUI.

## Documentation Pyodide

* [Documentation Pyodide](https://pyodide.org/en/stable/)

## Exemple de code

Voici un exemple de script Python simple qui peut être exécuté en utilisant Pyodide :

```python
import pandas as pd

# Créer une DataFrame d'exemple
data = {Nom: [Jean, Anna, Pierre], 
        Âge: [28, 24, 35]}
df = pd.DataFrame(data)

# Afficher la DataFrame
print(df)
```

Ce script créera une DataFrame d'exemple en utilisant pandas et l'affichera en dessous du bloc de code dans votre chat.

## Extension de la liste des bibliothèques prises en charge

Envie de repousser les limites de ce qui est possible ? Pour étendre la liste des bibliothèques prises en charge, suivez ces étapes :

1. **Forkez le dépôt Pyodide** pour créer votre propre version.
2. **Choisissez de nouveaux packages** à partir de la liste existante des packages dans Pyodide ou explorez des packages de qualité que Open WebUI n'a pas encore adoptés.
3. **Intégrez les nouveaux packages** dans votre dépôt forké pour débloquer encore plus de possibilités.
