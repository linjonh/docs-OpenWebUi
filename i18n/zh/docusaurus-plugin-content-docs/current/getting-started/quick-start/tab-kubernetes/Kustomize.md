
# 使用Kustomize配置Kubernetes

Kustomize允许您自定义Kubernetes YAML配置。

## 先决条件

- 已设置 Kubernetes 集群。
- 已安装 Kustomize。

## 步骤

1. **克隆 Open WebUI 的清单文件：**

   ```bash
   git clone https://github.com/open-webui/k8s-manifests.git
   cd k8s-manifests
   ```

2. **应用清单文件：**

   ```bash
   kubectl apply -k .
   ```

3. **验证安装：**

   ```bash
   kubectl get pods
   ```

:::警告

如果您计划在集群环境中使用多个节点/Pods/Worker来扩展 Open WebUI，您需要设置一个 NoSQL 键值数据库。
有一些[环境变量](https://docs.openwebui.com/getting-started/env-configuration/)需要为所有服务实例设置为相同的值，否则会出现一致性问题、出错的会话以及其他问题！

:::

## 访问 WebUI

设置端口转发或负载均衡，以便从集群外部访问 Open WebUI。
