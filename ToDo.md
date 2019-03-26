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

- Anlieferung SAP
- Vokabular SAP
- Unterschied
    - ZKDR Kundenreaktionen
    - ZLST -> Leitstellen Tickets (Betriebsereignis)
- Seit April keine neuen Incidents mehr?
- haben wir Metadaten zu allen Linien?
    - Shapes
    - Beschreibung
    - Farben
    - Etc


Term -> Termin -> sem:Event
haltestelle auf didok http://ld.bernmobil.ch/ticket/haltestelle/79896
check ob es bezugsobjekt gibt, wir verweisen drauf mit bm:bezugsobjekt aber kanns nicht auflösen als objekt
gitlab zugang
