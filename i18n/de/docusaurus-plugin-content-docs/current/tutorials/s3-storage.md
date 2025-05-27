---
sidebar_position: 320
title: "🪣 Wechsel zu S3-Speicher"
---

:::warning
Dieses Tutorial ist ein Community-Beitrag und wird nicht vom Open-WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie Open WebUI für Ihren spezifischen Anwendungsfall angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Tutorial zur Mitarbeit an.
:::

# 🪣 Wechsel zu S3-Speicher

Diese Anleitung bietet Anweisungen, wie Sie den standardmäßigen `local` Speicher in der Open WebUI-Konfiguration auf Amazon S3 umstellen können.

## Voraussetzungen

Um diesem Tutorial zu folgen, benötigen Sie Folgendes:

- Ein aktives AWS-Konto
- Ein aktiver AWS-Zugangs- und Geheimschlüssel
- IAM-Berechtigungen in AWS, um Objekte in S3 zu erstellen und hinzuzufügen
- Auf Ihrem System installierter Docker

## Was ist Amazon S3

Direkt von der AWS-Website:

"Amazon S3 ist ein Objektspeicherdienst, der branchenführende Skalierbarkeit, Datenverfügbarkeit, Sicherheit und Leistung bietet. Speichern und schützen Sie beliebige Datenmengen für eine Vielzahl von Anwendungsfällen wie Data Lakes, Websites, Cloud-native Anwendungen, Backups, Archivierung, maschinelles Lernen und Analysen. Amazon S3 ist für 99,999999999 % (11 9's) Haltbarkeit ausgelegt und speichert Daten für Millionen Kunden weltweit."

Mehr über S3 erfahren Sie hier: [Amazon S3 Offizielle Seite](https://aws.amazon.com/s3/)

# Wie man es einrichtet

## 1. Erforderliche Umgebungsvariablen

Um diese Option zu konfigurieren, müssen Sie die folgenden Umgebungsvariablen ermitteln:

| **Open-WebUI-Umgebungsvariable**   | **Beispielwert**                          |
|------------------------------------|--------------------------------------------|
| `S3_ACCESS_KEY_ID`                 | ABC123                                     |
| `S3_SECRET_ACCESS_KEY`             | SuperSecret                                |
| `S3_ENDPOINT_URL`                  | https://s3.us-east-1.amazonaws.com         |
| `S3_REGION_NAME`                   | us-east-1                                  |
| `S3_BUCKET_NAME`                   | mein-toller-bucket-name                    |

- S3_ACCESS_KEY_ID: Dies ist ein Identifikator für den Zugriffsschlüssel Ihres AWS-Kontos. Sie erhalten diesen aus der AWS-Verwaltungskonsole oder über die AWS CLI, wenn Sie einen Zugriffsschlüssel erstellen.
- S3_SECRET_ACCESS_KEY: Dies ist der geheime Teil des AWS-Zugriffsschlüsselpaares. Er wird bei der Erstellung eines Zugriffsschlüssels in AWS bereitgestellt und sollte sicher gespeichert werden.
- S3_ENDPOINT_URL: Diese URL verweist auf Ihren S3-Dienstendpunkt und kann normalerweise in der AWS-Dokumentation oder Kontoeinstellungen gefunden werden.
- S3_REGION_NAME: Dies ist die AWS-Region, in der sich Ihr S3-Bucket befindet, wie „us-east-1“. Sie können dies in der AWS-Verwaltungskonsole unter den Details Ihres S3-Buckets identifizieren.
- S3_BUCKET_NAME: Dies ist der eindeutige Name Ihres S3-Buckets, den Sie bei der Erstellung des Buckets in AWS angegeben haben.

Eine vollständige Liste der verfügbaren S3-Endpunkt-URLs finden Sie hier: [Amazon S3 Reguläre Endpunkte](https://docs.aws.amazon.com/general/latest/gr/s3.html)

Siehe alle Konfigurationsoptionen für `Cloud Storage` hier: [Open-WebUI Cloud Storage Config](https://docs.openwebui.com/getting-started/env-configuration#cloud-storage)

## 2. Open-WebUI ausführen

Bevor wir unsere Instanz von Open-WebUI starten, gibt es eine letzte Umgebungsvariable namens `STORAGE_PROVIDER`, die wir festlegen müssen. Diese Variable teilt Open-WebUI mit, welchen Anbieter Sie verwenden möchten. Standardmäßig ist `STORAGE_PROVIDER` leer, was bedeutet, dass Open-WebUI den lokalen Speicher verwendet.

| **Speicheranbieter** | **Typ**  | **Beschreibung**                                                               | **Standard** |
|----------------------|----------|--------------------------------------------------------------------------------|-------------|
| `local`              | str      | Standardmäßig lokaler Speicher, wenn eine leere Zeichenfolge (`''`) bereitgestellt wird | Ja          |
| `s3`                 | str      | Verwendet die S3-Client-Bibliothek und die in Amazon S3 Storage erwähnten Umgebungsvariablen | Nein        |
| `gcs`                | str      | Verwendet die GCS-Client-Bibliothek und die in Google Cloud Storage erwähnten Umgebungsvariablen | Nein        |

Um Amazon S3 zu verwenden, müssen wir `STORAGE_PROVIDER` auf "S3" setzen sowie alle in Schritt 1 gesammelten Umgebungsvariablen (`S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT_URL`, `S3_REGION_NAME`, `S3_BUCKET_NAME`) bereitstellen.

Hier setze ich auch die `ENV`-Variable auf "dev", damit wir die Open-WebUI-Swagger-Dokumentation sehen und weiter testen können, ob das S3-Speicher-Setup wie erwartet funktioniert.

```sh
docker run -d \
  -p 3000:8080 \
  -v open-webui:/app/backend/data \
  -e STORAGE_PROVIDER="s3" \
  -e S3_ACCESS_KEY_ID="ABC123" \
  -e S3_SECRET_ACCESS_KEY="SuperSecret" \
  -e S3_ENDPOINT_URL="https://s3.us-east-1.amazonaws.com" \
  -e S3_REGION_NAME="us-east-1" \
  -e S3_BUCKET_NAME="mein-toller-bucket-name" \
  -e ENV="dev" \
  --name open-webui \
  ghcr.io/open-webui/open-webui:main
```

## 3. Testen der Einrichtung

Da Open-WebUI jetzt läuft, lassen Sie uns eine einfache `Hello, World`-Textdatei hochladen und unsere Einrichtung testen.

![Datei in Open-WebUI hochladen](/images/tutorials/amazon-s3/amazon-s3-upload-file.png)

Und bestätigen, dass wir eine Antwort vom ausgewählten LLM erhalten.

![Antwort in Open-WebUI erhalten](/images/tutorials/amazon-s3/amazon-s3-oui-response.png)

Großartig! Es sieht so aus, als ob alles wie erwartet in Open-WebUI funktioniert. Lassen Sie uns jetzt überprüfen, ob die Textdatei tatsächlich hochgeladen und im angegebenen S3-Bucket gespeichert wurde. Mit der AWS Management Console können wir sehen, dass sich jetzt eine Datei im S3-Bucket befindet. Zusätzlich zum Namen der hochgeladenen Datei (`hello.txt`) können Sie sehen, dass der Name des Objekts mit einer eindeutigen ID versehen wurde. Dies ist die Methode, mit der Open-WebUI alle hochgeladenen Dateien verfolgt.

![Antwort in Open-WebUI erhalten](/images/tutorials/amazon-s3/amazon-s3-object-in-bucket.png)

Mit den Swagger-Dokumenten von Open-WebUI können wir alle Informationen zu dieser Datei über den Endpunkt `/api/v1/files/{id}` abrufen, indem wir die eindeutige ID (4405fabb-603e-4919-972b-2b39d6ad7f5b) übergeben.

![Datei nach ID inspizieren](/images/tutorials/amazon-s3/amazon-s3-get-file-by-id.png)
