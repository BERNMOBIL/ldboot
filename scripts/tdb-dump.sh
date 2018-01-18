#!/bin/sh
tdbdump --loc target/tdb_bernmobil | sed '\#example.org#d' | serdi -o ntriples - > target/everything.nt