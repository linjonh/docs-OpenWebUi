
# Kubernetes를 위한 Kustomize 설정

Kustomize를 사용하면 Kubernetes YAML 설정을 사용자 정의할 수 있습니다.

## 사전 준비

- Kubernetes 클러스터가 설정되어 있어야 합니다.
- Kustomize가 설치되어 있어야 합니다.

## 단계

1. **Open WebUI Manifest 클론:**

   ```bash
   git clone https://github.com/open-webui/k8s-manifests.git
   cd k8s-manifests
   ```

2. **Manifests 적용:**

   ```bash
   kubectl apply -k .
   ```

3. **설치 확인:**

   ```bash
   kubectl get pods
   ```

:::warning

Open WebUI를 다수의 노드/Pod/작업자(worker)를 사용하는 클러스터 환경에서 확장하려는 경우, NoSQL 키-값 데이터베이스를 설정해야 합니다.
모든 서비스 인스턴스에서 동일한 값으로 설정해야 하는 [환경 변수](https://docs.openwebui.com/getting-started/env-configuration/)가 있습니다. 그렇지 않으면 일관성 문제, 잘못된 세션 및 기타 문제가 발생할 수 있습니다!

:::

## WebUI에 접근

클러스터 외부에서 Open WebUI에 접근하려면 포트 포워딩 또는 로드 밸런싱을 설정하십시오.
