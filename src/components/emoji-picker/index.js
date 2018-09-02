import ElementMixin from '../../element-mixin';
import emojiData from '../../emojiData';
import EmojiCategory from '../emoji-category';
import Emoji from '../c-emoji';
import style from './style.css';
import html from './template.html';

const template = document.createElement('template');
template.innerHTML =`
<style>
${style}
</style>
${html}
`;

export default class EmojiPicker extends ElementMixin {
  constructor() {
    super(template);
  }

  connectedCallback() {
    let $content = this.$('.sc-emoji-picker--content');
    emojiData.map((category) => {
      let $category = document.createElement('emoji-category');
      $category.setAttribute('category', JSON.stringify(category));
      $content.appendChild($category);
      category.emojis.map((emoji) => {
        let $emoji = document.createElement('c-emoji');
        $emoji.setAttribute('emoji', emoji);
        $category.appendChild($emoji);

      });
    });
  }
}

customElements.define('emoji-picker', EmojiPicker);
