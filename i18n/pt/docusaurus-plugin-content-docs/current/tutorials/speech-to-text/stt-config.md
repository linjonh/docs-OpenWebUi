---
sidebar_position: 1
title: "🗨️ Configuração"
---

A Open Web UI suporta reconhecimento de fala em texto local, no navegador, e remoto.

![texto alternativo](/images/tutorials/stt/image.png)

![texto alternativo](/images/tutorials/stt/stt-providers.png)

## Provedores Remotos / Cloud de Fala em Texto

Os seguintes provedores de fala em texto da nuvem são atualmente suportados. As chaves de API podem ser configuradas como variáveis de ambiente (OpenAI) ou na página de configurações do administrador (ambas as chaves).

 | Serviço  | Chave de API Obrigatória |
 | ------------- | ------------- |
 | OpenAI  | ✅ |
 | DeepGram  | ✅ |

 O WebAPI fornece STT via o provedor embutido de STT no navegador.

## Configurando seu Provedor de STT

Para configurar um provedor de fala em texto:

- Vá para as configurações do administrador  
- Escolha Áudio
- Forneça uma chave de API e escolha um modelo no menu suspenso  

![texto alternativo](/images/tutorials/stt/stt-config.png)

## Configurações no Nível do Usuário

Além das configurações de instância provisionadas no painel de administração, há também algumas configurações no nível do usuário que podem fornecer funcionalidades adicionais.

*   **Configurações de STT:** Contém configurações relacionadas à funcionalidade de Fala em Texto.
*   **Motor de Fala em Texto:** Determina o motor usado para o reconhecimento de fala (Padrão ou Web API).
 

![texto alternativo](/images/tutorials/stt/user-settings.png)

## Usando STT

Fala em texto fornece uma forma altamente eficiente de "escrever" prompts usando sua voz e opera de maneira robusta tanto em dispositivos desktop quanto móveis.

Para usar STT, basta clicar no ícone do microfone:

![texto alternativo](/images/tutorials/stt/stt-operation.png)

Uma forma de onda de áudio ao vivo indicará uma captura de voz bem-sucedida:

![texto alternativo](/images/tutorials/stt/stt-in-progress.png)

## Operação do Modo STT

Uma vez que sua gravação tenha começado, você pode:

- Clicar no ícone de marca para salvar a gravação (se o envio automático após a finalização estiver habilitado, ela será enviada para conclusão; caso contrário, você pode enviar manualmente)
- Se desejar abortar a gravação (por exemplo, deseja iniciar uma nova gravação), você pode clicar no ícone de x para sair da interface de gravação

![texto alternativo](/images/tutorials/stt/endstt.png)
