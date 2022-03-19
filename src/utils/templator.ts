import {getValueByPath} from './utils';

class Templator {
  REGEXP = /\{\{(.*?)\}\}/gi;

  UNDEFINED_REGEXP = /\S+undefined[\S]?\s?/gi;

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

          if (Array.isArray(data)) {
            template = template.replace(new RegExp(key[0], 'gi'), data.join(' '));
          }

          template = template.replace(new RegExp(key[0], 'gi'), data as string);
          // здесь ставим индекс начала поиска следующего сопоставления на начало найденного сопоставления,
          // чтобы не потерять следующие свойства при длинном имени текущего найденного сопоставления
          this.REGEXP.lastIndex = key.index;
          key = this.REGEXP.exec(template);
        }
      }
    }
    return this.skipUndefinedFields(template);
  }

  skipUndefinedFields(template: string) {
    let newTemplate = template;
    let key: RegExpExecArray | null = this.UNDEFINED_REGEXP.exec(template);

    while (key) {
      if (key) {
        newTemplate = newTemplate.replace(new RegExp(key[0], 'gi'), '');
        // здесь ставим индекс начала поиска следующего сопоставления на начало найденного сопоставления,
        // чтобы не потерять следующие свойства при длинном имени текущего найденного сопоставления
        this.UNDEFINED_REGEXP.lastIndex = key.index;
        key = this.UNDEFINED_REGEXP.exec(newTemplate);
      }
    }
    return newTemplate;
  }

  compile<T>(context?: T) {
    return this._compileTemplate(context);
  }
}

export default Templator;
