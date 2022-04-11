const template = `
<main class="chat">
  <div class="chat__info">
    {{chatInfo}}
    {{addUserButton}}
  </div>
  <div class="messages">
  {{messagesGroup}}
  </div>
  {{newMessage}}
  {{modal}}
</main>`;

export default template;
