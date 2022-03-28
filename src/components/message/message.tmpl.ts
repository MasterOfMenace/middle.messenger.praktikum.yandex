const template = `
<li class="messages-list__item message {{className}}">
  {{avatar}}
  <div class="message__message">
    <p class="message__text">
      {{message.text}}
    </p>
    <time class="message__time">{{message.time}}</time>
  </div>
</li>`;

export default template;
