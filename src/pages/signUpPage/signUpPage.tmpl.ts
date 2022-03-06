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
        <h1 class="signup-page__title">{{title}}</h1>
      </div>
      {{form}}
    </section>
  </main>
`;

export default template;
