#!/bin/sh
curl -n \
     -X PUT \
     -H Content-Type:application/n-triples \
     -T target/incidents-clean.nt \
     -G https://test.lindas-data.ch:8443/lindas \
     --data-urlencode graph=https://linked.opendata.swiss/graph/bernmobil/incidents



     