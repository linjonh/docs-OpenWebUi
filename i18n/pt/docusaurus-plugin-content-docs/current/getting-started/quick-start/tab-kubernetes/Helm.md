
# Configuração do Helm para Kubernetes

Helm ajuda você a gerenciar aplicativos Kubernetes.

## Pré-requisitos

- O cluster Kubernetes está configurado.
- O Helm está instalado.

## Passos

1. **Adicionar o repositório Helm do Open WebUI:**

   ```bash
   helm repo add open-webui https://open-webui.github.io/helm-charts
   helm repo update
   ```

2. **Instalar o chart do Open WebUI:**

   ```bash
   helm install openwebui open-webui/open-webui
   ```

3. **Verificar a instalação:**

   ```bash
   kubectl get pods
   ```

:::warning

Se você pretende escalar o Open WebUI utilizando múltiplos nós/pods/trabalhadores em um ambiente de cluster, é necessário configurar um banco de dados NoSQL de chave-valor.
Existem algumas [variáveis de ambiente](https://docs.openwebui.com/getting-started/env-configuration/) que precisam ser configuradas com o mesmo valor para todas as instâncias de serviço, caso contrário, problemas de consistência, sessões defeituosas e outros problemas ocorrerão!

:::

## Acessar o WebUI

Configure o encaminhamento de porta ou balanceamento de carga para acessar o Open WebUI de fora do cluster.
