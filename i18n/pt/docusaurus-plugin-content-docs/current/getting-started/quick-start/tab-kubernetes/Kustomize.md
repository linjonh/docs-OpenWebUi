
# Configuração do Kustomize para Kubernetes

O Kustomize permite personalizar as configurações YAML do Kubernetes.

## Pré-requisitos

- O cluster do Kubernetes está configurado.
- O Kustomize está instalado.

## Etapas

1. **Clonar os Manifestos do Open WebUI:**

   ```bash
   git clone https://github.com/open-webui/k8s-manifests.git
   cd k8s-manifests
   ```

2. **Aplicar os Manifestos:**

   ```bash
   kubectl apply -k .
   ```

3. **Verificar a Instalação:**

   ```bash
   kubectl get pods
   ```

:::aviso

Se você pretende escalar o Open WebUI usando múltiplos nós/pods/workers em um ambiente clusterizado, é necessário configurar um banco de dados NoSQL chave-valor.
Existem algumas [variáveis de ambiente](https://docs.openwebui.com/getting-started/env-configuration/) que precisam ser definidas com os mesmos valores para todas as instâncias de serviço. Caso contrário, ocorrerão problemas de consistência, sessões com falhas e outros problemas!

:::

## Acessar o WebUI

Configure o encaminhamento de porta ou balanceamento de carga para acessar o Open WebUI de fora do cluster.
