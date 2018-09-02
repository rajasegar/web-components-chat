(function () {
  'use strict';

  const template = document.createElement('template');
  template.innerHTML = `
<style>
.sc-new-messages-count {
  position: absolute;
  top: -3px;
  left: 41px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
	width: 22px;
  height: 22px;
  background: #ff4646;
  color: white;
  text-align: center;
  margin: auto;
  font-size: 12px;
  font-weight: 500;
}
</style>
<div class="sc-new-messages-count"></div>
  `;
  class MessageCount extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({
        mode: 'open'
      });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      let count = this.getAttribute('count');
      let root = this.shadowRoot.querySelector('.sc-new-messages-count');
      root.textContent = count;
    }

  }
  customElements.define('message-count', MessageCount);

  const template$1 = document.createElement('template');
  template$1.innerHTML = `
<style>
.sc-header {
  background: #4e8cff;
  min-height: 75px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  color: white;
  padding: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,.2);
  position: relative;
  box-sizing: border-box;
  display: flex;
}

.sc-header--img {
  border-radius: 50%;
  align-self: center;
  padding: 10px;
}

.sc-header--team-name {
  align-self: center;
  padding: 10px;
  flex: 1;
  user-select: none;
  cursor: pointer;
  border-radius: 5px;
}

.sc-header--team-name:hover {
  background: #4882ed;
}

.sc-header--close-button {
  width: 40px;
  align-self: center;
  height: 40px;
  margin-right: 10px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 5px;
}

.sc-header--close-button:hover {
  background: #4882ed;
}

.sc-header--close-button img {
  width: 100%;
  height: 100%;
  padding: 13px;
  box-sizing: border-box;
}

@media (max-width: 450px) {
  .sc-header {
    border-radius: 0px;
  }
}
</style>
<div class="sc-header">
        <img class="sc-header--img" src="" alt="" />
        <div class="sc-header--team-name"></div>
        <div class="sc-header--close-button">
          <img src="assets/img/close-icon.png" alt="" />
        </div>
      </div>
  `;
  class Header extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({
        mode: 'open'
      });
      shadowRoot.appendChild(template$1.content.cloneNode(true));
    }

    static get observedAttributes() {
      return ['team-name', 'image-url'];
    }

    $(x) {
      return this.shadowRoot.querySelector(x);
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

  var markup = "<div class=\"sc-message\">\n  <div class=\"sc-message--content\">\n    <div class=\"sc-message--avatar\" style=\"background-image: url('/assets/img/chat-icon.svg')\"></div>\n  </div>\n</div>\n";

  var style = ".sc-message {\n  width: 300px;\n  margin: auto;\n  padding-bottom: 10px;\n  display: flex;\n}\n\n.sc-message--content {\n  width: 100%;\n  display: flex;\n}\n\n.sc-message--content.sent {\n  justify-content: flex-end;\n}\n\n.sc-message--content.sent .sc-message--avatar {\n  display: none;\n}\n\n.sc-message--avatar {\n  background-image: url(https://d13yacurqjgara.cloudfront.net/assets/avatar-default-aa2eab7684294781f93bc99ad394a0eb3249c5768c21390163c9f55ea8ef83a4.gif);\n  background-repeat: no-repeat;\n  background-size: 100%;\n  background-position: center;\n  min-width: 30px;\n  min-height: 30px;\n  border-radius: 50%;\n  align-self: center;\n  margin-right: 15px;\n}\n\n@media (max-width: 450px) {\n  .sc-message {\n    width: 80%;\n  }\n}\n";

  var markup$1 = "<div class=\"sc-message--emoji\"></div>\n";

  var style$1 = ".sc-message--emoji {\n    font-size: 40px;\n}\n\n";

  const template$2 = document.createElement('template');
  template$2.innerHTML = `
<style>
${style$1}
</style>
${markup$1}
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

  var markup$2 = "<div class=\"sc-message--text\"></div>\n";

  var style$2 = ".sc-message--text {\n    padding: 17px 20px;\n    font-weight: 300;\n    font-size: 14px;\n    line-height: 1.4;\n    white-space: pre-wrap;\n    -webkit-font-smoothing: subpixel-antialiased\n}\n\n:host {\n    border-radius: 6px;\n}\n\n:host([data-sent]) {\n    color: white;\n    background-color: #4e8cff;\n    max-width: calc(100% - 120px);\n    word-wrap: break-word;\n}\n\n:host([data-received])  {\n    color: #263238;\n    background-color: #f4f7f9;\n    margin-right: 40px;\n}\n";

  const template$3 = document.createElement('template');
  template$3.innerHTML = `
<style>
${style$2}
</style>
${markup$2}
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
${style}
</style>
${markup}
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

  var messageHistory = [{
    type: 'text',
    author: "me",
    data: {
      text: "Why don't they have salsa on the table?"
    }
  },
  /*
  {
  type: 'text',
  author: "them",
  data: {
  text: "What do you need salsa for?"
  }
  },
  {
  type: 'text',
  author: "me",
  data: {
  text: "Salsa is now the number one condiment in America."
  }
  },
  {
  type: 'text',
  author: "them",
  data: {
  text: "You know why? Because people like to say 'salsa.' 'Excuse me, do you have salsa?' 'We need more salsa.' 'Where is the salsa? No salsa?'"
  }
  },
  {
  type: 'text',
  author: "me",
  data: {
  text: "You know it must be impossible for a Spanish person to order seltzer and not get salsa. 'I wanted seltzer, not salsa.'"
  }
  },
  {
  type: 'text',
  author: "them",
  data: {
  text: "Don't you know the difference between seltzer and salsa?? You have the seltezer after the salsa!"
  }
  },
  {
  type: 'text',
  author: "me",
  data: {
  text: "See, this should be a show. This is the show. "
  }
  },
  {
  type: 'text',
  author: "them",
  data: {
  text: "What?"
  }
  },
  {
  type: 'text',
  author: "me",
  data: {
  text: "This. Just talking."
  }
  },
  {
  type: 'text',
  author: "them",
  data: {
  text: "Yeah, right."
  }
  },
  {
  type: 'text',
  author: "me",
  data: {
  text: "I'm really serious. I think that's a good idea. "
  }
  },
  {
  type: 'text',
  author: "them",
  data: {
  text: "Just talking? Well what's the show about?"
  }
  },
  {
  type: 'text',
  author: "me",
  data: {
  text: "It's about nothing."
  }
  },
  {
  type: 'text',
  author: "them",
  data: {
  text: "No story?"
  }
  },
  {
  type: 'text',
  author: "me",
  data: {
  text: "No forget the story. "
  }
  },
  */
  {
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

  const template$5 = document.createElement('template');
  template$5.innerHTML = `
<style>
.sc-message-list {
  /* height: 80%; */
  height: 200px;
  overflow-y: auto;
  background-color: white;
  background-size: 100%;
  padding: 40px 0px;
}
</style>
<div class="sc-message-list"></div>
  `;
  class MessageList extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({
        mode: 'open'
      });
      shadowRoot.appendChild(template$5.content.cloneNode(true));
    }

    static get observedAttributes() {
      return ['new-message', 'new-emoji'];
    }

    $(x) {
      return this.shadowRoot.querySelector(x);
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
      /*
      let newEmoji = this.getAttribute('new-emoji');
      if (newEmoji) {
        let rootEl = this.$('.sc-message-list');
        let $message = document.createElement('c-message');
        $message.setAttribute('data-emoji', newEmoji);
        rootEl.appendChild($message);
       }
      */

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

  var markup$3 = "<div class=\"sc-emoji-picker--category\">\n  <div class=\"sc-emoji-picker--category-title\"></div>\n</div>\n";

  var style$3 = ".sc-emoji-picker--category {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n\n.sc-emoji-picker--category-title {\n    min-width: 100%;\n    color: #b8c3ca;\n    font-weight: 200;\n    font-size: 13px;\n    margin: 5px;\n    letter-spacing: 1px;\n}\n";

  var markup$4 = "<span class=\"sc-emoji-picker--emoji\"></span>\n";

  var style$4 = ".sc-emoji-picker--emoji {\n    margin: 5px;\n    width: 30px;\n    line-height: 30px;\n    text-align: center;\n    cursor: pointer;\n    vertical-align: middle;\n    font-size: 28px;\n    transition: transform 60ms ease-out,-webkit-transform 60ms ease-out;\n}\n\n.sc-emoji-picker--emoji:hover {\n    transform: scale(1.4);\n}\n";

  const template$6 = document.createElement('template');
  template$6.innerHTML = `
<style>
${style$4}
</style>
${markup$4}
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
        console.log(e);
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
${style$3}
</style>
${markup$3}
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

  const template$8 = document.createElement('template');
  template$8.innerHTML = `
<style>
.sc-emoji-picker {
  position: absolute;
  bottom: 50px;
  right: 0px;
  width: 330px;
  max-height: 215px;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);
  background: white;
  border-radius: 10px;
  outline: none;
}

.sc-emoji-picker:after {
  content: "";
  width: 14px;
  height: 14px;
  background: white;
  position: absolute;
  bottom: -6px;
  right: 30px;
  transform: rotate(45deg);
  border-radius: 2px;
}

.sc-emoji-picker--content {
  padding: 10px;
  overflow: auto;
  width: 100%;
  max-height: 195px;
  margin-top: 7px;
  box-sizing: border-box;
}



.sc-emoji-picker--emoji {
  margin: 5px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  vertical-align: middle;
  font-size: 28px;
  transition: transform 60ms ease-out,-webkit-transform 60ms ease-out;
}

.sc-emoji-picker--emoji:hover {
  transform: scale(1.4);
}
</style>
<div tab-index="0" class="sc-emoji-picker" >
        <div class="sc-emoji-picker--content">
        </div>
      </div>

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

  const template$9 = document.createElement('template');
  template$9.innerHTML = `
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

  const template$a = document.createElement('template');
  template$a.innerHTML = `
<style>
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

.sc-user-input--send-icon-wrapper {
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
}
</style>
<button class="sc-user-input--send-icon-wrapper">
      <svg
        version='1.1'
        class="sc-user-input--send-icon"
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        width='37.393px'
        height='37.393px'
        viewBox='0 0 37.393 37.393'
        enableBackground='new 0 0 37.393 37.393'>
        <g id='Layer_2'>
          <path d='M36.511,17.594L2.371,2.932c-0.374-0.161-0.81-0.079-1.1,0.21C0.982,3.43,0.896,3.865,1.055,4.241l5.613,13.263
          L2.082,32.295c-0.115,0.372-0.004,0.777,0.285,1.038c0.188,0.169,0.427,0.258,0.67,0.258c0.132,0,0.266-0.026,0.392-0.08
          l33.079-14.078c0.368-0.157,0.607-0.519,0.608-0.919S36.879,17.752,36.511,17.594z M4.632,30.825L8.469,18.45h8.061
          c0.552,0,1-0.448,1-1s-0.448-1-1-1H8.395L3.866,5.751l29.706,12.757L4.632,30.825z' />
        </g>
      </svg>
    </button>
`;
  class SendIcon extends elementMixin {
    constructor() {
      super(template$a);
    }

  }
  customElements.define('send-icon', SendIcon);

  const template$b = document.createElement('template');
  template$b.innerHTML = `
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

  const template$c = document.createElement('template');
  template$c.innerHTML = `
<style>
.sc-chat-window {
  width: 370px;
  height: calc(100% - 120px);
  max-height: 590px;
  position: fixed;
  right: 25px;
  bottom: 100px;
  box-sizing: border-box;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.3s ease-in-out;
  border-radius: 10px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.sc-chat-window.closed {
  opacity: 0;
  visibility: hidden;
  bottom: 90px;
}
</style>
<div class="sc-chat-window">
          <widget-header team-name="" image-url=""></widget-header>
          <message-list new-message=""></message-list>
          <user-input></user-input>
        </div>
  `;
  class ChatWindow extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({
        mode: 'open'
      });
      shadowRoot.appendChild(template$c.content.cloneNode(true));
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

    $(x) {
      return this.shadowRoot.querySelector(x);
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

  const template$d = document.createElement('template');
  template$d.innerHTML = `
<style>
.sc-launcher {
  width: 60px;
  height: 60px;
  background-color: #4e8cff;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  right: 25px;
  bottom: 25px;
  border-radius: 50%;
  box-shadow: none;
  transition: box-shadow 0.2s ease-in-out;
}

.sc-launcher:before {
  content: '';
  position: relative;
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: box-shadow 0.2s ease-in-out;
}

.sc-launcher .sc-open-icon,
.sc-launcher .sc-closed-icon {
  width: 60px;
  height: 60px;
  position: fixed;
  right: 25px;
  bottom: 25px;
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
}

.sc-launcher .sc-closed-icon {
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
  width: 60px;
  height: 60px;
}

.sc-launcher .sc-open-icon {
  padding: 20px;
  box-sizing: border-box;
  opacity: 0;
}

.sc-launcher.opened .sc-open-icon {
  transform: rotate(-90deg);
  opacity: 1;
}

.sc-launcher.opened .sc-closed-icon {
  transform: rotate(-90deg);
  opacity: 0;
}

.sc-launcher.opened:before {
  box-shadow: 0px 0px 400px 250px rgba(148, 149, 150, 0.2);
}

.sc-launcher:hover {
  box-shadow: 0 0px 27px 1.5px rgba(0,0,0,0.2);
}

</style>
<div>
<div></div>
        <div class="sc-launcher">
  <message-count count="0"></message-count>
          <img class="sc-open-icon" src="assets/img/close-icon.png" />
          <img class="sc-closed-icon" src="assets/img/chat-icon.svg" />
        </div>
<chat-window team-name="" image-url=""></chat-window>
</div>
  `;
  class Launcher extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({
        mode: 'open'
      });
      shadowRoot.appendChild(template$d.content.cloneNode(true));
      this.addEventListener('toggle-launcher', e => {
        this.toggleChat();
      });
    }

    toggleChat() {
      let rootEl = this.shadowRoot.querySelector('.sc-launcher');
      let isOpen = rootEl.classList.toggle('opened');
      let chatWindow = this.shadowRoot.querySelector('chat-window');
      let messageCount = this.shadowRoot.querySelector('message-count');

      if (isOpen) {
        chatWindow.setAttribute('open', '');
        messageCount.setAttribute('open', '');
      } else {
        chatWindow.removeAttribute('open');
        messageCount.removeAttribute('open');
      }
    }

    connectedCallback() {
      let rootEl = this.shadowRoot.querySelector('.sc-launcher'); // Setup a click listener

      rootEl.addEventListener('click', e => {
        this.toggleChat();
      });
      Promise.all([customElements.whenDefined('chat-window'), customElements.whenDefined('message-list'), customElements.whenDefined('widget-header')]).then(_ => {
        let chatWindow = this.shadowRoot.querySelector('chat-window');
        chatWindow.setAttribute('team-name', this.getAttribute('team-name'));
        chatWindow.setAttribute('image-url', this.getAttribute('image-url'));
      });
    }

  }
  customElements.define('fd-launcher', Launcher);

}());
//# sourceMappingURL=bundle.js.map
