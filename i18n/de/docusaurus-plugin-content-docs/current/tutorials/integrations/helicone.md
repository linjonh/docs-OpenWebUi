---
title: "🕵🏻‍♀️ Überwachen Sie Ihre LLM-Anfragen mit Helicone"
sidebar_position: 19
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie Sie Open WebUI für Ihren speziellen Anwendungsfall anpassen können. Möchten Sie beitragen? Sehen Sie sich das Beitragstutorial an.
:::

# Helicone-Integration mit Open WebUI

Helicone ist eine Open-Source-LLM-Beobachtungsplattform, die Entwicklern ermöglicht, produktionsreife Anwendungen, einschließlich Ihrer Open WebUI-Bereitstellung, zu überwachen, zu debuggen und zu verbessern.

Durch die Aktivierung von Helicone können Sie LLM-Anfragen protokollieren, Aufforderungen bewerten und experimentieren sowie sofortige Einblicke erhalten, die Ihnen helfen, Änderungen sicher in die Produktion zu bringen.

- **Echtzeitüberwachung mit konsolidierter Ansicht über Modelltypen hinweg**: Überwachen Sie sowohl lokale Ollama-Modelle als auch Cloud-APIs über eine einzige Schnittstelle
- **Visualisierung und Wiederholung von Anfragen**: Sehen Sie genau, welche Eingabeaufforderungen an jedes Modell in Open WebUI gesendet wurden, und bewerten Sie die von den LLMs generierten Ausgaben
- **Leistungsverfolgung von lokalen LLMs**: Messen Sie die Antwortzeiten und den Durchsatz Ihrer selbst gehosteten Modelle
- **Nutzungsanalysen nach Modell**: Vergleichen Sie Nutzungsmuster zwischen verschiedenen Modellen in Ihrer Open WebUI-Konfiguration
- **Nutzeranalysen**, um Interaktionsmuster zu verstehen
- **Debugging-Funktionen**, um Probleme mit Modellantworten zu beheben
- **Kostenverfolgung** für Ihre LLM-Nutzung bei verschiedenen Anbietern


## Wie man Helicone mit OpenWebUI integriert

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/8iVHOkUrpSA?si=Jt1GVqA0wY4UI7sF"
  title="YouTube-Video-Player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>

### Schritt 1: Erstellen Sie ein Helicone-Konto und generieren Sie Ihren API-Schlüssel

Erstellen Sie ein [Helicone-Konto](https://www.helicone.ai/) und loggen Sie sich ein, um einen [API-Schlüssel hier zu generieren](https://us.helicone.ai/settings/api-keys).

*— Stellen Sie sicher, dass Sie einen [nur schreibgeschützten API-Schlüssel](https://docs.helicone.ai/helicone-headers/helicone-auth) generieren. Dies stellt sicher, dass Sie nur das Protokollieren von Daten zu Helicone erlauben, ohne Lesezugriff auf Ihre privaten Daten.*

### Schritt 2: Erstellen Sie ein OpenAI-Konto und generieren Sie Ihren API-Schlüssel

Erstellen Sie ein OpenAI-Konto und melden Sie sich im [OpenAI-Entwicklerportal](https://platform.openai.com/account/api-keys) an, um einen API-Schlüssel zu generieren.

### Schritt 3: Führen Sie Ihre Open WebUI-Anwendung mit der Basis-URL von Helicone aus

Um Ihre erste Open WebUI-Anwendung zu starten, verwenden Sie den Befehl aus den [Open WebUI-Dokumenten](https://docs.openwebui.com/) und fügen Sie die API-Basis-URL von Helicone hinzu, damit Sie automatisch abfragen und überwachen können.

```bash
   # Legen Sie Ihre Umgebungsvariablen fest
   export HELICONE_API_KEY=<Ihr_API_SCHLÜSSEL>
   export OPENAI_API_KEY=<Ihr_OPENAI_API_SCHLÜSSEL>

   # Führen Sie Open WebUI mit Helicone-Integration aus
   docker run -d -p 3000:8080 \
     -e OPENAI_API_BASE_URL="https://oai.helicone.ai/v1/$HELICONE_API_KEY" \
     -e OPENAI_API_KEY="$OPENAI_API_KEY" \
     --name open-webui \
     ghcr.io/open-webui/open-webui
```

Wenn Sie bereits eine Open WebUI-Anwendung bereitgestellt haben, gehen Sie zu `Admin Panel` > `Settings` > `Connections` und klicken Sie auf das `+`-Symbol für „Verwaltung von OpenAI-API-Verbindungen“. Aktualisieren Sie die folgenden Eigenschaften:

- Ihre `API-Basis-URL` wäre ``https://oai.helicone.ai/v1/<Ihr_HELICONE_API_KEY>``
- Der `API-Schlüssel` wäre Ihr OpenAI-API-Schlüssel.

![Open WebUI Helicone Einrichtung](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272273/openwebui-helicone-setup_y4ssca.gif)

### Schritt 4: Stellen Sie sicher, dass das Monitoring funktioniert

Um sicherzustellen, dass Ihre Integration funktioniert, loggen Sie sich ins Dashboard von Helicone ein und überprüfen Sie den Reiter „Requests“.

Sie sollten sehen, dass die Anfragen, die Sie über Ihre Open WebUI-Oberfläche gestellt haben, bereits in Helicone protokolliert werden.

![Beispiel Helicone Trace](https://res.cloudinary.com/dacofvu8m/image/upload/v1745272747/CleanShot_2025-04-21_at_17.57.46_2x_wpkpyf.png)

## Mehr erfahren

Für eine umfassende Anleitung zu Helicone können Sie [die Dokumentation von Helicone hier](https://docs.helicone.ai/getting-started/quick-start) einsehen.
