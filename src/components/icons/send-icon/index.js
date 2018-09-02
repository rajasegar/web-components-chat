import ElementMixin from '../../../element-mixin';
import style from './style.css';
import html from './template.html';


const template = document.createElement('template');
template.innerHTML = `
<style>
${style}
</style>
${html}
`;

export default class SendIcon extends ElementMixin {
  constructor() {
    super(template);
  }
}

customElements.define('send-icon', SendIcon);
