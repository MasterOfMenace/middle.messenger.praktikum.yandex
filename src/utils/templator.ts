import {getValueByPath} from './utils';

class Templator {
  REGEXP = /\{\{(.*?)\}\}/gi;

  _template: string;

  constructor(template: string) {
    this._template = template;
  }

  _compileTemplate<T>(context?: T) {
    let template = this._template;
    let key: RegExpExecArray | null = this.REGEXP.exec(template);

    while (key) {
      if (key && key[1]) {
        const templValue = key[1].trim();

        if (context) {
          const data = getValueByPath(context, templValue);
          if (typeof data === 'function') {
            window[templValue] = data;
            template = template.replace(new RegExp(key[0], 'gi'), `window.${key[1].trim()}()`);
          }

          template = template.replace(new RegExp(key[0], 'gi'), data);
          // здесь ставим индекс начала поиска следующего сопоставления на начало найденного сопоставления,
          // чтобы не потерять следующие свойства при длинном имени текущего найденного сопоставления
          this.REGEXP.lastIndex = key.index;
          key = this.REGEXP.exec(template);
        }
      }
    }
    return template;
  }

  compile<T>(context?: T) {
    return this._compileTemplate(context);
  }
}

export default Templator;
