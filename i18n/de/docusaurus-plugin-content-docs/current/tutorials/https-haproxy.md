---
sidebar_position: 201
title: "🔒 HTTPS mit HAProxy"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Tutorial zum Beitragen an.
:::

# HAProxy-Konfiguration für Open WebUI

HAProxy (High Availability Proxy) ist eine spezialisierte Load-Balancing- und Reverse-Proxy-Lösung, die hochgradig konfigurierbar ist und darauf ausgelegt ist, große Mengen von Verbindungen mit relativ geringem Ressourcenverbrauch zu bewältigen. Weitere Informationen finden Sie hier: https://www.haproxy.org/

## HAProxy und Let's Encrypt installieren

Installieren Sie zuerst HAProxy und das certbot von Let's Encrypt:
### Redhat-Derivate
```sudo dnf install haproxy certbot openssl -y```
### Debian-Derivate
```sudo apt install haproxy certbot openssl -y```

## Grundlagen der HAProxy-Konfiguration

Die Konfiguration von HAProxy wird standardmäßig in ```/etc/haproxy/haproxy.cfg``` gespeichert. Diese Datei enthält alle Konfigurationsanweisungen, die bestimmen, wie HAProxy funktioniert.

Die Basiskonfiguration für HAProxy in Verbindung mit Open WebUI ist ziemlich einfach.

```
 #---------------------------------------------------------------------
# Globale Einstellungen
#---------------------------------------------------------------------
global
    # Damit diese Nachrichten in /var/log/haproxy.log landen, müssen Sie:
    #
    # 1) Die Protokollierung (syslog) so konfigurieren, dass Netzwerk-Logereignisse akzeptiert werden. Dies geschieht
    #    durch Hinzufügen der Option -r zu SYSLOGD_OPTIONS in
    #    /etc/sysconfig/syslog
    #
    # 2) Konfigurieren Sie lokale Ereignisse, um in die Datei /var/log/haproxy.log zu schreiben.
    #   Eine Zeile wie die folgende kann zu /etc/sysconfig/syslog hinzugefügt werden:
    #
    #    local2.*                       /var/log/haproxy.log
    #
    log         127.0.0.1 local2

    chroot      /var/lib/haproxy
    pidfile     /var/run/haproxy.pid
    maxconn     4000
    user        haproxy
    group       haproxy
    daemon
	
	#Passt den dh-Parameter an, falls er zu niedrig ist
    tune.ssl.default-dh-param 2048
#---------------------------------------------------------------------
# allgemeine Standardeinstellungen, die alle listen und backend Abschnitte verwenden,
# falls diese nicht explizit in ihrem Block angegeben sind
#---------------------------------------------------------------------
defaults
    mode                    http
    log                     global
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       #außer 127.0.0.0/8
    option                  redispatch
    retries                 3
    timeout http-request    300s
    timeout queue           2m
    timeout connect         120s
    timeout client          10m
    timeout server          10m
    timeout http-keep-alive 120s
    timeout check           10s
    maxconn                 3000

#http
frontend web
	#Non-SSL
    bind 0.0.0.0:80
	#SSL/TLS
	bind 0.0.0.0:443 ssl crt /path/to/ssl/folder/

    #Let's Encrypt SSL
    acl letsencrypt-acl path_beg /.well-known/acme-challenge/
    use_backend letsencrypt-backend if letsencrypt-acl

	#Subdomain-Methode
    acl chat-acl hdr(host) -i subdomain.domain.tld
    #Pfad-Methode
    acl chat-acl path_beg /owui/
    use_backend owui_chat if chat-acl

#SSL-Anfragen weiterleiten an Let's Encrypt
backend letsencrypt-backend
    server letsencrypt 127.0.0.1:8688
    
#OWUI Chat
backend owui_chat
    # fügt X-FORWARDED-FOR hinzu
    option forwardfor
    # fügt X-CLIENT-IP hinzu
    http-request add-header X-CLIENT-IP %[src]
	http-request set-header X-Forwarded-Proto https if { ssl_fc }
    server chat <ip>:3000
```

Sie werden sehen, dass wir ACL-Einträge (Router) für sowohl Open WebUI als auch Let's Encrypt haben. Um WebSocket mit OWUI zu verwenden, müssen Sie SSL konfiguriert haben, und der einfachste Weg, dies zu tun, ist die Verwendung von Let's Encrypt.

Sie können entweder die Subdomain-Methode oder die Pfad-Methode verwenden, um den Datenverkehr zu Open WebUI zu routen. Die Subdomain-Methode erfordert eine dedizierte Subdomain (z. B. chat.yourdomain.com), während die Pfad-Methode Ihnen ermöglicht, Open WebUI über einen bestimmten Pfad in Ihrer Domain zu erreichen (z. B. yourdomain.com/owui/). Wählen Sie die Methode, die am besten zu Ihren Anforderungen passt und aktualisieren Sie die Konfiguration entsprechend.

:::info
Sie müssen die Ports 80 und 443 für Ihren HAProxy-Server freigeben. Diese Ports werden benötigt, damit Let's Encrypt Ihre Domain validieren kann und für HTTPS-Verkehr. Sie müssen auch sicherstellen, dass Ihre DNS-Einträge ordnungsgemäß konfiguriert sind, um auf Ihren HAProxy-Server zu zeigen. Wenn Sie HAProxy zu Hause betreiben, müssen Sie Portweiterleitung in Ihrem Router verwenden, um die Ports 80 und 443 auf Ihren HAProxy-Server weiterzuleiten.
:::

## SSL-Zertifikate mit Let's Encrypt ausstellen

Bevor Sie HAProxy starten, möchten Sie ein selbstsigniertes Zertifikat erstellen, das als Platzhalter dient, bis Let's Encrypt ein richtiges Zertifikat ausstellt. So erstellen Sie ein selbstsigniertes Zertifikat:

```
openssl req -x509 -newkey rsa:2048 -keyout /tmp/haproxy.key -out /tmp/haproxy.crt -days 3650 -nodes -subj "/CN=localhost"
```

Dann kombinieren Sie den Schlüssel und das Zertifikat zu einer PEM-Datei, die HAProxy verwenden kann:

```cat /tmp/haproxy.crt /tmp/haproxy.key > /etc/haproxy/certs/haproxy.pem```

:::info
Stellen Sie sicher, dass Sie die HAProxy-Konfiguration basierend auf Ihren Anforderungen und Ihrer Konfiguration aktualisieren.
:::

Sobald Sie Ihre HAProxy-Konfiguration eingerichtet haben, können Sie Certbot verwenden, um Ihre SSL-Zertifikate zu erhalten und zu verwalten. Certbot wird den Validierungsprozess mit Lets Encrypt durchführen und Ihre Zertifikate automatisch aktualisieren, wenn sie kurz vor dem Ablauf stehen (vorausgesetzt, Sie verwenden den Certbot Auto-Erneuerungsdienst).

Sie können die HAProxy-Konfiguration validieren, indem Sie `haproxy -c -f /etc/haproxy/haproxy.cfg` ausführen. Wenn keine Fehler auftreten, können Sie HAProxy mit `systemctl start haproxy` starten und mit `systemctl status haproxy` überprüfen, ob es läuft.

Um sicherzustellen, dass HAProxy beim Systemstart startet, verwenden Sie `systemctl enable haproxy`.

Wenn Sie HAProxy konfiguriert haben, können Sie Lets Encrypt verwenden, um Ihr gültiges SSL-Zertifikat auszustellen.
Zuerst müssen Sie sich bei Lets Encrypt registrieren. Dies sollten Sie nur einmal tun:

`certbot register --agree-tos --email your@email.com --non-interactive`

Dann können Sie Ihr Zertifikat anfordern:

```
certbot certonly -n --standalone --preferred-challenges http --http-01-port-8688 -d yourdomain.com
```

Sobald das Zertifikat ausgestellt ist, müssen Sie die Zertifikats- und Private-Key-Dateien zu einer einzelnen PEM-Datei zusammenführen, die HAProxy verwenden kann.

```
cat /etc/letsencrypt/live/{domain}/fullchain.pem /etc/letsencrypt/live/{domain}/privkey.pem > /etc/haproxy/certs/{domain}.pem
chmod 600 /etc/haproxy/certs/{domain}.pem
chown haproxy:haproxy /etc/haproxy/certs/{domain}.pem
```
Sie können dann HAProxy neu starten, um das neue Zertifikat anzuwenden:
`systemctl restart haproxy`

## HAProxy Manager (Einfachere Bereitstellungsoption)

Wenn Sie möchten, dass etwas Ihre HAProxy-Konfiguration und Lets Encrypt SSLs automatisch verwaltet, habe ich ein einfaches Python-Skript geschrieben und ein Docker-Container erstellt, den Sie verwenden können, um Ihre HAProxy-Konfiguration zu erstellen und das Lebenszyklus-Management des Lets Encrypt-Zertifikats zu übernehmen.

https://github.com/shadowdao/haproxy-manager

:::warning
Bitte veröffentlichen Sie Port 8000 nicht öffentlich, falls Sie das Skript oder den Container verwenden!
:::