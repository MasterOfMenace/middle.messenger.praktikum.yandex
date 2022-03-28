const template = `
  <li class="chat-list__item {{currentClass}}">
    <div class="avatar avatar--message">
      <img src="{{avatarSrc}}" class="avatar__image" />
    </div>
    <div class="short-message">
      <div class="short-message__user">
        <span class="short-message__user-name">{{userName}}</span>
        <time class="short-message__time">{{messageTime}}</time>
      </div>
      <div class="short-message__message">
        <span>{{message}}</span>
      </div>
    </div>
  </li>
`;

export default template;
