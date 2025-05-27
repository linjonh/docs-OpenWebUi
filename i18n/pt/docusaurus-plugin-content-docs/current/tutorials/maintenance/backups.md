---
sidebar_position: 1000
title: "💾 Backups"
---
 
 :::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

 # Fazendo Backup da Sua Instância

 Ninguém gosta de perder dados!

 Se você está hospedando o Open WebUI por conta própria, pode querer instituir algum tipo de plano formal de backup para garantir que você mantenha uma segunda e uma terceira cópia de partes da sua configuração.

 Este guia é destinado a recomendar algumas sugestões básicas sobre como os usuários podem fazer isso.

 Este guia presume que o usuário tenha instalado o Open WebUI via Docker (ou pretenda fazê-lo).

 ## Garantindo a persistência de dados

Primeiramente, antes de implantar seu conjunto de ferramentas com Docker, certifique-se de que seu Docker Compose utilize um armazenamento de dados persistente. Se você está usando o Docker Compose [do repositório do Github](https://github.com/open-webui/open-webui/blob/main/docker-compose.yaml), isso já foi resolvido. Mas é fácil criar suas próprias variações e esquecer de verificar isso.

Os containers Docker são efêmeros, e os dados devem ser mantidos persistentes para garantir sua sobrevivência no sistema de arquivos do host.

## Usando volumes do Docker

Se você está usando o Docker Compose do repositório do projeto, estará implantando o Open WebUI utilizando volumes do Docker.

Para Ollama e Open WebUI, as montagens são:

```yaml
ollama:
  volumes:
    - ollama:/root/.ollama
```

```yaml
open-webui:
  volumes:
    - open-webui:/app/backend/data
```

Para encontrar o caminho real de vinculação no host, execute:

`docker volume inspect ollama`

e

`docker volume inspect open-webui`

## Usando vinculações diretas no host

Alguns usuários implantam o Open WebUI com vinculações diretas (fixas) ao sistema de arquivos do host, assim:

```yaml
services:
  ollama:
    container_name: ollama
    image: ollama/ollama:${OLLAMA_DOCKER_TAG-latest}
    volumes:
      - /opt/ollama:/root/.ollama
  open-webui:
    container_name: open-webui
    image: ghcr.io/open-webui/open-webui:${WEBUI_DOCKER_TAG-main}
    volumes:
      - /opt/open-webui:/app/backend/data
```

Se esta for a forma como você implantou sua instância, deseja observar os caminhos na raiz.

## Automatizando uma Tarefa de Backup

Independentemente de como sua instância está provisionada, vale a pena inspecionar o armazenamento de dados do aplicativo em seu servidor para entender quais dados você estará fazendo backup. Você deve ver algo assim:

```
├── audit.log
├── cache/
├── uploads/
├── vector_db/
└── webui.db
```

## Arquivos no armazenamento de dados persistente 

| Arquivo/Diretório | Descrição |
|---|---|
| `audit.log` | Arquivo de log para eventos de auditoria. |
| `cache/` | Diretório para armazenamento de dados em cache. |
| `uploads/` | Diretório para armazenamento de arquivos enviados pelos usuários. |
| `vector_db/` | Diretório contendo o banco de dados de vetores ChromaDB. |
| `webui.db` | Banco de dados SQLite para armazenamento persistente de outros dados da instância. |

# Abordagens de Backup em Nível de Arquivos

A primeira forma de fazer backup dos dados do aplicativo é através de uma abordagem de backup em nível de arquivos, garantindo que os dados persistentes do Open WebUI sejam devidamente preservados.

Existem infinitas maneiras de como serviços técnicos podem ser feitos backup, mas o `rsync` continua sendo uma escolha popular para tarefas incrementais e será usado como demonstração.

Os usuários podem direcionar todo o diretório `data` para fazer backup de todos os dados da instância de uma vez ou criar tarefas de backup mais seletivas, direcionando componentes individuais. Você pode adicionar nomes mais descritivos para os alvos também.

Um modelo de tarefa com rsync poderia ser assim:

```bash
#!/bin/bash

# Configuração
SOURCE_DIR="."  # Diretório atual (onde está a estrutura de arquivos)
B2_BUCKET="b2://OpenWebUI-backups" # Seu bucket Backblaze B2
B2_PROFILE="your_rclone_profile" # Seu nome de perfil do rclone
# Certifique-se de que o rclone está configurado com suas credenciais B2

# Definir diretórios de origem e destino
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# Excluir cache e audit.log
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# Construir argumentos de exclusão para o rclone
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude '$EXCLUDE'"
done

# Função para realizar sincronização com rclone e verificar erros
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "Sincronizando '$SOURCE' para '$DEST'..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "Erro: sincronização com rclone falhou para '$SOURCE' para '$DEST'"
        exit 1
    fi
}

# Realizar sincronização com rclone para cada diretório/arquivo
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

echo "Backup concluído com sucesso."
exit 0
```

## Trabalho Rsync Com Interrupção do Contêiner

Para manter a integridade dos dados, geralmente é recomendado realizar backups de banco de dados em sistemas de arquivos frios. Nosso trabalho de backup padrão pode ser ligeiramente modificado para desligar o stack antes de executar o script de backup e ligá-lo novamente depois.

A desvantagem dessa abordagem, claro, é que implicará em tempo de inatividade da instância. Considere executar o trabalho em horários nos quais você não usará a instância ou realizar backups diários "enquanto em execução" (nos dados em uso) e backups semanais mais robustos (nos dados frios).

```bash
#!/bin/bash

# Configuração
COMPOSE_FILE="docker-compose.yml" # Caminho para seu arquivo docker-compose.yml
B2_BUCKET="b2://OpenWebUI-backups" # Seu bucket Backblaze B2
B2_PROFILE="seu_perfil_rclone" # Nome do seu perfil rclone
SOURCE_DIR="."  # Diretório atual (onde a estrutura dos arquivos reside)

# Definir diretórios de origem e destino
SOURCE_UPLOADS="$SOURCE_DIR/uploads"
SOURCE_VECTORDB="$SOURCE_DIR/vector_db"
SOURCE_WEBUI_DB="$SOURCE_DIR/webui.db"

DEST_UPLOADS="$B2_BUCKET/user_uploads"
DEST_CHROMADB="$B2_BUCKET/ChromaDB"
DEST_MAIN_DB="$B2_BUCKET/main_database"

# Excluir cache e audit.log
EXCLUDE_LIST=(
    "cache/"
    "audit.log"
)

# Construir argumentos de exclusão para o rclone
EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude $EXCLUDE"
done

# Função para executar sincronização rclone com verificação de erros
rclone_sync() {
    SOURCE="$1"
    DEST="$2"
    echo "Sincronizando $SOURCE em $DEST..."
    rclone sync "$SOURCE" "$DEST" $EXCLUDE_ARGS --progress --transfers=32 --checkers=16 --profile "$B2_PROFILE"
    if [ $? -ne 0 ]; then
        echo "Erro: Falha na sincronização rclone de $SOURCE para $DEST"
        exit 1
    fi
}

# 1. Parar o ambiente Docker Compose
echo "Parando ambiente Docker Compose..."
docker-compose -f "$COMPOSE_FILE" down

# 2. Realizar o backup
echo "Iniciando backup..."
rclone_sync "$SOURCE_UPLOADS" "$DEST_UPLOADS"
rclone_sync "$SOURCE_VECTORDB" "$DEST_CHROMADB"
rclone_sync "$SOURCE_WEBUI_DB" "$DEST_MAIN_DB"

# 3. Iniciar o ambiente Docker Compose
echo "Iniciando ambiente Docker Compose..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "Backup concluído com sucesso."
exit 0
```

## Script de Backup de Modelo Usando Funções de Backup SQLite e ChromaDB Para Remoto B2

```bash
#!/bin/bash
#
# Script de backup para salvar ChromaDB e SQLite para bucket Backblaze B2
# openwebuiweeklies, mantendo 3 snapshots semanais.
# Snapshots são independentes e completamente restauráveis.
# Usa mecanismos nativos de backup do ChromaDB e SQLite.
# Exclui audit.log, cache e diretórios uploads.
#
# Certifique-se de que o rclone esteja instalado e configurado corretamente.
# Instalar rclone: https://rclone.org/install/
# Configurar rclone: https://rclone.org/b2/

# Diretório de origem (contendo dados do ChromaDB e SQLite)
SOURCE="/var/lib/open-webui/data"

# Nome do bucket B2 e nome remoto
B2_REMOTE="openwebuiweeklies"
B2_BUCKET="b2:$B2_REMOTE"

# Timestamp para o diretório de backup
TIMESTAMP=$(date +%Y-%m-%d)

# Nome do diretório de backup
BACKUP_DIR="open-webui-backup-$TIMESTAMP"

# Caminho completo para o diretório de backup no bucket B2
DESTINATION="$B2_BUCKET/$BACKUP_DIR"

# Número de snapshots semanais a serem mantidos
NUM_SNAPSHOTS=3

# Filtros de exclusão (aplicado *depois* dos backups do banco de dados)
EXCLUDE_FILTERS="--exclude audit.log --exclude cache/** --exclude uploads/** --exclude vector_db"

# Configurações de Backup do ChromaDB (Ajuste conforme necessário)
CHROMADB_DATA_DIR="$SOURCE/vector_db"  # Caminho para o diretório de dados do ChromaDB
CHROMADB_BACKUP_FILE="$SOURCE/chromadb_backup.tar.gz" # Arquivo de arquivamento para o backup do ChromaDB

# Configurações de Backup do SQLite (Ajuste conforme necessário)
SQLITE_DB_FILE="$SOURCE/webui.db" # Caminho para o arquivo de banco de dados SQLite
SQLITE_BACKUP_FILE="$SOURCE/webui.db.backup" # Arquivo temporário para o backup do SQLite

# Função para backup do ChromaDB
backup_chromadb() {
  echo "Realizando backup do ChromaDB..."

  # Criar um arquivo tar do diretório vector_db
  tar -czvf "$CHROMADB_BACKUP_FILE" -C "$SOURCE" vector_db

  echo "Backup do ChromaDB concluído."
}

# Função para backup do SQLite
backup_sqlite() {
  echo "Realizando backup do banco de dados SQLite..."
  # Fazer o backup do banco de dados SQLite usando o comando .backup
  sqlite3 "$SQLITE_DB_FILE" ".backup $SQLITE_BACKUP_FILE"

  # Mover o arquivo de backup para o diretório de origem
  mv "$SQLITE_BACKUP_FILE" "$SOURCE/"

  echo "Backup do SQLite concluído."
}

# Realizar backups de banco de dados
backup_chromadb
backup_sqlite

# Realizar o backup com exclusões
rclone copy "$SOURCE" "$DESTINATION" $EXCLUDE_FILTERS --progress

# Remover backups antigos, mantendo os mais recentes NUM_SNAPSHOTS
find "$B2_BUCKET" -type d -name "open-webui-backup-*" | sort -r | tail -n +$((NUM_SNAPSHOTS + 1)) | while read dir; do
  rclone purge "$dir"
done

echo "Backup concluído em $DESTINATION"
```

---

## Snapshots de Ponto no Tempo

Além de realizar backups, os usuários também podem querer criar snapshots de ponto no tempo que podem ser armazenados localmente (no servidor), remotamente ou em ambos.

```bash
#!/bin/bash

# Configuração
SOURCE_DIR="."  # Diretório para snapshot (diretório atual)
SNAPSHOT_DIR="/snapshots" # Diretório para armazenar snapshots
TIMESTAMP=$(date +%Y%m%d%H%M%S) # Gerar timestamp

# Criar o diretório de snapshot se ele não existir
mkdir -p "$SNAPSHOT_DIR"

# Criar o nome do snapshot
SNAPSHOT_NAME="snapshot_$TIMESTAMP"
SNAPSHOT_PATH="$SNAPSHOT_DIR/$SNAPSHOT_NAME"

# Realizar o snapshot com rsync
echo "Criando snapshot: $SNAPSHOT_PATH"
rsync -av --delete --link-dest="$SNAPSHOT_DIR/$(ls -t "$SNAPSHOT_DIR" | head -n 1)" "$SOURCE_DIR/" "$SNAPSHOT_PATH"

# Verificar se o rsync foi bem-sucedido
if [ $? -eq 0 ]; then
  echo "Snapshot criado com sucesso."
else
  echo "Erro: Falha na criação do snapshot."
  exit 1
fi

exit 0
```
## Crontab para Agendamento

Depois de adicionar seu script de backup e provisionar seu armazenamento de backup, você deve testar os scripts para garantir que estão funcionando conforme esperado. É altamente recomendável fazer registros (logs).

Configure seus novos scripts para serem executados usando crontabs de acordo com a frequência desejada.

# Utilitários Comerciais

Além de criar seus próprios trabalhos de backup, você pode encontrar ofertas comerciais que geralmente funcionam instalando agentes no seu servidor que simplificam as complexidades de realizar backups. Estes estão fora do escopo deste artigo, mas fornecem soluções convenientes.

---

# Backups de Nível de Host

Sua instância Open WebUI pode estar provisionada em um host (físico ou virtualizado) que você controla.

Backups de nível de host envolvem criar snapshots ou backups do VM inteiro em vez de aplicativos em execução.

Alguns podem optar por utilizá-los como sua proteção primária ou única, enquanto outros podem preferir incluí-los como proteções de dados adicionais.

# Quantos Backups Eu Preciso?

A quantidade de backups que você desejará fazer depende do seu nível pessoal de tolerância ao risco. No entanto, lembre-se de que é uma boa prática *não* considerar o próprio aplicativo como uma cópia de backup (mesmo que esteja na nuvem!). Isso significa que, se você provisionou sua instância em um VPS, ainda é recomendável manter duas cópias de backup (independentes).

Um exemplo de plano de backup que atenderia às necessidades de muitos usuários domésticos:

## Plano de backup modelo 1 (primário + 2 cópias)

| Frequência | Destino | Tecnologia | Descrição |
|---|---|---|---|
| Incremental Diário | Armazenamento em Nuvem (S3/B2) | rsync | Backup incremental diário enviado para um bucket de armazenamento na nuvem (S3 ou B2). |
| Incremental Semanal | Armazenamento Local (NAS doméstico) | rsync | Backup incremental semanal puxado do servidor para armazenamento local (ex.: um NAS doméstico). |

## Plano de backup modelo 2 (primário + 3 cópias)

Este plano de backup é um pouco mais complicado, mas também mais abrangente... envolve envios diários para dois provedores de armazenamento na nuvem para redundância adicional.

| Frequência | Destino | Tecnologia | Descrição |
|---|---|---|---|
| Incremental Diário | Armazenamento em Nuvem (S3) | rsync | Backup incremental diário enviado para um bucket de armazenamento na nuvem S3. |
| Incremental Diário | Armazenamento em Nuvem (B2) | rsync | Backup incremental diário enviado para um bucket de armazenamento na nuvem Backblaze B2. |
| Incremental Semanal | Armazenamento Local (NAS doméstico) | rsync | Backup incremental semanal puxado do servidor para armazenamento local (ex.: um NAS doméstico). |

# Tópicos Adicionais

Com o interesse de manter este guia razoavelmente completo, estes tópicos adicionais foram omitidos, mas podem valer a sua consideração dependendo do tempo que você tem para dedicar à configuração e manutenção de um plano de proteção de dados para sua instância:

| Tópico | Descrição |
|---|---|
| Backup Integrado SQLite | Considere usar o comando `.backup` do SQLite para uma solução consistente de backup de banco de dados. |
| Criptografia | Modifique os scripts de backup para incorporar criptografia em repouso para segurança aprimorada. |
| Recuperação de Desastres e Testes | Desenvolva um plano de recuperação de desastres e teste regularmente o processo de backup e restauração. |
| Ferramentas Alternativas de Backup | Explore outras ferramentas de linha de comando para backup, como `borgbackup` ou `restic`, para recursos avançados. |
| Notificações por Email e Webhooks | Implemente notificações por email ou webhooks para monitorar sucessos ou falhas de backup. |
