const template = `
<li class={{className}}>
  {{avatar}}
  <div class="message__message">
    <p class="message__text">
    {{message.text}}
    </p>
    <p class="message__time">{{message.time}}</p>
  </div>
</li>
`;

export default template;
