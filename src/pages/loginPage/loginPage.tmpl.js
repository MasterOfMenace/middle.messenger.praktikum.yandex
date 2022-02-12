const template = `
<main class="login-page">
      <section class="login-page__content">
        <form class="login-form">
          <label for="login" class="input">
            <p class="input__label">Логин</p>
            <input type="text" name="login" id="login" class="input__control" />
          </label>
          <label for="password" class="input">
            <p class="input__label">Пароль</p>
            <input
              type="password"
              name="password"
              id="password"
              class="input__control"
            />
          </label>
          <a
            href="/src/pages/error500/error500.html"
            class="button button--solid"
            >Войти</a
          >
        </form>
        <a
          href="/src/pages/signUpPage/signUpPage.html"
          class="button button--underline"
          >У меня нет аккаунта</a
        >
      </section>
    </main>
`;

export default template;
