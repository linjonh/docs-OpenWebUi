---
sidebar_position: 11
title: "🖥️ Lokale LLM-Konfiguration mit IPEX-LLM auf Intel-GPU"
---

:::warnung
Dieses Tutorial ist ein Beitrag aus der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie mitwirken? Schauen Sie sich das Tutorial zum Mitwirken an.
:::

:::hinweis
Diese Anleitung wurde mit der Open WebUI-Konfiguration über [Manuelle Installation](/getting-started/index.md) überprüft.
:::

# Lokale LLM-Konfiguration mit IPEX-LLM auf Intel-GPU

:::info
[**IPEX-LLM**](https://github.com/intel-analytics/ipex-llm) ist eine PyTorch-Bibliothek, die das Ausführen von LLM auf Intel CPU und GPU (z. B. lokaler PC mit iGPU, diskrete GPUs wie Arc A-Serie, Flex und Max) mit sehr geringer Latenz ermöglicht.
:::

Dieses Tutorial zeigt, wie man Open WebUI mit **IPEX-LLM beschleunigtem Ollama-Rückendienst, der auf einer Intel-GPU gehostet wird**, einrichtet. Indem Sie dieser Anleitung folgen, können Sie Open WebUI auch auf einem kostengünstigen PC (d. h. nur mit integrierter GPU) mit einem reibungslosen Erlebnis einrichten.

## Ollama-Dienst auf Intel-GPU starten

Sehen Sie sich [diese Anleitung](https://ipex-llm.readthedocs.io/en/latest/doc/LLM/Quickstart/ollama_quickstart.html) aus der offiziellen Dokumentation von IPEX-LLM an, um zu erfahren, wie man Ollama-Dienst installiert und ausführt, beschleunigt durch IPEX-LLM auf Intel-GPU.

:::tipp
Wenn Sie den Ollama-Dienst von einer anderen Maschine aus erreichen möchten, stellen Sie sicher, dass Sie die Umgebungsvariable `OLLAMA_HOST=0.0.0.0` setzen oder exportieren, bevor Sie den Befehl `ollama serve` ausführen.
:::

## Open WebUI konfigurieren

Greifen Sie auf die Ollama-Einstellungen über **Einstellungen -> Verbindungen** im Menü zu. Standardmäßig ist die **Ollama Basis-URL** auf `https://localhost:11434` voreingestellt, wie im unten stehenden Snapshot dargestellt. Um den Status der Ollama-Dienstverbindung zu überprüfen, klicken Sie auf die **Aktualisieren-Schaltfläche** neben dem Textfeld. Wenn WebUI keine Verbindung zu dem Ollama-Server herstellen kann, wird eine Fehlermeldung angezeigt: `WebUI konnte keine Verbindung zu Ollama herstellen`.

![Open WebUI Ollama-Einstellung Fehler](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings_0.png)

Wenn die Verbindung erfolgreich ist, wird eine Nachricht mit dem Text `Dienstverbindung überprüft` angezeigt, wie unten dargestellt.

![Open WebUI Ollama-Einstellung Erfolg](https://llm-assets.readthedocs.io/en/latest/_images/open_webui_settings.png)

:::tipp
Wenn Sie einen Ollama-Server verwenden möchten, der unter einer anderen URL gehostet wird, aktualisieren Sie einfach die **Ollama Basis-URL** auf die neue URL und drücken die **Aktualisieren-Schaltfläche**, um die Verbindung zu Ollama erneut zu bestätigen.
:::
