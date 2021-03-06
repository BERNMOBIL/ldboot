#!/usr/bin/env bash
set -euo pipefail

echo "Using endpoint: $ENDPOINT"

s3cmd -c config/s3cmd put target/everything.nt.gz "s3://zazuko-staging/ssz-$CI_COMMIT_REF_SLUG.nt.gz"
s3cmd -c config/s3cmd setacl --acl-public "s3://zazuko-staging/ssz-$CI_COMMIT_REF_SLUG.nt.gz"

# Stardog
curl -u $STORE_USER:$STORE_PASSWORD -X POST -w "%{http_code}" -s -o /dev/null --data timeout=1000000  --data-urlencode update="CLEAR GRAPH <https://linked.opendata.swiss/graph/bernmobil/incidents>" "$ENDPOINT/update"
curl -u $STORE_USER:$STORE_PASSWORD -X POST -w "%{http_code}" -s -o /dev/null --data timeout=1000000  --data-urlencode update="LOAD <https://sos-ch-dk-2.exo.io/zazuko-staging/ssz-$CI_COMMIT_REF_SLUG.nt.gz> INTO GRAPH <https://linked.opendata.swiss/graph/bernmobil/incidents>" "$ENDPOINT/update"
COUNT=$(curl -u $STORE_USER:$STORE_PASSWORD -H "Accept: application/sparql-results+json" -X POST -s --data timeout=1000000  --data-urlencode query="SELECT (COUNT(?s) AS ?count) WHERE {  GRAPH <https://linked.opendata.swiss/graph/bernmobil/incidents> {?s ?p ?o}}" "$ENDPOINT/query" | jq '.results.bindings[0].count.value')

echo "Counted ${COUNT} results."

# Cleanup
s3cmd -c config/s3cmd del "s3://zazuko-staging/ssz-$CI_COMMIT_REF_SLUG.nt.gz"
