#!/usr/bin/env bash

readonly SCRIPT_SOURCE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${SCRIPT_SOURCE}/../src || exit 1

docker run --rm -v $(pwd):/app -it trzeci/emscripten:sdk-incoming-64bit bash -c 'apt-get update && apt-get install automake -y && cd /app && autoconf && emconfigure ./configure && make && mkdir -p out && /emsdk_portable/emscripten/tag-1.38.43/emcc pwgen.o pw_phonemes.o pw_rand.o randnum.o sha1.o sha1num.o -s ENVIRONMENT=node -s MODULARIZE=1 -s EXIT_RUNTIME=1 -s EXPORT_NAME="pwgen" -o out/pwgen.html'

cd .. || exit 1

mv src/out/pwgen.wasm lib/
mv src/out/pwgen.js lib/
