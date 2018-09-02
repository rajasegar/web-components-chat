import ElementMixin from '../element-mixin';
import markup from './template.html';
import style from './style.css';

const template = document.createElement('template');
template.innerHTML = `
<style>
${style}
</style>
${markup}
`;

export default class Emoji extends ElementMixin{
  constructor() {
    super(template);
  }

  static get observedAttributes() {
    return ['emoji'];
  }

  connectedCallback() {
    let $root = this.$('.sc-emoji-picker--emoji');

    $root.addEventListener('click', e => {
      let emoji = e.target.textContent.trim();
      let _message = {
        author: 'me',
        type: 'emoji',
        data: { emoji }
      };
      this.dispatchEvent(new CustomEvent('send-message', { bubbles: true, composed: true, detail: JSON.stringify(_message) }));
      this.dispatchEvent(new Event('close-picker', { bubbles: true, composed: true }));
    });
  }

  attributeChangedCallback() {
    let emoji = this.getAttribute('emoji');
    if(emoji) {
      let $root = this.$('.sc-emoji-picker--emoji');
      $root.innerHTML = emoji;
    }
  }
}

customElements.define('c-emoji', Emoji);
