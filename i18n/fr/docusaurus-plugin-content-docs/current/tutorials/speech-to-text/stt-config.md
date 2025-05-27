---
sidebar_position: 1
title: "🗨️  Configuration"
---

Open Web UI prend en charge la transcription vocale en local, via le navigateur et à distance.

![alt text](/images/tutorials/stt/image.png)

![alt text](/images/tutorials/stt/stt-providers.png)

## Fournisseurs Cloud / Remote de transcription vocale

Les fournisseurs suivants de transcription vocale dans le cloud sont actuellement pris en charge. Les clés API peuvent être configurées en tant que variables d'environnement (OpenAI) ou dans la page de paramètres administratifs (pour les deux clés).

 | Service  | Clé API requise |
 | ------------- | ------------- |
 | OpenAI  | ✅ |
 | DeepGram  | ✅ |

 WebAPI fournit la transcription vocale via le fournisseur intégré du navigateur.

## Configurer votre fournisseur de transcription vocale

Pour configurer un fournisseur de transcription vocale :

- Accédez aux paramètres administratifs
- Choisissez Audio
- Fournissez une clé API et choisissez un modèle dans le menu déroulant

![alt text](/images/tutorials/stt/stt-config.png)

## Paramètres au niveau utilisateur

En plus des paramètres de l'instance configurés dans le panneau d'administration, il existe également quelques paramètres au niveau utilisateur qui peuvent offrir des fonctionnalités supplémentaires.

*   **Paramètres STT:** Contient les réglages liés à la fonctionnalité de transcription vocale.
*   **Moteur de transcription vocale:** Détermine le moteur utilisé pour la reconnaissance vocale (Par défaut ou Web API).
 

![alt text](/images/tutorials/stt/user-settings.png)

## Utiliser la transcription vocale

La transcription vocale offre un moyen très efficace de "rédiger" des invites en utilisant votre voix et fonctionne de manière robuste sur les appareils de bureau et mobiles.

Pour utiliser la transcription vocale, cliquez simplement sur l'icône du microphone :

![alt text](/images/tutorials/stt/stt-operation.png)

Une forme d'onde audio en direct indiquera une capture vocale réussie :

![alt text](/images/tutorials/stt/stt-in-progress.png)

## Mode opération de la transcription vocale

Une fois votre enregistrement commencé, vous pouvez :

- Cliquer sur l'icône de coche pour enregistrer l'enregistrement (si l'envoi automatique après achèvement est activé, il sera envoyé pour achèvement ; sinon, vous pouvez envoyer manuellement)
- Si vous souhaitez abandonner l'enregistrement (par exemple, vous souhaitez recommencer l'enregistrement), vous pouvez cliquer sur l'icône x pour quitter l'interface d'enregistrement

![alt text](/images/tutorials/stt/endstt.png)
