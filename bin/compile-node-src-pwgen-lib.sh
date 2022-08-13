#!/usr/bin/env bash

SCRIPT_SOURCE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "${SCRIPT_SOURCE}/.." || exit 1

if [[ ! -d src/pwgen ]] || [[ ! "$(ls -A src/pwgen)" ]]; then
  echo src/pwgen folder is empty, the submodule cannot be found
  echo try running \"git submodule update --init --recursive\" in the root of the project

  exit 1
fi

cd src/pwgen \
  && docker run --rm \
    -v "$(pwd):/app" -it trzeci/emscripten:sdk-incoming-64bit bash -c '\
      apt-get update \
        && apt-get install automake -y \
        && cd /app \
        && autoconf \
        && emconfigure ./configure \
        && make \
        && mkdir -p out \
        && /emsdk_portable/emscripten/tag-1.38.43/emcc \
          -O1 \
          -s ENVIRONMENT=node \
          -s EXIT_RUNTIME=1 \
          -s EXPORT_NAME="pwgen" \
          -s MODULARIZE=1 \
          pw_phonemes.o \
          pw_rand.o \
          pwgen.o \
          randnum.o \
          sha1.o \
          sha1num.o \
          -o out/pwgen.html \
    '

cd "${SCRIPT_SOURCE}/.." || exit 1

readonly WASM=src/pwgen/out/pwgen.wasm
readonly WASM_LOADER=src/pwgen/out/pwgen.js

readonly DESTINATION=build/lib
mkdir -p $DESTINATION

echo adding $WASM to $WASM_LOADER
sed -i.bak \
  "s#typeof WebAssembly.instantiateStreaming === 'function' \&\&#false \&\& typeof WebAssembly.instantiateStreaming === 'function' \&\&#g" \
  "$WASM_LOADER" \
  && rm -f "$WASM_LOADER.bak"

echo moving $WASM to $DESTINATION
mv $WASM $DESTINATION

echo minifying $WASM_LOADER
npx terser $WASM_LOADER -o $WASM_LOADER

echo moving $WASM_LOADER to $DESTINATION
mv $WASM_LOADER $DESTINATION
