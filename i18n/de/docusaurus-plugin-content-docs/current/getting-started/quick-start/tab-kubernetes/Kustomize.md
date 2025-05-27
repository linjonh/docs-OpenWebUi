
# Kustomize-Setup für Kubernetes

Kustomize ermöglicht es, Kubernetes-YAML-Konfigurationen anzupassen.

## Voraussetzungen

- Kubernetes-Cluster ist eingerichtet.
- Kustomize ist installiert.

## Schritte

1. **Klone die Open WebUI-Manifeste:**

   ```bash
   git clone https://github.com/open-webui/k8s-manifests.git
   cd k8s-manifests
   ```

2. **Wende die Manifeste an:**

   ```bash
   kubectl apply -k .
   ```

3. **Installation überprüfen:**

   ```bash
   kubectl get pods
   ```

:::warnung

Falls Sie Open WebUI in einer Clusterumgebung mit mehreren Knoten/Pods/Workern skalieren möchten, müssen Sie eine NoSQL-Schlüssel-Wert-Datenbank einrichten.
Es gibt einige [Umgebungsvariablen](https://docs.openwebui.com/getting-started/env-configuration/), die für alle Dienst-Instanzen auf denselben Wert gesetzt werden müssen, ansonsten treten Konsistenzprobleme, fehlerhafte Sitzungen und andere Probleme auf!

:::

## Zugriff auf die WebUI

Richten Sie Portweiterleitung oder Lastverteilung ein, um von außerhalb des Clusters auf Open WebUI zuzugreifen.
