#!/usr/bin/env bash

readonly SCRIPT_SOURCE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${SCRIPT_SOURCE}/../src || exit 1

sudo rm -rf Makefile config.cache config.log config.status configure pwgen build autom4te.cache *.o a.out* out
