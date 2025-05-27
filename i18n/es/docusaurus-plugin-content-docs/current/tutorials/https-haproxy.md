---
sidebar_position: 201
title: "🔒 HTTPS usando HAProxy"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para tu caso de uso específico. ¿Quieres contribuir? Consulta el tutorial de contribución.
:::

# Configuración de HAProxy para Open WebUI

HAProxy (High Availability Proxy) es una solución especializada de balanceo de carga y proxy inverso que es altamente configurable y está diseñada para manejar grandes cantidades de conexiones con un consumo relativamente bajo de recursos. Para más información, visita: https://www.haproxy.org/

## Instalar HAProxy y Lets Encrypt

Primero, instala HAProxy y el certbot de Lets Encrypt:
### Derivados de Redhat
```sudo dnf install haproxy certbot openssl -y```
### Derivados de Debian
```sudo apt install haproxy certbot openssl -y```

## Conceptos Básicos de Configuración de HAProxy

La configuración de HAProxy está almacenada por defecto en ```/etc/haproxy/haproxy.cfg```. Este archivo contiene todas las directivas de configuración que determinan cómo operará HAProxy.

La configuración base de HAProxy para trabajar con Open WebUI es bastante simple.

```
 #---------------------------------------------------------------------
# Configuración global
#---------------------------------------------------------------------
global
    # para que estos mensajes terminen en /var/log/haproxy.log necesitarás:
    #
    # 1) configurar syslog para aceptar eventos de registro de red. Esto se hace
    #    agregando la opción -r a SYSLOGD_OPTIONS en
    #    /etc/sysconfig/syslog
    #
    # 2) configurar eventos local2 para que vayan al archivo
    #    /var/log/haproxy.log. Una línea como la siguiente puede añadirse a
    #    /etc/sysconfig/syslog
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
	
	#ajustar dh-param si es muy bajo
    tune.ssl.default-dh-param 2048
#---------------------------------------------------------------------
# configuraciones comunes que todas las secciones listen y backend
# usarán si no se designan en su bloque
#---------------------------------------------------------------------
defaults
    mode                    http
    log                     global
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       #except 127.0.0.0/8
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
	#Sin SSL
    bind 0.0.0.0:80
	#SSL/TLS
	bind 0.0.0.0:443 ssl crt /path/to/ssl/folder/

    #SSL de Lets Encrypt
    acl letsencrypt-acl path_beg /.well-known/acme-challenge/
    use_backend letsencrypt-backend if letsencrypt-acl

	#método subdominio
    acl chat-acl hdr(host) -i subdomain.domain.tld
    #Método de ruta
    acl chat-acl path_beg /owui/
    use_backend owui_chat if chat-acl

#Pasa solicitudes SSL a Lets Encrypt
backend letsencrypt-backend
    server letsencrypt 127.0.0.1:8688
    
#OWUI Chat
backend owui_chat
    # añadir X-FORWARDED-FOR
    option forwardfor
    # añadir X-CLIENT-IP
    http-request add-header X-CLIENT-IP %[src]
	http-request set-header X-Forwarded-Proto https if { ssl_fc }
    server chat <ip>:3000
```

Verás que tenemos registros ACL (enrutadores) tanto para Open WebUI como para Lets Encrypt. Para usar WebSocket con OWUI, necesitas tener un SSL configurado, y la forma más fácil de hacerlo es usar Lets Encrypt.

Puedes usar el método de subdominio o el método de ruta para dirigir el tráfico a Open WebUI. El método de subdominio requiere un subdominio dedicado (por ejemplo, chat.tudominio.com), mientras que el método de ruta te permite acceder a Open WebUI a través de una ruta específica en tu dominio (por ejemplo, tudominio.com/owui/). Elige el método que mejor se adapte a tus necesidades y actualiza la configuración en consecuencia.

:::info
Necesitarás exponer los puertos 80 y 443 a tu servidor HAProxy. Estos puertos son necesarios para que Lets Encrypt valide tu dominio y para el tráfico HTTPS. También deberás asegurarte de que tus registros DNS estén configurados correctamente para apuntar a tu servidor HAProxy. Si estás ejecutando HAProxy en casa, necesitarás usar el reenvío de puertos en tu router para reenviar los puertos 80 y 443 a tu servidor HAProxy.
:::

## Emisión de Certificados SSL con Lets Encrypt

Antes de iniciar HAProxy, querrás generar un certificado autofirmado para usar como marcador de posición hasta que Lets Encrypt emita uno adecuado. Aquí te mostramos cómo generar un certificado autofirmado:

```
openssl req -x509 -newkey rsa:2048 -keyout /tmp/haproxy.key -out /tmp/haproxy.crt -days 3650 -nodes -subj "/CN=localhost"
```

Luego combina la clave y el certificado en un archivo PEM que HAProxy pueda usar:

```cat /tmp/haproxy.crt /tmp/haproxy.key > /etc/haproxy/certs/haproxy.pem```

:::info
Asegúrate de actualizar la configuración de HAProxy según tus necesidades y configuración.
:::

Una vez que tengas configurado HAProxy, puedes usar certbot para obtener y administrar tus certificados SSL. Certbot se encargará del proceso de validación con Lets Encrypt y actualizará tus certificados automáticamente cuando estén cerca de vencer (asumiendo que utilices el servicio de renovación automática de certbot).

Puedes validar la configuración de HAProxy ejecutando `haproxy -c -f /etc/haproxy/haproxy.cfg`. Si no hay errores, puedes iniciar HAProxy con `systemctl start haproxy` y verificar que esté funcionando con `systemctl status haproxy`.

Para asegurarte de que HAProxy se inicie con el sistema, ejecuta `systemctl enable haproxy`.

Cuando tengas HAProxy configurado, puedes usar Lets Encrypt para emitir tu certificado SSL válido.
Primero, necesitarás registrarte con Lets Encrypt. Solo deberías necesitar hacerlo una vez:

`certbot register --agree-tos --email your@email.com --non-interactive`

Luego puedes solicitar tu certificado:

```
certbot certonly -n --standalone --preferred-challenges http --http-01-port-8688 -d yourdomain.com
```

Una vez que se haya emitido el certificado, necesitarás combinar los archivos del certificado y de la clave privada en un único archivo PEM que HAProxy pueda utilizar.

```
cat /etc/letsencrypt/live/{domain}/fullchain.pem /etc/letsencrypt/live/{domain}/privkey.pem > /etc/haproxy/certs/{domain}.pem
chmod 600 /etc/haproxy/certs/{domain}.pem
chown haproxy:haproxy /etc/haproxy/certs/{domain}.pem
```
Luego puedes reiniciar HAProxy para aplicar el nuevo certificado:
`systemctl restart haproxy`

## Administrador de HAProxy (Opción de Implementación Fácil)

Si prefieres tener algo que administre automáticamente tu configuración de HAProxy y los SSL de Lets Encrypt, he escrito un script simple en Python y creado un contenedor Docker que puedes usar para crear y administrar tu configuración de HAProxy, así como gestionar el ciclo de vida de los certificados de Lets Encrypt. 

https://github.com/shadowdao/haproxy-manager

:::warning
¡Por favor, no expongas públicamente el puerto 8000 si utilizas el script o el contenedor!
:::