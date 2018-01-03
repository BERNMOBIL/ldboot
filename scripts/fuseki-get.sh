#!/bin/sh
curl -G -H "Accept: application/n-triples" -o target/incidents-inference.nt http://admin:cinderella@$FUSEKI_HOST:3030/bernmobil/data --data-urlencode graph=http://inference
