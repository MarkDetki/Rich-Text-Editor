# Installation

1. Zip Ordner dist.zip aus Ilias [herunterladen](https://ilias.hs-heilbronn.de/ilias.php?baseClass=ilexercisehandlergui&cmdNode=c5:n3:bv:bu&cmdClass=ilExSubmissionFileGUI&cmd=submissionScreen&ref_id=881186&ass_id=32662) 

   https://ilias.hs-heilbronn.de/ilias.php?baseClass=ilexercisehandlergui&cmdNode=c5:n3:bv:bu&cmdClass=ilExSubmissionFileGUI&cmd=submissionScreen&ref_id=881186&ass_id=32662

2. Zip-Datei in den Root des geklonten Repositories entpacken

    ```
    .
    └── zettelstore-richt-text-editor/
        ├── dist
        ├── server.py
        ├── requirements.txt
        └── ...
    ```

3. Python Requirements installieren

    ```bash
    pip install -r requirements.txt
    ```
   
4. Python Webserver starten

    ```bash
   python server.py
   ```
   
5. Webseite im Browser öffnen

   http://127.0.0.1:8080


# Zettelstore Rich Text Editor

## Kurzbeschreibung

Die Gruppe 12 erstellt ab dem 09.10.2024 bis zum 08.01.2025 einen Rich Text Editor, welcher mit der Zettelstore API Zettel bearbeitet, erstellt oder löscht. Es soll einem Benutzer erleichtert werden Zettelmarkup zu schreiben, indem eine UI bereitgestellt wird. Das Projekt ist als Ein-Benutzer-System konzipiert und wird im Rahmen der Vorlesung [Softwaretechnik und mobile Systeme (282130)](https://ilias.hs-heilbronn.de/ilias.php?baseClass=ilrepositorygui&ref_id=34104) an der Hochschule Heilbronn durchgeführt.

## Ziele

Der Benutzer soll in der Lage sein Zettel intuitiv und ohne tiefere technische Kenntnisse zu erstellen und zu bearbeiten.

## Personal- und Zeitaufwand

Für das Projekt steht ein Team von 7 Entwicklern zur Verfügung, die über einen Zeitraum von 13 Wochen an der Umsetzung arbeiten.

## Kostenschätzung

Die Entwickler erhalten kein Gehalt und benutzen ihre persönliche Hardware und Software. Gitlab wird von der Hochschule Heilbronn bereitgestellt. Eventuell anfallende Softwarekosten für Lizenzen oder Tools werden durch die Hochschule Heilbronn getragen.

## Meilensteine und Endtermin

1. **16.10.2024**: Projektstart und Anforderungsanalyse abgeschlossen.
2. **30.11.2024**: Fertigstellung der UI-Designs und des Grundgerüsts des RTE.
3. **15.12.2024**: Abschluss der API-Integration und Implementierung der erweiterten Funktionen.
4. **05.01.2025**: Abschluss der Testphase und Fehlerbehebung.
5. **08.01.2025**: Projektabnahme und Enddokumentation.

## Risikoreflexion

**Technische Risiken**: Schwierigkeiten bei der Integration der Zettelstore API könnten zu Verzögerungen führen. Notwendige Maßnahmen sind die frühzeitige Absprache mit den API-Entwicklern und die Durchführung von API-Tests.

**Zeitliche Risiken**: Engpässe könnten bei der Implementierung der erweiterten Funktionen entstehen. Ein Puffer von einer Woche ist eingeplant, um unvorhergesehene Probleme abzufangen.

**Benutzerakzeptanz**: Eine wenig intuitive Benutzeroberfläche könnte die Akzeptanz des Systems beeinträchtigen. Regelmäßige Usability-Tests sollen dieses Risiko minimieren.

## Unterschriften

Mark Detki

Mahdi Akbari

Moritz Schneider

Jonas Göhner

Kerem Yildiz

Mert Altinyaldiz

Hannes Link

### Links

[Issues](https://gitlab.win.hs-heilbronn.de/halink/zettelstore-richt-text-editor/-/issues)

[Nicht-Anforderungen](https://gitlab.win.hs-heilbronn.de/halink/zettelstore-richt-text-editor/-/wikis/Nicht-Anforderungen)

[Glossar](https://gitlab.win.hs-heilbronn.de/halink/zettelstore-richt-text-editor/-/wikis/Glossar)