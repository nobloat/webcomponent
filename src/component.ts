export abstract class WebComponent extends HTMLElement {
  static observedAttributes = [];

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.r();
  }

  attributeChangedCallback(name, o,n) {
    console.log("Attribute changed: " + name);
    let item = this.$(name);
    if (item != null) {
      item.innerText = n;
    } else if (this.shadowRoot != null) {
      console.log("Default render all");
      this.r();
    }
    this.dispatch(name+"-changed", n);
  }

  r() {
    if (this.shadowRoot != null) {
      this.shadowRoot.innerHTML = this.t();
      if (this.css() != "") {
        let style = document.createElement("style");
        style.innerHTML = this.css();
        this.shadowRoot.appendChild(style);
      }
      this.b();
    }
  }
  
  dispatch(name: string, detail: any) {
    this.dispatchEvent(new CustomEvent(name, {bubbles: true, composed: true, detail: detail}));
  }

  css() { return "" };

  $(name: string) {
    return this.shadowRoot?.getElementById(name);
  }

  b() {}
  abstract t() : string
}