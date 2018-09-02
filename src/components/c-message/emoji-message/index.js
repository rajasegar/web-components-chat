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
export default class EmojiMessage extends ElementMixin {
  constructor() {
    super(template);
  }

  connectedCallback() {
    let $root = this.$('.sc-message--emoji');
    $root.textContent = this.dataset.emoji;
  }
}
customElements.define('emoji-message', EmojiMessage);
