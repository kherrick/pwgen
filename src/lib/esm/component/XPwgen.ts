declare global {
  namespace JSX {
    interface IntrinsicElements {
      "x-pwgen": {
        composed?: boolean | string | null;
        flags?: string | null;
        length?: string | null;
        number?: string | null;
      };
    }
  }
}

export const tagName = "x-pwgen";

export class XPwgen extends HTMLElement {
  wasmModule;
  hasRendered;

  constructor() {
    super();

    this.wasmModule = undefined;
    this.hasRendered = false;

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        :host {
          display: var(--x-pwgen-display, initial);
          font-size: var(--x-pwgen-font-size, initial);
          font-family: var(--x-pwgen-font-family, monospace);
        }

        ul {
          list-style: var(--x-pwgen-ul-list-style, none);
          margin: var(--x-pwgen-ul-margin, 0);
          padding: var(--x-pwgen-ul-padding, 0);
        }

        li {
          display: var(--x-pwgen-li-display, block);
          margin: var(--x-pwgen-li-margin, 0);
          padding: var(--x-pwgen-li-padding, 0);
        }
      </style>
      <ul></ul>
    `;

    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );
  }

  static get observedAttributes() {
    return ["composed", "flags", "length", "number"];
  }

  get composed() {
    return this.getAttribute("composed");
  }

  set composed(composed) {
    this.setAttribute("composed", `${composed}`);
  }

  get flags() {
    return this.getAttribute("flags");
  }

  set flags(flags) {
    this.setAttribute("flags", `${flags}`);
  }

  get length() {
    return this.getAttribute("length");
  }

  set length(length) {
    this.setAttribute("length", `${length}`);
  }

  get number() {
    return this.getAttribute("number");
  }

  set number(number) {
    this.setAttribute("number", `${number}`);
  }

  connectedCallback() {
    XPwgen.observedAttributes.forEach((attribute) => {
      this._upgradeProperty(attribute);
    });

    if (!this.flags) {
      this.flags = "-sy";
    }
    if (!this.length) {
      this.length = "20";
    }
    if (!this.number) {
      this.number = "1";
    }

    import("../pwgen.js")
      .then((mod) => {
        this.wasmModule = mod;
      })
      .then(() => {
        this.generate();

        this.hasRendered = true;
      });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue === null || oldValue === newValue) {
      return;
    }

    if (name !== "flags" && !newValue) {
      return;
    }

    if (this.hasRendered && this.length && this.number) {
      this.generate();
    }
  }

  generate() {
    this.wasmModule.default({
      arguments: this.flags
        ? [this.flags, this.length, this.number]
        : [this.length, this.number],
      print: this._handlePassword(),
    });
  }

  _handlePassword() {
    const ul = document.createElement("ul");

    return (msg) => {
      this.shadowRoot?.dispatchEvent(
        new CustomEvent("x-pwgen-handle-password", {
          bubbles: true,
          composed: this.composed !== null,
          detail: {
            msg,
          },
        })
      );

      msg.split(" ").forEach((password) => {
        const li = document.createElement("li");
        li.innerText = password;

        ul.appendChild(li);
      });

      const unorderedListToReplace = this.shadowRoot?.querySelector("ul");
      if (unorderedListToReplace) {
        this.shadowRoot?.replaceChild(ul, unorderedListToReplace);
      }
    };
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
}

if (!customElements.get(tagName)) {
  customElements.define(tagName, XPwgen);
}
