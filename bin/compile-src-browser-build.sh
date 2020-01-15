#!/usr/bin/env bash

readonly SCRIPT_SOURCE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${SCRIPT_SOURCE}/../src || exit 1

docker run --rm -v $(pwd):/app -it trzeci/emscripten:sdk-incoming-64bit bash -c 'apt-get update && apt-get install automake -y && cd /app && export LDFLAGS="-Oz" && export CFLAGS="-Oz" && export CXXFLAGS="-Oz" && autoconf && emconfigure ./configure && make && mkdir -p out && /emsdk_portable/emscripten/tag-1.38.43/emcc -Oz --bind pwgen.o pw_phonemes.o pw_rand.o randnum.o sha1.o sha1num.o -s STRICT=1 -s ALLOW_MEMORY_GROWTH=1 -s MALLOC=emmalloc -s ENVIRONMENT=web -s MODULARIZE=1 -s EXPORT_ES6=1 -s EXIT_RUNTIME=1 -s EXPORT_NAME="pwgen" -o out/pwgen.html'

cd .. || exit 1

mv src/out/pwgen.wasm lib/esm/
mv src/out/pwgen.js lib/esm/
