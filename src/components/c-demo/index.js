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

export default class Demo extends ElementMixin {
  constructor() {
    super(template);
  }

  connectedCallback() {
    let $btn = this.$('.demo-test-area--button');

    $btn.addEventListener('click', e => {
      e.preventDefault();
      let $textarea = this.$('.demo-test-area--text');
      let text = $textarea.value;
      let _message = {
        author: 'them',
        type: 'text',
        data: {
          text
        }
      };

      let $launcher = this.ownerDocument.querySelector('c-launcher');
      let $chatwindow = $launcher.shadowRoot.querySelector('chat-window');
      $chatwindow.dispatchEvent(new CustomEvent('send-message', {
        bubbles: true,
        composed: true,
        detail: JSON.stringify(_message)
      }));
      $textarea.value = '';


    });
  }
}

customElements.define('c-demo', Demo);
