---
sidebar_position: 4000
title: "👁️ Mistral OCR"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas supporté par l'équipe Open WebUI. Il sert uniquement de démonstration sur la façon de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

## 👁️ Mistral OCR

Cette documentation fournit un guide étape par étape pour intégrer Mistral OCR à Open WebUI. Mistral OCR est une bibliothèque de reconnaissance de caractères optiques conçue pour extraire du texte à partir de divers formats de fichiers basés sur des images, y compris des PDF scannés, des images et des documents manuscrits, sous forme de données structurées comme JSON ou texte brut. Avec un support avancé pour la reconnaissance multilingue du texte, l'analyse de la mise en page et l'interprétation de l'écriture manuscrite, Mistral OCR simplifie le processus de numérisation et de traitement des documents pour des applications d'IA telles que la recherche, la synthèse et l'extraction de données, le tout au travers d'une interface robuste et personnalisable.

Prérequis
------------

* Instance Open WebUI
* Compte Mistral AI

Étapes d'intégration
----------------

### Étape 1 : Inscrivez-vous ou connectez-vous à la console Mistral AI

* Accédez à `https://console.mistral.ai`
* Suivez les instructions fournies durant le processus
* Après une autorisation réussie, vous devriez être accueilli sur la page d'accueil de la console

### Étape 2 : Générer une clé API

* Accédez à `Clés API` ou `https://console.mistral.ai/api-keys`
* Créez une nouvelle clé et assurez-vous de la copier

### Étape 3 : Configurer Open WebUI pour utiliser Mistral OCR

* Connectez-vous à votre instance Open WebUI.
* Accédez au menu des paramètres du `Panneau Admin`.
* Cliquez sur `Paramètres`.
* Cliquez sur l'onglet `Documents`.
* Changez le menu déroulant du moteur d'extraction de contenu `Par défaut` à `Mistral OCR`.
* Collez la clé API dans le champ approprié
* Enregistrez le Panneau Admin.

Vérification de Mistral OCR
=====================================

Pour vérifier que Mistral OCR fonctionne correctement dans un script, veuillez consulter `https://docs.mistral.ai/capabilities/document/`


### Conclusion

L'intégration de Mistral OCR à Open WebUI est une méthode simple et efficace pour améliorer les capacités de traitement des documents et d'extraction de contenu. En suivant les étapes de ce guide, vous pouvez configurer Mistral OCR comme moteur d'extraction par défaut et tirer parti de ses fonctionnalités avancées de reconnaissance du texte. Une fois configuré, Mistral OCR permet une analyse puissante et multilingue des documents avec support pour divers formats, améliorant les capacités d'analyse des documents basées sur l'IA dans Open WebUI.
