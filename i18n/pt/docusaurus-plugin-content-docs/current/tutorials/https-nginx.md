---
sidebar_position: 200
title: "🔒 HTTPS usando Nginx"
---

:::warning
Este tutorial é uma contribuição da comunidade e não é suportado pela equipe do Open WebUI. Ele serve apenas como uma demonstração de como customizar o Open WebUI para seu caso de uso específico. Quer contribuir? Confira o tutorial de contribuição.
:::

# HTTPS usando Nginx

Garantir uma comunicação segura entre seus usuários e o Open WebUI é fundamental. O HTTPS (HyperText Transfer Protocol Secure) criptografa os dados transmitidos, protegendo-os contra espionagem e adulteração. Ao configurar o Nginx como proxy reverso, você pode adicionar HTTPS à sua implantação do Open WebUI, melhorando tanto a segurança quanto a confiabilidade.

Este guia fornece três métodos para configurar o HTTPS:

- **Certificados Autofirmados**: Ideal para desenvolvimento e uso interno, utilizando docker.
- **Lets Encrypt**: Perfeito para ambientes de produção que exigem certificados SSL confiáveis, utilizando docker.
- **Windows+Autofirmado**: Instruções simplificadas para desenvolvimento e uso interno no Windows, sem necessidade de docker.

Escolha o método que melhor atenda às suas necessidades de implantação.


import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import NginxProxyManager from "./tab-nginx/NginxProxyManager.md";
import SelfSigned from "./tab-nginx/SelfSigned.md";
import LetsEncrypt from "./tab-nginx/LetsEncrypt.md";
import Windows from "./tab-nginx/Windows.md";

<Tabs>
  <TabItem value="NginxProxyManager" label="Gerenciador de Proxy Nginx">
    <NginxProxyManager />
  </TabItem>
  <TabItem value="letsencrypt" label="Lets Encrypt">
    <LetsEncrypt />
  </TabItem>
  <TabItem value="selfsigned" label="Autofirmado">
    <SelfSigned />
  </TabItem>
  <TabItem value="windows" label="Windows">
    <Windows />
  </TabItem>
</Tabs>


## Próximos Passos

Após configurar o HTTPS, acesse o Open WebUI com segurança em:

- [https://localhost](https://localhost)

Certifique-se de que seus registros DNS estão corretamente configurados se você estiver usando um nome de domínio. Para ambientes de produção, é recomendado usar o Lets Encrypt para obter certificados SSL confiáveis.

---
