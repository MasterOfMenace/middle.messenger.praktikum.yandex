const template = `
  <main class="user-settings-page">
    <section class="user-settings-page__left">
      <a href="/" class="button button--round">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.77 3.77L16 2L6 12L16 22L17.77 20.23L9.54 12L17.77 3.77Z"
          />
        </svg>
      </a>
    </section>
    <section class="user-settings-page__content">
      <div class="user-settings-page__user-settings">
        <div class="user-settings-page__top">
          {{userInfo}}
        </div>
        <div class="user-settings-page__profile-wrapper">
          {{userProfile}}
          {{linkToEdit}}
          {{linkToPassword}}
          {{logoutButton}}
        </div>
      </div>
    </section>
  </main>
`;

export default template;
