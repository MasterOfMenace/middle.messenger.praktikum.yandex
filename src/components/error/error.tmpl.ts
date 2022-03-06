const template = `
<section class="{{sectionClassName}}">
  <div class="error">
    <p class="error__code">{{error.code}}</p>
    <p class="error__description">{{error.description}}</p>
  </div>
  {{children.link}}
</section>`;

export default template;
