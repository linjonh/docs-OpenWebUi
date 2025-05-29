
# Configuración de Kustomize para Kubernetes

Kustomize permite personalizar configuraciones YAML de Kubernetes.

## Requisitos previos

- Se ha configurado un clúster de Kubernetes.
- Kustomize está instalado.

## Pasos

1. **Clonar los manifiestos de Open WebUI:**

   ```bash
   git clone https://github.com/open-webui/k8s-manifests.git
   cd k8s-manifests
   ```

2. **Aplicar los manifiestos:**

   ```bash
   kubectl apply -k .
   ```

3. **Verificar la instalación:**

   ```bash
   kubectl get pods
   ```

:::warning

Si tienes la intención de escalar Open WebUI utilizando múltiples nodos/pods/workers en un entorno de clúster, necesitas configurar una base de datos NoSQL de clave-valor.
Hay algunas [variables de entorno](https://docs.openwebui.com/getting-started/env-configuration/) que deben configurarse con el mismo valor para todas las instancias del servicio; de lo contrario, pueden ocurrir problemas de consistencia, sesiones defectuosas y otros problemas.

:::

## Acceder al WebUI

Configura el reenvío de puertos o el balanceo de carga para acceder a Open WebUI desde fuera del clúster.
