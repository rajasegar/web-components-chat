import ElementMixin from '../../element-mixin';
import markup from './template.html';
import style from './style.css';
import EmojiMessage from './emoji-message';
import TextMessage from './text-message';

const template = document.createElement('template');
  template.innerHTML = `
<style>
${style}
</style>
${markup}
`;

  export default class Message extends ElementMixin {
    constructor() {
      super(template);
    }

    static get observedAttributes() {
      return ['data-message', 'data-emoji'];
    }

    attributeChangedCallback() {
      let _message = JSON.parse(this.getAttribute('data-message'));
      if(_message) {
        let $content = this.$('.sc-message--content');
        let $msg;

        if(_message.type === 'text') {
          $msg = document.createElement('text-message');
          $msg.dataset.text = _message.data.text;
          if(_message.author === 'me') {
            $content.classList.add('sent');
            $msg.dataset.sent = true;
          } else {
            $content.classList.add('received');
            $msg.dataset.received = true;
          }
        } else {
          $content.classList.add('sent');
          $msg = document.createElement('emoji-message');
          $msg.dataset.emoji = _message.data.emoji;
        }
        $content.appendChild($msg);
      }

    }

    connectedCallback() {}
  }
  customElements.define('c-message', Message);
