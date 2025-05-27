---
sidebar_position: 2
title: "🗨️ Kokoro Web - Synthèse Vocale Simple pour Open WebUI"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration sur la personnalisation d'Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

## Qu'est-ce que `Kokoro Web` ?

[Kokoro Web](https://github.com/eduardolat/kokoro-web) offre une API légère, compatible avec OpenAI, pour le puissant modèle de synthèse vocale [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M), s'intégrant facilement à Open WebUI pour enrichir vos conversations avec des voix naturelles.

## 🚀 Intégration en Deux Étapes

### 1. Déployer l'API Kokoro Web (Une Commande)

```yaml
services:
  kokoro-web:
    image: ghcr.io/eduardolat/kokoro-web:latest
    ports:
      - "3000:3000"
    environment:
      # Changez cette clé secrète pour l'utiliser comme clé API compatible OpenAI
      - KW_SECRET_API_KEY=votre-clé-api
    volumes:
      - ./kokoro-cache:/kokoro/cache
    restart: unless-stopped
```

Exécutez avec : `docker compose up -d`

### 2. Connecter OpenWebUI (30 Secondes)

1. Dans OpenWebUI, allez à `Panneau Administrateur` → `Paramètres` → `Audio`
2. Configurez :
   - Moteur de Synthèse Vocale : `OpenAI`
   - URL de base de l'API : `http://localhost:3000/api/v1`
     (Si vous utilisez Docker : `http://host.docker.internal:3000/api/v1`)
   - Clé API : `votre-clé-api` (de l'étape 1)
   - Modèle TTS : `model_q8f16` (meilleur équilibre taille/qualité)
   - Voix TTS : `af_heart` (voix anglaise chaleureuse et naturelle par défaut). Vous pouvez la changer pour une autre voix ou formule disponible dans la [Démo Kokoro Web](https://voice-generator.pages.dev)

**C'est tout ! Votre OpenWebUI dispose désormais de capacités vocales via l'IA.**

## 🌍 Langues Prises en Charge

Kokoro Web prend en charge 8 langues avec des voix spécifiques optimisées pour chacune :

- Anglais (US) - en-us
- Anglais (UK) - en-gb
- Japonais - ja
- Chinois - cmn
- Espagnol - es-419
- Hindi - hi
- Italien - it
- Portugais (Brésil) - pt-br

Chaque langue dispose de voix dédiées pour une prononciation optimale et un débit naturel. Consultez le [repository GitHub](https://github.com/eduardolat/kokoro-web) pour la liste complète des voix spécifiques par langue ou utilisez la [Démo Kokoro Web](https://voice-generator.pages.dev) pour prévisualiser et créer vos propres voix personnalisées instantanément.

## 💾 Modèles Optimisés pour Tout Matériel

Choisissez le modèle qui répond à vos besoins matériels :

| ID du Modèle | Optimisation | Taille | Idéal pour |
|--------------|-------------|--------|-----------|
| model_q8f16 | Précision mixte | 86 MB | **Recommandé** - Meilleur équilibre |
| model_quantized | 8-bit | 92.4 MB | Bonne performance CPU |
| model_uint8f16 | Précision mixte | 114 MB | Qualité supérieure sur CPU moyen de gamme |
| model_q4f16 | Poids 4-bit & fp16 | 154 MB | Qualité supérieure, toujours efficace |
| model_fp16 | fp16 | 163 MB | Qualité premium |
| model_uint8 | 8-bit & mixte | 177 MB | Option équilibrée |
| model_q4 | matmul 4-bit | 305 MB | Option haute qualité |
| model | fp32 | 326 MB | Qualité maximale (plus lent) |

## ✨ Essayez Avant d'Installer

Visitez la [**Démo Kokoro Web**](https://voice-generator.pages.dev) pour prévisualiser toutes les voix instantanément. Cette démo :

- **Fonctionne entièrement dans votre navigateur** - Aucun serveur requis
- **Gratuit pour toujours** - Sans limites d'utilisation ni inscription requise
- **Sans installation** - Visitez simplement le site web et commencez à créer
- **Toutes les fonctionnalités incluses** - Testez n'importe quelle voix ou langue immédiatement

## Besoin de Plus d'Aide ?

Pour des options supplémentaires, des guides de personnalisation vocale, et des paramètres avancés, visitez le [repository GitHub](https://github.com/eduardolat/kokoro-web).

**Profitez de voix d'IA naturelles dans vos conversations OpenWebUI !**
