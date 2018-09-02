import ElementMixin from './element-mixin';
import EmojiIcon from './emoji-icon';
import SendIcon from './send-icon';

  const template = document.createElement('template');
  template.innerHTML =`
<style>
.sc-user-input {
  min-height: 55px;
  margin: 0px;
  position: relative;
  bottom: 0;
  display: flex;
  background-color: #f4f7f9;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: background-color .2s ease,box-shadow .2s ease;
}


.sc-user-input--text {
  width: 300px;
  resize: none;
  border: none;
  outline: none;
  border-bottom-left-radius: 10px;
  box-sizing: border-box;
  padding: 18px;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.33;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #565867;
  -webkit-font-smoothing: antialiased;
  max-height: 200px;
  overflow: scroll;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.sc-user-input--text:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
  color: rgba(86, 88, 103, 0.3);
  outline: none;
}

.sc-user-input--buttons {
  width: 100px;
  position: absolute;
  right: 30px;
  height: 100%;
  display: flex;
}

.sc-user-input--button:first-of-type {
  width: 40px;
}

.sc-user-input--button {
  width: 30px;
  height: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sc-user-input.active {
  box-shadow: none;
  background-color: white;
  box-shadow: 0px -5px 20px 0px rgba(150, 165, 190, 0.2);
}

.sc-user-input--send-icon {
  height: 20px;
  width: 20px;
  cursor: pointer;
  align-self: center;
  outline: none;
}

.sc-user-input--send-icon path {
  fill: rgba(86, 88, 103, 0.3);
}

.sc-user-input--send-icon:hover path {
  fill: rgba(86, 88, 103, 1);
}

.sc-user-input--emoji-icon-wrapper,
.sc-user-input--send-icon-wrapper {
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
<form class="sc-user-input">
        <div
          role="button"
          tabIndex="0"
          contentEditable="true"
          placeholder="Write a reply..."
          class="sc-user-input--text"
        >
        </div>
        <div class="sc-user-input--buttons">
          <div class="sc-user-input--button"></div>
          <div class="sc-user-input--button">
            <emoji-icon/>
          </div>
          <div class="sc-user-input--button">
            <send-icon/>
          </div>
        </div>
      </form>
`;

export default  class UserInput extends ElementMixin  {
    constructor() {
      super(template);
    }

  connectedCallback(){
    let $input = this.$('.sc-user-input--text');
    $input.addEventListener('keydown', e => {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        let text = e.target.textContent.trim();
        let _message = {
          author: 'me',
          type: 'text',
          data: { text }
        };
        this.dispatchEvent(new CustomEvent('send-message',{ bubbles: true, composed: true, detail: JSON.stringify(_message) }));
        e.target.innerHTML = '';
      }
    });
  }

  _submitText(e) {
    let msg = e.target.textContent;
  }
}

  customElements.define('user-input', UserInput);
