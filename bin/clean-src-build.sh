#!/usr/bin/env bash

readonly SCRIPT_SOURCE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${SCRIPT_SOURCE}/.. || exit 1

docker run --rm -v $(pwd):/app -it trzeci/emscripten:sdk-incoming-64bit bash -c 'cd /app/src && rm -rf Makefile config.cache config.log config.status configure pwgen build autom4te.cache *.o a.out* out'
