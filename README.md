<a href="https://kherrick.github.io/pwgen/">pwgen</a>
======

[A password generator](https://github.com/tytso/pwgen/tree/1459a31e07fa208cddb2c4f3f72071503c37b8bc) compiled as Wasm that can be used from the command line, as a module, or custom element.

## Use on the CLI with Mac, Windows, and Linux

### With npx
```bash
npx pwgen -sy 20 1
```

### With npm, as a global package
```bash
npm i -g pwgen
```

```bash
pwgen -sy 20 1
```

## With wapm
```bash
wapm install kherrick/pwgen

wapm run pwgen -sy 20 1
```

## Use as a custom element

### With default options ([demo](https://jsbin.com/yikizelado/1/edit?html,output))
```html
<x-pwgen></x-pwgen>

<script type="module">
  import 'https://unpkg.com/pwgen'
</script>
```

### With additional options and detail logging ([demo](https://jsbin.com/jecoyiwuya/1/edit?html,console,output))
```html
<x-pwgen composed flags="-sy" length="20" number="1"></x-pwgen>

<script type="module">
  import 'https://unpkg.com/pwgen'

  document.addEventListener(
    'x-pwgen-handle-password',
    ({ detail }) => {
      console.log(detail.msg)
    }
  )
</script>
```

## Use in React

```bash
npm i pwgen
```

```javascript
import React from 'react';
import 'pwgen';

const App: React.FC = () => {
  return (
    <x-pwgen></x-pwgen>
  )
}
```

## Use from Node.js

```js
const pwgen = require('pwgen')

const flags = '-1sy'
const length = '20'
const number = '10'

pwgen({ arguments: [ flags, length, number ], print: stdout => {
  console.log(`Password: ${stdout}`)
}})
```

## Develop

### Requirements

* [Node.js](https://nodejs.org/en/download/)
* [bash](https://www.gnu.org/software/bash/)
* [Docker](https://hub.docker.com/search/?offering=community&type=edition)

### Clone the project and submodules

```bash
git clone https://github.com/kherrick/pwgen && \
  cd pwgen && \
  git submodule update --init --recursive
```

### Start

```bash
npm start
```

### Build Wasm

```bash
npm run build:node && \
  npm run build:browser
```
