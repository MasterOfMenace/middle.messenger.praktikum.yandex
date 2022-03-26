export default `
<div class="modal">
  <div class="modal__inner">
    <div class="add-chat-user-modal">
      <p class="add-chat-user-modal__title">Добавить пользователя</p>
      <!--<form class="add-chat-user-modal__form">
          {{input}}
          {{button}}
      </form>-->
      {{form}}
      {{searchResult}}
      <div class="loader">Loading...</div>
    </div>
  </div>
</div>
`;
