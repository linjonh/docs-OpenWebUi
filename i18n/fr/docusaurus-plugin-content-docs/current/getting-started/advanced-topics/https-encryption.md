---
sidebar_position: 6
title: "🔒 Activer le cryptage HTTPS"
---

# Sécurisez votre Open WebUI avec HTTPS 🔒

Ce guide explique comment activer le cryptage HTTPS pour votre instance Open WebUI. Bien que **HTTPS ne soit pas strictement nécessaire** pour un fonctionnement de base, il est fortement recommandé pour la sécurité et est **nécessaire pour certaines fonctionnalités, comme les appels vocaux**, afin de fonctionner dans les navigateurs web modernes.

## Pourquoi HTTPS est important 🛡️

HTTPS (Hypertext Transfer Protocol Secure) crypte la communication entre votre navigateur web et le serveur Open WebUI. Ce cryptage offre plusieurs avantages clés :

* **Confidentialité et sécurité :** Protège les données sensibles comme les noms d'utilisateur, les mots de passe et le contenu des conversations contre l'écoute et l'interception, en particulier sur les réseaux publics.
* **Intégrité :** Garantit que les données transmises entre le navigateur et le serveur ne sont pas altérées pendant le transit.
* **Compatibilité des fonctionnalités :** **De manière cruciale, les navigateurs modernes bloquent l'accès à certaines fonctionnalités dites "contextes sécurisés", comme l'accès au microphone pour les appels vocaux, sauf si le site est servi via HTTPS.**
* **Confiance et assurance utilisateur :** HTTPS est indiqué par une icône de cadenas dans la barre d'adresse du navigateur, renforçant la confiance et l'assurance des utilisateurs envers votre déploiement Open WebUI.

**Quand HTTPS est-il particulièrement important ?**

* **Déploiements accessibles sur Internet :** Si votre instance Open WebUI est accessible depuis Internet, HTTPS est fortement recommandé pour se protéger contre les risques de sécurité.
* **Fonctionnalité d'appel vocal :** Si vous envisagez d'utiliser la fonctionnalité d'appel vocal dans Open WebUI, HTTPS est **obligatoire**.
* **Gestion de données sensibles :** Si vous vous préoccupez de la confidentialité des données des utilisateurs, activer HTTPS est une mesure de sécurité cruciale.

## Choisir la bonne solution HTTPS pour vous 🛠️

La meilleure solution HTTPS dépend de votre infrastructure existante et de votre expertise technique. Voici quelques options courantes et efficaces :

* **Fournisseurs Cloud (ex. : AWS, Google Cloud, Azure) :**
  * **Équilibreurs de charge :** Les fournisseurs Cloud offrent généralement des équilibreurs de charge gérés (comme AWS Elastic Load Balancer) capables de gérer la terminaison HTTPS (cryptage/décryptage) pour vous. C'est souvent l'approche la plus simple et évolutive dans les environnements Cloud.
* **Environnements de conteneurs Docker :**
  * **Proxys inversés (Nginx, Traefik, Caddy) :** Les proxys inversés populaires comme Nginx, Traefik et Caddy sont d'excellents choix pour gérer HTTPS dans des déploiements Dockerisés. Ils peuvent obtenir et renouveler automatiquement des certificats SSL/TLS (par exemple via Let's Encrypt) et gérer la terminaison HTTPS.
    * **Nginx :** Hautement configurable et largement utilisé.
    * **Traefik :** Conçu pour les microservices modernes et les environnements de conteneurs, avec une configuration automatique et une intégration Let's Encrypt.
    * **Caddy :** Axé sur la facilité d'utilisation et la configuration automatique de HTTPS.
* **Cloudflare :**
  * **HTTPS simplifié :** Cloudflare fournit un CDN (Content Delivery Network) et des services de sécurité, y compris une configuration HTTPS très simple. Cela nécessite souvent peu de modifications côté serveur et est adapté à une large gamme de déploiements.
* **Ngrok :**
  * **HTTPS pour développement local :** Ngrok est un outil pratique pour exposer rapidement votre serveur de développement local via HTTPS. Il est particulièrement utile pour tester des fonctionnalités nécessitant HTTPS (comme les appels vocaux) pendant le développement et pour des démonstrations. **Non recommandé pour les déploiements en production.**

**Points clés à considérer lors du choix :**

* **Complexité :** Certaines solutions (comme Cloudflare ou Caddy) sont plus simples à configurer que d'autres (comme la configuration manuelle de Nginx).
* **Automatisation :** Des solutions comme Traefik et Caddy offrent une gestion automatique des certificats, simplifiant ainsi la maintenance permanente.
* **Évolutivité et performance :** Prenez en compte les besoins en performance et évolutivité de votre instance Open WebUI lors du choix d'une solution, en particulier pour des déploiements à fort trafic.
* **Coût :** Certaines solutions (comme les équilibreurs de charge Cloud ou les plans payants de Cloudflare) peuvent entraîner des coûts. Let's Encrypt et de nombreux proxys inversés sont gratuits et open-source.

## 📚 Explorez les tutoriels de déploiement pour des guides pas-à-pas

Pour des instructions détaillées, pratiques et des tutoriels communautaires sur la mise en place du cryptage HTTPS avec diverses solutions, veuillez visiter la section **[Tutoriels de déploiement](../../tutorials/deployment/)**.

Ces tutoriels fournissent souvent des guides spécifiques et détaillés pour différents environnements et solutions HTTPS, rendant le processus plus facile à suivre.

En implémentant HTTPS, vous améliorez significativement la sécurité et les fonctionnalités de votre instance Open WebUI, garantissant une expérience plus sûre et plus riche en fonctionnalités pour vous et vos utilisateurs.
