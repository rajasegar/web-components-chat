import ElementMixin from '../../element-mixin';
import WidgetHeader from '../widget-header';
import MessageList from '../message-list';
import UserInput from '../user-input';
import style from './style.css';
import html from './template.html';

const template = document.createElement('template');
template.innerHTML = `
<style>
${style}
</style>
${html}
  `;
export default class ChatWindow extends ElementMixin {
  constructor() {
    super(template);

    this.addEventListener('send-message', this.sendMessage.bind(this));
  }

  static get observedAttributes() {
    return ['disabled', 'open', 'team-name', 'image-url'];
  }

  sendMessage(e) {
    let $msgList = this.$('message-list');
    $msgList.setAttribute('new-message', e.detail);
  }

  get open() {
    return this.hasAttribute('open');
  }

  connectedCallback() {
    let className = this.open ? "opened" : "closed";
    let rootEl = this.shadowRoot.querySelector('.sc-chat-window');
    rootEl.classList.add(className);

  }

  attributeChangedCallback() {
    let rootEl = this.$('.sc-chat-window');
    if (this.open) {
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
