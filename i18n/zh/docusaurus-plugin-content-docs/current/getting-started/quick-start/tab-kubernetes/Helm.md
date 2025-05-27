
# Kubernetes 环境下的 Helm 设置

Helm 帮助您管理 Kubernetes 应用程序。

## 前置条件

- Kubernetes 集群已设置完成。
- 已安装 Helm。

## 操作步骤

1. **添加 Open WebUI 的 Helm 仓库：**

   ```bash
   helm repo add open-webui https://open-webui.github.io/helm-charts
   helm repo update
   ```

2. **安装 Open WebUI 的 Chart：**

   ```bash
   helm install openwebui open-webui/open-webui
   ```

3. **验证安装：**

   ```bash
   kubectl get pods
   ```

:::warning

如果您计划在集群环境中使用多个节点/Pod/工作节点来扩展 Open WebUI，则需要设置一个 NoSQL 键值数据库。
还有一些 [环境变量](https://docs.openwebui.com/getting-started/env-configuration/) 需要为所有服务实例设置为相同的值，否则会出现一致性问题、错误会话等问题！

:::

## 访问 WebUI

设置端口转发或负载均衡以在集群外部访问 Open WebUI。
