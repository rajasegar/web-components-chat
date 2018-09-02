import MessageCount from './message-count';
import ChatWindow from './chat-window';

const template = document.createElement('template');
template.innerHTML = `
<style>
.sc-launcher {
  width: 60px;
  height: 60px;
  background-color: #4e8cff;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  right: 25px;
  bottom: 25px;
  border-radius: 50%;
  box-shadow: none;
  transition: box-shadow 0.2s ease-in-out;
}

.sc-launcher:before {
  content: '';
  position: relative;
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: box-shadow 0.2s ease-in-out;
}

.sc-launcher .sc-open-icon,
.sc-launcher .sc-closed-icon {
  width: 60px;
  height: 60px;
  position: fixed;
  right: 25px;
  bottom: 25px;
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
}

.sc-launcher .sc-closed-icon {
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
  width: 60px;
  height: 60px;
}

.sc-launcher .sc-open-icon {
  padding: 20px;
  box-sizing: border-box;
  opacity: 0;
}

.sc-launcher.opened .sc-open-icon {
  transform: rotate(-90deg);
  opacity: 1;
}

.sc-launcher.opened .sc-closed-icon {
  transform: rotate(-90deg);
  opacity: 0;
}

.sc-launcher.opened:before {
  box-shadow: 0px 0px 400px 250px rgba(148, 149, 150, 0.2);
}

.sc-launcher:hover {
  box-shadow: 0 0px 27px 1.5px rgba(0,0,0,0.2);
}

</style>
<div>
<div></div>
        <div class="sc-launcher">
  <message-count count="0"></message-count>
          <img class="sc-open-icon" src="assets/img/close-icon.png" />
          <img class="sc-closed-icon" src="assets/img/chat-icon.svg" />
        </div>
<chat-window team-name="" image-url=""></chat-window>
</div>
  `;
export default class Launcher extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.addEventListener('toggle-launcher', e => {
      this.toggleChat();
    });
  }

  toggleChat() {
    let rootEl = this.shadowRoot.querySelector('.sc-launcher');
    let isOpen = rootEl.classList.toggle('opened');
    let chatWindow = this.shadowRoot.querySelector('chat-window');
    let messageCount = this.shadowRoot.querySelector('message-count');
    if (isOpen) {
      chatWindow.setAttribute('open', '');
      messageCount.setAttribute('open', '');
    } else {
      chatWindow.removeAttribute('open');
      messageCount.removeAttribute('open');
    }
  }

  connectedCallback() {
    let rootEl = this.shadowRoot.querySelector('.sc-launcher');
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
        let chatWindow = this.shadowRoot.querySelector('chat-window');
        chatWindow.setAttribute('team-name', this.getAttribute('team-name'));
        chatWindow.setAttribute('image-url', this.getAttribute('image-url'));

      });


  }
}
customElements.define('fd-launcher', Launcher);
