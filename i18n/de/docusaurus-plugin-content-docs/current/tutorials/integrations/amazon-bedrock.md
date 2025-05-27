---
sidebar_position: 31
title: "🛌 Integration mit Amazon Bedrock"
---

:::warning
Dieses Tutorial ist ein Beitrag aus der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration, wie Open WebUI für Ihre spezifische Verwendung angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Beitragstutorial an.
:::

---

# Integration von Open-WebUI mit Amazon Bedrock

In diesem Tutorial werden wir einen der häufigsten und beliebtesten Ansätze zur Integration von Open-WebUI mit Amazon Bedrock untersuchen.

## Voraussetzungen


Um diesem Tutorial folgen zu können, benötigen Sie Folgendes:

- Ein aktives AWS-Konto
- Einen aktiven AWS Access Key und Secret Key
- IAM-Berechtigungen in AWS, um Bedrock-Modelle zu aktivieren oder bereits aktivierte Modelle
- Docker auf Ihrem System installiert


## Was ist Amazon Bedrock

Direkt von der AWS-Website:

"Amazon Bedrock ist ein vollständig verwalteter Service, der eine Auswahl an leistungsstarken Basismodellen (FMs) von führenden KI-Unternehmen wie AI21 Labs, Anthropic, Cohere, Luma, Meta, Mistral AI, poolside (demnächst verfügbar), Stability AI und Amazon über eine einzige API anbietet, zusammen mit einem umfassenden Satz von Funktionen, die Sie benötigen, um generative KI-Anwendungen mit Sicherheit, Datenschutz und verantwortungsvoller KI zu entwickeln. Mit Amazon Bedrock können Sie einfach experimentieren und führende FMs für Ihren Anwendungsfall evaluieren, sie privat mit Ihren Daten anpassen, z.B. durch Feintuning und Retrieval Augmented Generation (RAG), und Agenten entwickeln, die Aufgaben mit Ihren Enterprise-Systemen und Datenquellen ausführen. Da Amazon Bedrock serverlos ist, müssen Sie keine Infrastruktur verwalten und können generative KI-Funktionen sicher in Ihre Anwendungen integrieren und bereitstellen, indem Sie die Ihnen bereits bekannten AWS-Dienste verwenden."

Um mehr über Bedrock zu erfahren, besuchen Sie: [Amazon Bedrocks Offizielle Seite](https://aws.amazon.com/bedrock/)

# Integrationsschritte

## Schritt 1: Zugriff auf Amazon Bedrock-Basismodelle überprüfen

Bevor wir mit Bedrock integrieren können, müssen Sie zunächst überprüfen, ob Sie Zugriff auf mindestens ein, vorzugsweise mehrere der verfügbaren Basismodelle haben. Zum Zeitpunkt dieses Schreibens (Februar 2025) waren 47 Basismodelle verfügbar. Im unten stehenden Screenshot können Sie sehen, dass ich Zugriff auf mehrere Modelle habe. Sie wissen, ob Sie Zugriff auf ein Modell haben, wenn daneben "✅ Zugriff gewährt" steht. Wenn Sie keinen Zugriff auf Modelle haben, erhalten Sie im nächsten Schritt einen Fehler.

AWS bietet hier eine gute Dokumentation zum Anfordern / Aktivieren dieser Modelle: [Amazon Bedrocks Dokumentation zur Modellfreigabe](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html)

![Amazon Bedrock-Basismodelle](/images/tutorials/amazon-bedrock/amazon-bedrock-base-models.png)


## Schritt 2: Bedrock Access Gateway konfigurieren

Da wir jetzt Zugriff auf mindestens ein Bedrock-Basismodell haben, müssen wir das Bedrock Access Gateway oder BAG konfigurieren. Sie können das BAG als eine Art Proxy oder Middleware betrachten, die von AWS entwickelt wurde, um AWS-native Endpunkte/SDKs für Bedrock einzubinden und wiederum Endpunkte bereitzustellen, die mit dem Schema von OpenAI kompatibel sind, welches von Open-WebUI benötigt wird.

Hier ist zur Referenz eine einfache Zuordnung zwischen den Endpunkten:

| OpenAI-Endpunkt       | Bedrock-Methode        |
|-----------------------|------------------------|
| `/models`               | list_inference_profiles    |
| `/models/{model_id}`    | list_inference_profiles    |
| `/chat/completions`     | converse oder converse_stream    |
| `/embeddings`           | invoke_model           |

Das BAG-Repository finden Sie hier: [Bedrock Access Gateway Repository](https://github.com/aws-samples/bedrock-access-gateway)

Um das BAG einzurichten, folgen Sie den unten stehenden Schritten:
- Klonen Sie das BAG-Repository
- Entfernen Sie die Standard-`dockerfile`
- Ändern Sie den Namen der `Dockerfile_ecs` in `Dockerfile`

Wir sind jetzt bereit, den Docker-Container zu erstellen und zu starten:

```bash
docker build . -f Dockerfile -t bedrock-gateway

docker run -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN -e AWS_REGION=us-east-1 -d -p 8000:80 bedrock-gateway
```

Sie sollten nun die Swagger-Seite des BAG unter: http://localhost:8000/docs erreichen können

![Bedrock Access Gateway Swagger](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-api.png)

## Schritt 3: Verbindung in Open-WebUI hinzufügen

Da Sie jetzt das BAG am Laufen haben, ist es an der Zeit, es als neue Verbindung in Open-WebUI hinzuzufügen.

- Gehen Sie unter dem Admin-Panel zu Einstellungen -> Verbindungen.
- Verwenden Sie die "+" (Plus)-Schaltfläche, um unter OpenAI eine neue Verbindung hinzuzufügen
- Für die URL verwenden Sie "http://host.docker.internal:8000/api/v1"
- Für das Passwort ist das Standardpasswort, das im BAG definiert ist, "bedrock". Sie können dieses Passwort jederzeit in den BAG-Einstellungen ändern (siehe DEFAULT_API_KEYS)
- Klicken Sie auf die Schaltfläche "Verbindung überprüfen" und Sie sollten eine Benachrichtigung "Serververbindung überprüft" in der oberen rechten Ecke sehen
- Fertigstellung

![Neue Verbindung hinzufügen](/images/tutorials/amazon-bedrock/amazon-bedrock-proxy-connection.png)

## Schritt 4: Beginnen Sie mit der Verwendung von Bedrock-Basismodellen

Sie sollten jetzt alle Ihre Bedrock-Modelle sehen können!

![Bedrock-Modelle verwenden](/images/tutorials/amazon-bedrock/amazon-bedrock-models-in-oui.png)

## Andere hilfreiche Tutorials

Das sind ein paar andere sehr hilfreiche Tutorials, wenn Sie Open-WebUI mit Amazon Bedrock integrieren möchten.

- https://gauravve.medium.com/connecting-open-webui-to-aws-bedrock-a1f0082c8cb2
- https://jrpospos.blog/posts/2024/08/using-amazon-bedrock-with-openwebui-when-working-with-sensitive-data/
