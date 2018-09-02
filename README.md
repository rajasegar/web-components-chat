# web-components-chat
A Live chat application crafted entirely using Web components

## Demo
[Demo](https://rajasegar.github.io/web-components-chat/)

Works only in Chrome, Opera and Safari. For Firefox you need to enable flag for Web components / Custom Elements.

## Usage
Include script tag

```html
  <script src="bundle.js"></script>
```

Insert the component in markup
```html
      <c-launcher
        team-name="wc-live-chat"
        image-url="https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png">
      </c-launcher>
```

## Install
- `git clone https://github.com/rajasegar/web-components-chat`
- `cd web-components-chat`
- `npm install`
- `npm run dev`

Open http://localhost:5000 in your browser

## Credits
King of the Stack 

Heavily inspired by the React version of react-chat-window
[https://github.com/kingofthestack/react-chat-window](kingofthestack)
