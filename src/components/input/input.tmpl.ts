const template = `
  <label class={{className}}>
    <p class={{label.className}}>{{label.text}}</p>
    <input class={{controlClassName}} type={{type}} name={{name}} id={{id}} data-name={{dataSet.name}} minLength={{validationProps.minLength}}
      maxLength={{validationProps.maxLength}} required={{validationProps.required}} />
  </label>`;

export default template;
