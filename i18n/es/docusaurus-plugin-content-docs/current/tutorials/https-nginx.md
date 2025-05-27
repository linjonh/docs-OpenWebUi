---
sidebar_position: 200
title: "🔒 HTTPS usando Nginx"
---

:::warning
Este tutorial es una contribución de la comunidad y no está respaldado por el equipo de Open WebUI. Solo sirve como una demostración de cómo personalizar Open WebUI para su caso de uso específico. ¿Quieres contribuir? Revisa el tutorial de contribución.
:::

# HTTPS usando Nginx

Asegurar una comunicación segura entre tus usuarios y Open WebUI es primordial. HTTPS (Protocolo seguro de transferencia de hipertexto) cifra los datos transmitidos, protegiéndolos de espías e intervenciones. Configurando Nginx como proxy inverso, puedes agregar HTTPS de manera sencilla a tu implementación de Open WebUI, mejorando tanto la seguridad como la confianza.

Esta guía proporciona tres métodos para configurar HTTPS:

- **Certificados autofirmados**: Ideal para desarrollo y uso interno, utilizando Docker.
- **Lets Encrypt**: Perfecto para entornos de producción que requieren certificados SSL confiables, utilizando Docker.
- **Windows+Autofirmados**: Instrucciones simplificadas para desarrollo y uso interno en Windows, no se requiere Docker.

Elige el método que mejor se adapte a tus necesidades de implementación.


import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import NginxProxyManager from "./tab-nginx/NginxProxyManager.md";
import SelfSigned from "./tab-nginx/SelfSigned.md";
import LetsEncrypt from "./tab-nginx/LetsEncrypt.md";
import Windows from "./tab-nginx/Windows.md";

<Tabs>
  <TabItem value="NginxProxyManager" label="Nginx Proxy Manager">
    <NginxProxyManager />
  </TabItem>
  <TabItem value="letsencrypt" label="Lets Encrypt">
    <LetsEncrypt />
  </TabItem>
  <TabItem value="selfsigned" label="Certificados autofirmados">
    <SelfSigned />
  </TabItem>
  <TabItem value="windows" label="Windows">
    <Windows />
  </TabItem>
</Tabs>


## Próximos pasos

Después de configurar HTTPS, accede a Open WebUI de forma segura en:

- [https://localhost](https://localhost)

Asegúrate de que los registros DNS estén configurados correctamente si estás usando un nombre de dominio. Para entornos de producción, se recomienda usar Lets Encrypt para certificados SSL confiables.

---
