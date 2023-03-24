# data-structure-extraction
Extraktion einer Datenstruktur eines bestehenden GraphQL Backends basierend auf den Abfragen und Mutationen vom GraphQL Frontend

<br>

## Voraussetzungen
- git
- Node.js

<br>

## Installation
- Klone das Repository von GitHub
```
git clone https://github.com/Bananandi/data-structure-extraction.git
```
- Öffne in diesem Repo eine git Konsole und wechsle in den develop branch
```
git checkout develop
```

<br>

## Server starten
- Wechsle im Repo in den Ordner backend
- Installiere alle nötigen Module
```
npm install
```
- Starte den Server
```
node server.js
```
- Der Server hört nun an http://localhost:4000/
- Im Browser kann nun durch Aufrufen der subfolder graphql die GraphiQL-Website aufgerufen werden, also http://localhost:4000/graphql

<br>

## Extraktionsscript starten
- Wechsle im Repo in den Ordner extraction-script
- Installiere alle nötigen Module
```
npm install
```
- Damit das Extraktionsscript etwas extrahieren kann muss der Server auf Port 4000 laufen
- Starte das Script mit Node.js
```
node data-structure-extraction.js
```
- Die extrahierten Informationen werden in die Konsole geschrieben 