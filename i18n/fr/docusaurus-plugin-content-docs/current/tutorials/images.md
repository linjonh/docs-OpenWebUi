---
sidebar_position: 6
title: "🎨 Génération d'Images"
---

:::avertissement
Ce tutoriel est une contribution de la communauté et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration pour personnaliser Open WebUI selon votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

# 🎨 Génération d'Images

Open WebUI prend en charge la génération d'images via trois moteurs : **AUTOMATIC1111**, **ComfyUI**, et **OpenAI DALL·E**. Ce guide vous aidera à les configurer et à les utiliser.

## AUTOMATIC1111

Open WebUI prend en charge la génération d'images via l'API **AUTOMATIC1111** [API](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API). Voici les étapes pour commencer :

### Configuration Initiale

1. Assurez-vous d'avoir installé [AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui).
2. Lancez AUTOMATIC1111 avec des flags supplémentaires pour activer l'accès à l'API :

   ```
   ./webui.sh --api --listen
   ```

3. Pour une installation Docker de WebUI avec les variables d'environnement prédéfinies, utilisez la commande suivante :

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e AUTOMATIC1111_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### Configuration de Open WebUI avec AUTOMATIC1111

1. Dans Open WebUI, accédez au menu **Admin Panel** > **Settings** > **Images**.
2. Définissez le champ `Image Generation Engine` sur `Default (Automatic1111)`.
3. Dans le champ URL de l'API, saisissez l'adresse où l'API de AUTOMATIC1111 est accessible :

   ```
   http://<your_automatic1111_address>:7860/
   ```

   Si vous exécutez une installation Docker de Open WebUI et AUTOMATIC1111 sur le même hôte, utilisez `http://host.docker.internal:7860/` comme adresse.

## ComfyUI

ComfyUI fournit une interface alternative pour gérer et interagir avec les modèles de génération d'images. En savoir plus ou téléchargez-le depuis sa [page GitHub](https://github.com/comfyanonymous/ComfyUI). Voici les instructions de configuration pour faire fonctionner ComfyUI avec vos autres outils.

### Configuration Initiale

1. Téléchargez et extrayez le package logiciel ComfyUI depuis [GitHub](https://github.com/comfyanonymous/ComfyUI) dans le répertoire de votre choix.
2. Pour démarrer ComfyUI, exécutez la commande suivante :

   ```
   python main.py
   ```

   Pour les systèmes avec peu de VRAM, lancez ComfyUI avec des flags supplémentaires pour réduire l'utilisation de la mémoire :

   ```
   python main.py --lowvram
   ```

3. Pour une installation Docker de WebUI avec les variables d'environnement prédéfinies, utilisez la commande suivante :

   ```
   docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -e COMFYUI_BASE_URL=http://host.docker.internal:7860/ -e ENABLE_IMAGE_GENERATION=True -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
   ```

### Configuration de Open WebUI avec ComfyUI

#### Configuration des modèles FLUX.1

1. **Points de contrôle des modèles** :

* Téléchargez le modèle `FLUX.1-schnell` ou `FLUX.1-dev` depuis la [page HuggingFace de black-forest-labs](https://huggingface.co/black-forest-labs).
* Placez les points de contrôle du modèle dans les répertoires `models/checkpoints` et `models/unet` de ComfyUI. Alternativement, vous pouvez créer un lien symbolique entre `models/checkpoints` et `models/unet` pour vous assurer que les deux répertoires contiennent les mêmes points de contrôle.

2. **Modèle VAE** :

* Téléchargez `ae.safetensors` VAE depuis [ici](https://huggingface.co/black-forest-labs/FLUX.1-schnell/blob/main/ae.safetensors).
* Placez-le dans le répertoire `models/vae` de ComfyUI.

3. **Modèle CLIP** :

* Téléchargez `clip_l.safetensors` depuis [ici](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main).
* Placez-le dans le répertoire `models/clip` de ComfyUI.

4. **Modèle T5XXL** :

* Téléchargez le modèle `t5xxl_fp16.safetensors` ou `t5xxl_fp8_e4m3fn.safetensors` depuis [ici](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main).
* Placez-le dans le répertoire `models/clip` de ComfyUI.

Pour intégrer ComfyUI dans Open WebUI, suivez ces étapes :

#### Étape 1 : Configurer les paramètres de Open WebUI

1. Accédez au **Admin Panel** dans Open WebUI.
2. Cliquez sur **Settings**, puis sélectionnez l'onglet **Images**.
3. Dans le champ `Image Generation Engine`, choisissez `ComfyUI`.
4. Dans le champ **API URL**, saisissez l'adresse où l'API de ComfyUI est accessible, en suivant ce format : `http://<your_comfyui_address>:8188/`.
   * Définissez la variable d'environnement `COMFYUI_BASE_URL` sur cette adresse pour qu'elle persiste dans WebUI.

#### Étape 2 : Vérifiez la connexion et activez la génération d'images

1. Assurez-vous que ComfyUI est en cours d'exécution et que vous avez vérifié avec succès la connexion à Open WebUI. Vous ne pourrez pas continuer sans une connexion réussie.
2. Une fois la connexion vérifiée, activez **Image Generation (Experimental)**. D'autres options vous seront présentées.
3. Continuez à l'étape 3 pour les étapes finales de configuration.

#### Étape 3 : Configurer les paramètres de ComfyUI et importer le flux de travail

1. Activez le mode développeur dans ComfyUI. Pour ce faire, recherchez l'icône d'engrenage au-dessus du bouton **Queue Prompt** dans ComfyUI et activez le basculement `Mode Développeur`.
2. Exportez le flux de travail souhaité de ComfyUI au format `API format` à l'aide du bouton `Save (API Format)`. Le fichier sera téléchargé sous le nom de `workflow_api.json` si l'opération est réussie.
3. Retournez à Open WebUI et cliquez sur le bouton **Cliquez ici pour téléverser un fichier workflow.json**.
4. Sélectionnez le fichier `workflow_api.json` pour importer le flux de travail exporté de ComfyUI dans Open WebUI.
5. Après avoir importé le flux de travail, vous devez mapper les `Nœuds de Workflow ComfyUI` en fonction des identifiants des nœuds du flux de travail importé.
6. Définir `Définir le modèle par défaut` sur le nom du fichier modèle utilisé, tel que `flux1-dev.safetensors`.

:::info
Vous devrez peut-être ajuster une ou deux `Clés d'entrée` dans la section des `Nœuds de Workflow ComfyUI` d'Open WebUI pour correspondre à un nœud de votre flux de travail.
Par exemple, `seed` peut devoir être renommé en `noise_seed` pour correspondre à un identifiant de nœud dans votre flux de travail importé.
:::
:::tip
Certains flux de travail, comme ceux qui utilisent l'un des modèles Flux, peuvent utiliser plusieurs ID de nœud qu'il est nécessaire de remplir dans les champs d'entrée des nœuds d'Open WebUI. Si un champ d'entrée de nœud nécessite plusieurs ID, les ID des nœuds doivent être séparés par des virgules (par exemple, `1` ou `1, 2`).
:::

6. Cliquez sur `Enregistrer` pour appliquer les paramètres et profitez de la génération d'images avec ComfyUI intégré à Open WebUI !

Après avoir terminé ces étapes, votre configuration ComfyUI devrait être intégrée à Open WebUI, et vous pouvez utiliser les modèles Flux.1 pour la génération d'images.

### Configuration avec SwarmUI

SwarmUI utilise ComfyUI comme back-end. Pour que Open WebUI fonctionne avec SwarmUI, vous devrez ajouter `ComfyBackendDirect` à l'`URL de base de ComfyUI`. De plus, vous devrez configurer SwarmUI avec un accès LAN. Après les ajustements mentionnés précédemment, configurer SwarmUI pour qu'il fonctionne avec Open WebUI sera identique à la [Première étape : Configurer les paramètres d'Open WebUI](https://github.com/open-webui/docs/edit/main/docs/features/images.md#step-1-configure-open-webui-settings) comme décrit ci-dessus.
![Installer SwarmUI avec accès LAN](https://github.com/user-attachments/assets/a6567e13-1ced-4743-8d8e-be526207f9f6)

#### URL API SwarmUI

L'adresse que vous devez saisir comme URL de base de ComfyUI ressemblera à : `http://<votre_adresse_swarmui>:7801/ComfyBackendDirect`

## OpenAI DALL·E

Open WebUI prend également en charge la génération d'images via les **API OpenAI DALL·E**. Cette option inclut un sélecteur pour choisir entre DALL·E 2 et DALL·E 3, chacun prenant en charge différentes tailles d'images.

### Configuration initiale

1. Obtenez une [clé API](https://platform.openai.com/api-keys) auprès de OpenAI.

### Configuration d'Open WebUI

1. Dans Open WebUI, accédez au menu **Panneau d'administration** > **Paramètres** > **Images**.
2. Réglez le champ `Moteur de génération d'images` sur `Open AI (Dall-E)`.
3. Entrez votre clé API OpenAI.
4. Choisissez le modèle DALL·E que vous souhaitez utiliser. Notez que les options de taille d'image dépendront du modèle sélectionné :
   * **DALL·E 2** : Prend en charge les images de `256x256`, `512x512`, ou `1024x1024`.
   * **DALL·E 3** : Prend en charge les images de `1024x1024`, `1792x1024`, ou `1024x1792`.

### Azure OpenAI

L'utilisation directe d'Azure OpenAI Dall-E n'est pas prise en charge, mais vous pouvez [configurer un proxy LiteLLM](https://litellm.vercel.app/docs/image_generation) compatible avec le moteur de génération d'images `Open AI (Dall-E)`.

## Utilisation de la génération d'images

![Tutoriel de génération d'images](/images/tutorial_image_generation.png)

1. Tout d'abord, utilisez un modèle de génération de texte pour rédiger une invite pour la génération d'images.
2. Une fois la réponse terminée, vous pouvez cliquer sur l'icône Image pour générer une image.
3. Une fois l'image générée, elle sera automatiquement renvoyée dans le chat.

:::tip
    Vous pouvez également modifier la réponse de l'IA et entrer votre invite de génération d'image comme message
    à envoyer pour générer une image au lieu d'utiliser la réponse réelle fournie par l'
    IA.
:::
