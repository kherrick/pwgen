pwgen
======

pwgen compiled as Wasm.

## Install and use on the CLI

```bash
sudo npm i -g pwgen && pwgen -sy 20 1
```

## Use as a custom element

### With default options
```html
<x-pwgen></x-pwgen>

<script type="module">
  import 'https://unpkg.com/pwgen/lib/esm'
</script>
```

### With additional options and detail logging
```html
<x-pwgen composed flags="-sy" length="20" number="1"></x-pwgen>

<script type="module">
  import 'https://unpkg.com/pwgen/lib/esm'

  document.addEventListener(
    'x-pwgen-handle-password',
    ({ detail }) => {
      console.log(detail.msg)
    }
  )
</script>
```

## Use from Node.js

```js
const pwgen = require('pwgen')

pwgen({ arguments: [ '-sy', '20', '1' ] })
```
