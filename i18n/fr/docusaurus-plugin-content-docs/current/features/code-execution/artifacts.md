---
sidebar_position: 1
title: "🏺 Artéfacts"
---


# Que sont les Artéfacts et comment les utiliser dans Open WebUI ?

Les artéfacts dans Open WebUI sont une fonctionnalité innovante inspirée des Artifacts de Claude.AI, vous permettant d'interagir avec du contenu significatif et autonome généré par un LLM dans un chat. Ils vous permettent de consulter, modifier, développer ou référencer des parties importantes de contenu séparément de la conversation principale, facilitant ainsi le travail avec des résultats complexes et garantissant que vous pouvez revenir plus tard à des informations importantes.

## Quand Open WebUI utilise-t-il les Artéfacts ?

Open WebUI crée un Artéfact lorsque le contenu généré respecte des critères spécifiques adaptés à notre plateforme :

1. **Rendable** : Pour être affiché en tant qu'Artéfact, le contenu doit être sous un format que Open WebUI prend en charge pour le rendu. Cela inclut :

* Sites web HTML monoplaces
* Images en graphiques vectoriels scalables (SVG)
* Pages web complètes, incluant HTML, JavaScript et CSS, toutes intégrées dans le même artéfact. Notez que le HTML est requis si une page web complète est générée.
* Visualisations ThreeJS et autres bibliothèques de visualisation JavaScript comme D3.js.

D'autres types de contenu comme les documents (Markdown ou Texte simple), extraits de code et composants React ne sont pas rendus en tant qu'Artéfacts par Open WebUI.

## Comment le modèle d'Open WebUI crée-t-il des Artéfacts ?

Pour utiliser les artéfacts dans Open WebUI, un modèle doit fournir du contenu qui déclenche le processus de rendu pour créer un artéfact. Cela implique de générer un code HTML valide, SVG ou autres formats pris en charge pour le rendu des artéfacts. Lorsque le contenu généré répond aux critères mentionnés ci-dessus, Open WebUI l'affichera sous forme d'Artéfact interactif.

## Comment utiliser les Artéfacts dans Open WebUI ?

Lorsque Open WebUI crée un Artéfact, vous verrez le contenu affiché dans une fenêtre dédiée aux Artéfacts située sur le côté droit de la conversation principale. Voici comment interagir avec les Artéfacts :

* **Modification et itération** : Demandez à un LLM dans le chat de modifier ou d'itérer le contenu, et ces mises à jour s'afficheront directement dans la fenêtre Artéfacts. Vous pouvez basculer entre les versions à l'aide du sélecteur de version en bas à gauche de l'Artéfact. Chaque édition crée une nouvelle version, permettant de suivre les modifications grâce au sélecteur de version.
* **Mises à jour** : Open WebUI peut mettre à jour un Artéfact existant en fonction de vos messages. La fenêtre Artéfacts affichera le contenu le plus récent.
* **Actions** : Accédez à des actions supplémentaires pour l'Artéfact, telles que copier le contenu ou ouvrir l'artéfact en plein écran, situé dans le coin inférieur droit de l'Artéfact.

## Modification des Artéfacts

1. **Mises à jour ciblées** : Décrivez ce que vous voulez changer et où. Par exemple :

* "Changez la couleur de la barre dans le graphique de bleu à rouge."
* "Modifiez le titre de l'image SVG en Nouveau Titre."

2. **Réécritures complètes** : Demandez des modifications majeures affectant la plupart du contenu pour une restructuration importante ou des mises à jour de plusieurs sections. Par exemple :

* "Réécrivez ce site web HTML monoplaces pour qu'il devienne une page d'accueil."
* "Redessinez ce SVG pour qu'il soit animé avec ThreeJS."

**Meilleures pratiques** :

* Soyez précis sur la partie de l'Artéfact que vous souhaitez modifier.
* Référez-vous au texte identifiant unique autour de votre changement souhaité pour des mises à jour ciblées.
* Réfléchissez à si une petite mise à jour ou une réécriture complète est plus appropriée pour vos besoins.

## Cas d'utilisation

Les artéfacts dans Open WebUI permettent à diverses équipes de produire rapidement et efficacement des produits de travail de haute qualité. Voici quelques exemples adaptés à notre plateforme :

* **Designers** :
  * Créer des graphiques SVG interactifs pour le design UI/UX.
  * Concevoir des sites web HTML monoplaces ou pages d'accueil.
* **Développeurs** : Créer des prototypes HTML simples ou générer des icônes SVG pour des projets.
* **Marketeurs** :
  * Concevoir des pages d'accueil de campagne avec des métriques de performance.
  * Créer des graphiques SVG pour des contenus publicitaires ou des publications sur les réseaux sociaux.

## Exemples de projets que vous pouvez créer avec les artéfacts d'Open WebUI

Les artéfacts dans Open WebUI permettent à diverses équipes et individus de produire rapidement et efficacement des produits de travail de haute qualité. Voici quelques exemples adaptés à notre plateforme, montrant la polyvalence des artéfacts et vous inspirant à explorer leur potentiel :

1. **Visualisations interactives**

* Composants utilisés : ThreeJS, D3.js et SVG
* Avantages : Créer des récits immersifs de données avec des visualisations interactives. Les artéfacts d'Open WebUI vous permettent de basculer entre les versions, facilitant le test de différentes approches de visualisation et le suivi des changements.

Projet exemple : Construire un graphique linéaire interactif en utilisant ThreeJS pour visualiser les prix des actions au fil du temps. Mettez à jour les couleurs et les échelles du graphique dans des versions séparées pour comparer différentes stratégies de visualisation.

2. **Applications web monoplaces**

* Composants utilisés : HTML, CSS et JavaScript
* Avantages : Développer des applications web monoplaces directement dans Open WebUI. Modifier et itérer le contenu en utilisant des mises à jour ciblées et des réécritures complètes.

Projet Exemple : Concevez une application de liste de tâches avec une interface utilisateur construite en HTML et CSS. Utilisez JavaScript pour ajouter des fonctionnalités interactives. Mettez à jour la mise en page et l'UI/UX de l'application grâce à des mises à jour ciblées et des réécritures complètes.

3. **Graphiques SVG Animés**

* Composants utilisés : SVG et ThreeJS
* Avantages : Créez des graphiques SVG animés engageants pour les campagnes marketing, les réseaux sociaux ou la conception web. Les Artifacts d'Open WebUI vous permettent d'éditer et d'itérer les graphiques dans une seule fenêtre.

Projet Exemple : Concevez un logo SVG animé pour la marque d'une entreprise. Utilisez ThreeJS pour ajouter des effets d'animation et les mises à jour ciblées d'Open WebUI afin d'affiner les couleurs et la conception du logo.

4. **Prototypes de Pages Web**

* Composants utilisés : HTML, CSS et JavaScript
* Avantages : Construisez et testez des prototypes de pages web directement dans Open WebUI. Alternez entre les versions pour comparer différentes approches de conception et affinez le prototype.

Projet Exemple : Développez un prototype pour un nouveau site e-commerce en utilisant HTML, CSS et JavaScript. Utilisez les mises à jour ciblées d'Open WebUI pour affiner la navigation, la mise en page et l'UI/UX.

5. **Narration Interactive**

* Composants utilisés : HTML, CSS et JavaScript
* Avantages : Créez des récits interactifs avec des effets de défilement, des animations et d'autres éléments interactifs. Les Artifacts d'Open WebUI vous permettent d'affiner l'histoire et de tester différentes versions.

Projet Exemple : Créez une histoire interactive sur l'historique d'une entreprise, en utilisant des effets de défilement et des animations pour captiver le lecteur. Utilisez des mises à jour ciblées pour affiner le récit de l'histoire et le sélecteur de versions d'Open WebUI pour tester différentes versions.
