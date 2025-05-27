---
sidebar_position: 200
title: "🔒 Nginx를 사용한 HTTPS"
---

:::warning
이 튜토리얼은 커뮤니티 기여이며 Open WebUI 팀에서 지원하지 않습니다. 특정 용도에 맞게 Open WebUI를 커스터마이징하는 데 도움이 되는 데모로만 사용됩니다. 기여를 원하십니까? 기여 튜토리얼을 확인하세요.
:::

# Nginx를 사용한 HTTPS

사용자와 Open WebUI 간의 안전한 통신을 보장하는 것은 중요합니다. HTTPS(하이퍼텍스트 전송 프로토콜 보안)는 전송된 데이터를 암호화하여 도청 및 변조로부터 보호합니다. Nginx를 역방향 프록시로 구성하여 Open WebUI 배포에 HTTPS를 원활하게 추가하면 보안성과 신뢰성을 모두 향상시킬 수 있습니다.

이 안내서는 HTTPS를 설정하는 세 가지 방법을 제공합니다:

- **자체 서명 인증서**: 개발 및 내부 사용에 적합하며 Docker를 사용합니다.
- **Lets Encrypt**: 신뢰할 수 있는 SSL 인증서가 필요한 프로덕션 환경에 적합하며 Docker를 사용합니다.
- **Windows+자체 서명**: Windows에서 개발 및 내부 사용을 위한 간단한 지침으로 Docker가 필요하지 않습니다.

배포 요구에 가장 적합한 방법을 선택하세요.


import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import NginxProxyManager from "./tab-nginx/NginxProxyManager.md";
import SelfSigned from "./tab-nginx/SelfSigned.md";
import LetsEncrypt from "./tab-nginx/LetsEncrypt.md";
import Windows from "./tab-nginx/Windows.md";

<Tabs>
  <TabItem value="NginxProxyManager" label="Nginx Proxy Manager">
    <NginxProxyManager />
  </TabItem>
  <TabItem value="letsencrypt" label="Lets Encrypt">
    <LetsEncrypt />
  </TabItem>
  <TabItem value="selfsigned" label="자체 서명">
    <SelfSigned />
  </TabItem>
  <TabItem value="windows" label="Windows">
    <Windows />
  </TabItem>
</Tabs>


## 다음 단계

HTTPS를 설정한 후 다음을 통해 Open WebUI에 안전하게 액세스하십시오:

- [https://localhost](https://localhost)

도메인 이름을 사용하는 경우 DNS 레코드가 올바르게 구성되어 있는지 확인하세요. 프로덕션 환경에서는 신뢰할 수 있는 SSL 인증서를 위해 Lets Encrypt를 사용하는 것이 좋습니다.

---
