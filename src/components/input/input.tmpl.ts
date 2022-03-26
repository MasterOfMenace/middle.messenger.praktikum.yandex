const template = `
  <label class="{{className}}">
    <p class="{{label.className}}">{{label.text}}</p>
    <input
      value="{{value}}"
      class="{{controlClassName}}"
      type={{type}}
      name={{name}}
      id={{id}}
      minLength={{validationProps.minLength}}
      maxLength={{validationProps.maxLength}}
      required={{validationProps.required}}
      placeholder="Введите значение"
    />
  </label>`;

export default template;
