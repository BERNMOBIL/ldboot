#!/bin/sh
source scripts/env.sh
curl -u admin:cinderella --data "dbType=tdb&dbName=bernmobil"  http://$FUSEKI_HOST:3030/$/datasets

curl -X PUT -u admin:cinderella -T target/incidents-clean.nt -G -H "Content-Type: application/n-triples" http://admin:cinderella@$FUSEKI_HOST:3030/bernmobil/data

