import ElementMixin from '../../element-mixin';
import markup from './template.html';
import style from './style.css';


const template = document.createElement('template');
template.innerHTML = `
<style>
${style}
</style>
${markup}
  `;
export default class Header extends ElementMixin {
  constructor() {
    super(template);
  }

  static get observedAttributes() {
    return ['team-name', 'image-url'];
  }

  attributeChangedCallback() {
    let img = this.$('.sc-header--img');
    img.src = this.getAttribute('image-url');

    let teamName = this.$('.sc-header--team-name');
    teamName.textContent = this.getAttribute('team-name');


  }

  connectedCallback() {
    let $closebtn = this.$('.sc-header--close-button');
    $closebtn.addEventListener('click', function() {
      console.log('close chat');
      this.dispatchEvent(new Event('toggle-launcher', {
        bubbles: true,
        composed: true
      }));
    });
  }
}
customElements.define('widget-header', Header);
