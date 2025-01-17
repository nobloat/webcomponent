import {WebComponent} from "./component.js";

class CounterElement extends WebComponent {

  static observedAttributes = ["count"];

  set count(count: number) {
    this.setAttribute('count', count.toString());
  }
  get count() : number {
    return parseInt(this.getAttribute('count'));
  }

  b() {
    this.$("btn-up").onclick = () => this.up();
    this.$("btn-down").onclick = () => this.down();
  }

  up() {
    this.count++;
  }

  down() {
    this.count--;
  }

  css() {
    return `
    button { margin: 2rem; background-color: green; }
    `
  }

  t() {
    return `<h1>Counter-Value: <span id="count">${this.count}</span></h1> <button id="btn-down">-</button> <button id="btn-up">+</button>`;
  }
}

customElements.define("counter-element", CounterElement);