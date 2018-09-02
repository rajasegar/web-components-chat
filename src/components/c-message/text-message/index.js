import ElementMixin from '../../element-mixin';
import markup from './template.html';
import style from './style.css';

const template = document.createElement('template');
template.innerHTML = `
<style>
${style}
</style>
${markup}
`;
export default class TextMessage extends ElementMixin {
  constructor() {
    super(template);
  }

  connectedCallback() {
    let $root = this.$('.sc-message--text');
    $root.textContent = this.dataset.text;
  }
}
customElements.define('text-message', TextMessage);
