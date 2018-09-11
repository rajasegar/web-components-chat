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

  attributeChangedCallback() {

  }

  connectedCallback() {
    let _type = this.getAttribute('type');
    let _message = this.getAttribute('message');
    let _author = this.getAttribute('author');

    let $content = this.$('.sc-message--content');
    let _className = _type == 'text' ? 'sc-message--text' : 'sc-message--emoji';
    let _send = _author == 'me' ? 'sent' : 'received';
    _className = `${_className} ${_send}`;

    const textMessage = (className, message) => {
      return `
      <div class="sc-message--avatar" style="background-image: url('/assets/img/chat-icon.svg')"></div>
        <div class="${className}">${message}</div>`;
    };
    
    const emojiMessage = (message) => {
      return `
        <div class="sc-message--emoji">${message}</div>`;
    };


    $content.innerHTML = _type == 'text' ? textMessage(_className, _message) : emojiMessage(_message);


}
}
customElements.define('c-message', Message);
