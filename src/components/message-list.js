import Message from './c-message';
import messageHistory from './messageHistory';


const template = document.createElement('template');
template.innerHTML = `
<style>
.sc-message-list {
  /* height: 80%; */
  height: 200px;
  overflow-y: auto;
  background-color: white;
  background-size: 100%;
  padding: 40px 0px;
}
</style>
<div class="sc-message-list"></div>
  `;
export default class MessageList extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.appendChild(template.content.cloneNode(true));

  }

  static get observedAttributes() {
    return ['new-message', 'new-emoji'];
  }

  $(x) {
    return this.shadowRoot.querySelector(x);
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

    /*
    let newEmoji = this.getAttribute('new-emoji');
    if (newEmoji) {
      let rootEl = this.$('.sc-message-list');
      let $message = document.createElement('c-message');
      $message.setAttribute('data-emoji', newEmoji);
      rootEl.appendChild($message);

    }
    */
  }
}
customElements.define('message-list', MessageList);
