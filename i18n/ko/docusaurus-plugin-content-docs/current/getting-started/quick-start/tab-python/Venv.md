
# 가상 환경 사용하기

`venv`를 사용하여 Python의 격리된 환경을 생성합니다.

## 단계

1. **가상 환경 생성:**

   ```bash
   python3 -m venv venv
   ```

2. **가상 환경 활성화:**

   - Linux/macOS에서:

     ```bash
     source venv/bin/activate
     ```

   - Windows에서:

     ```bash
     venv\Scripts\activate
     ```

3. **Open WebUI 설치:**

   ```bash
   pip install open-webui
   ```

4. **서버 시작:**

   ```bash
   open-webui serve
   ```
