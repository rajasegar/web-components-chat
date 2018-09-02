class ElementMixin extends HTMLElement {
  constructor(template) {
    super();
    let shadowRoot = this.attachShadow({ mode: 'open'});
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  $(x) {
    return this.shadowRoot.querySelector(x);
  }
}

module.exports = ElementMixin;
