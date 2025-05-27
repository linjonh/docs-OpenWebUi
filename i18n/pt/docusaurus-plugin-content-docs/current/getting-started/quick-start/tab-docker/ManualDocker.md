## Início Rápido com Docker 🐳

Siga estes passos para instalar Open WebUI com Docker.

## Etapa 1: Obter a Imagem Open WebUI

Comece obtendo a imagem Docker mais recente do Open WebUI do GitHub Container Registry.

```bash
docker pull ghcr.io/open-webui/open-webui:main
```

## Etapa 2: Executar o Contêiner

Execute o contêiner com as configurações padrão. Este comando inclui um mapeamento de volume para garantir armazenamento persistente de dados.

```bash
docker run -d -p 3000:8080 -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

### Flags Importantes

- **Mapeamento de Volume (`-v open-webui:/app/backend/data`)**: Garante o armazenamento persistente dos seus dados. Isso evita perda de dados entre reinicializações do contêiner.
- **Mapeamento de Porta (`-p 3000:8080`)**: Disponibiliza o WebUI na porta 3000 da sua máquina local.

### Usando Suporte a GPU

Para suporte a GPU Nvidia, adicione `--gpus all` ao comando `docker run`:

```bash
docker run -d -p 3000:8080 --gpus all -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:cuda
```


#### Modo de Usuário Único (Desativando Login)

Para ignorar a página de login em uma configuração de usuário único, defina a variável de ambiente `WEBUI_AUTH` como `False`:

```bash
docker run -d -p 3000:8080 -e WEBUI_AUTH=False -v open-webui:/app/backend/data --name open-webui ghcr.io/open-webui/open-webui:main
```

:::warning
Você não pode alternar entre o modo de usuário único e o modo de várias contas após esta alteração.
:::

#### Configuração Avançada: Conectando ao Ollama em Outro Servidor

Para conectar o Open WebUI a um servidor Ollama localizado em outro host, adicione a variável de ambiente `OLLAMA_BASE_URL`:

```bash
docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=https://example.com -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

## Acesse o WebUI

Após o contêiner estar em execução, acesse o Open WebUI em:

[http://localhost:3000](http://localhost:3000)

Para ajuda detalhada sobre cada flag do Docker, veja [a documentação do Docker](https://docs.docker.com/engine/reference/commandline/run/).
