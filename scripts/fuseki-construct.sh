#!/bin/sh
source scripts/env.sh

FUSEKI_UPDATE=http://$FUSEKI_HOST:3030/bernmobil/update
function sparqlu { curl -H "Accept: text/turtle" --data-urlencode update@$1 $2 ; }

sparqlu sparql/subevents.rq $FUSEKI_UPDATE
sparqlu sparql/didok.rq $FUSEKI_UPDATE
sparqlu sparql/didok-bern.rq $FUSEKI_UPDATE

