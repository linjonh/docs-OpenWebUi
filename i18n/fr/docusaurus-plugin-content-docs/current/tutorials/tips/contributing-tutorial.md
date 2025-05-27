---
sidebar_position: 2
title: "🤝 Tutoriels de Contribution"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration sur la manière de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

# Contribution de Tutoriels

Nous apprécions votre intérêt à contribuer aux tutoriels dans la documentation d'Open WebUI. Suivez les étapes ci-dessous pour configurer votre environnement et soumettre votre tutoriel.

## Étapes

1. **Forkez le Répertoire GitHub `openwebui/docs`**

   - Rendez-vous sur le [répertoire Open WebUI Docs](https://github.com/open-webui/docs) sur GitHub.
   - Cliquez sur le bouton **Fork** en haut à droite pour créer une copie sous votre compte GitHub.

2. **Activez GitHub Actions**

   - Dans votre répertoire forké, accédez à l'onglet **Actions**.
   - Si vous êtes invité, activez GitHub Actions en suivant les instructions affichées à l'écran.

3. **Activez GitHub Pages**

   - Allez dans **Settings** > **Pages** dans votre répertoire forké.
   - Sous **Source**, sélectionnez la branche que vous souhaitez déployer (par ex., `main`) et le dossier (par ex.,`/docs`).
   - Cliquez sur **Save** pour activer GitHub Pages.

4. **Configurez les Variables d'Environnement GitHub**

   - Dans votre répertoire forké, allez dans **Settings** > **Secrets and variables** > **Actions** > **Variables**.
   - Ajoutez les variables d'environnement suivantes :
     - `BASE_URL` défini sur `/docs` (ou l'URL de base choisie pour le fork).
     - `SITE_URL` défini sur `https://<votre-nom-utilisateur-github>.github.io/`.

### 📝 Mise à jour du Workflow GitHub Pages et du Fichier de Configuration

Si vous devez ajuster les paramètres de déploiement à votre configuration personnalisée, voici ce qu'il faut faire :

a. **Mettre à jour `.github/workflows/gh-pages.yml`**

- Ajoutez des variables d'environnement pour `BASE_URL` et `SITE_URL` à l'étape de construction si nécessaire :

     ```yaml
       - name: Build
         env:
           BASE_URL: ${{ vars.BASE_URL }}
           SITE_URL: ${{ vars.SITE_URL }}
         run: npm run build
     ```

b. **Modifiez `docusaurus.config.ts` pour Utiliser les Variables d'Environnement**

- Mettez à jour `docusaurus.config.ts` pour utiliser ces variables d'environnement, avec des valeurs par défaut pour un déploiement local ou direct :

     ```typescript
     const config: Config = {
       title: "Open WebUI",
       tagline: "WebUI de Type ChatGPT pour les LLMs (Anciennement Ollama WebUI)",
       favicon: "images/favicon.png",
       url: process.env.SITE_URL || "https://openwebui.com",
       baseUrl: process.env.BASE_URL || "/",
       ...
     };
     ```

- Cette configuration garantit un comportement de déploiement cohérent pour les forks et les configurations personnalisées.

5. **Exécutez le Workflow `gh-pages` GitHub**

   - Dans l'onglet **Actions**, retrouvez le workflow `gh-pages`.
   - Déclenchez manuellement le workflow si nécessaire, ou il peut s'exécuter automatiquement en fonction de votre configuration.

6. **Accédez à Votre Copie Forkée**

   - Visitez `https://<votre-nom-utilisateur-github>.github.io/<BASE_URL>` pour voir votre documentation forkée.

7. **Rédigez Vos Modifications**

   - Dans votre répertoire forké, accédez au répertoire approprié (par ex., `docs/tutorial/`).
   - Créez un nouveau fichier Markdown pour votre tutoriel ou modifiez des fichiers existants.
   - Assurez-vous que votre tutoriel inclut la bannière d'avertissement de non prise en charge.

8. **Soumettez une Pull Request**

   - Une fois votre tutoriel prêt, validez vos modifications dans votre répertoire forké.
   - Rendez-vous sur le répertoire original `open-webui/docs`.
   - Cliquez sur **New Pull Request** et sélectionnez votre fork et votre branche comme source.
   - Fournissez un titre et une description descriptifs pour votre PR.
   - Soumettez la pull request pour examen.

## Important

Les tutoriels communautaires doivent inclure les éléments suivants :

```
:::warning
Ce tutoriel est une contribution communautaire et n'est pas pris en charge par l'équipe Open WebUI. Il sert uniquement de démonstration sur la manière de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::
```

---

:::tip Comment Tester Docusaurus Localement  
Vous pouvez tester votre site Docusaurus localement avec les commandes suivantes :

```bash
npm install   # Installer les dépendances
npm run build # Construire le site pour la production
```

Cela vous aidera à détecter tout problème avant le déploiement
:::

---
