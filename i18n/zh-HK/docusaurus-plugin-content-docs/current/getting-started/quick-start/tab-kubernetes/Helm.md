
# Kubernetes 的 Helm 設定

Helm 幫助您管理 Kubernetes 應用程式。

## 前置條件

- Kubernetes 叢集已設定完成。
- 已安裝 Helm。

## 步驟

1. **新增 Open WebUI Helm 資料庫：**

   ```bash
   helm repo add open-webui https://open-webui.github.io/helm-charts
   helm repo update
   ```

2. **安裝 Open WebUI Chart：**

   ```bash
   helm install openwebui open-webui/open-webui
   ```

3. **驗證安裝：**

   ```bash
   kubectl get pods
   ```

:::warning

如果您打算在叢集環境中使用多個節點/Pods/Workers 來擴展 Open WebUI，您需要設定一個 NoSQL 鍵值資料庫。
有一些[環境變數](https://docs.openwebui.com/getting-started/env-configuration/)需要為所有服務實例設定為相同的值，否則會發生一致性問題、錯誤的會話以及其他問題！

:::

## 存取 WebUI

設定埠轉發或負載均衡以從叢集外部存取 Open WebUI。
