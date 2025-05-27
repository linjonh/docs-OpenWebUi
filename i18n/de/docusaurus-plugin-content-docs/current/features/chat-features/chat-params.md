---
sidebar_position: 4
title: "⚙️ Chat-Parameter"
---

Innerhalb von Open WebUI gibt es drei Ebenen zur Einstellung eines **Systemprompts** und **erweiterter Parameter**: pro Chat, pro Modell und pro Konto. Dieses hierarchische System ermöglicht Flexibilität und gewährleistet gleichzeitig eine strukturierte Verwaltung und Kontrolle.

## Systemprompt- und Hierarchiediagramm der erweiterten Parameter

| **Ebene** | **Definition** | **Änderungsberechtigungen** | **Überschreibungsmöglichkeiten** |
| --- | --- | --- | --- |
| **Pro Chat** | Systemprompt und erweiterte Parameter für eine bestimmte Chat-Instanz | Benutzer können sie ändern, jedoch keine modelspezifischen Einstellungen überschreiben | Keine Überschreibung von modelspezifischen Einstellungen erlaubt |
| **Pro Konto** | Standard-Systemprompt und erweiterte Parameter für ein bestimmtes Benutzerkonto | Benutzer können festlegen, aber durch modelspezifische Einstellungen überschrieben werden | Benutzereinstellungen können durch modelspezifische Einstellungen überschrieben werden |
| **Pro Modell** | Standard-Systemprompt und erweiterte Parameter für ein bestimmtes Modell | Administratoren können einstellen, Benutzer dürfen nicht ändern | Admin-spezifische Einstellungen haben Vorrang, Benutzereinstellungen können überschrieben werden |

### 1. **Pro Chat:**

- **Beschreibung**: Die pro-Chat-Einstellung bezieht sich auf den Systemprompt und erweiterte Parameter, die für eine bestimmte Chat-Instanz konfiguriert sind. Diese Einstellungen gelten nur für die aktuelle Unterhaltung und beeinflussen keine zukünftigen Chats.
- **Wie einzustellen**: Benutzer können den Systemprompt und die erweiterten Parameter für eine bestimmte Chat-Instanz im Abschnitt **Chat-Steuerung** in der rechten Seitenleiste von Open WebUI ändern.
- **Überschreibungsmöglichkeiten**: Benutzer dürfen den **Systemprompt** oder bestimmte **erweiterte Parameter**, die bereits von einem Administrator auf einer Modellbasis (**#2**) eingestellt wurden, nicht überschreiben. Dies gewährleistet Konsistenz und die Einhaltung von modelspezifischen Einstellungen.

<details>
<summary>Beispielanwendung</summary>
:::tip **Pro Chat:**
Angenommen, ein Benutzer möchte einen benutzerdefinierten Systemprompt für eine bestimmte Unterhaltung festlegen. Dies kann durch Zugriff auf den Abschnitt **Chat-Steuerung** und Änderung des **Systemprompt**-Feldes erfolgen. Diese Änderungen gelten nur für die aktuelle Chat-Sitzung.
:::
</details>

### 2. **Pro Konto:**

- **Beschreibung**: Die pro-Konto-Einstellung bezieht sich auf den Standard-Systemprompt und die erweiterten Parameter, die für ein bestimmtes Benutzerkonto konfiguriert sind. Benutzerdefinierte Änderungen dienen als Fallback, wenn niedrigere Ebeneinstellungen nicht definiert sind.
- **Wie einzustellen**: Benutzer können ihren eigenen Systemprompt und erweiterte Parameter für ihr Konto im Abschnitt **Allgemein** des **Einstellungen**-Menüs in Open WebUI anpassen.
- **Überschreibungsmöglichkeiten**: Benutzer können ihren eigenen Systemprompt für ihr Konto festlegen, müssen jedoch beachten, dass diese Parameter überschrieben werden können, wenn ein Administrator bereits den **Systemprompt** oder bestimmte **erweiterte Parameter** auf einer Modellbasis für das verwendete Modell festgelegt hat.

<details>
<summary>Beispielanwendung</summary>
:::tip **Pro Konto:**
Angenommen, ein Benutzer möchte seinen eigenen Systemprompt für sein Konto festlegen. Dies kann durch Zugriff auf das **Einstellungen**-Menü und Änderung des **Systemprompt**-Feldes erfolgen.
:::
</details>

### 3. **Pro Modell:**

- **Beschreibung**: Die pro-Modell-Einstellung bezieht sich auf den Standard-Systemprompt und erweiterte Parameter, die für ein bestimmtes Modell konfiguriert sind. Diese Einstellungen gelten für alle Chat-Instanzen, die dieses Modell verwenden.
- **Wie einzustellen**: Administratoren können den Standard-Systemprompt und erweiterte Parameter für ein bestimmtes Modell im Abschnitt **Modelle** des **Arbeitsbereichs** in Open WebUI festlegen.
- **Überschreibungsmöglichkeiten**: **Benutzerkonten** dürfen den **Systemprompt** oder bestimmte **erweiterte Parameter** auf einer Modellbasis (**#3**) nicht ändern. Diese Einschränkung verhindert unangemessene Änderungen der Standardeinstellungen durch Benutzer.
- **Kontextlängenerhalt:** Wenn ein **Systemprompt** oder spezifische **erweiterte Parameter** eines Modells manuell im Bereich **Arbeitsbereich** von einem Admin festgelegt werden, können diese **Systemprompts** oder manuell festgelegten **erweiterten Parameter** weder im Abschnitt **Allgemein** der Einstellungen noch im Abschnitt **Chat-Steuerung** von einem **Benutzerkonto** überschrieben oder angepasst werden. Dies stellt Konsistenz sicher und verhindert übermäßiges Neuladen des Modells, wenn sich die Kontextlängeneinstellung eines Benutzers ändert.
- **Modellpriorität:** Wenn ein **Systemprompt** oder spezifische **erweiterte Parameter** eines Modells im Arbeitsbereichsabschnitt von einem Admin vorab festgelegt werden, werden alle Änderungen der Kontextlänge, die von einem **Benutzerkonto** im Abschnitt **Allgemein** der Einstellungen oder **Chat-Steuerung** vorgenommen werden, ignoriert, wobei der vorgegebene Wert für dieses Modell beibehalten wird. Es sei darauf hingewiesen, dass Parameter, die von einem **Admin-Konto** unberührt bleiben, weiterhin manuell von einem **Benutzerkonto** auf pro-Konto- oder pro-Chat-Basis angepasst werden können.

<details>
<summary>Beispielanwendung</summary>
:::tip **Pro-Modell-Basis**:
Angenommen, ein Administrator möchte eine Standard-Systemaufforderung für ein bestimmtes Modell festlegen. Dies kann er tun, indem er den Abschnitt **Modelle** aufruft und das Feld **Systemaufforderung** für das entsprechende Modell ändert. Alle Chat-Instanzen, die dieses Modell verwenden, nutzen automatisch die Systemaufforderung und erweiterten Parameter des Modells.
:::
</details>


## **Optimieren Sie die Systemaufforderungseinstellungen für maximale Flexibilität**

:::tip **Zusätzliche Tipps**
**Dieser Tipp gilt sowohl für Administratoren als auch für Benutzerkonten. Um maximale Flexibilität mit Ihren Systemaufforderungen zu erzielen, empfehlen wir folgende Einrichtung:**

- Weisen Sie Ihre primäre Systemaufforderung (**d. h. um einem LLM eine definierende Charakteristik zu geben**) im Feld **Systemaufforderung** in den **Allgemeinen** Einstellungen zu. Dies legt sie auf Kontoebene fest und ermöglicht es, dass sie als Systemaufforderung für alle Ihre LLMs funktioniert, ohne dass Anpassungen innerhalb eines Modells im Abschnitt **Arbeitsbereich** erforderlich sind.

- Für Ihre sekundäre Systemaufforderung (**d. h. um einem LLM eine bestimmte Aufgabe zu geben**), wählen Sie, ob Sie sie im Feld **Systemaufforderung** in der **Chat-Steuerung**-Seitenleiste (auf Chat-Ebene) oder im Abschnitt **Modelle** des Abschnitts **Arbeitsbereich** (auf Modellbasis) für Administratoren platzieren möchten, sodass Sie sie direkt einstellen können. Dies ermöglicht, dass Ihre auf Kontoebene festgelegte Systemaufforderung in Kombination mit der auf Chat-Ebene festgelegten Systemaufforderung durch **Chat-Steuerung** oder der auf Modellen basierenden Systemaufforderung durch **Modelle** funktioniert.

- Als Administrator sollten Sie Ihre LLM-Parameter auf Modellbasis mit dem Abschnitt **Modelle** zuweisen, um optimale Flexibilität zu gewährleisten. Stellen Sie sicher, dass beide dieser sekundären Systemaufforderungen so eingestellt werden, dass eine maximale Flexibilität erreicht und der Anpassungsaufwand in verschiedenen Konten- oder Chat-Instanzen minimiert wird. Es ist wichtig, dass sowohl Ihr Admin-Konto als auch alle Benutzerkonten die Prioritätenreihenfolge verstehen, nach der Systemaufforderungen in der **Chat-Steuerung** und im Abschnitt **Modelle** auf das **LLM** angewendet werden.
:::
