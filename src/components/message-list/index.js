import ElementMixin from '../../element-mixin';
import messageHistory from '../../messageHistory';
import Message from '../c-message';
import style from './style.css';
import html from './template.html';

const template = document.createElement('template');
template.innerHTML = `
<style>
${style}
</style>
${html}
  `;

export default class MessageList extends ElementMixin {
  constructor() {
    super(template);

  }

  static get observedAttributes() {
    return ['new-message', 'new-emoji'];
  }

  connectedCallback() {
    let rootEl = this.$('.sc-message-list');
    messageHistory.forEach((m) => {
      let message = document.createElement('c-message');
      message.setAttribute('data-message', JSON.stringify(m));
      rootEl.appendChild(message);
    });
  }

  attributeChangedCallback() {
    let newMessage = this.getAttribute('new-message');
    if (newMessage) {
      let rootEl = this.$('.sc-message-list');
      let $message = document.createElement('c-message');
      $message.setAttribute('data-message', newMessage);
      rootEl.appendChild($message);

    }

  }
}
customElements.define('message-list', MessageList);
