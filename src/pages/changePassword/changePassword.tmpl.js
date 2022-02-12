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
            <div class="user-settings-page__short-info">
              <div class="user-settings-page__avatar-wrapper">
                <img
                  src={{avatarSrc}}
                  alt="Аватар"
                  class="user-settings-page__avatar"
                />
              </div>
              <div class="user-settings-page__user-info">
                <p class="user-name">Snoop Dogg</p>
                <p class="user-phone">+7 (985) 123 - 45 -44</p>
              </div>
            </div>
          </div>
          <form class="user-settings-page__form">
            <label for="oldPassword" class="input input--oneline">
              <p class="input__label">Старый пароль</p>
              <input
                type="text"
                name="oldPassword"
                id="oldPassword"
                class="input__control"
              />
            </label>
            <label for="newPassword" class="input input--oneline">
              <p class="input__label">Новый пароль</p>
              <input
                type="text"
                name="newPassword"
                id="newPassword"
                class="input__control"
              />
            </label>
            <label for="repeatNewPassword" class="input input--oneline">
              <p class="input__label">Повторите новый пароль</p>
              <input
                type="text"
                name="repeatNewPassword"
                id="repeatNewPassword"
                class="input__control"
              />
            </label>
            <a
              href=""
              class="change-password-page__edit-settings-button button button--solid"
              >Сохранить</a
            >
          </form>
        </div>
      </section>
    </main>
`;

export default template;
