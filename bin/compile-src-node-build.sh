#!/usr/bin/env bash

readonly SCRIPT_SOURCE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${SCRIPT_SOURCE}/.. || exit 1

if [[ ! -d src ]] || [[ ! "$(ls -A src)" ]]; then
  echo src folder is empty, the submodule cannot be found
  echo try running \"git submodule update --init --recursive\" in the root of the project

  exit 1
fi

cd src && \
  docker run --rm \
    -v $(pwd):/app -it trzeci/emscripten:sdk-incoming-64bit bash -c \
    'apt-get update && \
      apt-get install automake -y && \
      cd /app && \
      autoconf && \
      emconfigure ./configure && \
      make && \
      mkdir -p out && \
      /emsdk_portable/emscripten/tag-1.38.43/emcc pwgen.o pw_phonemes.o pw_rand.o randnum.o sha1.o sha1num.o -s ENVIRONMENT=node -s MODULARIZE=1 -s EXIT_RUNTIME=1 -s EXPORT_NAME="pwgen" -o out/pwgen.html'

cd .. || exit 1

readonly WASM=src/out/pwgen.wasm
readonly WASM_LOADER=src/out/pwgen.js

readonly DESTINATION=lib/

echo moving $WASM to $DESTINATION
mv $WASM $DESTINATION

echo moving $WASM_LOADER to $DESTINATION
mv $WASM_LOADER $DESTINATION
