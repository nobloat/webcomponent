export const Property = (t, p) => {
  if (t.constructor.observedAttributes == null) {
    t.constructor.observedAttributes = [];
  }
  t.constructor.observedAttributes.push(p);
}

export function Register(tag: string, component) {
  customElements.define(tag, component);
}

export class WebComponent extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.r();
  }

  attributeChangedCallback(name, o,n) {
    let item = this.$(name);
    if (item != null) {
      item.innerText = n;
    }
    this.dispatchEvent(new Event<string>(name+"-changed", n));
  }

  r() {
    if (this.shadowRoot != null) {
      this.shadowRoot.innerHTML = this.t();
      this.b();
    }
  }
  b() {
    //Bind your elements hier
  }
  t() : string {return ``;}

  $(name: string) {
    return this.shadowRoot?.getElementById(name);
  }
}

export class Event<T> extends CustomEvent<T> {
  constructor(name: string, detail: T) {
    super(name, {bubbles: true, composed: true, detail: detail});
  }
}