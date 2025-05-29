
# Helm-Setup für Kubernetes

Helm hilft Ihnen bei der Verwaltung von Kubernetes-Anwendungen.

## Voraussetzungen

- Kubernetes-Cluster ist eingerichtet.
- Helm ist installiert.

## Schritte

1. **Open WebUI Helm-Repository hinzufügen:**

   ```bash
   helm repo add open-webui https://open-webui.github.io/helm-charts
   helm repo update
   ```

2. **Open WebUI Chart installieren:**

   ```bash
   helm install openwebui open-webui/open-webui
   ```

3. **Installation überprüfen:**

   ```bash
   kubectl get pods
   ```

:::warning

Falls Sie beabsichtigen, Open WebUI mit mehreren Knoten/Pods/Workern in einer Cluster-Umgebung zu skalieren, müssen Sie eine NoSQL-Schlüssel-Wert-Datenbank einrichten.
Es gibt einige [Umgebungsvariablen](https://docs.openwebui.com/getting-started/env-configuration/), die für alle Service-Instanzen auf denselben Wert gesetzt werden müssen, sonst treten Konsistenzprobleme, fehlerhafte Sitzungen und andere Probleme auf!

:::

## Zugriff auf die WebUI

Richten Sie Portweiterleitung oder Lastverteilung ein, um von außerhalb des Clusters auf Open WebUI zuzugreifen.
