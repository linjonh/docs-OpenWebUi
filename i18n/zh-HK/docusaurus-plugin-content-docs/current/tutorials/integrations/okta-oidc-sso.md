---
sidebar_position: 40
title: "🔗 Okta OIDC SSO 整合"
---

:::warning
本教程為社群貢獻，未經 Open WebUI 團隊支援。它僅用於展示如何根據您的特定需求自定義 Open WebUI。想要貢獻？檢查貢獻教程。
:::

# 🔗 Okta OIDC SSO 整合

## 概述

本文件說明如何將 Okta OIDC 單一登入 (SSO) 與 Open WebUI 整合。亦涵蓋基於 Okta 群組成員資格管理 Open WebUI 使用者群組之**可選功能**，包括**即時 (JIT) 群組創建**。遵循這些步驟，您將能讓使用者使用其 Okta 資格資訊登入 Open WebUI。如果啟用群組同步 (`ENABLE_OAUTH_GROUP_MANAGEMENT`)，使用者在登入時將根據其 Okta 群組自動分配到 Open WebUI 中的相關群組。如果您*也*啟用了即時群組創建 (`ENABLE_OAUTH_GROUP_CREATION`)，在 Okta 聲明中存在但 Open WebUI 中缺失的群組將在登入時自動創建。

### 先決條件

*   新建或現有的 Open WebUI 實例。
*   具備創建和配置應用程式管理權限的 Okta 帳戶。
*   了解 OIDC、Okta 應用程式配置和 Open WebUI 環境變數的基本知識。

## 配置 Okta

首先，您需要在 Okta 組織中配置 OIDC 應用程式，並設置群組聲明以將群組資訊傳遞給 Open WebUI。

### 1. 在 Okta 中創建/配置 OIDC 應用程式

1.  登錄您的 Okta 管理控制台。
2.  導航至 **Applications > Applications**。
3.  創建新的 **OIDC - OpenID Connect** 應用程式（選擇 **Web Application** 作為類型），或選擇您希望用於 Open WebUI 的現有應用程式。
4.  在設置過程中或應用程式的 **General** 設置頁面中，配置 **Sign-in redirect URIs**。新增您的 Open WebUI 實例的 URI，後接 `/oauth/oidc/callback`。例如: `https://your-open-webui.com/oauth/oidc/callback`。
5.  記下應用程式 **General** 頁面上提供的 **Client ID** 和 **Client secret**。這些將用於配置 Open WebUI。
6.  確保在 **Assignments** 頁面中正確分配了該應用程式的使用者或群組。

### 2. 向 ID Token 添加群組聲明

**(可選)** 若要根據 Okta 群組啟用 Open WebUI 的自動群組管理，您需要配置 Okta 將使用者的群組成員資格發送到 ID token。如果您僅需要 SSO 登入，並希望在 Open WebUI 內手動管理群組，可跳過本節。

1.  在管理控制台中，轉到 **Applications > Applications**，選擇您的 OIDC 客戶端應用程式。
2.  轉到 **Sign On** 頁面，在 **OpenID Connect ID Token** 部分點擊 **Edit**。
3.  在 **Group claim type** 部分，選擇 **Filter**。
4.  在 **Group claims filter** 部分：
    *   輸入 `groups` 作為聲明名稱（或使用預設值，如果已存在）。
    *   下拉選單中選擇 **Matches regex**。
    *   在正則表示式欄位中輸入 `.*`。這將包含用戶所屬的所有群組。如有需要，可以使用更具針對性的正則表示式。
5.  點擊 **Save**。
6.  點擊 **Back to applications** 連結。
7.  在應用程式的 **More** 按鈕下拉菜單中，點選 **Refresh Application Data**。

*如需更高階的群組聲明配置，請參閱 Okta 關於[自定義 Token](https://developer.okta.com/docs/guides/customize-tokens-returned-from-okta/main/) 和 [群組功能](https://developer.okta.com/docs/reference/okta-expression-language/#group-functions) 的文件。*

## 配置 Open WebUI

為了在 Open WebUI 中啟用 Okta OIDC SSO，您需要設置以下核心環境變數。如需啟用可選群組管理功能，還需要設置額外的變數。

```bash
# --- OIDC 核心設置 ---
# 如果希望用戶能夠通過 Okta 創建帳戶，啟用 OAuth 註冊
# ENABLE_OAUTH_SIGNUP="true"

# 您的 Okta 應用程式的 Client ID
OAUTH_CLIENT_ID="YOUR_OKTA_CLIENT_ID"

# 您的 Okta 應用程式的 Client Secret
OAUTH_CLIENT_SECRET="YOUR_OKTA_CLIENT_SECRET"

# 您的 Okta 組織的 OIDC 探索 URL
# 格式: https://<your-okta-domain>/.well-known/openid-configuration
# 或針對特定授權伺服器: https://<your-okta-domain>/oauth2/<auth-server-id>/.well-known/openid-configuration
OPENID_PROVIDER_URL="YOUR_OKTA_OIDC_DISCOVERY_URL"

# 登入按鈕上顯示的名稱 (如 "Login with Okta")
OAUTH_PROVIDER_NAME="Okta"

# 請求的範圍 (預設通常足夠)
# OAUTH_SCOPES="openid email profile groups" # 確保包含 'groups'，如果它不是預設值

# --- OAuth 群組管理 (可選) ---
# 僅在 Okta 中配置群組聲明 (步驟2) 時，設置為 "true"
# 並希望基於用戶登錄時的 Okta 群組來管理 Open WebUI 群組。
# 這將使現有的群組同步。用戶將被添加/移除至 Open WebUI 群組
# 以匹配其 Okta 群組聲明。
# ENABLE_OAUTH_GROUP_MANAGEMENT="true"

# 僅當 ENABLE_OAUTH_GROUP_MANAGEMENT 為 true 時需要。
# ID token 中包含群組信息的聲明名稱（必須與 Okta 配置匹配）
# OAUTH_GROUP_CLAIM="groups"

# 可選：啟用即時創建（JIT）功能，如果群組在 Okta 聲明中存在但未在 Open WebUI 中存在。
# 需要 ENABLE_OAUTH_GROUP_MANAGEMENT="true"。
# 如果設置為 false（默認），則僅同步現有群組。
# ENABLE_OAUTH_GROUP_CREATION="false"
```

將 `YOUR_OKTA_CLIENT_ID`、`YOUR_OKTA_CLIENT_SECRET` 和 `YOUR_OKTA_OIDC_DISCOVERY_URL` 替換為您 Okta 應用配置中的實際值。

要基於 Okta 聲明啟用群組同步，請設置 `ENABLE_OAUTH_GROUP_MANAGEMENT="true"`，並確保 `OAUTH_GROUP_CLAIM` 與 Okta 配置中的聲明名稱匹配（默認為 `groups`）。

要*同時*啟用來自 Okta 但尚未在 Open WebUI 中存在的群組的自動即時創建（JIT），請設置 `ENABLE_OAUTH_GROUP_CREATION="true"`。如果只希望管理 Open WebUI 中已存在的群組的成員資格，可以將其設置為 `false`。

:::warning 群組成員管理
當 `ENABLE_OAUTH_GROUP_MANAGEMENT` 設置為 `true`，用戶在 Open WebUI 中的群組成員關係將與他們登錄時從 Okta 聲明中接收到的群組**嚴格同步**。這意味著：
* 用戶將被**添加**到與其 Okta 聲明匹配的 Open WebUI 群組。
* 如果某些群組**未**在用戶此次登錄會話的 Okta 聲明中出現，用戶將被**移除**出 Open WebUI 的這些群組（包括手動創建或在 Open WebUI 中分配的群組）。

請確保所有必要的群組在 Okta 中正確配置和分配，並包含在群組聲明中。
:::

:::info 多節點部署中的會話持久性

當在多節點（例如 Kubernetes 集群或負載平衡器後面）的環境中部署 Open WebUI 時，確保會話持久性是關鍵，以確保用戶體驗流暢，特別是在使用 SSO（單點登錄）時。將 `WEBUI_SECRET_KEY` 環境變量設置為**所有** Open WebUI 實例的**相同且安全唯一的值**。
:::

```bash
# 範例：生成一個強密鑰（例如，使用 openssl rand -hex 32）
WEBUI_SECRET_KEY="YOUR_UNIQUE_AND_SECURE_SECRET_KEY"
```

如果這個密鑰在所有節點中不一致，用戶可能會被迫重新登錄，因為如果會話被路由到其他節點，由一個節點簽署的會話令牌將在另一個節點上無效。默認情況下，Docker 映像在首次啟動時生成隨機密鑰，這對於多節點設置是不合適的。

:::tip 禁用標準登錄表單

如果您只打算允許通過 Okta（以及潛在的其他配置的 OAuth 提供者）登錄，可以通過設置以下環境變量禁用標準電子郵件/密碼登錄表單：
:::


```bash
ENABLE_LOGIN_FORM="false"
```

:::danger 重要的前提條件
將 `ENABLE_LOGIN_FORM="false"` 設置為**需要**同時設置 `ENABLE_OAUTH_SIGNUP="true"`。如果在沒有啟用 OAuth 註冊的情況下禁用了登錄表單，**用戶（包括管理員）將無法登錄。**請確保至少配置了一個 OAuth 提供者並啟用了 `ENABLE_OAUTH_SIGNUP`，然後再禁用標準登錄表單。
:::

設置這些環境變量後重新啟動您的 Open WebUI 實例。

## 核驗

1. 瀏覽到您的 Open WebUI 登錄頁面。您應該會看到一個標記為"通過 Okta 登錄"（或您為 `OAUTH_PROVIDER_NAME` 設置的其他名稱）的按鈕。
2. 點擊按鈕並通過 Okta 登錄流程進行身份驗證。
3. 驗證成功後，您應該會重新定向回 Open WebUI 並登錄。
4. 如果 `ENABLE_OAUTH_GROUP_MANAGEMENT` 為 true，以非管理用戶身份登錄。他們在 Open WebUI 中的群組應嚴格反映其當前在 Okta 中的群組成員身份（任何在 Okta 聲明中*未*出現的群組的成員身份將被移除）。如果 `ENABLE_OAUTH_GROUP_CREATION` 也為 true，用戶在 Okta 聲明中的任何群組如果之前未出現在 Open WebUI 中現在應該已自動創建。請注意，管理員用戶的群組不會通過 SSO 自動更新。
5. 如果遇到問題，請檢查 Open WebUI 伺服器日誌是否有任何與 OIDC 或群組相關的錯誤。

## 故障排除

* **400 壞請求/重定向 URI 不匹配：**請仔細檢查您的 Okta 應用中的**登錄重定向 URI**是否與 `<your-open-webui-url>/oauth/oidc/callback` 完全匹配。
* **群組未同步：**驗證 `OAUTH_GROUP_CLAIM` 環境變量是否與 Okta ID Token 設置中配置的聲明名稱匹配。確保用戶在群組更改後登出並重新登錄——需要一個登錄流程來更新 OIDC。請記住管理員群組不會同步。
*   **配置錯誤：** 檢查 Open WebUI 伺服器日誌以獲取與 OIDC 配置相關的詳細錯誤訊息。
*   參考官方的 [Open WebUI SSO 文檔](/features/sso.md)。
*   諮詢 [Okta 開發者文檔](https://developer.okta.com/docs/)。