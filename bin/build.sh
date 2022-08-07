#!/usr/bin/env bash

SCRIPT_SOURCE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "${SCRIPT_SOURCE}/.." || exit 1

npm run clean:package \
  && mkdirp build \
  && ncp ./src/lib ./build/lib \
  && npm run build:src:browser \
  && npm run build:src:node \
  && tsc --declaration true --inlineSources false --sourceMap false \
  && ncp ./build/lib/pwgen.wasm ./dist/lib/pwgen.wasm \
  && rimraf ./build
