
# Kubernetes的Kustomize设置

Kustomize允许您自定义Kubernetes YAML配置。

## 前提条件

- 已设置好Kubernetes集群。
- 已安装Kustomize。

## 步骤

1. **克隆Open WebUI清单：**

   ```bash
   git clone https://github.com/open-webui/k8s-manifests.git
   cd k8s-manifests
   ```

2. **应用清单：**

   ```bash
   kubectl apply -k .
   ```

3. **验证安装：**

   ```bash
   kubectl get pods
   ```

:::warning

如果您打算在集群环境中通过多个节点/Pod/工作线程来扩展Open WebUI，则需要设置一个NoSQL键值数据库。
有一些[环境变量](https://docs.openwebui.com/getting-started/env-configuration/)需要在所有服务实例中设置为相同的值，否则会出现一致性问题、错误会话以及其他问题！

:::

## 访问WebUI

设置端口转发或负载均衡，以便从集群外访问Open WebUI。
