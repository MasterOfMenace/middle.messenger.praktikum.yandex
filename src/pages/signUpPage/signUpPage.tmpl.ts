const template = `
<main class="signup-page">
      <section class="signup-page__content">
        <div class="signup-page__title-wrapper">
          <a
            href="/"
            class="signup-page__go-back button button--transparent"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.77 3.77L16 2L6 12L16 22L17.77 20.23L9.54 12L17.77 3.77Z"
                fill="#0F484B"
              />
            </svg>
          </a>
          <h1 class="signup-page__title">Регистрация</h1>
        </div>
        <form class="signup-form">
          <label for="first_name" class="input">
            <p class="input__label">Имя</p>
            <input
              type="text"
              name="first_name"
              id="first_name"
              class="input__control"
            />
          </label>
          <label for="second_name" class="input">
            <p class="input__label">Фамилия</p>
            <input
              type="text"
              name="second_name"
              id="second_name"
              class="input__control"
            />
          </label>
          <label for="login" class="input">
            <p class="input__label">Логин</p>
            <input type="text" name="login" id="login" class="input__control" />
          </label>
          <label for="email" class="input">
            <p class="input__label">Почта</p>
            <input type="text" name="email" id="email" class="input__control" />
          </label>
          <label for="phone" class="input">
            <p class="input__label">Телефон</p>
            <input type="text" name="phone" id="phone" class="input__control" />
          </label>
          <label for="password" class="input">
            <p class="input__label">Пароль</p>
            <input
              type="text"
              name="password"
              id="password"
              class="input__control"
            />
          </label>
          <label for="repeatPassword" class="input">
            <p class="input__label">Повторите пароль</p>
            <input
              type="text"
              name="repeatPassword"
              id="repeatPassword"
              class="input__control"
            />
          </label>
          <a href="" class="signup-page__submit button button--solid">Войти</a>
        </form>
      </section>
    </main>
`;

export default template;