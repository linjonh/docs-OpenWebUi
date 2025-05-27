### Nginx Proxy Manager

Nginx Proxy Manager (NPM) te permite gestionar fácilmente proxies inversos y proteger tus aplicaciones locales, como Open WebUI, con certificados SSL válidos de Lets Encrypt.
Esta configuración habilita el acceso HTTPS, que es necesario para utilizar funciones de entrada por voz en muchos navegadores móviles debido a sus requisitos de seguridad, sin exponer directamente el puerto específico de la aplicación a internet.

#### Requisitos previos

- Un servidor doméstico que ejecute Docker y el contenedor de open-webui en funcionamiento.
- Un nombre de dominio (opciones gratuitas como DuckDNS o opciones de pago como Namecheap/GoDaddy).
- Conocimiento básico de configuración de Docker y DNS.

#### Pasos

1. **Crear directorios para archivos de Nginx:**

    ```bash
    mkdir ~/nginx_config
    cd ~/nginx_config
    ```

2. **Configurar Nginx Proxy Manager con Docker:**

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

Ejecuta el contenedor:
```bash
docker-compose up -d
```
3. **Configurar DNS y dominio:**

    * Inicia sesión en tu proveedor de dominio (por ejemplo, DuckDNS) y crea un dominio.
    * Asigna el dominio a la IP local de tu proxy (por ejemplo, 192.168.0.6).
    * Si usas DuckDNS, obtén un token API desde su panel de control.

###### Aquí hay un ejemplo simple de cómo se hace en https://www.duckdns.org/domains :

4. **Configurar los certificados SSL:**
* Accede a Nginx Proxy Manager en http://server_ip:81. Por ejemplo: ``192.168.0.6:81``
* Inicia sesión con las credenciales predeterminadas (admin@example.com / changeme). Cambia las credenciales según se solicite.
* Ve a SSL Certificates → Add SSL Certificate → Lets Encrypt.
* Ingresa tu correo electrónico y el nombre de dominio que obtuviste de DuckDNS. Un nombre de dominio contiene un asterisco y otro no. Ejemplo: ``*.hello.duckdns.org`` y ``hello.duckdns.org``.
* Selecciona Usar un desafío DNS, elige DuckDNS y pega tu token API. Ejemplo: 
```dns_duckdns_token=f4e2a1b9-c78d-e593-b0d7-67f2e1c9a5b8```
* Acepta los términos de Let’s Encrypt y guarda. Cambia el tiempo de propagación **si es necesario** (120 segundos).

5. **Crear Hosts de Proxy:**
* Para cada servicio (por ejemplo, openwebui, nextcloud), ve a Hosts → Proxy Hosts → Add Proxy Host.
* Completa el nombre de dominio (por ejemplo, openwebui.hello.duckdns.org).
* Configura el esquema como HTTP (predeterminado), activa ``Websockets support`` y apunta a tu IP de Docker (si Docker con open-webui está ejecutándose en el mismo ordenador que el administrador de NGINX, esta será la misma IP que antes: ``192.168.0.6``).
* Selecciona el certificado SSL generado anteriormente, forza SSL y activa HTTP/2.
6. **Añade tu URL a open-webui (de lo contrario tendrás un error HTTPS):**

* Ve a tu open-webui → Admin Panel → Settings → General
* En el campo de texto de **Webhook URL**, ingresa tu URL a través de la cual te conectarás a tu open-webui mediante el proxy inverso de Nginx. Ejemplo: ``hello.duckdns.org`` (no esencial en este caso) o ``openwebui.hello.duckdns.org`` (esencial en este caso).

#### Acceder a la WebUI:

Accede a Open WebUI vía HTTPS en ``hello.duckdns.org`` o ``openwebui.hello.duckdns.org`` (según cómo lo hayas configurado).

###### Nota sobre el firewall: Ten en cuenta que el software de firewall local (como Portmaster) podría bloquear el tráfico de la red interna de Docker o los puertos requeridos. Si experimentas problemas, verifica las reglas de tu firewall para asegurarte de que se permita la comunicación necesaria para esta configuración.
