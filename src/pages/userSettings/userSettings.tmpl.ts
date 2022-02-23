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
                  src={{user.avatarSrc}}
                  alt="Аватар"
                  class="user-settings-page__avatar"
                />
              </div>
              <div class="user-settings-page__user-info">
                <p class="user-name">{{user.name}}</p>
                <p class="user-phone">{{user.phone}}</p>
              </div>
            </div>
          </div>
          <form class="user-settings-page__form">
            <label for="login" class="input input--oneline">
              <p class="input__label">Логин</p>
              <input
                type="text"
                name="login"
                id="login"
                class="input__control"
              />
            </label>
            <label for="display-name" class="input input--oneline">
              <p class="input__label">Имя в чате</p>
              <input
                type="text"
                name="display-name"
                id="display-name"
                class="input__control"
              />
            </label>
            <label for="email" class="input input--oneline">
              <p class="input__label">Почта</p>
              <input
                type="text"
                name="email"
                id="email"
                class="input__control"
              />
            </label>
            <label for="first_name" class="input input--oneline">
              <p class="input__label">Имя</p>
              <input
                type="text"
                name="first_name"
                id="first_name"
                class="input__control"
              />
            </label>
            <label for="second_name" class="input input--oneline">
              <p class="input__label">Фамилия</p>
              <input
                type="text"
                name="second_name"
                id="second_name"
                class="input__control"
              />
            </label>
            <label for="phone" class="input input--oneline">
              <p class="input__label">Телефон</p>
              <input
                type="text"
                name="phone"
                id="phone"
                class="input__control"
              />
            </label>
            <!--<a
              href=""
              class="user-settings-page__edit-settings-button button button--underline"
              >Редактировать</a
            >-->
            <input
              type="submit"
              value="Редактировать"
              class="user-settings-page__edit-settings-button button button--underline"
              />
            <a
              href="./changePassword.html"
              class="user-settings-page__change-password button button--underline"
              >Изменить пароль</a
            >
          </form>
        </div>
      </section>
    </main>
`;

export default template;
