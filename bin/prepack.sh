#!/usr/bin/env bash

SCRIPT_SOURCE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "${SCRIPT_SOURCE}/.." || exit 1

sed -i.bak 's@^dist@#dist@g' ./.gitignore \
  && rimraf ./.gitignore.bak \
  && npm run build
