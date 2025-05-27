
# Kubernetes용 Helm 설정

Helm은 Kubernetes 애플리케이션 관리를 도와줍니다.

## 사전 준비

- Kubernetes 클러스터가 설정되어 있어야 합니다.
- Helm이 설치되어 있어야 합니다.

## 단계

1. **Open WebUI Helm 저장소 추가:**

   ```bash
   helm repo add open-webui https://open-webui.github.io/helm-charts
   helm repo update
   ```

2. **Open WebUI 차트 설치:**

   ```bash
   helm install openwebui open-webui/open-webui
   ```

3. **설치 확인:**

   ```bash
   kubectl get pods
   ```

:::warning

Open WebUI를 여러 노드/팟/작업자로 구성된 클러스터 환경에서 확장하려면 NoSQL 키-값 데이터베이스를 설정해야 합니다.
[환경 변수](https://docs.openwebui.com/getting-started/env-configuration/) 몇 가지를 모든 서비스 인스턴스에서 동일한 값으로 설정해야 합니다. 그렇지 않으면 일관성 문제, 잘못된 세션 및 기타 문제가 발생할 수 있습니다!

:::

## WebUI에 액세스

클러스터 외부에서 Open WebUI에 액세스하려면 포트 포워딩 또는 로드 밸런싱을 설정하십시오.
