export class Xpwgen extends HTMLElement {
  constructor() {
    super()

    this.wasmModule = undefined
    this.hasRendered = false

    const container = document.createElement('div')
    container.id = 'container'
    container.innerHTML = `
      <style>
        :host {
          display: var(--x-pwgen-display, initial);
          font-family: var(--x-pwgen-font-family, monospace);
        }

        ul {
          list-style: var(--x-pwgen-ul-list-style, none);
          margin: var(--x-pwgen-ul-margin, 0);
          padding: var(--x-pwgen-ul-padding, 0);
        }

        li {
          display: var(--x-pwgen-li-display, block);
        }
      </style>
      <ul></ul>
    `

    this.attachShadow({ mode: 'open' }).appendChild(container)
  }

  static get observedAttributes() {
    return ['composed', 'flags', 'length', 'number']
  }

  get composed() {
    let composed = this.getAttribute('composed')

    return composed
  }

  get flags() {
    let flags = this.getAttribute('flags')

    return flags
  }

  set flags(flags) {
    this.setAttribute('flags', flags)
  }

  get length() {
    let length = this.getAttribute('length')

    return length
  }

  set length(length) {
    this.setAttribute('length', length)
  }

  get number() {
    let number = this.getAttribute('number')

    return number
  }

  set number(number) {
    this.setAttribute('number', number)
  }

  connectedCallback() {
    this._upgradeProperty('composed')
    this._upgradeProperty('flags')
    this._upgradeProperty('length')
    this._upgradeProperty('number')

    if (!this.flags) { this.flags = '-sy' }
    if (!this.length) { this.length = '20' }
    if (!this.number) { this.number = '1' }

    import('https://kherrick.github.io/pwgen/lib/esm/pwgen.js').then(mod => {
      this.wasmModule = mod

      this.shadowRoot.dispatchEvent(new Event('x-pwgen-wasm-loader-imported', {
        bubbles: true,
        composed: this.composed !== null,
      }))
    })

    this.shadowRoot.addEventListener('x-pwgen-wasm-loader-imported', e => {
      this._getPassword()
      this.hasRendered = true
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.hasRendered) {
      this._getPassword()
    }
  }

  _getPassword() {
    this.wasmModule.default({
      arguments: [
        this.flags,
        this.length,
        this.number
      ],
      print: this._handlePassword(this.shadowRoot)
    })
  }

  _handlePassword(shadowRoot) {
    const ul = document.createElement('ul')

    return msg => {
      shadowRoot.dispatchEvent(new CustomEvent('x-pwgen-handle-password', {
        bubbles: true,
        composed: this.composed !== null,
        detail: {
          msg
        }
      }))

      msg.split(' ').forEach(password => {
        const li = document.createElement('li')
        li.innerText = password

        ul.appendChild(li)
      })

      shadowRoot.getElementById('container').replaceChild(
        ul,
        shadowRoot.querySelector('ul')
      )
    }
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop]
      delete this[prop]
      this[prop] = value
    }
  }
}

if (!customElements.get('x-pwgen')) {
  customElements.define('x-pwgen', Xpwgen)
}
