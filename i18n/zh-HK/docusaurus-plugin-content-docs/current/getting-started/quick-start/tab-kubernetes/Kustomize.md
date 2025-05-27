
# Kustomize 設置 Kubernetes

Kustomize 允許您自定義 Kubernetes YAML 配置。

## 前置條件

- Kubernetes 集群已設置完成。
- 已安裝 Kustomize。

## 步驟

1. **克隆 Open WebUI 配置文件：**

   ```bash
   git clone https://github.com/open-webui/k8s-manifests.git
   cd k8s-manifests
   ```

2. **應用配置文件：**

   ```bash
   kubectl apply -k .
   ```

3. **驗證安裝：**

   ```bash
   kubectl get pods
   ```

:::warning

如果您打算在集群環境中使用多個節點/Pods/工作者來擴展 Open WebUI，您需要設置一個 NoSQL 鍵值數據庫。
您需要針對所有服務實例設定一些[環境變數](https://docs.openwebui.com/getting-started/env-configuration/)，並確保這些變數值相同，否則會出現一致性問題、錯誤的會話和其他問題！

:::

## 訪問 WebUI

設置端口轉發或負載均衡，從集群外部訪問 Open WebUI。
