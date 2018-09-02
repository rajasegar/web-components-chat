import ElementMixin from '../../element-mixin';
import EmojiIcon from '../icons/emoji-icon';
import SendIcon from '../icons/send-icon';
import style from './style.css';
import html from './template.html';

const template = document.createElement('template');
template.innerHTML = `
<style>
${style}
</style>
${html}
`;

export default class UserInput extends ElementMixin {
  constructor() {
    super(template);
  }

  connectedCallback() {
    let $input = this.$('.sc-user-input--text');
    $input.addEventListener('keydown', e => {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        let text = e.target.textContent.trim();
        let _message = {
          author: 'me',
          type: 'text',
          data: {
            text
          }
        };
        this.dispatchEvent(new CustomEvent('send-message', {
          bubbles: true,
          composed: true,
          detail: JSON.stringify(_message)
        }));
        e.target.innerHTML = '';
      }
    });
  }

  _submitText(e) {
    let msg = e.target.textContent;
  }
}

customElements.define('user-input', UserInput);
