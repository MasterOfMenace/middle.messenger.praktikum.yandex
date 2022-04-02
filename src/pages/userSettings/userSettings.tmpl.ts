const template = `
  <main class="user-settings-page">
    <section class="user-settings-page__left">
      {{linkBack}}
    </section>
    <section class="user-settings-page__content">
      <div class="user-settings-page__user-settings">
        <div class="user-settings-page__top">
          {{userInfo}}
        </div>
        {{form}}
      </div>
    </section>
  </main>
`;

export default template;
