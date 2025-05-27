
# Configuración de Helm para Kubernetes

Helm te ayuda a gestionar aplicaciones de Kubernetes.

## Requisitos previos

- El clúster de Kubernetes está configurado.
- Helm está instalado.

## Pasos

1. **Agregar el repositorio Helm de Open WebUI:**

   ```bash
   helm repo add open-webui https://open-webui.github.io/helm-charts
   helm repo update
   ```

2. **Instalar el chart de Open WebUI:**

   ```bash
   helm install openwebui open-webui/open-webui
   ```

3. **Verificar la instalación:**

   ```bash
   kubectl get pods
   ```

:::warning

Si deseas escalar Open WebUI utilizando múltiples nodos/pods/trabajadores en un entorno en clúster, necesitas configurar una base de datos NoSQL de clave-valor.
Hay algunas [variables de entorno](https://docs.openwebui.com/getting-started/env-configuration/) que deben configurarse con el mismo valor en todas las instancias del servicio; de lo contrario, pueden ocurrir problemas de consistencia, sesiones defectuosas y otros problemas.

:::

## Acceder a la WebUI

Configura el reenvío de puertos o el balanceo de carga para acceder a Open WebUI desde fuera del clúster.
