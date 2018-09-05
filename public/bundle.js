(function () {
  'use strict';

  class ElementMixin extends HTMLElement {
    constructor(template) {
      super();
      let shadowRoot = this.attachShadow({
        mode: 'open'
      });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }

    $(x) {
      return this.shadowRoot.querySelector(x);
    }

  }

  var elementMixin = ElementMixin;

  var style = ".sc-new-messages-count {\n    position: absolute;\n    top: -3px;\n    left: 41px;\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n    border-radius: 50%;\n\t  width: 22px;\n    height: 22px;\n    background: #ff4646;\n    color: white;\n    text-align: center;\n    margin: auto;\n    font-size: 12px;\n    font-weight: 500;\n    z-index: 9;\n}\n";

  var html = "<div class=\"sc-new-messages-count\"></div>\n";

  const template = document.createElement('template');
  template.innerHTML = `
<style>
${style}
</style>
${html}
  `;
  class MessageCount extends elementMixin {
    constructor() {
      super(template);
    }

    connectedCallback() {
      let count = this.getAttribute('count');
      let root = this.$('.sc-new-messages-count');
      root.textContent = count;
    }

  }
  customElements.define('message-count', MessageCount);

  var markup = "<div class=\"sc-header\">\n  <img class=\"sc-header--img\" src=\"\" alt=\"\" />\n  <div class=\"sc-header--team-name\"></div>\n  <div class=\"sc-header--close-button\">\n    <img src=\"assets/img/close-icon.png\" alt=\"\" />\n  </div>\n</div>\n";

  var style$1 = ".sc-header {\n    background: #4e8cff;\n    min-height: 75px;\n    border-top-left-radius: 9px;\n    border-top-right-radius: 9px;\n    color: white;\n    padding: 10px;\n    box-shadow: 0 1px 4px rgba(0,0,0,.2);\n    position: relative;\n    box-sizing: border-box;\n    display: flex;\n}\n\n.sc-header--img {\n    border-radius: 50%;\n    align-self: center;\n    padding: 10px;\n}\n\n.sc-header--team-name {\n    align-self: center;\n    padding: 10px;\n    flex: 1;\n    user-select: none;\n    cursor: pointer;\n    border-radius: 5px;\n}\n\n.sc-header--team-name:hover {\n    background: #4882ed;\n}\n\n.sc-header--close-button {\n    width: 40px;\n    align-self: center;\n    height: 40px;\n    margin-right: 10px;\n    box-sizing: border-box;\n    cursor: pointer;\n    border-radius: 5px;\n}\n\n.sc-header--close-button:hover {\n    background: #4882ed;\n}\n\n.sc-header--close-button img {\n    width: 100%;\n    height: 100%;\n    padding: 13px;\n    box-sizing: border-box;\n}\n\n@media (max-width: 450px) {\n    .sc-header {\n        border-radius: 0px;\n    }\n}\n";

  const template$1 = document.createElement('template');
  template$1.innerHTML = `
<style>
${style$1}
</style>
${markup}
  `;
  class Header extends elementMixin {
    constructor() {
      super(template$1);
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
      $closebtn.addEventListener('click', function () {
        console.log('close chat');
        this.dispatchEvent(new Event('toggle-launcher', {
          bubbles: true,
          composed: true
        }));
      });
    }

  }
  customElements.define('widget-header', Header);

  var messageHistory = [{
    type: 'text',
    author: "me",
    data: {
      text: "Why don't they have salsa on the table?"
    }
  }, {
    type: 'text',
    author: "them",
    data: {
      text: "What do you need salsa for?"
    }
  }, {
    type: 'text',
    author: "me",
    data: {
      text: "Salsa is now the number one condiment in America."
    }
  }, {
    type: 'text',
    author: "them",
    data: {
      text: "You know why? Because people like to say 'salsa.' 'Excuse me, do you have salsa?' 'We need more salsa.' 'Where is the salsa? No salsa?'"
    }
  }, {
    type: 'text',
    author: "me",
    data: {
      text: "You know it must be impossible for a Spanish person to order seltzer and not get salsa. 'I wanted seltzer, not salsa.'"
    }
  }, {
    type: 'text',
    author: "them",
    data: {
      text: "Don't you know the difference between seltzer and salsa?? You have the seltezer after the salsa!"
    }
  }, {
    type: 'text',
    author: "me",
    data: {
      text: "See, this should be a show. This is the show. "
    }
  }, {
    type: 'text',
    author: "them",
    data: {
      text: "What?"
    }
  }, {
    type: 'text',
    author: "me",
    data: {
      text: "This. Just talking."
    }
  }, {
    type: 'text',
    author: "them",
    data: {
      text: "Yeah, right."
    }
  }, {
    type: 'text',
    author: "me",
    data: {
      text: "I'm really serious. I think that's a good idea. "
    }
  }, {
    type: 'text',
    author: "them",
    data: {
      text: "Just talking? Well what's the show about?"
    }
  }, {
    type: 'text',
    author: "me",
    data: {
      text: "It's about nothing."
    }
  }, {
    type: 'text',
    author: "them",
    data: {
      text: "No story?"
    }
  }, {
    type: 'text',
    author: "me",
    data: {
      text: "No forget the story. "
    }
  }, {
    type: 'text',
    author: "them",
    data: {
      text: "You've got to have a story."
    }
  }, {
    type: 'emoji',
    author: "me",
    data: {
      emoji: "😋"
    }
  }];

  var markup$1 = "<div class=\"sc-message\">\n  <div class=\"sc-message--content\">\n    <div class=\"sc-message--avatar\" style=\"background-image: url('/assets/img/chat-icon.svg')\"></div>\n  </div>\n</div>\n";

  var style$2 = ".sc-message {\n  width: 300px;\n  margin: auto;\n  padding-bottom: 10px;\n  display: flex;\n}\n\n.sc-message--content {\n  width: 100%;\n  display: flex;\n}\n\n.sc-message--content.sent {\n  justify-content: flex-end;\n}\n\n.sc-message--content.sent .sc-message--avatar {\n  display: none;\n}\n\n.sc-message--avatar {\n  background-image: url(https://d13yacurqjgara.cloudfront.net/assets/avatar-default-aa2eab7684294781f93bc99ad394a0eb3249c5768c21390163c9f55ea8ef83a4.gif);\n  background-repeat: no-repeat;\n  background-size: 100%;\n  background-position: center;\n  min-width: 30px;\n  min-height: 30px;\n  border-radius: 50%;\n  align-self: center;\n  margin-right: 15px;\n}\n\n@media (max-width: 450px) {\n  .sc-message {\n    width: 80%;\n  }\n}\n";

  var markup$2 = "<div class=\"sc-message--emoji\"></div>\n";

  var style$3 = ".sc-message--emoji {\n    font-size: 40px;\n}\n\n";

  const template$2 = document.createElement('template');
  template$2.innerHTML = `
<style>
${style$3}
</style>
${markup$2}
`;
  class EmojiMessage extends elementMixin {
    constructor() {
      super(template$2);
    }

    connectedCallback() {
      let $root = this.$('.sc-message--emoji');
      $root.textContent = this.dataset.emoji;
    }

  }
  customElements.define('emoji-message', EmojiMessage);

  var markup$3 = "<div class=\"sc-message--text\"></div>\n";

  var style$4 = ".sc-message--text {\n    padding: 17px 20px;\n    font-weight: 300;\n    font-size: 14px;\n    line-height: 1.4;\n    white-space: pre-wrap;\n    -webkit-font-smoothing: subpixel-antialiased\n}\n\n:host {\n    border-radius: 6px;\n}\n\n:host([data-sent]) {\n    color: white;\n    background-color: #4e8cff;\n    max-width: calc(100% - 120px);\n    word-wrap: break-word;\n}\n\n:host([data-received])  {\n    color: #263238;\n    background-color: #f4f7f9;\n    margin-right: 40px;\n}\n";

  const template$3 = document.createElement('template');
  template$3.innerHTML = `
<style>
${style$4}
</style>
${markup$3}
`;
  class TextMessage extends elementMixin {
    constructor() {
      super(template$3);
    }

    connectedCallback() {
      let $root = this.$('.sc-message--text');
      $root.textContent = this.dataset.text;
    }

  }
  customElements.define('text-message', TextMessage);

  const template$4 = document.createElement('template');
  template$4.innerHTML = `
<style>
${style$2}
</style>
${markup$1}
`;
  class Message extends elementMixin {
    constructor() {
      super(template$4);
    }

    static get observedAttributes() {
      return ['data-message', 'data-emoji'];
    }

    attributeChangedCallback() {
      let _message = JSON.parse(this.getAttribute('data-message'));

      if (_message) {
        let $content = this.$('.sc-message--content');
        let $msg;

        if (_message.type === 'text') {
          $msg = document.createElement('text-message');
          $msg.dataset.text = _message.data.text;

          if (_message.author === 'me') {
            $content.classList.add('sent');
            $msg.dataset.sent = true;
          } else {
            $content.classList.add('received');
            $msg.dataset.received = true;
          }
        } else {
          $content.classList.add('sent');
          $msg = document.createElement('emoji-message');
          $msg.dataset.emoji = _message.data.emoji;
        }

        $content.appendChild($msg);
      }
    }

    connectedCallback() {}

  }
  customElements.define('c-message', Message);

  var style$5 = ".sc-message-list {\n    height: 80%;\n    overflow-y: auto;\n    background-color: white;\n    background-size: 100%;\n    padding: 40px 0px;\n}\n";

  var html$1 = "<div class=\"sc-message-list\"></div>\n";

  const template$5 = document.createElement('template');
  template$5.innerHTML = `
<style>
${style$5}
</style>
${html$1}
  `;
  class MessageList extends elementMixin {
    constructor() {
      super(template$5);
    }

    static get observedAttributes() {
      return ['new-message', 'new-emoji'];
    }

    connectedCallback() {
      let rootEl = this.$('.sc-message-list');
      messageHistory.forEach(m => {
        let message = document.createElement('c-message');
        message.setAttribute('data-message', JSON.stringify(m));
        rootEl.appendChild(message);
      });
    }

    attributeChangedCallback() {
      let newMessage = this.getAttribute('new-message');

      if (newMessage) {
        let rootEl = this.$('.sc-message-list');
        let $message = document.createElement('c-message');
        $message.setAttribute('data-message', newMessage);
        rootEl.appendChild($message);
      }
    }

  }
  customElements.define('message-list', MessageList);

  var emojiData = [{
    name: 'People',
    emojis: ['😄', '😃', '😀', '😊', '😉', '😍', '😘', '😚', '😗', '😙', '😜', '😝', '😛', '😳', '😁', '😔', '😌', '😒', '😞', '😣', '😢', '😂', '😭', '😪', '😥', '😰', '😅', '😓', '😩', '😫', '😨', '😱', '😠', '😡', '😤', '😖', '😆', '😋', '😷', '😎', '😴', '😵', '😲', '😟', '😦', '😧', '👿', '😮', '😬', '😐', '😕', '😯', '😏', '😑', '👲', '👳', '👮', '👷', '💂', '👶', '👦', '👧', '👨', '👩', '👴', '👵', '👱', '👼', '👸', '😺', '😸', '😻', '😽', '😼', '🙀', '😿', '😹', '😾', '👹', '👺', '🙈', '🙉', '🙊', '💀', '👽', '💩', '🔥', '✨', '🌟', '💫', '💥', '💢', '💦', '💧', '💤', '💨', '👂', '👀', '👃', '👅', '👄', '👍', '👎', '👌', '👊', '✊', '👋', '✋', '👐', '👆', '👇', '👉', '👈', '🙌', '🙏', '👏', '💪', '🚶', '🏃', '💃', '👫', '👪', '💏', '💑', '👯', '🙆', '🙅', '💁', '🙋', '💆', '💇', '💅', '👰', '🙎', '🙍', '🙇', '🎩', '👑', '👒', '👟', '👞', '👡', '👠', '👢', '👕', '👔', '👚', '👗', '🎽', '👖', '👘', '👙', '💼', '👜', '👝', '👛', '👓', '🎀', '🌂', '💄', '💛', '💙', '💜', '💚', '💔', '💗', '💓', '💕', '💖', '💞', '💘', '💌', '💋', '💍', '💎', '👤', '💬', '👣']
  }, {
    name: 'Nature',
    emojis: ['🐶', '🐺', '🐱', '🐭', '🐹', '🐰', '🐸', '🐯', '🐨', '🐻', '🐷', '🐽', '🐮', '🐗', '🐵', '🐒', '🐴', '🐑', '🐘', '🐼', '🐧', '🐦', '🐤', '🐥', '🐣', '🐔', '🐍', '🐢', '🐛', '🐝', '🐜', '🐞', '🐌', '🐙', '🐚', '🐠', '🐟', '🐬', '🐳', '🐎', '🐲', '🐡', '🐫', '🐩', '🐾', '💐', '🌸', '🌷', '🍀', '🌹', '🌻', '🌺', '🍁', '🍃', '🍂', '🌿', '🌾', '🍄', '🌵', '🌴', '🌰', '🌱', '🌼', '🌑', '🌓', '🌔', '🌕', '🌛', '🌙', '🌏', '🌋', '🌌', '🌠', '⛅', '⛄', '🌀', '🌁', '🌈', '🌊']
  }, {
    name: 'Objects',
    emojis: ['🎍', '💝', '🎎', '🎒', '🎓', '🎏', '🎆', '🎇', '🎐', '🎑', '🎃', '👻', '🎅', '🎄', '🎁', '🎋', '🎉', '🎊', '🎈', '🎌', '🔮', '🎥', '📷', '📹', '📼', '💿', '📀', '💽', '💾', '💻', '📱', '📞', '📟', '📠', '📡', '📺', '📻', '🔊', '🔔', '📢', '📣', '⏳', '⌛', '⏰', '⌚', '🔓', '🔒', '🔏', '🔐', '🔑', '🔎', '💡', '🔦', '🔌', '🔋', '🔍', '🛀', '🚽', '🔧', '🔩', '🔨', '🚪', '🚬', '💣', '🔫', '🔪', '💊', '💉', '💰', '💴', '💵', '💳', '💸', '📲', '📧', '📥', '📤', '📩', '📨', '📫', '📪', '📮', '📦', '📝', '📄', '📃', '📑', '📊', '📈', '📉', '📜', '📋', '📅', '📆', '📇', '📁', '📂', '📌', '📎', '📏', '📐', '📕', '📗', '📘', '📙', '📓', '📔', '📒', '📚', '📖', '🔖', '📛', '📰', '🎨', '🎬', '🎤', '🎧', '🎼', '🎵', '🎶', '🎹', '🎻', '🎺', '🎷', '🎸', '👾', '🎮', '🃏', '🎴', '🀄', '🎲', '🎯', '🏈', '🏀', '⚽', '⚾', '🎾', '🎱', '🎳', '⛳', '🏁', '🏆', '🎿', '🏂', '🏊', '🏄', '🎣', '🍵', '🍶', '🍺', '🍻', '🍸', '🍹', '🍷', '🍴', '🍕', '🍔', '🍟', '🍗', '🍖', '🍝', '🍛', '🍤', '🍱', '🍣', '🍥', '🍙', '🍘', '🍚', '🍜', '🍲', '🍢', '🍡', '🍳', '🍞', '🍩', '🍮', '🍦', '🍨', '🍧', '🎂', '🍰', '🍪', '🍫', '🍬', '🍭', '🍯', '🍎', '🍏', '🍊', '🍒', '🍇', '🍉', '🍓', '🍑', '🍈', '🍌', '🍍', '🍠', '🍆', '🍅', '🌽']
  }, {
    name: 'Places',
    emojis: ['🏠', '🏡', '🏫', '🏢', '🏣', '🏥', '🏦', '🏪', '🏩', '🏨', '💒', '⛪', '🏬', '🌇', '🌆', '🏯', '🏰', '⛺', '🏭', '🗼', '🗾', '🗻', '🌄', '🌅', '🌃', '🗽', '🌉', '🎠', '🎡', '⛲', '🎢', '🚢', '⛵', '🚤', '🚀', '💺', '🚉', '🚄', '🚅', '🚇', '🚃', '🚌', '🚙', '🚗', '🚕', '🚚', '🚨', '🚓', '🚒', '🚑', '🚲', '💈', '🚏', '🎫', '🚥', '🚧', '🔰', '⛽', '🏮', '🎰', '🗿', '🎪', '🎭', '📍', '🚩']
  }, {
    name: 'Symbols',
    emojis: ['🔟', '🔢', '🔣', '🔠', '🔡', '🔤', '🔼', '🔽', '⏪', '⏩', '⏫', '⏬', '🆗', '🆕', '🆙', '🆒', '🆓', '🆖', '📶', '🎦', '🈁', '🈯', '🈳', '🈵', '🈴', '🈲', '🉐', '🈹', '🈺', '🈶', '🈚', '🚻', '🚹', '🚺', '🚼', '🚾', '🚭', '🈸', '🉑', '🆑', '🆘', '🆔', '🚫', '🔞', '⛔', '❎', '✅', '💟', '🆚', '📳', '📴', '🆎', '💠', '⛎', '🔯', '🏧', '💹', '💲', '💱', '❌', '❗', '❓', '❕', '❔', '⭕', '🔝', '🔚', '🔙', '🔛', '🔜', '🔃', '🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '➕', '➖', '➗', '💮', '💯', '🔘', '🔗', '➰', '🔱', '🔺', '🔲', '🔳', '🔴', '🔵', '🔻', '⬜', '⬛', '🔶', '🔷', '🔸', '🔹']
  }];

  var markup$4 = "<div class=\"sc-emoji-picker--category\">\n  <div class=\"sc-emoji-picker--category-title\"></div>\n</div>\n";

  var style$6 = ".sc-emoji-picker--category {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n\n.sc-emoji-picker--category-title {\n    min-width: 100%;\n    color: #b8c3ca;\n    font-weight: 200;\n    font-size: 13px;\n    margin: 5px;\n    letter-spacing: 1px;\n}\n";

  var markup$5 = "<span class=\"sc-emoji-picker--emoji\"></span>\n";

  var style$7 = ".sc-emoji-picker--emoji {\n    margin: 5px;\n    width: 30px;\n    line-height: 30px;\n    text-align: center;\n    cursor: pointer;\n    vertical-align: middle;\n    font-size: 28px;\n    transition: transform 60ms ease-out,-webkit-transform 60ms ease-out;\n}\n\n.sc-emoji-picker--emoji:hover {\n    transform: scale(1.4);\n}\n";

  const template$6 = document.createElement('template');
  template$6.innerHTML = `
<style>
${style$7}
</style>
${markup$5}
`;
  class Emoji extends elementMixin {
    constructor() {
      super(template$6);
    }

    static get observedAttributes() {
      return ['emoji'];
    }

    connectedCallback() {
      let $root = this.$('.sc-emoji-picker--emoji');
      $root.addEventListener('click', e => {
        let emoji = e.target.textContent.trim();
        let _message = {
          author: 'me',
          type: 'emoji',
          data: {
            emoji
          }
        };
        this.dispatchEvent(new CustomEvent('send-message', {
          bubbles: true,
          composed: true,
          detail: JSON.stringify(_message)
        }));
        this.dispatchEvent(new Event('close-picker', {
          bubbles: true,
          composed: true
        }));
      });
    }

    attributeChangedCallback() {
      let emoji = this.getAttribute('emoji');

      if (emoji) {
        let $root = this.$('.sc-emoji-picker--emoji');
        $root.innerHTML = emoji;
      }
    }

  }
  customElements.define('c-emoji', Emoji);

  const template$7 = document.createElement('template');
  template$7.innerHTML = `
<style>
${style$6}
</style>
${markup$4}
`;
  class EmojiCategory extends elementMixin {
    constructor() {
      super(template$7);
    }

    static get observedAttributes() {
      return ['category'];
    }

    connectedCallback() {
      let category = JSON.parse(this.getAttribute('category'));

      if (category) {
        let $title = this.$('.sc-emoji-picker--category-title');
        $title.innerHTML = category.name;
        let $category = this.$('.sc-emoji-picker--category');
        category.emojis.map(emoji => {
          let $emoji = document.createElement('c-emoji');
          $emoji.setAttribute('emoji', emoji);
          $category.appendChild($emoji);
        });
      }
    }

    attributeChangedCallback() {
      let category = JSON.parse(this.getAttribute('category'));

      if (category) {
        let $title = this.$('.sc-emoji-picker--category-title');
        $title.innerHTML = category.name;
        let $category = this.$('.sc-emoji-picker--category');
        category.emojis.map(emoji => {
          let $emoji = document.createElement('c-emoji');
          $emoji.setAttribute('emoji', emoji);
          $category.appendChild($emoji);
        });
      }
    }

  }
  customElements.define('emoji-category', EmojiCategory);

  var style$8 = ".sc-emoji-picker {\n    position: absolute;\n    bottom: 50px;\n    right: 0px;\n    width: 330px;\n    max-height: 215px;\n    box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);\n    background: white;\n    border-radius: 10px;\n    outline: none;\n}\n\n.sc-emoji-picker:after {\n    content: \"\";\n    width: 14px;\n    height: 14px;\n    background: white;\n    position: absolute;\n    bottom: -6px;\n    right: 30px;\n    transform: rotate(45deg);\n    border-radius: 2px;\n}\n\n.sc-emoji-picker--content {\n    padding: 10px;\n    overflow: auto;\n    width: 100%;\n    max-height: 195px;\n    margin-top: 7px;\n    box-sizing: border-box;\n}\n\n\n\n.sc-emoji-picker--emoji {\n    margin: 5px;\n    width: 30px;\n    line-height: 30px;\n    text-align: center;\n    cursor: pointer;\n    vertical-align: middle;\n    font-size: 28px;\n    transition: transform 60ms ease-out,-webkit-transform 60ms ease-out;\n}\n\n.sc-emoji-picker--emoji:hover {\n    transform: scale(1.4);\n}\n";

  var html$2 = "<div tab-index=\"0\" class=\"sc-emoji-picker\" >\n        <div class=\"sc-emoji-picker--content\">\n        </div>\n      </div>\n\n";

  const template$8 = document.createElement('template');
  template$8.innerHTML = `
<style>
${style$8}
</style>
${html$2}
`;
  class EmojiPicker extends elementMixin {
    constructor() {
      super(template$8);
    }

    connectedCallback() {
      let $content = this.$('.sc-emoji-picker--content');
      emojiData.map(category => {
        let $category = document.createElement('emoji-category');
        $category.setAttribute('category', JSON.stringify(category));
        $content.appendChild($category);
        category.emojis.map(emoji => {
          let $emoji = document.createElement('c-emoji');
          $emoji.setAttribute('emoji', emoji);
          $category.appendChild($emoji);
        });
      });
    }

  }
  customElements.define('emoji-picker', EmojiPicker);

  var style$9 = ".sc-user-input--emoji-icon-wrapper {\n    background: none;\n    border: none;\n    padding: 0px;\n    margin: 0px;\n}\n\n.sc-user-input--emoji-icon-wrapper:focus {\n    outline: none;\n}\n\n.sc-user-input--emoji-icon {\n    height: 18px;\n    cursor: pointer;\n    align-self: center;\n}\n\n.sc-user-input--emoji-icon path, .sc-user-input--emoji-icon circle {\n    fill: rgba(86, 88, 103, 0.3);\n}\n\n.sc-user-input--emoji-icon-wrapper:focus .sc-user-input--emoji-icon path,\n.sc-user-input--emoji-icon-wrapper:focus .sc-user-input--emoji-icon circle,\n.sc-user-input--emoji-icon.active path,\n.sc-user-input--emoji-icon.active circle,\n.sc-user-input--emoji-icon:hover path,\n.sc-user-input--emoji-icon:hover circle {\n    fill: rgba(86, 88, 103, 1);\n}\n";

  var html$3 = "<div class=\"sc-user-input--picker-wrapper\">\n        <emoji-picker hidden></emoji-picker>\n      <button class=\"sc-user-input--emoji-icon-wrapper\">\n        <svg\n          class=\"sc-user-input--emoji-icon\"\n          version=\"1.1\"\n          id=\"Layer_2\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          x=\"0px\"\n          y=\"0px\"\n          width=\"37.393px\"\n          height=\"37.393px\"\n          viewBox=\"0 0 37.393 37.393\"\n          enableBackground=\"new 0 0 37.393 37.393\"\n        >\n          <g>\n            <path d=\"M18.696,37.393C8.387,37.393,0,29.006,0,18.696C0,8.387,8.387,0,18.696,0c10.31,0,18.696,8.387,18.696,18.696\n              C37.393,29.006,29.006,37.393,18.696,37.393z M18.696,2C9.49,2,2,9.49,2,18.696c0,9.206,7.49,16.696,16.696,16.696\n              c9.206,0,16.696-7.49,16.696-16.696C35.393,9.49,27.902,2,18.696,2z\"\n            />\n          </g>\n          <g>\n            <circle cx=\"12.379\" cy=\"14.359\" r=\"1.938\" />\n          </g>\n          <g>\n            <circle cx=\"24.371\" cy=\"14.414\" r=\"1.992\" />\n          </g>\n          <g>\n            <path d=\"M18.035,27.453c-5.748,0-8.342-4.18-8.449-4.357c-0.286-0.473-0.135-1.087,0.338-1.373\n              c0.471-0.286,1.084-0.136,1.372,0.335c0.094,0.151,2.161,3.396,6.74,3.396c4.713,0,7.518-3.462,7.545-3.497\n              c0.343-0.432,0.973-0.504,1.405-0.161c0.433,0.344,0.505,0.973,0.161,1.405C27.009,23.374,23.703,27.453,18.035,27.453z\"\n            />\n          </g>\n        </svg>\n      </button>\n      </div>\n";

  const template$9 = document.createElement('template');
  template$9.innerHTML = `
<style>
${style$9}
</style>
${html$3}
`;
  class EmojiIcon extends elementMixin {
    constructor() {
      super(template$9);
      this.active = false;
    }

    connectedCallback() {
      let $btn = this.$('.sc-user-input--emoji-icon-wrapper');
      $btn.addEventListener('click', e => {
        this.togglePicker();
      });
      this.addEventListener('close-picker', e => {
        this.active = false;
        let $picker = this.$('emoji-picker');
        let $svg = this.$('.sc-user-input--emoji-icon');
        $picker.setAttribute('hidden', '');
        $svg.classList.remove('active');
      });
    }

    togglePicker() {
      this.active = !this.active;
      let isActive = this.active;
      let $picker = this.$('emoji-picker');
      let $svg = this.$('.sc-user-input--emoji-icon');

      if (isActive) {
        $picker.removeAttribute('hidden');
        $svg.classList.add('active');
      } else {
        $picker.setAttribute('hidden', '');
        $svg.classList.remove('active');
      }
    }

  }
  customElements.define('emoji-icon', EmojiIcon);

  var style$a = ".sc-user-input--send-icon {\n    height: 20px;\n    width: 20px;\n    cursor: pointer;\n    align-self: center;\n    outline: none;\n}\n\n.sc-user-input--send-icon path {\n    fill: rgba(86, 88, 103, 0.3);\n}\n\n.sc-user-input--send-icon:hover path {\n    fill: rgba(86, 88, 103, 1);\n}\n\n.sc-user-input--send-icon-wrapper {\n    background: none;\n    border: none;\n    padding: 0px;\n    margin: 0px;\n}\n";

  var html$4 = "<button class=\"sc-user-input--send-icon-wrapper\">\n      <svg\n        version='1.1'\n        class=\"sc-user-input--send-icon\"\n        xmlns='http://www.w3.org/2000/svg'\n        x='0px'\n        y='0px'\n        width='37.393px'\n        height='37.393px'\n        viewBox='0 0 37.393 37.393'\n        enableBackground='new 0 0 37.393 37.393'>\n        <g id='Layer_2'>\n          <path d='M36.511,17.594L2.371,2.932c-0.374-0.161-0.81-0.079-1.1,0.21C0.982,3.43,0.896,3.865,1.055,4.241l5.613,13.263\n          L2.082,32.295c-0.115,0.372-0.004,0.777,0.285,1.038c0.188,0.169,0.427,0.258,0.67,0.258c0.132,0,0.266-0.026,0.392-0.08\n          l33.079-14.078c0.368-0.157,0.607-0.519,0.608-0.919S36.879,17.752,36.511,17.594z M4.632,30.825L8.469,18.45h8.061\n          c0.552,0,1-0.448,1-1s-0.448-1-1-1H8.395L3.866,5.751l29.706,12.757L4.632,30.825z' />\n        </g>\n      </svg>\n    </button>\n";

  const template$a = document.createElement('template');
  template$a.innerHTML = `
<style>
${style$a}
</style>
${html$4}
`;
  class SendIcon extends elementMixin {
    constructor() {
      super(template$a);
    }

  }
  customElements.define('send-icon', SendIcon);

  var style$b = ".sc-user-input {\n  min-height: 55px;\n  margin: 0px;\n  position: relative;\n  bottom: 0;\n  display: flex;\n  background-color: #f4f7f9;\n  border-bottom-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n  transition: background-color .2s ease,box-shadow .2s ease;\n}\n\n\n.sc-user-input--text {\n  width: 300px;\n  resize: none;\n  border: none;\n  outline: none;\n  border-bottom-left-radius: 10px;\n  box-sizing: border-box;\n  padding: 18px;\n  font-size: 15px;\n  font-weight: 400;\n  line-height: 1.33;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  color: #565867;\n  -webkit-font-smoothing: antialiased;\n  max-height: 200px;\n  overflow: scroll;\n  bottom: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n.sc-user-input--text:empty:before {\n  content: attr(placeholder);\n  display: block; /* For Firefox */\n  color: rgba(86, 88, 103, 0.3);\n  outline: none;\n}\n\n.sc-user-input--buttons {\n  width: 100px;\n  position: absolute;\n  right: 30px;\n  height: 100%;\n  display: flex;\n}\n\n.sc-user-input--button:first-of-type {\n  width: 40px;\n}\n\n.sc-user-input--button {\n  width: 30px;\n  height: 55px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.sc-user-input.active {\n  box-shadow: none;\n  background-color: white;\n  box-shadow: 0px -5px 20px 0px rgba(150, 165, 190, 0.2);\n}\n\n.sc-user-input--send-icon {\n  height: 20px;\n  width: 20px;\n  cursor: pointer;\n  align-self: center;\n  outline: none;\n}\n\n.sc-user-input--send-icon path {\n  fill: rgba(86, 88, 103, 0.3);\n}\n\n.sc-user-input--send-icon:hover path {\n  fill: rgba(86, 88, 103, 1);\n}\n\n.sc-user-input--emoji-icon-wrapper,\n.sc-user-input--send-icon-wrapper {\n  background: none;\n  border: none;\n  padding: 0px;\n  margin: 0px;\n}\n\n.sc-user-input--emoji-icon-wrapper:focus {\n  outline: none;\n}\n\n.sc-user-input--emoji-icon {\n  height: 18px;\n  cursor: pointer;\n  align-self: center;\n}\n\n.sc-user-input--emoji-icon path, .sc-user-input--emoji-icon circle {\n  fill: rgba(86, 88, 103, 0.3);\n}\n\n.sc-user-input--emoji-icon-wrapper:focus .sc-user-input--emoji-icon path,\n.sc-user-input--emoji-icon-wrapper:focus .sc-user-input--emoji-icon circle,\n.sc-user-input--emoji-icon.active path,\n.sc-user-input--emoji-icon.active circle,\n.sc-user-input--emoji-icon:hover path,\n.sc-user-input--emoji-icon:hover circle {\n  fill: rgba(86, 88, 103, 1);\n}\n";

  var html$5 = "<form class=\"sc-user-input\">\n        <div\n          role=\"button\"\n          tabIndex=\"0\"\n          contentEditable=\"true\"\n          placeholder=\"Write a reply...\"\n          class=\"sc-user-input--text\"\n        >\n        </div>\n        <div class=\"sc-user-input--buttons\">\n          <div class=\"sc-user-input--button\"></div>\n          <div class=\"sc-user-input--button\">\n            <emoji-icon/>\n          </div>\n          <div class=\"sc-user-input--button\">\n            <send-icon/>\n          </div>\n        </div>\n      </form>\n";

  const template$b = document.createElement('template');
  template$b.innerHTML = `
<style>
${style$b}
</style>
${html$5}
`;
  class UserInput extends elementMixin {
    constructor() {
      super(template$b);
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

  var style$c = ".sc-chat-window {\n    width: 370px;\n    height: calc(100% - 120px);\n    max-height: 490px;\n    position: fixed;\n    right: 25px;\n    bottom: 230px;\n    box-sizing: border-box;\n    box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);\n    background: white;\n    transition: 0.3s ease-in-out;\n    border-radius: 10px;\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n\n.sc-chat-window.closed {\n    opacity: 0;\n    visibility: hidden;\n    bottom: 90px;\n}\n";

  var html$6 = "<div class=\"sc-chat-window\">\n  <widget-header team-name=\"\" image-url=\"\"></widget-header>\n  <message-list new-message=\"\"></message-list>\n  <user-input></user-input>\n</div>\n";

  const template$c = document.createElement('template');
  template$c.innerHTML = `
<style>
${style$c}
</style>
${html$6}
  `;
  class ChatWindow extends elementMixin {
    constructor() {
      super(template$c);
      this.addEventListener('send-message', this.sendMessage.bind(this));
    }

    static get observedAttributes() {
      return ['disabled', 'open', 'team-name', 'image-url'];
    }

    sendMessage(e) {
      let $msgList = this.$('message-list');
      $msgList.setAttribute('new-message', e.detail);
    }

    get open() {
      return this.hasAttribute('open');
    }

    connectedCallback() {
      let className = this.open ? "opened" : "closed";
      let rootEl = this.shadowRoot.querySelector('.sc-chat-window');
      rootEl.classList.add(className);
    }

    attributeChangedCallback() {
      let rootEl = this.$('.sc-chat-window');

      if (this.open) {
        rootEl.classList.remove('closed');
        rootEl.classList.add('opened');
      } else {
        rootEl.classList.remove('opened');
        rootEl.classList.add('closed');
      }

      let header = this.$('widget-header');
      header.setAttribute('team-name', this.getAttribute('team-name'));
      header.setAttribute('image-url', this.getAttribute('image-url'));
    }

  }
  customElements.define('chat-window', ChatWindow);

  var style$d = ".sc-launcher {\n  width: 60px;\n  height: 60px;\n  background-color: #4e8cff;\n  background-position: center;\n  background-repeat: no-repeat;\n  position: fixed;\n  right: 25px;\n  bottom: 25px;\n  border-radius: 50%;\n  box-shadow: none;\n  transition: box-shadow 0.2s ease-in-out;\n}\n\n.sc-launcher:before {\n  content: '';\n  position: relative;\n  display: block;\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  transition: box-shadow 0.2s ease-in-out;\n}\n\n.sc-launcher .sc-open-icon,\n.sc-launcher .sc-closed-icon {\n  width: 60px;\n  height: 60px;\n  position: fixed;\n  right: 25px;\n  bottom: 25px;\n  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;\n}\n\n.sc-launcher .sc-closed-icon {\n  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;\n  width: 60px;\n  height: 60px;\n}\n\n.sc-launcher .sc-open-icon {\n  padding: 20px;\n  box-sizing: border-box;\n  opacity: 0;\n}\n\n.sc-launcher.opened .sc-open-icon {\n  transform: rotate(-90deg);\n  opacity: 1;\n}\n\n.sc-launcher.opened .sc-closed-icon {\n  transform: rotate(-90deg);\n  opacity: 0;\n}\n\n.sc-launcher.opened:before {\n  box-shadow: 0px 0px 400px 250px rgba(148, 149, 150, 0.2);\n}\n\n.sc-launcher:hover {\n  box-shadow: 0 0px 27px 1.5px rgba(0,0,0,0.2);\n}\n";

  var html$7 = "<div>\n<div></div>\n        <div class=\"sc-launcher\">\n  <message-count count=\"0\"></message-count>\n          <img class=\"sc-open-icon\" src=\"assets/img/close-icon.png\" />\n          <img class=\"sc-closed-icon\" src=\"assets/img/chat-icon.svg\" />\n        </div>\n<chat-window team-name=\"\" image-url=\"\"></chat-window>\n</div>\n";

  const template$d = document.createElement('template');
  template$d.innerHTML = `
<style>
${style$d}
</style>
${html$7}
  `;
  class Launcher extends elementMixin {
    constructor() {
      super(template$d);
      this.addEventListener('toggle-launcher', e => {
        this.toggleChat();
      });
    }

    toggleChat() {
      let rootEl = this.$('.sc-launcher');
      let isOpen = rootEl.classList.toggle('opened');
      let chatWindow = this.$('chat-window');
      let messageCount = this.$('message-count');

      if (isOpen) {
        chatWindow.setAttribute('open', '');
        messageCount.setAttribute('open', '');
      } else {
        chatWindow.removeAttribute('open');
        messageCount.removeAttribute('open');
      }
    }

    connectedCallback() {
      let rootEl = this.$('.sc-launcher'); // Setup a click listener

      rootEl.addEventListener('click', e => {
        this.toggleChat();
      });
      Promise.all([customElements.whenDefined('chat-window'), customElements.whenDefined('message-list'), customElements.whenDefined('widget-header')]).then(_ => {
        let chatWindow = this.$('chat-window');
        chatWindow.setAttribute('team-name', this.getAttribute('team-name'));
        chatWindow.setAttribute('image-url', this.getAttribute('image-url'));
      });
    }

  }
  customElements.define('c-launcher', Launcher);

  var style$e = ".demo-test-area {\n    width: 300px;\n    box-sizing: border-box;\n    align-self: center;\n    text-align: center;\n}\n\n.demo-test-area--text {\n    box-sizing: border-box;\n    width: 100%;\n    margin: 0px;\n    padding: 0px;\n    resize: none;\n    font-family: Avenir Next, Helvetica Neue, Helvetica,sans-serif;\n    background: #fafbfc;\n    color: #8da2b5;\n    border: 1px solid #dde5ed;\n    font-size: 16px;\n    padding: 16px 15px 14px;\n    margin: 0;\n    border-radius: 6px;\n    outline: none;\n    height: 150px;\n    margin-bottom: 10px;\n}\n\n\n\n.demo-test-area--preamble {\n    padding: 20px 0px;\n}\n\n.demo-test-area--button {\n    font-family: Avenir Next, Helvetica Neue, Helvetica,sans-serif;\n    font-weight: 400;\n    margin-top: 20px;\n    user-select: none;\n    border: none;\n    line-height: 1.4;\n    text-decoration: none;\n    background: linear-gradient(45deg,#EEA849,#F46B45);\n    color: white;\n    padding: 6px 10px;\n    font-size: 20px;\n    height: 50px;\n    border-radius: 4px;\n    width: 80%;\n    box-sizing: border-box;\n    outline: none;\n    cursor: pointer;\n    align-self: center;\n}\n\n.demo-test-area--button:hover {\n    background: linear-gradient(45deg,#F46B45 , #EEA849);\n}\n";

  var html$8 = "<form class=\"demo-test-area\">\n  <div class=\"demo-test-area--preamble\">Test the chat window by sending a message:</div>\n  <textarea class=\"demo-test-area--text\" placeholder=\"Write a test message....\"></textarea>\n  <button class=\"demo-test-area--button\"> Send Message! </button>\n</form>\n";

  const template$e = document.createElement('template');
  template$e.innerHTML = `
<style>
${style$e}
</style>
${html$8}
`;
  class Demo extends elementMixin {
    constructor() {
      super(template$e);
    }

    connectedCallback() {
      let $btn = this.$('.demo-test-area--button');
      $btn.addEventListener('click', e => {
        e.preventDefault();
        let $textarea = this.$('.demo-test-area--text');
        let text = $textarea.value;
        let _message = {
          author: 'them',
          type: 'text',
          data: {
            text
          }
        };
        let $launcher = this.ownerDocument.querySelector('c-launcher');
        let $chatwindow = $launcher.shadowRoot.querySelector('chat-window');
        $chatwindow.dispatchEvent(new CustomEvent('send-message', {
          bubbles: true,
          composed: true,
          detail: JSON.stringify(_message)
        }));
        $textarea.value = '';
      });
    }

  }
  customElements.define('c-demo', Demo);

}());
//# sourceMappingURL=bundle.js.map
