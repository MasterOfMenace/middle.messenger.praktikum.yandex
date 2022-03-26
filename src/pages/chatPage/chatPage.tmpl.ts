const template = `
  <div class="chat-page">
    <aside class="left-menu">
      <div class="left-menu__current-user-info">
        {{currentUser}}
        {{addChatButton}}
      </div>
      <input type="text" class="input input--search" placeholder="Поиск" />
      {{chats}}
    </aside>
    {{chat}}
    {{modal}}
  </div>`;

export default template;
