
# Configuration Kustomize pour Kubernetes

Kustomize vous permet de personnaliser les configurations YAML de Kubernetes.

## Prérequis

- Un cluster Kubernetes est configuré.
- Kustomize est installé.

## Étapes

1. **Cloner les Manifests Open WebUI :**

   ```bash
   git clone https://github.com/open-webui/k8s-manifests.git
   cd k8s-manifests
   ```

2. **Appliquer les Manifests :**

   ```bash
   kubectl apply -k .
   ```

3. **Vérifier l'installation :**

   ```bash
   kubectl get pods
   ```

:::avertissement

Si vous avez l'intention de faire évoluer Open WebUI en utilisant plusieurs nœuds/pods/workers dans un environnement en cluster, vous devez configurer une base de données NoSQL de type clé-valeur.
Il existe des [variables d'environnement](https://docs.openwebui.com/getting-started/env-configuration/) qui doivent être définies avec les mêmes valeurs pour toutes les instances de service, sinon des problèmes de cohérence, des sessions défectueuses et d'autres problèmes peuvent survenir !

:::

## Accéder à l'interface WebUI

Configurez le transfert de port ou l'équilibrage de charge pour accéder à Open WebUI depuis l'extérieur du cluster.
