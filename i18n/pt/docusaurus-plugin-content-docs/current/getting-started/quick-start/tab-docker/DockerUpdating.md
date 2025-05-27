## Atualizando

Para atualizar sua instalação local do Docker para a versão mais recente, você pode usar o **Watchtower** ou atualizar manualmente o contêiner.

### Opção 1: Usando Watchtower

Com o [Watchtower](https://containrrr.dev/watchtower/), você pode automatizar o processo de atualização:

```bash
docker run --rm --volume /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --run-once open-webui
```

_(Substitua `open-webui` pelo nome do seu contêiner se ele for diferente.)_

### Opção 2: Atualização Manual

1. Pare e remova o contêiner atual:

   ```bash
   docker rm -f open-webui
   ```

2. Baixe a versão mais recente:

   ```bash
   docker pull ghcr.io/open-webui/open-webui:main
   ```

3. Inicie o contêiner novamente:

   ```bash
   docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
   ```

Ambos os métodos irão atualizar sua instância do Docker e colocá-la em funcionamento com a última versão.
