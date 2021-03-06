const template = `
  <div class="chat-page">
    <aside class="left-menu">
      <div class="left-menu__current-user-info">
        {{currentUserElem}}
        {{addChatButton}}
      </div>
      <input type="text" class="input input--search" placeholder="Поиск" />
      {{chatsList}}
    </aside>
    {{chat}}
    {{modal}}
  </div>`;

export default template;
