
# Helm 设置用于 Kubernetes

Helm 帮助您管理 Kubernetes 应用程序。

## 前提条件

- Kubernetes 集群已设置。
- 已安装 Helm。

## 步骤

1. **添加 Open WebUI Helm 仓库：**

   ```bash
   helm repo add open-webui https://open-webui.github.io/helm-charts
   helm repo update
   ```

2. **安装 Open WebUI Chart：**

   ```bash
   helm install openwebui open-webui/open-webui
   ```

3. **验证安装：**

   ```bash
   kubectl get pods
   ```

:::warning

如果您打算在集群环境中使用多个节点/Pods/工作进程来扩展 Open WebUI，则需要设置一个 NoSQL 键值数据库。
必须为所有服务实例设置相同的 [环境变量](https://docs.openwebui.com/getting-started/env-configuration/)，否则将会出现一致性问题、会话故障以及其他问题！

:::

## 访问 WebUI

设置端口转发或负载均衡以从集群外部访问 Open WebUI。
