const template = `
  <label for={{id}} class={{className}}>
    <p class={{label.className}}>{{label.text}}</p>
    <input class={{controlClassName}} type={{type}} name={{name}} id={{id}} minLength={{validationProps.minLength}}
      maxLength={{validationProps.maxLength}} required={{validationProps.required}} />
  </label>`;

export default template;
