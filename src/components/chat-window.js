import WidgetHeader from './widget-header';
import MessageList from './message-list';
import UserInput from './user-input';

  const template = document.createElement('template');
  template.innerHTML = `
<style>
.sc-chat-window {
  width: 370px;
  height: calc(100% - 120px);
  max-height: 590px;
  position: fixed;
  right: 25px;
  bottom: 100px;
  box-sizing: border-box;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.3s ease-in-out;
  border-radius: 10px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.sc-chat-window.closed {
  opacity: 0;
  visibility: hidden;
  bottom: 90px;
}
</style>
<div class="sc-chat-window">
          <widget-header team-name="" image-url=""></widget-header>
          <message-list new-message=""></message-list>
          <user-input></user-input>
        </div>
  `;
  export default class ChatWindow extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: 'open'});
      shadowRoot.appendChild(template.content.cloneNode(true));

      this.addEventListener('send-message', this.sendMessage.bind(this));
    }

    static get observedAttributes() {
      return ['disabled', 'open','team-name', 'image-url'];
    }

    sendMessage(e) {
      let $msgList = this.$('message-list');
      $msgList.setAttribute('new-message', e.detail);
    }

    get open() {
      return this.hasAttribute('open');
    }

    $(x) {
      return this.shadowRoot.querySelector(x);
    }

    connectedCallback() {
      let className = this.open ? "opened" : "closed";
      let rootEl = this.shadowRoot.querySelector('.sc-chat-window');
      rootEl.classList.add(className);

    }

    attributeChangedCallback() {
      let rootEl = this.$('.sc-chat-window');
      if(this.open) {
        rootEl.classList.remove('closed');
        rootEl.classList.add('opened');
      } else {
        rootEl.classList.remove('opened');
        rootEl.classList.add('closed');
      }

      let header = this.$('widget-header');
      header.setAttribute('team-name', this.getAttribute('team-name'));
      header.setAttribute('image-url', this.getAttribute('image-url'));

    }

  }
  customElements.define('chat-window', ChatWindow);


