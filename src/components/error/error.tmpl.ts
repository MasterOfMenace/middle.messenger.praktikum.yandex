const template = `
<main class="{{mainClassName}}">
<section class="{{sectionClassName}}">
  <div class="error">
    <p class="error__code">{{error.code}}</p>
    <p class="error__description">{{error.description}}</p>
  </div>
  <a href="/" class="button button--underline">{{buttonText}}</a>
</section>
</main>
`;

export default template;
