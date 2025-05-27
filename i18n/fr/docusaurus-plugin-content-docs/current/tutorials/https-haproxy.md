---
sidebar_position: 201
title: "🔒 HTTPS avec HAProxy"
---

:::warning
Ce tutoriel est une contribution communautaire et n'est pas pris en charge par l'équipe Open WebUI. Il ne sert qu'à titre de démonstration pour personnaliser Open WebUI en fonction de vos besoins spécifiques. Vous souhaitez contribuer ? Consultez le tutoriel de contribution.
:::

# Configuration HAProxy pour Open WebUI

HAProxy (High Availability Proxy) est une solution spécialisée dans la répartition de charge et le proxy inverse, hautement configurable et conçue pour gérer un grand nombre de connexions avec une empreinte relativement faible en termes de ressources. Pour plus d'informations, veuillez consulter : https://www.haproxy.org/

## Installer HAProxy et Let's Encrypt

Tout d'abord, installez HAProxy et le certbot de Let's Encrypt :
### Derivés de Redhat
```sudo dnf install haproxy certbot openssl -y```
### Derivés de Debian
```sudo apt install haproxy certbot openssl -y```

## Bases de la configuration de HAProxy

La configuration de HAProxy est par défaut enregistrée dans ```/etc/haproxy/haproxy.cfg```. Ce fichier contient toutes les directives de configuration qui déterminent le fonctionnement de HAProxy.

La configuration de base de HAProxy pour fonctionner avec Open WebUI est assez simple.

```
 #---------------------------------------------------------------------
# Paramètres globaux
#---------------------------------------------------------------------
global
    # pour que ces messages se retrouvent dans /var/log/haproxy.log, vous devez :
    #
    # 1) configurer syslog pour accepter les événements de journal réseau. Cela se fait
    #    en ajoutant l'option -r à SYSLOGD_OPTIONS dans
    #    /etc/sysconfig/syslog
    #
    # 2) configurer les événements local2 pour qu'ils aillent dans le fichier /var/log/haproxy.log.
    #   Une ligne comme celle-ci peut être ajoutée dans
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
	
	# ajuster le dh-param si trop faible
    tune.ssl.default-dh-param 2048
#---------------------------------------------------------------------
# paramètres communs que toutes les sections listen et backend utiliseront
# si non spécifié dans leur bloc
#---------------------------------------------------------------------
defaults
    mode                    http
    log                     global
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       # sauf 127.0.0.0/8
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

    # Let's Encrypt SSL
    acl letsencrypt-acl path_beg /.well-known/acme-challenge/
    use_backend letsencrypt-backend if letsencrypt-acl

	# méthode du sous-domaine
    acl chat-acl hdr(host) -i subdomain.domain.tld
    # méthode du chemin
    acl chat-acl path_beg /owui/
    use_backend owui_chat if chat-acl

# rediriger les requêtes SSL vers Let's Encrypt
backend letsencrypt-backend
    server letsencrypt 127.0.0.1:8688
    
#OWUI Chat
backend owui_chat
    # ajouter X-FORWARDED-FOR
    option forwardfor
    # ajouter X-CLIENT-IP
    http-request add-header X-CLIENT-IP %[src]
	http-request set-header X-Forwarded-Proto https if { ssl_fc }
    server chat <ip>:3000
```

Vous verrez que nous avons des enregistrements ACL (routeurs) pour à la fois Open WebUI et Let's Encrypt. Pour utiliser WebSocket avec OWUI, vous devez avoir un SSL configuré, et la manière la plus simple de le faire est d'utiliser Let's Encrypt.

Vous pouvez utiliser soit la méthode du sous-domaine, soit la méthode du chemin pour rediriger le trafic vers Open WebUI. La méthode du sous-domaine nécessite un sous-domaine dédié (par ex., chat.votredomaine.com), tandis que la méthode du chemin vous permet d'accéder à Open WebUI via un chemin spécifique sur votre domaine (par ex., votredomaine.com/owui/). Choisissez la méthode qui convient le mieux à vos besoins et mettez à jour la configuration en conséquence.

:::info
Vous devrez exposer les ports 80 et 443 sur votre serveur HAProxy. Ces ports sont nécessaires pour que Let's Encrypt valide votre domaine et pour le trafic HTTPS. Vous devrez également vous assurer que vos enregistrements DNS sont correctement configurés pour pointer vers votre serveur HAProxy. Si vous exécutez HAProxy chez vous, vous devrez utiliser le transfert de port dans votre routeur pour rediriger les ports 80 et 443 vers votre serveur HAProxy.
:::

## Émission de certificats SSL avec Let's Encrypt

Avant de démarrer HAProxy, vous voudrez générer un certificat auto-signé à utiliser comme substitut jusqu'à ce que Let's Encrypt en émette un propre. Voici comment générer un certificat auto-signé :

```
openssl req -x509 -newkey rsa:2048 -keyout /tmp/haproxy.key -out /tmp/haproxy.crt -days 3650 -nodes -subj "/CN=localhost"
```

Ensuite, combinez la clé et le certificat dans un fichier PEM que HAProxy peut utiliser :

```cat /tmp/haproxy.crt /tmp/haproxy.key > /etc/haproxy/certs/haproxy.pem```

:::info
Assurez-vous de mettre à jour la configuration de HAProxy en fonction de vos besoins et de votre configuration.
:::

Une fois votre configuration HAProxy mise en place, vous pouvez utiliser Certbot pour obtenir et gérer vos certificats SSL. Certbot s'occupera du processus de validation avec Let's Encrypt et mettra automatiquement à jour vos certificats lorsqu'ils approchent de leur expiration (en supposant que vous utilisiez le service de renouvellement automatique de Certbot).

Vous pouvez valider la configuration de HAProxy en exécutant `haproxy -c -f /etc/haproxy/haproxy.cfg`. S'il n'y a pas d'erreurs, vous pouvez démarrer HAProxy avec `systemctl start haproxy` et vérifier qu'il fonctionne avec `systemctl status haproxy`.

Pour garantir que HAProxy démarre avec le système : `systemctl enable haproxy`.

Lorsque vous avez configuré HAProxy, vous pouvez utiliser Let's Encrypt pour obtenir un certificat SSL valide.
Tout d'abord, vous devrez vous inscrire auprès de Let's Encrypt. Vous ne devriez avoir à le faire qu'une seule fois :

`certbot register --agree-tos --email your@email.com --non-interactive`

Ensuite, vous pouvez demander votre certificat :

```
certbot certonly -n --standalone --preferred-challenges http --http-01-port-8688 -d yourdomain.com
```

Une fois le certificat émis, vous devrez fusionner les fichiers de certificat et de clé privée en un seul fichier PEM que HAProxy peut utiliser.

```
cat /etc/letsencrypt/live/{domain}/fullchain.pem /etc/letsencrypt/live/{domain}/privkey.pem > /etc/haproxy/certs/{domain}.pem
chmod 600 /etc/haproxy/certs/{domain}.pem
chown haproxy:haproxy /etc/haproxy/certs/{domain}.pem
```
Vous pouvez ensuite redémarrer HAProxy pour appliquer le nouveau certificat :
`systemctl restart haproxy`

## Gestionnaire HAProxy (Option de déploiement facile)

Si vous souhaitez disposer d'un outil pour gérer la configuration de HAProxy et les certificats SSL Let's Encrypt automatiquement, j'ai écrit un simple script Python et créé un conteneur Docker que vous pouvez utiliser pour créer et gérer votre configuration HAProxy et gérer le cycle de vie des certificats Let's Encrypt.

https://github.com/shadowdao/haproxy-manager

:::warning
Veuillez ne pas exposer le port 8000 publiquement si vous utilisez le script ou le conteneur !
:::