---
sidebar_position: 201
title: "🔒 HTTPS usando HAProxy"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como personalizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

# Configuração do HAProxy para Open WebUI

HAProxy (High Availability Proxy) é uma solução especializada de balanceamento de carga e proxy reverso, altamente configurável e projetada para lidar com grandes quantidades de conexões com um consumo relativamente baixo de recursos. Para mais informações, veja: https://www.haproxy.org/

## Instalar HAProxy e Lets Encrypt

Primeiro, instale o HAProxy e o Certbot do Lets Encrypt:
### Derivados do Redhat
```sudo dnf install haproxy certbot openssl -y```
### Derivados do Debian
```sudo apt install haproxy certbot openssl -y```

## Noções básicas de configuração do HAProxy

Por padrão, a configuração do HAProxy é armazenada em ```/etc/haproxy/haproxy.cfg```. Este arquivo contém todas as diretivas de configuração que determinam como o HAProxy irá operar.

A configuração básica do HAProxy para funcionar com o Open WebUI é bastante simples.

```
#---------------------------------------------------------------------
# Configurações globais
#---------------------------------------------------------------------
global
    # para que essas mensagens apareçam em /var/log/haproxy.log você precisará:
    #
    # 1) Configurar o syslog para aceitar eventos de log de rede. Isso é feito
    #    adicionando a opção -r aos SYSLOGD_OPTIONS em
    #    /etc/sysconfig/syslog
    #
    # 2) Configurar eventos local2 para ir ao arquivo /var/log/haproxy.log.
    #    Uma linha como a seguinte pode ser adicionada em
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
	
	#ajuste o dh-param se estiver muito baixo
    tune.ssl.default-dh-param 2048
#---------------------------------------------------------------------
# padrões comuns que todas as seções listen e backend usarão se não forem designadas em seus blocos
#---------------------------------------------------------------------
defaults
    mode                    http
    log                     global
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       #exceto 127.0.0.0/8
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
	#Não SSL
    bind 0.0.0.0:80
	#SSL/TLS
	bind 0.0.0.0:443 ssl crt /path/to/ssl/folder/

    #SSL do Lets Encrypt
    acl letsencrypt-acl path_beg /.well-known/acme-challenge/
    use_backend letsencrypt-backend if letsencrypt-acl

	#método de subdomínio
    acl chat-acl hdr(host) -i subdomain.domain.tld
    #Método de caminho
    acl chat-acl path_beg /owui/
    use_backend owui_chat if chat-acl

#Passar requisições SSL para o Lets Encrypt
backend letsencrypt-backend
    server letsencrypt 127.0.0.1:8688
    
#OWUI Chat
backend owui_chat
    # adicionar X-FORWARDED-FOR
    option forwardfor
    # adicionar X-CLIENT-IP
    http-request add-header X-CLIENT-IP %[src]
	http-request set-header X-Forwarded-Proto https if { ssl_fc }
    server chat <ip>:3000
```

Você verá que temos registros ACL (roteadores) para ambos Open WebUI e Lets Encrypt. Para usar WebSocket com OWUI, você precisa ter um SSL configurado, e a maneira mais fácil de fazer isso é usar o Lets Encrypt.

Você pode usar o método de subdomínio ou o método de caminho para rotear o tráfego para o Open WebUI. O método de subdomínio requer um subdomínio dedicado (por exemplo, chat.seudominio.com), enquanto o método de caminho permite acessar o Open WebUI por meio de um caminho específico em seu domínio (por exemplo, seudominio.com/owui/). Escolha o método que melhor atender às suas necessidades e atualize a configuração conforme necessário.

:::info
Você precisará expor as portas 80 e 443 ao servidor HAProxy. Essas portas são necessárias para que o Lets Encrypt valide seu domínio e para o tráfego HTTPS. Você também precisará garantir que os registros DNS estejam configurados corretamente para apontar para seu servidor HAProxy. Se estiver executando o HAProxy em casa, será necessário usar redirecionamento de porta no roteador para direcionar as portas 80 e 443 ao servidor HAProxy.
:::

## Emitindo certificados SSL com o Lets Encrypt

Antes de iniciar o HAProxy, você desejará gerar um certificado autoassinado para usar como um marcador temporário até que o Lets Encrypt emita um certificado adequado. Aqui está como gerar um certificado autoassinado:

```
openssl req -x509 -newkey rsa:2048 -keyout /tmp/haproxy.key -out /tmp/haproxy.crt -days 3650 -nodes -subj "/CN=localhost"
```

Em seguida, combine a chave e o certificado em um arquivo PEM que o HAProxy possa usar:

```cat /tmp/haproxy.crt /tmp/haproxy.key > /etc/haproxy/certs/haproxy.pem```

:::info
Certifique-se de atualizar a configuração do HAProxy com base em suas necessidades e configuração.
:::

Depois de configurar o HAProxy, você pode usar o certbot para obter e gerenciar seus certificados SSL. O Certbot lidará com o processo de validação com o Lets Encrypt e atualizará automaticamente seus certificados quando estiverem próximos de expirar (supondo que você use o serviço de renovação automática do certbot).

Você pode validar a configuração do HAProxy executando `haproxy -c -f /etc/haproxy/haproxy.cfg`. Se não houver erros, você pode iniciar o HAProxy com `systemctl start haproxy` e verificar se ele está em execução com `systemctl status haproxy`.

Para garantir que o HAProxy inicie com o sistema, use `systemctl enable haproxy`.

Quando você tiver o HAProxy configurado, poderá usar o Lets Encrypt para emitir seu certificado SSL válido.
Primeiro, você precisará se registrar no Lets Encrypt. Você precisará fazer isso apenas uma vez:

`certbot register --agree-tos --email your@email.com --non-interactive`

Em seguida, você pode solicitar seu certificado:

```
certbot certonly -n --standalone --preferred-challenges http --http-01-port-8688 -d yourdomain.com
```

Depois que o certificado for emitido, você precisará combinar os arquivos do certificado e da chave privada em um único arquivo PEM que o HAProxy possa usar.

```
cat /etc/letsencrypt/live/{domain}/fullchain.pem /etc/letsencrypt/live/{domain}/privkey.pem > /etc/haproxy/certs/{domain}.pem
chmod 600 /etc/haproxy/certs/{domain}.pem
chown haproxy:haproxy /etc/haproxy/certs/{domain}.pem
```
Você pode então reiniciar o HAProxy para aplicar o novo certificado:
`systemctl restart haproxy`

## Gerenciador HAProxy (Opção de Implantação Fácil)

Se você quiser algo para gerenciar sua configuração do HAProxy e os SSLs do Lets Encrypt automaticamente, eu escrevi um script simples em Python e criei um contêiner Docker que você pode usar para criar e gerenciar sua configuração do HAProxy e gerenciar o ciclo de vida do certificado do Lets Encrypt.

https://github.com/shadowdao/haproxy-manager

:::warning
Por favor, não exponha a porta 8000 publicamente se você usar o script ou o contêiner!
:::