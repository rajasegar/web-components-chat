import ElementMixin from '../../../element-mixin';
import EmojiPicker from '../../emoji-picker';
import style from './style.css';
import html from './template.html';

const template = document.createElement('template');
template.innerHTML = `
<style>
${style}
</style>
${html}
`;

export default class EmojiIcon extends ElementMixin {
  constructor() {
    super(template);
    this.active = false;
  }


  connectedCallback() {

    let $btn = this.$('.sc-user-input--emoji-icon-wrapper');
    $btn.addEventListener('click', e => {
      this.togglePicker();
    });

    this.addEventListener('close-picker', e => {
      this.active = false;

      let  $picker = this.$('emoji-picker');
      let $svg = this.$('.sc-user-input--emoji-icon');
      $picker.setAttribute('hidden', '');
      $svg.classList.remove('active');
    });
  }

  togglePicker() {
    this.active = !this.active;
    let isActive = this.active;
    let  $picker = this.$('emoji-picker');
    let $svg = this.$('.sc-user-input--emoji-icon');
    if(isActive) {
      $picker.removeAttribute('hidden');
      $svg.classList.add('active');
    } else {
      $picker.setAttribute('hidden', '');
      $svg.classList.remove('active');
    }
  }



}

customElements.define('emoji-icon', EmojiIcon);
