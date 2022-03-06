const template = `
  <div class="chat-page">
    <aside class="left-menu">
      <div class="left-menu__current-user-info">
        {{currentUser}}
      </div>
      <!-- add-user-icon -->
      <input type="text" class="input input--search" placeholder="Поиск" />
      <div class="recent-chats">
        {{chats}}
      </div>
    </aside>
    <main class="chat">
      <!-- user-info  -->
      <div class="chat__user-info">
        {{companion}}
      </div>
      {{messagesGroup}}
      {{newMessage}}
    </main>
  </div>`;

export default template;
