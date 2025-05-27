### Nginx Proxy Manager

Mit dem Nginx Proxy Manager (NPM) können Sie Reverse-Proxies einfach verwalten und Ihre lokalen Anwendungen, wie Open WebUI, mit gültigen SSL-Zertifikaten von Lets Encrypt sichern.
Diese Konfiguration ermöglicht HTTPS-Zugriff, was erforderlich ist, um Sprach-eingabefunktionen in vielen mobilen Browsern nutzen zu können, aufgrund deren Sicherheitsanforderungen, ohne den spezifischen Port der Anwendung direkt dem Internet auszusetzen.

#### Voraussetzungen

- Ein Heimserver mit Docker und einem laufenden open-webui-Container.
- Ein Domainname (kostenlose Optionen wie DuckDNS oder kostenpflichtige wie Namecheap/GoDaddy).
- Grundlegende Kenntnisse über Docker und DNS-Konfiguration.

#### Schritte

1. **Verzeichnisse für Nginx-Dateien erstellen:**

    ```bash
    mkdir ~/nginx_config
    cd ~/nginx_config
    ```

2. **Nginx Proxy Manager mit Docker einrichten:**

    ```bash
    nano docker-compose.yml
    ```

```yaml
services:
  app:
    image: jc21/nginx-proxy-manager:latest
    restart: unless-stopped
    ports:
      - 80:80
      - 81:81
      - 443:443
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

Container starten:
```bash
docker-compose up -d
```
3. **DNS und Domain konfigurieren:**

    * Melden Sie sich bei Ihrem Domainanbieter (z. B. DuckDNS) an und erstellen Sie eine Domain.
    * Richten Sie die Domain auf die lokale IP Ihres Proxys (z. B. 192.168.0.6).
    * Wenn Sie DuckDNS verwenden, holen Sie sich ein API-Token aus dem Dashboard.

###### Hier ein einfaches Beispiel, wie es auf https://www.duckdns.org/domains gemacht wird:
    
4. **SSL-Zertifikate einrichten:**
* Greifen Sie auf den Nginx Proxy Manager unter http://server_ip:81 zu. Zum Beispiel: ``192.168.0.6:81``
* Melden Sie sich mit den Standard-Anmeldeinformationen an (admin@example.com / changeme). Ändern Sie diese wie verlangt.
* Gehen Sie zu SSL-Zertifikate → SSL-Zertifikat hinzufügen → Lets Encrypt.
* Geben Sie Ihre E-Mail-Adresse und den von DuckDNS erhaltenen Domainnamen ein. Ein Domainname enthält ein Sternchen und ein anderer nicht. Beispiel: ``*.hello.duckdns.org`` und ``hello.duckdns.org``.
* Wählen Sie die Verwendung einer DNS-Herausforderung, wählen Sie DuckDNS und fügen Sie Ihr API-Token ein. Beispiel: 
```dns_duckdns_token=f4e2a1b9-c78d-e593-b0d7-67f2e1c9a5b8```
* Stimmen Sie den Bedingungen von Lets Encrypt zu und speichern Sie. Ändern Sie die Propagationszeit, **falls erforderlich** (120 Sekunden).

5. **Proxy-Hosts erstellen:**
* Für jeden Dienst (z. B. openwebui, nextcloud) gehen Sie zu Hosts → Proxy-Hosts → Proxy-Host hinzufügen.
* Geben Sie den Domainnamen ein (z. B. openwebui.hello.duckdns.org).
* Stellen Sie das Schema auf HTTP (Standard), aktivieren Sie ``Websockets-Support`` und richten Sie Ihre Docker-IP ein (wenn Docker mit open-webui auf demselben Computer wie der NGINX-Manager läuft, ist dies dieselbe IP wie zuvor (Beispiel: ``192.168.0.6``).
* Wählen Sie das zuvor generierte SSL-Zertifikat aus, erzwingen Sie SSL und aktivieren Sie HTTP/2.
6. **Fügen Sie Ihre URL zu open-webui hinzu (sonst gibt es HTTPS-Fehler):**

* Gehen Sie zu Ihrem open-webui → Admin-Panel → Einstellungen → Allgemein
* Geben Sie im Textfeld **Webhook-URL** Ihre URL ein, über die Sie über den Nginx-Reverse-Proxy eine Verbindung zu Ihrem open-webui herstellen. Beispiel: ``hello.duckdns.org`` (nicht unbedingt notwendig mit diesem) oder ``openwebui.hello.duckdns.org`` (essentiell mit diesem).

#### Zugriff auf das WebUI:

Greifen Sie über HTTPS auf Open WebUI zu, entweder unter ``hello.duckdns.org`` oder ``openwebui.hello.duckdns.org`` (je nachdem, wie Sie es eingerichtet haben).

###### Hinweis zur Firewall: Beachten Sie, dass lokale Firewall-Software (wie Portmaster) möglicherweise den internen Docker-Netzwerkverkehr oder erforderliche Ports blockiert. Wenn Probleme auftreten, überprüfen Sie Ihre Firewall-Regeln, um sicherzustellen, dass die notwendige Kommunikation für diese Konfiguration ermöglicht wird.
