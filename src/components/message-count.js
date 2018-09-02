  const template = document.createElement('template');
  template.innerHTML = `
<style>
.sc-new-messages-count {
  position: absolute;
  top: -3px;
  left: 41px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
	width: 22px;
  height: 22px;
  background: #ff4646;
  color: white;
  text-align: center;
  margin: auto;
  font-size: 12px;
  font-weight: 500;
}
</style>
<div class="sc-new-messages-count"></div>
  `;
export default class MessageCount extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: 'open'});
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    let count = this.getAttribute('count');
    let root = this.shadowRoot.querySelector('.sc-new-messages-count');
    root.textContent = count;
  }
}
  customElements.define('message-count', MessageCount);


