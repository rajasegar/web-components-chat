import ElementMixin from '../../element-mixin';
import MessageCount from '../message-count';
import ChatWindow from '../chat-window';
import style from './style.css';
import html from './template.html';

const template = document.createElement('template');
template.innerHTML = `
<style>
${style}
</style>
${html}
  `;

export default class Launcher extends ElementMixin {
  constructor() {
    super(template);
    this.addEventListener('toggle-launcher', e => {
      this.toggleChat();
    });
  }

  toggleChat() {
    let rootEl = this.$('.sc-launcher');
    let isOpen = rootEl.classList.toggle('opened');
    let chatWindow = this.$('chat-window');
    let messageCount = this.$('message-count');
    if (isOpen) {
      chatWindow.setAttribute('open', '');
      messageCount.setAttribute('open', '');
    } else {
      chatWindow.removeAttribute('open');
      messageCount.removeAttribute('open');
    }
  }

  connectedCallback() {
    let rootEl = this.$('.sc-launcher');
    // Setup a click listener
    rootEl.addEventListener('click', e => {
      this.toggleChat();
    });

    Promise.all([
        customElements.whenDefined('chat-window'),
      customElements.whenDefined('message-list'),
      customElements.whenDefined('widget-header')
      ])
      .then(_ => {
        let chatWindow = this.$('chat-window');
        chatWindow.setAttribute('team-name', this.getAttribute('team-name'));
        chatWindow.setAttribute('image-url', this.getAttribute('image-url'));

      });

  }
}
customElements.define('c-launcher', Launcher);
