---
sidebar_position: 40
title: "🔗 Okta OIDC SSO Integration"
---

:::warning
Dieses Tutorial ist ein Beitrag der Community und wird nicht vom Open WebUI-Team unterstützt. Es dient lediglich als Demonstration dafür, wie Open WebUI an spezielle Anwendungsfälle angepasst werden kann. Möchten Sie beitragen? Schauen Sie sich das Tutorial zum Beitrag an.
:::

# 🔗 Okta OIDC SSO Integration

## Übersicht

Diese Dokumentationsseite beschreibt die erforderlichen Schritte, um Okta OIDC Single Sign-On (SSO) mit Open WebUI zu integrieren. Sie umfasst auch die **optionalen** Funktionen zur Verwaltung von Open WebUI-Benutzergruppen basierend auf der Okta-Gruppenmitgliedschaft, einschließlich der **Just-in-Time (JIT) Gruppenanlage**. Durch das Befolgen dieser Schritte können Sie Nutzern ermöglichen, sich mit ihren Okta-Anmeldedaten bei Open WebUI anzumelden. Aktivieren Sie die Gruppensynchronisierung (`ENABLE_OAUTH_GROUP_MANAGEMENT`), werden Benutzer automatisch den entsprechenden Gruppen in Open WebUI basierend auf ihren Okta-Gruppen bei der Anmeldung zugewiesen. Aktivieren Sie *zusätzlich* die JIT-Gruppenanlage (`ENABLE_OAUTH_GROUP_CREATION`), werden Gruppen, die in Okta-Ansprüchen vorhanden sind, aber in Open WebUI fehlen, während der Anmeldung automatisch erstellt.

### Voraussetzungen

* Eine neue oder bestehende Open WebUI-Instanz.
* Ein Okta-Konto mit administrativen Berechtigungen zur Erstellung und Konfiguration von Anwendungen.
* Grundlegendes Verständnis von OIDC, Okta-Anwendungskonfiguration und Open WebUI-Umgebungsvariablen.

## Okta einrichten

Zuerst müssen Sie eine OIDC-Anwendung in Ihrer Okta-Organisation konfigurieren und einen Gruppenanspruch einrichten, um Gruppeninformationen an Open WebUI weiterzugeben.

### 1. OIDC-Anwendung in Okta erstellen/konfigurieren

1. Melden Sie sich in Ihrer Okta-Administrationskonsole an.
2. Navigieren Sie zu **Anwendungen > Anwendungen**.
3. Erstellen Sie entweder eine neue **OIDC - OpenID Connect**-Anwendung (wählen Sie **Web-Anwendung** als Typ) oder wählen Sie eine bestehende aus, die Sie für Open WebUI nutzen möchten.
4. Konfigurieren Sie während der Einrichtung oder in der Registerkarte **Allgemein** der Anwendung die **Sign-in Redirect URIs**. Fügen Sie die URI Ihrer Open WebUI-Instanz hinzu, gefolgt von `/oauth/oidc/callback`. Beispiel: `https://your-open-webui.com/oauth/oidc/callback`.
5. Notieren Sie sich die **Client-ID** und das **Client-Geheimnis**, die in der Registerkarte **Allgemein** der Anwendung bereitgestellt werden. Sie benötigen diese für die Konfiguration von Open WebUI.
6. Stellen Sie sicher, dass die korrekten Benutzer oder Gruppen dieser Anwendung unter der Registerkarte **Zuweisungen** zugewiesen sind.

### 2. Hinzufügen eines Gruppenanspruchs zum ID-Token

**(Optional)** Um die automatische Gruppenverwaltung in Open WebUI basierend auf Okta-Gruppen zu aktivieren, müssen Sie Okta so konfigurieren, dass die Gruppenmitgliedschaften des Benutzers im ID-Token gesendet werden. Wenn Sie nur die SSO-Anmeldung benötigen und Gruppen lieber manuell in Open WebUI verwalten möchten, können Sie diesen Abschnitt überspringen.

1. Gehen Sie in der Administrationskonsole zu **Anwendungen > Anwendungen** und wählen Sie Ihre OIDC-Client-Anwendung aus.
2. Gehen Sie zur Registerkarte **Anmeldung** und klicken Sie auf **Bearbeiten** im Abschnitt **OpenID Connect ID Token**.
3. Wählen Sie im Abschnitt **Gruppenanspruch Typ** die Option **Filter**.
4. Im Abschnitt **Gruppenanspruchsfilter**:
    * Geben Sie `groups` als Anspruchsname ein (oder verwenden Sie den Standard, falls vorhanden).
    * Wählen Sie **Regulärer Ausdruck passt** aus der Dropdown-Liste.
    * Geben Sie `.*` im Regex-Feld ein. Dies umfasst alle Gruppen, denen der Benutzer angehört. Sie können bei Bedarf einen spezifischeren Regex verwenden.
5. Klicken Sie auf **Speichern**.
6. Klicken Sie auf den Link **Zurück zu Anwendungen**.
7. Wählen Sie im Dropdown-Menü **Mehr** für Ihre Anwendung die Option **Anwendungsdaten aktualisieren**.

*Für fortgeschrittenere Konfigurationen von Gruppenansprüchen konsultieren Sie die Okta-Dokumentation zu [Anpassen von Tokens](https://developer.okta.com/docs/guides/customize-tokens-returned-from-okta/main/) und [Gruppenfunktionen](https://developer.okta.com/docs/reference/okta-expression-language/#group-functions).*

## Open WebUI konfigurieren

Um Okta OIDC SSO in Open WebUI zu aktivieren, müssen Sie die folgenden zentralen Umgebungsvariablen festlegen. Zusätzliche Variablen sind erforderlich, wenn Sie die optionale Gruppenverwaltungsfunktion aktivieren möchten.

```bash
# --- OIDC-Kerneinstellungen ---
# Aktivieren Sie die OAuth-Anmeldung, wenn Benutzer Konten über Okta erstellen sollen
# ENABLE_OAUTH_SIGNUP="true"

# Die Client-ID Ihrer Okta-Anwendung
OAUTH_CLIENT_ID="YOUR_OKTA_CLIENT_ID"

# Das Client-Geheimnis Ihrer Okta-Anwendung
OAUTH_CLIENT_SECRET="YOUR_OKTA_CLIENT_SECRET"

# Die OIDC-Discovery-URL Ihrer Okta-Organisation
# Format: https://<your-okta-domain>/.well-known/openid-configuration
# Oder für einen spezifischen Autorisierungsserver: https://<your-okta-domain>/oauth2/<auth-server-id>/.well-known/openid-configuration
OPENID_PROVIDER_URL="YOUR_OKTA_OIDC_DISCOVERY_URL"

# Name, der auf der Login-Schaltfläche angezeigt wird (z.B. "Mit Okta anmelden")
OAUTH_PROVIDER_NAME="Okta"

# Abzufragende Bereiche (standardmäßig normalerweise ausreichend)
# OAUTH_SCOPES="openid email profile groups" # Stellen Sie sicher, dass groups enthalten ist, wenn nicht standardmäßig

# --- OAuth-Gruppenverwaltung (Optional) ---
# Setzen Sie auf "true", wenn Sie den Gruppenanspruch in Okta konfiguriert haben (Schritt 2)
# und möchten, dass Open WebUI-Gruppen beim Login basierend auf Okta-Gruppen verwaltet werden.
# Dies synchronisiert bestehende Gruppen. Benutzer werden zu Open WebUI-Gruppen hinzugefügt/entfernt
# um ihre Okta-Gruppenansprüche zu erfüllen.
# ENABLE_OAUTH_GROUP_MANAGEMENT="true"

# Nur erforderlich, wenn ENABLE_OAUTH_GROUP_MANAGEMENT aktiviert ist.
# Der Anspruchsname im ID-Token, der Gruppeninformationen enthält (muss mit der Okta-Konfiguration übereinstimmen)
# OAUTH_GROUP_CLAIM="groups"

# Optional: Aktivieren Sie die Just-in-Time (JIT)-Erstellung von Gruppen, wenn sie in Okta-Ansprüchen vorhanden sind, jedoch nicht in Open WebUI.
# Erfordert ENABLE_OAUTH_GROUP_MANAGEMENT="true".
# Wenn auf false (Standard) gesetzt, werden nur bestehende Gruppen synchronisiert.
# ENABLE_OAUTH_GROUP_CREATION="false"
```

Ersetzen Sie `YOUR_OKTA_CLIENT_ID`, `YOUR_OKTA_CLIENT_SECRET` und `YOUR_OKTA_OIDC_DISCOVERY_URL` durch die tatsächlichen Werte aus Ihrer Okta-Anwendungskonfiguration.

Um die Gruppensynchronisation basierend auf Okta-Ansprüchen zu aktivieren, setzen Sie `ENABLE_OAUTH_GROUP_MANAGEMENT="true"` und stellen Sie sicher, dass `OAUTH_GROUP_CLAIM` mit dem in Okta konfigurierten Anspruchsnamen übereinstimmt (Standard ist `groups`).

Um *auch* die automatische Just-in-Time (JIT)-Erstellung von Gruppen zu aktivieren, die in Okta existieren, aber noch nicht in Open WebUI, setzen Sie `ENABLE_OAUTH_GROUP_CREATION="true"`. Sie können dies auf `false` lassen, wenn Sie nur die Mitgliedschaften für bereits in Open WebUI vorhandene Gruppen verwalten möchten.

:::warning Verwaltung der Gruppenmitgliedschaft
Wenn `ENABLE_OAUTH_GROUP_MANAGEMENT` auf `true` gesetzt ist, werden die Gruppenmitgliedschaften eines Benutzers in Open WebUI **streng synchronisiert** mit den Gruppen, die bei jedem Login in ihren Okta-Ansprüchen erhalten werden. Das bedeutet:
*   Benutzer werden **hinzugefügt** zu Open WebUI-Gruppen, die ihren Okta-Ansprüchen entsprechen.
*   Benutzer werden **entfernt** aus allen Open WebUI-Gruppen (einschließlich solcher, die manuell erstellt oder in Open WebUI zugewiesen wurden), wenn diese Gruppen **nicht** in ihren Okta-Ansprüchen für diese Login-Sitzung vorhanden sind.

Stellen Sie sicher, dass alle erforderlichen Gruppen korrekt in Okta konfiguriert und in den Gruppenanspruch einbezogen sind.
:::

:::info Sitzungsbeständigkeit bei Multi-Node-Deployments

Beim Bereitstellen von Open WebUI über mehrere Knoten hinweg (z. B. in einem Kubernetes-Cluster oder hinter einem Lastverteiler) ist es entscheidend, die Sitzungsbeständigkeit für ein nahtloses Benutzererlebnis, insbesondere mit SSO, sicherzustellen. Setzen Sie die Umgebungsvariable `WEBUI_SECRET_KEY` auf denselben sicheren, eindeutigen Wert auf **allen** Open WebUI-Instanzen.
:::

```bash
# Beispiel: Erstellen Sie einen starken geheimen Schlüssel (z. B. mit openssl rand -hex 32)
WEBUI_SECRET_KEY="YOUR_UNIQUE_AND_SECURE_SECRET_KEY"
```

Wenn dieser Schlüssel nicht auf allen Knoten konsistent ist, könnten Benutzer gezwungen sein, sich erneut einzuloggen, wenn ihre Sitzung zu einem anderen Knoten geleitet wird, da das Sitzungs-Token, das von einem Knoten signiert wurde, auf einem anderen ungültig ist. Standardmäßig generiert das Docker-Image bei der ersten Start eine zufällige Schlüssel, die für Multi-Node-Setups ungeeignet ist.

:::tip Deaktivierung des Standard-Anmeldeformulars

Wenn Sie *nur* Anmeldungen über Okta (und möglicherweise andere konfigurierte OAuth-Anbieter) zulassen möchten, können Sie das Standard-E-Mail/Passwort-Anmeldeformular deaktivieren, indem Sie die folgende Umgebungsvariable setzen:
:::


```bash
ENABLE_LOGIN_FORM="false"
```

:::danger Wichtige Voraussetzung
Das Setzen von `ENABLE_LOGIN_FORM="false"` **erfordert**, dass `ENABLE_OAUTH_SIGNUP="true"` ebenfalls aktiviert ist. Wenn Sie das Anmeldeformular deaktivieren, ohne die OAuth-Anmeldung zu aktivieren, **können sich Benutzer (einschließlich Administratoren) nicht anmelden.** Stellen Sie sicher, dass mindestens ein OAuth-Anbieter konfiguriert ist und `ENABLE_OAUTH_SIGNUP` aktiviert ist, bevor Sie das Standard-Anmeldeformular deaktivieren.
:::

Starten Sie Ihre Open WebUI-Instanz neu, nachdem Sie diese Umgebungsvariablen gesetzt haben.

## Überprüfung

1.  Navigieren Sie zur Anmeldeseite Ihres Open WebUI. Sie sollten eine Schaltfläche mit der Aufschrift "Login mit Okta" (oder was auch immer Sie für `OAUTH_PROVIDER_NAME` festgelegt haben) sehen.
2.  Klicken Sie auf die Schaltfläche und authentifizieren Sie sich durch den Okta-Anmeldeprozess.
3.  Nach erfolgreicher Authentifizierung sollten Sie zurück zu Open WebUI weitergeleitet und angemeldet werden.
4.  Wenn `ENABLE_OAUTH_GROUP_MANAGEMENT` aktiviert ist, melden Sie sich als nicht-administrativer Benutzer an. Ihre Gruppen innerhalb von Open WebUI sollten nun strikt ihre aktuellen Gruppenmitgliedschaften in Okta widerspiegeln (alle Mitgliedschaften in Gruppen, die *nicht* im Okta-Anspruch enthalten sind, werden entfernt). Wenn `ENABLE_OAUTH_GROUP_CREATION` ebenfalls aktiviert ist, sollten Gruppen, die in den Okta-Ansprüchen des Benutzers vorhanden sind, aber zuvor nicht in Open WebUI existierten, jetzt automatisch erstellt worden sein. Beachten Sie, dass die Gruppen von Administratoren nicht automatisch über SSO aktualisiert werden.
5.  Überprüfen Sie die Serverprotokolle von Open WebUI auf OIDC- oder gruppenbezogene Fehler, falls Sie Probleme feststellen.

## Fehlerbehebung

*   **400 Bad Request/Redirect URI Mismatch:** Überprüfen Sie, ob die **Sign-in-Redirect-URI** in Ihrer Okta-Anwendung exakt mit `<your-open-webui-url>/oauth/oidc/callback` übereinstimmt.
*   **Gruppen werden nicht synchronisiert:** Vergewissern Sie sich, dass die Umgebungsvariable `OAUTH_GROUP_CLAIM` mit dem in den Okta-ID-Token-Einstellungen konfigurierten Anspruchsnamen übereinstimmt. Stellen Sie sicher, dass der Benutzer nach Gruppenänderungen sich abgemeldet und erneut angemeldet hat - ein Anmeldevorgang ist erforderlich, um OIDC zu aktualisieren. Erinnern Sie sich daran, dass Administratorgruppen nicht synchronisiert werden.
*   **Konfigurationsfehler:** Überprüfen Sie die Open WebUI-Serverprotokolle auf detaillierte Fehlermeldungen zur OIDC-Konfiguration.
*   Konsultieren Sie die offizielle [Open WebUI SSO-Dokumentation](/features/sso.md).
*   Lesen Sie die [Okta Entwickler-Dokumentation](https://developer.okta.com/docs/).