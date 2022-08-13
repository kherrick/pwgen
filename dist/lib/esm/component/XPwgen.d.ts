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
export declare const tagName = "x-pwgen";
export declare class XPwgen extends HTMLElement {
    wasmModule: any;
    hasRendered: any;
    constructor();
    static get observedAttributes(): string[];
    get composed(): string | null;
    set composed(composed: string | null);
    get flags(): string | null;
    set flags(flags: string | null);
    get length(): string | null;
    set length(length: string | null);
    get number(): string | null;
    set number(number: string | null);
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    generate(): void;
    _handlePassword(): (msg: any) => void;
    _upgradeProperty(prop: any): void;
}
