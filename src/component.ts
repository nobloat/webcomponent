export abstract class WebComponent extends HTMLElement {

  static observedAttributes = [];

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.r();
  }

  attributeChangedCallback(name, o,n) {
    let item = this.$(name);
    if (item != null) {
      item.innerText = n;
    }
    this.dispatch(name+"-changed", n);
  }

  r() {
    if (this.shadowRoot != null) {
      this.shadowRoot.innerHTML = this.t();
      let style = document.createElement("style");
      style.innerHTML = this.css();

      this.shadowRoot.appendChild(style);
      this.b();
    }
  }
  

  dispatch(name: string, detail: any) {
    this.dispatchEvent(new CustomEvent(name, {bubbles: true, composed: true, detail: detail}));
  }

  abstract b() : void
  abstract css() : string
  abstract t() : string

  $(name: string) {
    return this.shadowRoot?.getElementById(name);
  }
}