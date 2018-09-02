import ElementMixin from '../../element-mixin';
import markup from './template.html';
import style from './style.css';
import Emoji from '../c-emoji';

const template = document.createElement('template');
template.innerHTML = `
<style>
${style}
</style>
${markup}
`;

export default class EmojiCategory extends ElementMixin{
  constructor() {
    super(template);
  }

  static get observedAttributes() {
    return ['category'];
  }

  connectedCallback() {
    let category = JSON.parse(this.getAttribute('category'));
    if(category) {
      let $title = this.$('.sc-emoji-picker--category-title');
      $title.innerHTML =  category.name;
      let $category = this.$('.sc-emoji-picker--category');
      category.emojis.map((emoji) => {
        let $emoji = document.createElement('c-emoji');
        $emoji.setAttribute('emoji', emoji);
        $category.appendChild($emoji);

      });

    }
      }

  attributeChangedCallback() {
    let category = JSON.parse(this.getAttribute('category'));
    if(category) {
      let $title = this.$('.sc-emoji-picker--category-title');
      $title.innerHTML =  category.name;
      let $category = this.$('.sc-emoji-picker--category');
      category.emojis.map((emoji) => {
        let $emoji = document.createElement('c-emoji');
        $emoji.setAttribute('emoji', emoji);
        $category.appendChild($emoji);

      });

    }
  }
}

customElements.define('emoji-category', EmojiCategory);
