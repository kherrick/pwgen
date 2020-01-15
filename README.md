<a href="https://kherrick.github.io/pwgen/">pwgen</a>
======

[A password generator](https://github.com/tytso/pwgen/tree/1459a31e07fa208cddb2c4f3f72071503c37b8bc) compiled as Wasm that can be used from the command line, as a module, or custom element.

## Install and use on the CLI

```bash
sudo npm i -g pwgen && pwgen -sy 20 1
```

## Use as a custom element

### With default options ([demo](https://jsbin.com/pohovevimu/1/edit?html,output))
```html
<x-pwgen></x-pwgen>

<script type="module">
  import 'https://unpkg.com/pwgen/lib/esm'
</script>
```

### With additional options and detail logging ([demo](https://jsbin.com/bevewocepe/1/edit?html,console,output))
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

const flags = '-1sy'
const length = '20'
const number = '10'

pwgen({ arguments: [ flags, length, number ], print: stdout => {
  console.log(`Password: ${stdout}`)
}})
```
