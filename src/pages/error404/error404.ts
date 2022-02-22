import { Templator } from '../../utils';
import errorTemplate from '../../components/error/error.tmpl';

const context = {
  mainClassName: 'error-page',
  sectionClassName: 'error-page__content',
  buttonText: 'Назад к чатам',
  error: {
    code: '404',
    description: 'Не туда попали',
  },
};

const template = new Templator(errorTemplate);

const compiled = template.compile(context);

const rootDiv = document.getElementById('root');

if (rootDiv) {
  rootDiv.innerHTML = compiled;
}
