# BERNMOBIL

 * Störungsmeldungen
    - Github oder opendata.swiss
    - Haltestellen DIDOK via Textmatch
    - Linien über OSM/Shapes
    - Evt. optional Kategorien ableiten daraus

* SAP
    - Siehe Grafiken
    - REST API, we will see

* Fixmystreet: open311.org
   - http://www.semantic-web-journal.net/system/files/swj915.pdf
   - Mapit software, http://mapit.poplus.org/

* SPARQL
    - LINDAS, public & ev. privater Graph
    - ld.bernmobil.ch
    - CNAME auf kosh.zazuko.com

* Github Repo bei Bernmobil
    - CI bei Zazuko
    - User erstellen

## TODO

vocab.resc.info/incident

- generische Timestamps leiten von sem:timestamp ab
- könnte man schön zeigen mit reasoning auf timeline
- alles was ein event ist sem:Event respektive subclass
- Unterevents sind subEventsOf 


### Fragen

- wohin gehört ex:endmeldung?
- haben wir Metadaten zu allen Linien?
    - Shapes
    - Beschreibung
    - Farben
    - Etc