import ElementMixin from './element-mixin';
import EmojiPicker from './emoji-picker';

const template = document.createElement('template');
template.innerHTML = `
<style>
.sc-user-input--emoji-icon-wrapper {
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
}

.sc-user-input--emoji-icon-wrapper:focus {
  outline: none;
}

.sc-user-input--emoji-icon {
  height: 18px;
  cursor: pointer;
  align-self: center;
}

.sc-user-input--emoji-icon path, .sc-user-input--emoji-icon circle {
  fill: rgba(86, 88, 103, 0.3);
}

.sc-user-input--emoji-icon-wrapper:focus .sc-user-input--emoji-icon path,
.sc-user-input--emoji-icon-wrapper:focus .sc-user-input--emoji-icon circle,
.sc-user-input--emoji-icon.active path,
.sc-user-input--emoji-icon.active circle,
.sc-user-input--emoji-icon:hover path,
.sc-user-input--emoji-icon:hover circle {
  fill: rgba(86, 88, 103, 1);
}
</style>
<div class="sc-user-input--picker-wrapper">
        <emoji-picker hidden></emoji-picker>
      <button class="sc-user-input--emoji-icon-wrapper">
        <svg
          class="sc-user-input--emoji-icon"
          version="1.1"
          id="Layer_2"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="37.393px"
          height="37.393px"
          viewBox="0 0 37.393 37.393"
          enableBackground="new 0 0 37.393 37.393"
        >
          <g>
            <path d="M18.696,37.393C8.387,37.393,0,29.006,0,18.696C0,8.387,8.387,0,18.696,0c10.31,0,18.696,8.387,18.696,18.696
              C37.393,29.006,29.006,37.393,18.696,37.393z M18.696,2C9.49,2,2,9.49,2,18.696c0,9.206,7.49,16.696,16.696,16.696
              c9.206,0,16.696-7.49,16.696-16.696C35.393,9.49,27.902,2,18.696,2z"
            />
          </g>
          <g>
            <circle cx="12.379" cy="14.359" r="1.938" />
          </g>
          <g>
            <circle cx="24.371" cy="14.414" r="1.992" />
          </g>
          <g>
            <path d="M18.035,27.453c-5.748,0-8.342-4.18-8.449-4.357c-0.286-0.473-0.135-1.087,0.338-1.373
              c0.471-0.286,1.084-0.136,1.372,0.335c0.094,0.151,2.161,3.396,6.74,3.396c4.713,0,7.518-3.462,7.545-3.497
              c0.343-0.432,0.973-0.504,1.405-0.161c0.433,0.344,0.505,0.973,0.161,1.405C27.009,23.374,23.703,27.453,18.035,27.453z"
            />
          </g>
        </svg>
      </button>
      </div>
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
