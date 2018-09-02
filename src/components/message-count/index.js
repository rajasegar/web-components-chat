import ElementMixin from '../../element-mixin';
import style from './style.css';
import html from './template.html';

const template = document.createElement('template');
template.innerHTML = `
<style>
${style}
</style>
${html}
  `;
export default class MessageCount extends ElementMixin {
  constructor() {
    super(template);
  }

  connectedCallback() {
    let count = this.getAttribute('count');
    let root = this.$('.sc-new-messages-count');
    root.textContent = count;
  }
}
customElements.define('message-count', MessageCount);


