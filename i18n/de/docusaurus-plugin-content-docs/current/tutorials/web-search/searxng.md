---
sidebar_position: 10
title: "SearXNG"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht von Open WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Tutorial zur Mitwirkung an.
:::

Diese Anleitung bietet Anweisungen, wie Sie Websuchfunktionen in Open WebUI mit SearXNG in Docker einrichten können.

## SearXNG (Docker)

> "**SearXNG ist eine kostenlose Metasuchmaschine, die Ergebnisse aus verschiedenen Suchdiensten und Datenbanken zusammenführt. Benutzer werden weder verfolgt noch profiliert.**"

## 1. SearXNG-Konfiguration

Folgen Sie diesen Schritten, um SearXNG optimal für die Verwendung mit Open WebUI zu konfigurieren:

**Schritt 1: `git clone` SearXNG Docker und navigieren Sie zum Ordner:**

1. Erstellen Sie ein neues Verzeichnis `searxng-docker`

Klonen Sie das Repository von searxng-docker. Dieser Ordner wird Ihre Konfigurationsdateien für SearXNG enthalten. Weitere Informationen zur Konfiguration finden Sie in der [SearXNG-Dokumentation](https://docs.searxng.org/).

```bash
git clone https://github.com/searxng/searxng-docker.git
```

Navigieren Sie zum Repository `searxng-docker`:

```bash
cd searxng-docker
```

**Schritt 2: Lokalisieren und ändern Sie die `.env`-Datei:**

1. Kommentieren Sie `SEARXNG_HOSTNAME` in der `.env`-Datei aus und setzen Sie ihn entsprechend:

```bash
# Standardmäßig wird auf https://localhost gehört
# So ändern Sie dies:
# * Kommentieren Sie SEARXNG_HOSTNAME aus und ersetzen Sie <host> durch den SearXNG-Hostnamen
# * Kommentieren Sie LETSENCRYPT_EMAIL aus und ersetzen Sie <email> durch Ihre E-Mail-Adresse (erforderlich, um ein Let's Encrypt-Zertifikat zu erstellen)

SEARXNG_HOSTNAME=localhost:8080/
# LETSENCRYPT_EMAIL=<email>

# Optional:
# Wenn Sie eine sehr kleine oder eine sehr große Instanz betreiben, möchten Sie vielleicht die Anzahl der verwendeten uwsgi-Worker und Threads pro Worker ändern
# Mehr Worker (= Prozesse) bedeuten, dass mehr Suchanfragen gleichzeitig bearbeitet werden können, verursachen jedoch auch mehr Ressourcenverbrauch

# SEARXNG_UWSGI_WORKERS=4
# SEARXNG_UWSGI_THREADS=4
```

**Schritt 3: Ändern Sie die Datei `docker-compose.yaml`**

3. Entfernen Sie die Einschränkung `localhost`, indem Sie die Datei `docker-compose.yaml` ändern:

```bash
sed -i "s/127.0.0.1:8080/0.0.0.0:8080/"
```

**Schritt 4: Gewähren Sie die notwendigen Berechtigungen**

4. Erlauben Sie dem Container, neue Konfigurationsdateien zu erstellen, indem Sie den folgenden Befehl im Stammverzeichnis ausführen:

```bash
sudo chmod a+rwx searxng-docker/searxng
```

**Schritt 5: Erstellen Sie eine nicht-restriktive `limiter.toml`-Datei**

5. Erstellen Sie eine nicht-restriktive Konfigurationsdatei `searxng-docker/searxng/limiter.toml`:

<details>
<summary>searxng-docker/searxng/limiter.toml</summary>

```bash
# Diese Konfigurationsdatei aktualisiert die Standardkonfigurationsdatei
# Siehe https://github.com/searxng/searxng/blob/master/searx/botdetection/limiter.toml

[botdetection.ip_limit]
# Aktivieren Sie die Methode link_token in der ip_limit-Methode
link_token = false

[botdetection.ip_lists]
block_ip = []
pass_ip = []
```

</details>

**Schritt 6: Entfernen Sie die Standarddatei `settings.yml`**

6. Löschen Sie die Standarddatei `searxng-docker/searxng/settings.yml`, falls sie existiert, da sie beim ersten Start von SearXNG neu generiert wird:

```bash
rm searxng-docker/searxng/settings.yml
```

**Schritt 7: Erstellen Sie eine neue `settings.yml`-Datei**

:::note
Beim ersten Start müssen Sie `cap_drop: - ALL` aus der Datei `docker-compose.yaml` für den `searxng`-Dienst entfernen, damit `/etc/searxng/uwsgi`.ini erfolgreich erstellt werden kann. Dies ist erforderlich, da die Direktive `cap_drop: - ALL` alle Befugnisse entfernt, einschließlich derjenigen, die für die Erstellung der Datei `uwsgi.ini` notwendig sind. Nach dem ersten Start sollten Sie `cap_drop: - ALL` aus Sicherheitsgründen wieder in die Datei `docker-compose.yaml` einfügen.
:::

7. Starten Sie den Container vorübergehend, um eine neue settings.yml-Datei zu generieren:

```bash
docker compose up -d ; sleep 10 ; docker compose down
```

**Schritt 8: Formate hinzufügen und Portnummer aktualisieren**

8. Fügen Sie HTML- und JSON-Formate zur Datei `searxng-docker/searxng/settings.yml` hinzu:

```bash
sed -i s/formats: \[\"html\"\/]/formats: [\"html\", \"json\"]/ searxng-docker/searxng/settings.yml
```

Generieren Sie einen geheimen Schlüssel für Ihre SearXNG-Instanz:

```bash
sed -i "s|ultrasecretkey|$(openssl rand -hex 32)|g" searxng-docker/searxng/settings.yml
```

Windows-Benutzer können das folgende PowerShell-Skript verwenden, um den geheimen Schlüssel zu generieren:

```powershell
$randomBytes = New-Object byte[] 32
(New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($randomBytes)
$secretKey = -join ($randomBytes | ForEach-Object { "{0:x2}" -f $_ })
(Get-Content searxng-docker/searxng/settings.yml) -replace ultrasecretkey, $secretKey | Set-Content searxng-docker/searxng/settings.yml
```

Aktualisieren Sie die Portnummer im Abschnitt `server`, um die vorher festgelegte Nummer (in diesem Fall `8080`) zu verwenden:

```bash
sed -i s/port: 8080/port: 8080/ searxng-docker/searxng/settings.yml
```

Ändern Sie die `bind_address` nach Wunsch:

```bash
sed -i s/bind_address: "0.0.0.0"/bind_address: "127.0.0.1"/ searxng-docker/searxng/settings.yml
```

#### Konfigurationsdateien

#### searxng-docker/searxng/settings.yml (Auszug)

Die Standarddatei `settings.yml` enthält viele Engine-Einstellungen. Nachfolgend ein Auszug, wie die Standarddatei `settings.yml` aussehen könnte:

<details>
<summary>searxng-docker/searxng/settings.yml</summary>

```yaml
# siehe https://docs.searxng.org/admin/settings/settings.html#settings-use-default-settings
use_default_settings: true

server:
  # base_url ist in der SEARXNG_BASE_URL-Umgebungsvariable definiert, siehe .env und docker-compose.yml
  secret_key: "ultrasecretkey"  # ändern Sie dies!
  limiter: true  # kann für eine private Instanz deaktiviert werden
  image_proxy: true
  port: 8080
  bind_address: "0.0.0.0"

ui:
  static_use_hash: true

search:
  safe_search: 0
  autocomplete: ""
  default_lang: ""
  formats:
    - html
    - json # json wird benötigt
  # Format entfernen, um Zugriff zu verhindern, verwenden Sie Kleinschreibung.
  # formats: [html, csv, json, rss]
redis:
  # URL zur Verbindung mit der Redis-Datenbank. Wird von ${SEARXNG_REDIS_URL} überschrieben.
  # https://docs.searxng.org/admin/settings/settings_redis.html#settings-redis
  url: redis://redis:6379/0
```

Der Port in der settings.yml-Datei für SearXNG sollte mit der Portnummer in Ihrer docker-compose.yml-Datei für SearXNG übereinstimmen.

</details>

**Schritt 9: Aktualisieren Sie die Datei `uwsgi.ini`**

9. Stellen Sie sicher, dass Ihre Datei `searxng-docker/searxng/uwsgi.ini` wie folgt aussieht:

<details>
<summary>searxng-docker/searxng/uwsgi.ini</summary>

```ini
[uwsgi]
# Wer wird den Code ausführen
uid = searxng
gid = searxng

# Anzahl der Worker (in der Regel Anzahl der CPU-Kerne)
# Standardwert: %k (= Anzahl der CPU-Kerne, siehe Dockerfile)
workers = %k

# Anzahl der Threads pro Worker
# Standardwert: 4 (siehe Dockerfile)
threads = 4

# Zugriffsrechte für den erstellten Socket
chmod-socket = 666

# Plugin und Interpreter-Konfiguration
single-interpreter = true
master = true
plugin = python3
lazy-apps = true
enable-threads = 4

# Zu importierendes Modul
module = searx.webapp

# Virtuelle Umgebung und Python-Pfad
pythonpath = /usr/local/searxng/
chdir = /usr/local/searxng/searx/

# Prozesse automatisch mit sinnvollen Namen versehen
auto-procname = true

# Deaktivieren Sie die Anfrageprotokollierung aus Datenschutzgründen
disable-logging = true
log-5xx = true

# Maximale Größe einer Anfrage festlegen (ohne Anfrageinhalt)
buffer-size = 8192

# Kein Keep-Alive
# Siehe https://github.com/searx/searx-docker/issues/24
add-header = Connection: close

# uwsgi dient statische Dateien
static-map = /static=/usr/local/searxng/searx/static
# Ablaufdatum auf einen Tag setzen
static-expires = /* 86400
static-gzip-all = True
offload-threads = 4
```

</details>

## 2. Alternative Einrichtung

Alternativ können Sie, wenn Sie die Standardkonfiguration nicht ändern möchten, einfach einen leeren `searxng-docker` Ordner erstellen und den weiteren Einrichtungsschritten folgen.

### Einrichtung mit Docker Compose

Fügen Sie die folgenden Umgebungsvariablen zu Ihrer Open WebUI `docker-compose.yaml` Datei hinzu:

```yaml
services:
  open-webui:
    environment:
      ENABLE_RAG_WEB_SEARCH: True
      RAG_WEB_SEARCH_ENGINE: "searxng"
      RAG_WEB_SEARCH_RESULT_COUNT: 3
      RAG_WEB_SEARCH_CONCURRENT_REQUESTS: 10
      SEARXNG_QUERY_URL: "http://searxng:8080/search?q=<query>"
```

Erstellen Sie eine `.env` Datei für SearXNG:

```
# SearXNG
SEARXNG_HOSTNAME=localhost:8080/
```

Fügen Sie anschließend das Folgende zur `docker-compose.yaml` Datei von SearXNG hinzu:

```yaml
services:
  searxng:
    container_name: searxng
    image: searxng/searxng:latest
    ports:
      - "8080:8080"
    volumes:
      - ./searxng:/etc/searxng:rw
    env_file:
      - .env
    restart: unless-stopped
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
      - DAC_OVERRIDE
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
```

Ihr Stack ist bereit zur Ausführung mit:

```bash
docker compose up -d
```

:::note
Beim ersten Start müssen Sie `cap_drop: - ALL` aus der `docker-compose.yaml` Datei für den Dienst `searxng` entfernen, damit `/etc/searxng/uwsgi`.ini erfolgreich erstellt werden kann. Dies ist notwendig, da die Direktive `cap_drop: - ALL` alle Fähigkeiten entfernt, einschließlich derjenigen, die für die Erstellung der `uwsgi.ini` Datei erforderlich sind. Nach dem ersten Start sollten Sie `cap_drop: - ALL` aus Sicherheitsgründen wieder zur `docker-compose.yaml` Datei hinzufügen.
:::

Alternativ können Sie SearXNG direkt mit `docker run` ausführen:

```bash
docker run --name searxng --env-file .env -v ./searxng:/etc/searxng:rw -p 8080:8080 --restart unless-stopped --cap-drop ALL --cap-add CHOWN --cap-add SETGID --cap-add SETUID --cap-add DAC_OVERRIDE --log-driver json-file --log-opt max-size=1m --log-opt max-file=1 searxng/searxng:latest
```

## 3. Konnektivität bestätigen

Bestätigen Sie die Konnektivität zu SearXNG von Ihrer Open WebUI-Containerinstanz aus in Ihrer Befehlszeilenschnittstelle:

```bash
docker exec -it open-webui curl http://host.docker.internal:8080/search?q=this+is+a+test+query&format=json
```

## 4. GUI-Konfiguration

1. Navigieren Sie zu: `Admin Panel` -> `Settings` -> `Web Search`
2. Aktivieren Sie `Enable Web Search`
3. Wählen Sie im Dropdown-Menü `Web Search Engine` `searxng` aus
4. Setzen Sie die `Searxng Query URL` auf eines der folgenden Beispiele:

* `http://searxng:8080/search?q=<query>` (Verwendung des Containernamens und freigegebenen Ports, geeignet für dockerbasierte Umgebungen)
* `http://host.docker.internal:8080/search?q=<query>` (Verwendung des `host.docker.internal` DNS-Namens und des Host-Ports, geeignet für dockerbasierte Umgebungen)
* `http://<searxng.local>/search?q=<query>` (Verwendung eines lokalen Domainnamens, geeignet für den Zugriff im lokalen Netzwerk)
* `https://<search.domain.com>/search?q=<query>` (Verwendung eines benutzerdefinierten Domainnamens für eine selbst gehostete SearXNG-Instanz, geeignet für öffentlichen oder privaten Zugriff)

**Beachten Sie, dass der `/search?q=<query>` Teil obligatorisch ist.**

5. Passen Sie die Werte für `Suchergebnisanzahl` und `Gleichzeitige Anfragen` entsprechend an
6. Änderungen speichern

![SearXNG GUI Konfiguration](/images/tutorial_searxng_config.png)

## 5. Verwendung der Websuche in einem Chat

Um auf die Websuche zuzugreifen, klicken Sie auf das + neben dem Nachrichten-Eingabefeld.

Hier können Sie die Websuche ein- oder ausschalten.

![Websuche UI Umschalter](/images/web_search_toggle.png)

Indem Sie die Schritte befolgen, richten Sie SearXNG erfolgreich mit Open WebUI ein und können Websuchen mit der SearXNG-Engine durchführen.

#### Hinweis

Sie müssen diese Funktion explizit in einem Chat ein- oder ausschalten.

Dies ist pro Sitzung aktiviert. Zum Beispiel führt das Neuladen der Seite oder der Wechsel zu einem anderen Chat zur Deaktivierung.
