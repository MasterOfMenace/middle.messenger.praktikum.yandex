import { getValueByPath } from "./utils";

class Templator {
  REGEXP = /\{\{(.*?)\}\}/gi;
  _template: string;

  constructor(template: string) {
    this._template = template;
  }

  _compileTemplate(context?: object) {
    let template = this._template;
    let key = null;

    while ((key = this.REGEXP.exec(template))) {
      if (key[1]) {
        const templValue = key[1].trim();
        const data = getValueByPath(context, templValue);

        if (typeof data === "function") {
          window[templValue] = data;
          template = template.replace(
            new RegExp(key[0], "gi"),
            `window.${key[1].trim()}()`
          );
        }

        template = template.replace(new RegExp(key[0], "gi"), data);
      }
    }
    return template;
  }

  compile(context?: object) {
    return this._compileTemplate(context);
  }
}

export default Templator;
