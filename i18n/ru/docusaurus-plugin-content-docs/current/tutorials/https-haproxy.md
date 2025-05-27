---
sidebar_position: 201
title: "🔒 HTTPS с использованием HAProxy"
---

:::warning
Этот учебник является вкладом сообщества и не поддерживается командой Open WebUI. Он служит только демонстрацией того, как настроить Open WebUI для вашего конкретного сценария использования. Хотите внести свой вклад? Ознакомьтесь с учебником по внесению изменений.
:::

# Конфигурация HAProxy для Open WebUI

HAProxy (High Availability Proxy) — это специализированное решение для балансировки нагрузки и реверс-прокси, которое высоко настроено и предназначено для обработки большого количества соединений с относительно низким уровнем использования ресурсов. Для получения дополнительной информации, пожалуйста, посетите: https://www.haproxy.org/

## Установка HAProxy и Lets Encrypt

Сначала установите HAProxy и certbot от Lets Encrypt:
### Производные Redhat
```sudo dnf install haproxy certbot openssl -y```
### Производные Debian
```sudo apt install haproxy certbot openssl -y```

## Основы конфигурации HAProxy

Конфигурация HAProxy по умолчанию хранится в ```/etc/haproxy/haproxy.cfg```. Этот файл содержит все директивы конфигурации, определяющие, как будет работать HAProxy.

Базовая конфигурация HAProxy для работы с Open WebUI довольно проста. 

```
 #---------------------------------------------------------------------
# Глобальные настройки
#---------------------------------------------------------------------
global
    # чтобы эти сообщения попадали в /var/log/haproxy.log, вам нужно:
    #
    # 1) сконфигурировать syslog для принятия событий сетевого журнала. Это делается
    #    путем добавления опции -r к SYSLOGD_OPTIONS в
    #    /etc/sysconfig/syslog
    #
    # 2) настроить события local2 для записи в файл /var/log/haproxy.log.
    #   Можно добавить строку, подобную следующей, в
    #   /etc/sysconfig/syslog
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
	
	# отрегулируйте dh-param, если он слишком низкий
    tune.ssl.default-dh-param 2048
#---------------------------------------------------------------------
# общие настройки по умолчанию, которые будут использоваться всеми секциями listen и backend,
#  если это не указано в их блоке
#---------------------------------------------------------------------
defaults
    mode                    http
    log                     global
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       # исключая 127.0.0.0/8
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
	# Без SSL
    bind 0.0.0.0:80
	# SSL/TLS
	bind 0.0.0.0:443 ssl crt /path/to/ssl/folder/

    # SSL от Lets Encrypt
    acl letsencrypt-acl path_beg /.well-known/acme-challenge/
    use_backend letsencrypt-backend if letsencrypt-acl

	# Метод субдомена
    acl chat-acl hdr(host) -i subdomain.domain.tld
    # Метод пути
    acl chat-acl path_beg /owui/
    use_backend owui_chat if chat-acl

# Передача SSL запросов Lets Encrypt
backend letsencrypt-backend
    server letsencrypt 127.0.0.1:8688
    
# OWUI Chat
backend owui_chat
    # добавить X-FORWARDED-FOR
    option forwardfor
    # добавить X-CLIENT-IP
    http-request add-header X-CLIENT-IP %[src]
	http-request set-header X-Forwarded-Proto https if { ssl_fc }
    server chat <ip>:3000
```

Вы увидите, что у нас есть записи ACL (маршруты) как для Open WebUI, так и для Lets Encrypt. Чтобы использовать WebSocket с OWUI, необходимо настроить SSL, и самым простым способом сделать это является использование Lets Encrypt.

Вы можете использовать либо метод субдомена, либо метод пути для маршрутизации трафика в Open WebUI. Метод субдомена требует выделенного субдомена (например, chat.yourdomain.com), тогда как метод пути позволяет вам получить доступ к Open WebUI через определённый путь на вашем домене (например, yourdomain.com/owui/). Выберите метод, который лучше подходит для ваших нужд, и обновите конфигурацию соответствующим образом.

:::info
Вам потребуется открыть порты 80 и 443 для вашего сервера HAProxy. Эти порты нужны для того, чтобы Lets Encrypt мог проверить ваш домен и для трафика HTTPS. Также необходимо убедиться, что записи DNS правильно настроены на указание сервера HAProxy. Если вы запускаете HAProxy с домашнего компьютера, вам потребуется использовать переадресацию портов в вашем маршрутизаторе, чтобы направить порты 80 и 443 на сервер HAProxy.
:::

## Выпуск SSL сертификатов с помощью Lets Encrypt

Перед запуском HAProxy, вам нужно будет создать самоподписанный сертификат, который будет использоваться в качестве временного решения до тех пор, пока Lets Encrypt не выпустит настоящий сертификат. Вот как это сделать:

```
openssl req -x509 -newkey rsa:2048 -keyout /tmp/haproxy.key -out /tmp/haproxy.crt -days 3650 -nodes -subj "/CN=localhost"
```

Затем объедините ключ и сертификат в PEM-файл, который может использовать HAProxy:

```cat /tmp/haproxy.crt /tmp/haproxy.key > /etc/haproxy/certs/haproxy.pem```

:::info
Обязательно обновите конфигурацию HAProxy в соответствии с вашими потребностями и настройками.
:::

Когда вы настроите конфигурацию HAProxy, вы можете использовать certbot для получения и управления вашими SSL-сертификатами. Certbot будет обрабатывать процесс проверки с Lets Encrypt и автоматически обновлять ваши сертификаты, когда они будут близки к истечению (при условии, что вы используете службу автоматического обновления certbot).

Вы можете проверить конфигурацию HAProxy, запустив `haproxy -c -f /etc/haproxy/haproxy.cfg`. Если ошибок нет, вы можете запустить HAProxy с помощью команды `systemctl start haproxy` и проверить его состояние командой `systemctl status haproxy`.

Чтобы HAProxy запускался вместе с системой, используйте `systemctl enable haproxy`.

Когда HAProxy будет настроен, вы можете использовать Lets Encrypt для выпуска действующего SSL-сертификата.
Сначала вам нужно зарегистрироваться в Lets Encrypt. Вам нужно сделать это только один раз:

`certbot register --agree-tos --email your@email.com --non-interactive`

Затем вы можете запросить сертификат:

```
certbot certonly -n --standalone --preferred-challenges http --http-01-port-8688 -d yourdomain.com
```

После выдачи сертификата вам нужно объединить файл сертификата и закрытого ключа в единый PEM-файл, который сможет использовать HAProxy.

```
cat /etc/letsencrypt/live/{domain}/fullchain.pem /etc/letsencrypt/live/{domain}/privkey.pem > /etc/haproxy/certs/{domain}.pem
chmod 600 /etc/haproxy/certs/{domain}.pem
chown haproxy:haproxy /etc/haproxy/certs/{domain}.pem
```
Затем вы можете перезапустить HAProxy, чтобы применить новый сертификат:
`systemctl restart haproxy`

## Менеджер HAProxy (простой вариант развертывания)

Если вы хотите, чтобы что-то автоматически управляло вашей конфигурацией HAProxy и сертификатами Lets Encrypt, я написал простой скрипт на Python и создал контейнер Docker, который вы можете использовать для создания и управления вашей конфигурацией HAProxy, а также управления жизненным циклом сертификатов Lets Encrypt.

https://github.com/shadowdao/haproxy-manager

:::warning
Пожалуйста, не открывайте порт 8000 для публичного доступа, если вы используете скрипт или контейнер!
:::