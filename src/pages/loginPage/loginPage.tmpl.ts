// const template = `
// <main class="login-page">
//       <section class="login-page__content">
//         <form class="login-form">
//           <label for="login" class="input">
//             <p class="input__label">Логин</p>
//             <input type="text" name="login" id="login" minlength="3" maxlength="20" required class="input__control" />
//           </label>
//           <label for="password" class="input">
//             <p class="input__label">Пароль</p>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               minlength="8"
//               maxlength="40"
//               required
//               class="input__control"
//             />
//           </label>
//           <!--<a
//             href="./placeholderPage.html"
//             class="button button--solid"
//             >Войти</a
//           >-->
//           <input
//             type="submit"
//             value="Войти"
//             class="button button--solid"
//             />
//         </form>
//         <a
//           href="./signUpPage.html"
//           class="button button--underline"
//           >У меня нет аккаунта</a
//         >
//       </section>
//     </main>
// `;

// export default template;

const template = `
<main class="login-page">
      <section class="login-page__content">
      {{children.form}}
      {{children.link}}
      </section>
    </main>
`;

export default template;
