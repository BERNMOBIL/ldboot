#!/bin/sh
tdbdump --loc target/tdb_bernmobil | sed '\#example.org#d' | rapper -i nquads -o ntriples  - http://example.org/base/ | gzip --stdout > target/everything.nt.gz