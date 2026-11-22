# Grow with Jonny

Privates Grow-Tagebuch als installierbare Web-App (PWA) fürs iPhone.
Alle Daten und Fotos liegen lokal auf dem Gerät (IndexedDB). Backups über Einstellungen → Backup exportieren.

**Installation:** Seite in Safari öffnen → Teilen → „Zum Home-Bildschirm“.

## Bedienung

- **Heute:** fällige Aufgaben, Gartenzusammenfassung und die drei letzten Einträge.
- **Garten:** durchsuchbare Pflanzenliste oder Zeltübersicht; abgeschlossene Pflanzen im Archiv.
- **Plus:** häufige Einträge direkt, zusätzliche Aktionen unter „Weitere Aktionen“. Einträge aus einer Pflanze oder einem Zelt übernehmen diesen Kontext.
- **Kalender:** Einträge und Erinnerungen nach Datum.
- **Einstellungen:** Cloud-Sync, Nährstoff-Mixe, Backups und Installation.

Die Struktur orientiert sich am gemeinsamen Garten für Pflanzen und Umgebungen sowie an Tagebuch und Erinnerungen aus der [offiziellen Grow-with-Jane-Beschreibung](https://apps.apple.com/us/app/grow-with-jane-grow-journal/id1467850558). Verglichen wurden die öffentlich dokumentierten Funktionen, keine angemeldete App-Sitzung. Jonny konzentriert die Startseite auf den Alltag und bündelt die Verwaltung im Garten.

## Funktionsprüfung

Mit installiertem Playwright und Chromium: `node checks/usability.cjs`.
Die Prüfung verwendet ausschließlich lokale Testdaten und blockiert externe Anfragen. Sie prüft Einstieg, Suche, kontextbezogene Aktionen, Speichern/Neuladen und Layoutbreiten von 390 und 1280 Pixeln.
