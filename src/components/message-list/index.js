import ElementMixin from '../../element-mixin';
import messageHistory from '../../messageHistory';
import Message from '../c-message';
import style from './style.css';
import markup from './template.html';

const template = document.createElement('template');
template.innerHTML = `
<style>
${style}
</style>
${markup}
  `;



export default class MessageList extends ElementMixin {
  constructor() {
    super(template);

  }

  static get observedAttributes() {
    return ['new-message', 'new-emoji'];
  }

  connectedCallback() {
    this.messages = messageHistory;
    this.name = 'Rajasegar';
    const messageList = (messages) => {
        return messages.map((m) => {
            return `<c-message type="${m.type}" author="${m.author}" message="${m.type === 'text' ? m.data.text : m.data.emoji}"></c-message>`;
        }).join('');
    };
    let $rootEl = this.$('.sc-message-list');
    $rootEl.innerHTML = messageList(this.messages);
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
