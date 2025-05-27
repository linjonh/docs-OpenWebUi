---
sidebar_position: 200
title: "🔒 HTTPS en utilisant Nginx"
---

:::warning
Ce tutoriel est une contribution de la communauté et n'est pas pris en charge par l'équipe d'Open WebUI. Il sert uniquement de démonstration sur la façon de personnaliser Open WebUI pour votre cas d'utilisation spécifique. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

# HTTPS en utilisant Nginx

Assurer une communication sécurisée entre vos utilisateurs et Open WebUI est primordial. HTTPS (HyperText Transfer Protocol Secure) crypte les données transmises, les protégeant contre les interceptions et les altérations. En configurant Nginx comme proxy inverse, vous pouvez ajouter HTTPS à votre déploiement Open WebUI de manière transparente, renforçant ainsi la sécurité et la fiabilité.

Ce guide propose trois méthodes pour configurer HTTPS :

- **Certificats auto-signés** : Idéal pour le développement et l'utilisation interne, en utilisant Docker.
- **Lets Encrypt** : Parfait pour les environnements de production nécessitant des certificats SSL fiables, en utilisant Docker.
- **Windows+Auto-signés** : Instructions simplifiées pour le développement et l'utilisation interne sur Windows, sans besoin de Docker.

Choisissez la méthode qui correspond le mieux à vos besoins de déploiement.


import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import NginxProxyManager from "./tab-nginx/NginxProxyManager.md";
import SelfSigned from "./tab-nginx/SelfSigned.md";
import LetsEncrypt from "./tab-nginx/LetsEncrypt.md";
import Windows from "./tab-nginx/Windows.md";

<Tabs>
  <TabItem value="NginxProxyManager" label="Nginx Proxy Manager">
    <NginxProxyManager />
  </TabItem>
  <TabItem value="letsencrypt" label="Lets Encrypt">
    <LetsEncrypt />
  </TabItem>
  <TabItem value="selfsigned" label="Auto-signé">
    <SelfSigned />
  </TabItem>
  <TabItem value="windows" label="Windows">
    <Windows />
  </TabItem>
</Tabs>


## Prochaines étapes

Après avoir configuré HTTPS, accédez à Open WebUI en toute sécurité à l'adresse suivante :

- [https://localhost](https://localhost)

Assurez-vous que vos enregistrements DNS sont correctement configurés si vous utilisez un nom de domaine. Pour les environnements de production, il est recommandé d'utiliser Lets Encrypt pour des certificats SSL fiables.

---
