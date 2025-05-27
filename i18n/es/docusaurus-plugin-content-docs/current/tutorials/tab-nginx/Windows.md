### Uso de un certificado autofirmado y Nginx en Windows sin Docker

Para instalaciones internas/de desarrollo básicas, puede usar nginx y un certificado autofirmado para hacer proxy de Open WebUI a https, permitiendo el uso de funciones como entrada de micrófono a través de LAN. (Por defecto, la mayoría de los navegadores no permitirán la entrada de micrófono en URLs inseguras que no sean localhost)

Esta guía asume que instaló Open WebUI usando pip y que está ejecutando `open-webui serve`

#### Paso 1: Instalación de openssl para la generación de certificados

Primero, deberá instalar openssl

Puede descargar e instalar binarios precompilados desde el sitio web de [Shining Light Productions (SLP)](https://slproweb.com/).

Alternativamente, si tiene instalado [Chocolatey](https://chocolatey.org/), puede usarlo para instalar OpenSSL rápidamente:

1. Abra un símbolo del sistema o PowerShell.
2. Ejecute el siguiente comando para instalar OpenSSL:
   ```bash
   choco install openssl -y
   ```

---

### **Verificar la instalación**
Después de la instalación, abra un símbolo del sistema y escriba:
```bash
openssl version
```
Si muestra la versión de OpenSSL (por ejemplo, `OpenSSL 3.x.x ...`), entonces está instalado correctamente.

#### Paso 2: Instalación de nginx

Descargue la versión oficial de Nginx para Windows desde [nginx.org](https://nginx.org) o use un gestor de paquetes como Chocolatey.
 Extraiga el archivo ZIP descargado a un directorio (por ejemplo, C:\nginx).

#### Paso 3: Generar certificado

Ejecute el siguiente comando:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt
```

Mueva los archivos nginx.key y nginx.crt generados a una carpeta de su elección, o al directorio C:\nginx

#### Paso 4: Configurar nginx

Abra C:\nginx\conf\nginx.conf en un editor de texto

Si desea que Open WebUI sea accesible a través de su LAN local, asegúrese de anotar su dirección IP de LAN utilizando `ipconfig`, por ejemplo, 192.168.1.15

Configúrelo de la siguiente manera:

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

    # necesario para manejar adecuadamente websockets (streaming)
    map $http_upgrade $connection_upgrade {
        default upgrade;
              close;
    }

    # Redirigir todo el tráfico HTTP a HTTPS
    server {
        listen 80;
        server_name 192.168.1.15;

        return 301 https://$host$request_uri;
    }

    # Manejar tráfico HTTPS
    server {
        listen 443 ssl;
        server_name 192.168.1.15;

        # Configuraciones SSL (asegúrese de que las rutas sean correctas)
        ssl_certificate C:\\nginx\\nginx.crt;
        ssl_certificate_key C:\\nginx\\nginx.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
        ssl_prefer_server_ciphers on;

        # OCSP Stapling
        #ssl_stapling on;
        #ssl_stapling_verify on;

        # Configuración de proxy a su servicio local
        location / {
            # proxy_pass debe apuntar a su versión local en ejecución de open-webui
            proxy_pass http://localhost:8080;

            # Agregar soporte para WebSocket (Necesario para la versión 0.5.0 en adelante)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # (Opcional) Deshabilitar el almacenamiento en búfer del proxy para una mejor respuesta en streaming desde los modelos
            proxy_buffering off;

            # (Opcional) Aumentar el tamaño máximo de solicitud para archivos adjuntos grandes y mensajes de audio largos
            client_max_body_size 20M;
            proxy_read_timeout 10m;
        }
    }

}
```

Guarde el archivo y compruebe que la configuración no tiene errores o problemas de sintaxis ejecutando `nginx -t`. Puede que necesite ejecutar `cd C:\nginx` primero dependiendo de cómo lo haya instalado

Ejecute nginx ejecutando `nginx`. Si ya hay un servicio nginx iniciado, puede recargar la nueva configuración ejecutando `nginx -s reload`

---

Ahora debería poder acceder a Open WebUI en https://192.168.1.15 (o su propia dirección IP LAN según corresponda). Asegúrese de permitir el acceso al firewall de Windows según sea necesario.
