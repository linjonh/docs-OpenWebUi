### Verwendung eines selbstsignierten Zertifikats und Nginx unter Windows ohne Docker

Für einfache interne/Entwicklungsinstallationen können Sie Nginx und ein selbstsigniertes Zertifikat verwenden, um Open WebUI auf HTTPS zu proxieren, wodurch Funktionen wie die Mikrofoneingabe über LAN ermöglicht werden. (Standardmäßig erlauben die meisten Browser keine Mikrofoneingabe auf unsicheren Nicht-Localhost-URLs)

In dieser Anleitung wird davon ausgegangen, dass Sie Open WebUI mit pip installiert haben und `open-webui serve` ausführen.

#### Schritt 1: Installation von OpenSSL zur Zertifikatserstellung

Zunächst müssen Sie OpenSSL installieren.

Sie können vorkompilierte Binärdateien von der Website von [Shining Light Productions (SLP)](https://slproweb.com/) herunterladen und installieren.

Alternativ, wenn Sie [Chocolatey](https://chocolatey.org/) installiert haben, können Sie damit OpenSSL schnell installieren:

1. Öffnen Sie eine Eingabeaufforderung oder PowerShell.
2. Führen Sie den folgenden Befehl aus, um OpenSSL zu installieren:
   ```bash
   choco install openssl -y
   ```

---

### **Installation überprüfen**
Nach der Installation öffnen Sie eine Eingabeaufforderung und geben Sie ein:
```bash
openssl version
```
Wenn die OpenSSL-Version angezeigt wird (z. B. `OpenSSL 3.x.x ...`), ist es korrekt installiert.

#### Schritt 2: Installation von Nginx

Laden Sie die offizielle Windows-Version von Nginx von [nginx.org](https://nginx.org) herunter oder verwenden Sie einen Paketmanager wie Chocolatey.
Entpacken Sie die heruntergeladene ZIP-Datei in ein Verzeichnis (z. B. C:\nginx).

#### Schritt 3: Zertifikat erstellen

Führen Sie folgenden Befehl aus:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt
```

Verschieben Sie die generierten Dateien nginx.key und nginx.crt in einen Ordner Ihrer Wahl oder in das Verzeichnis C:\nginx.

#### Schritt 4: Nginx konfigurieren

Öffnen Sie die Datei C:\nginx\conf\nginx.conf in einem Texteditor.

Wenn Sie möchten, dass Open WebUI über Ihr lokales LAN zugänglich ist, notieren Sie sich die LAN-IP-Adresse mit `ipconfig`, z. B. 192.168.1.15.

Richten Sie es wie folgt ein:

```
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  $remote_addr - $remote_user [$time_local] "$request" 
    #                  $status $body_bytes_sent "$http_referer" 
    #                  "$http_user_agent" "$http_x_forwarded_for";

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  120;

    #gzip  on;

    # erforderlich für die ordnungsgemäße Handhabung von Websockets (Streaming)
    map $http_upgrade $connection_upgrade {
        default upgrade;
              close;
    }

    # Leitet allen HTTP-Verkehr zu HTTPS um
    server {
        listen 80;
        server_name 192.168.1.15;

        return 301 https://$host$request_uri;
    }

    # verarbeitet HTTPS-Verkehr
    server {
        listen 443 ssl;
        server_name 192.168.1.15;

        # SSL-Einstellungen (stellen Sie sicher, dass die Pfade korrekt sind)
        ssl_certificate C:\\nginx\\nginx.crt;
        ssl_certificate_key C:\\nginx\\nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
        ssl_prefer_server_ciphers on;

        # OCSP-Stapling
        #ssl_stapling on;
        #ssl_stapling_verify on;

        # Proxy-Einstellungen für Ihren lokalen Dienst
        location / {
            # proxy_pass sollte auf Ihre lokal laufende Version von open-webui verweisen
            proxy_pass http://localhost:8080;

            # WebSocket-Unterstützung hinzufügen (erforderlich für Version 0.5.0 und höher)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (Optional) Proxy-Pufferung deaktivieren für bessere Streaming-Antwort von Modellen
            proxy_buffering off;

            # (Optional) Maximale Anfragengröße erhöhen für große Anhänge und lange Audiomeldungen
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }

}
```

Speichern Sie die Datei und überprüfen Sie die Konfiguration auf Fehler oder Syntaxprobleme, indem Sie `nginx -t` ausführen. Möglicherweise müssen Sie zuerst `cd C:\nginx` ausführen, je nachdem, wie Sie es installiert haben.

Führen Sie nginx aus, indem Sie `nginx` ausführen. Wenn bereits ein nginx-Dienst gestartet ist, können Sie die neue Konfiguration mit `nginx -s reload` neu laden.

---

Sie sollten jetzt in der Lage sein, über https://192.168.1.15 (oder Ihre eigene LAN-IP, falls zutreffend) auf Open WebUI zuzugreifen. Stellen Sie sicher, dass Sie im Windows-Firewall-Zugriff die erforderlichen Berechtigungen erteilen.
