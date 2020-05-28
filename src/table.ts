import {WebComponent} from "./component.js";

class Table extends WebComponent { 
  
  _data = []

  set data(data) {
    console.log("Setting data");
    console.log(data);
    this._data = data;
    this.r();
  }

  get data() {
    return this._data;
  }
  
  b() {}

  header() {
    console.log(this.data);
    if (this.data.length > 0) {
      console.log(this.data);
      let headings = Object.keys(this.data[0]).map((i) => `<th>${i}</th>`);
      return `<thead><tr>${headings.join("")}</tr></thead>`;
    }
    return `No data`;
  }

  row(row) {
    let data = Object.values(row).map(i => `<td>${i}</td>`);
    return `<tr>${data.join("")}</tr>`;
  }

  body() {
    if (this.data.length > 0) {
      let rows = this.data.map(d => this.row(d));
      return `<tbody>${rows.join("")}</tbody>`;
    }
    return ``;
  }

  t() {
    return `<table>${this.header()}${this.body()}</table>`
  }
}

customElements.define("table-element", Table);