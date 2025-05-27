
# Configuration de Helm pour Kubernetes

Helm vous aide à gérer les applications Kubernetes.

## Prérequis

- Un cluster Kubernetes est configuré.
- Helm est installé.

## Étapes

1. **Ajouter le dépôt Helm Open WebUI :**

   ```bash
   helm repo add open-webui https://open-webui.github.io/helm-charts
   helm repo update
   ```

2. **Installer le chart Open WebUI :**

   ```bash
   helm install openwebui open-webui/open-webui
   ```

3. **Vérifier l'installation :**

   ```bash
   kubectl get pods
   ```

:::attention

Si vous prévoyez de mettre à l'échelle Open WebUI en utilisant plusieurs nœuds/pods/workers dans un environnement en cluster, vous devez configurer une base de données clé-valeur NoSQL.
Il existe certaines [variables d'environnement](https://docs.openwebui.com/getting-started/env-configuration/) qui doivent être définies avec la même valeur pour toutes les instances du service, sinon des problèmes de cohérence, des sessions défaillantes et d'autres problèmes peuvent survenir !

:::

## Accéder à l'interface WebUI

Configurez le transfert de port ou l'équilibrage de charge pour accéder à Open WebUI depuis l'extérieur du cluster.
