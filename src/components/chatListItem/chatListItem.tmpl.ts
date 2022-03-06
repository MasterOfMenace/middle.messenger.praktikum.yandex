const template = `
<li class="chat-list__item">
  {{avatar}}
  <div class="short-message">
    <div class="short-message__user">
      <span class="short-message__user-name">{{userName}}</span>
      <span class="short-message__time">{{messageTime}}</span>
    </div>
    <div class="short-message__message">
      <span>{{message}}</span>
    </div>
  </div>
</li>
`;

export default template;
