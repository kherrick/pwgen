#!/usr/bin/env bash

SCRIPT_SOURCE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "${SCRIPT_SOURCE}/.." || exit 1

sed -i.bak 's@^dist@#dist@g' ./.gitignore \
  && npx rimraf ./.gitignore.bak \
  && npm run build \
  && find dist -type f -iname "*.js" -exec npx terser {} -o {} \;
