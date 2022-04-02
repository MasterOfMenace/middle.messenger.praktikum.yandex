import {Templator} from '../../Templator';
import errorTemplate from '../../components/error/error.tmpl';

const context = {
  mainClassName: 'placeholder-page',
  sectionClassName: 'placeholder-page__content',
  buttonText: 'Назад к чатам',
  error: {
    code: 'Здесь пока ничего нет',
    description: 'Но скоро будет',
  },
};

const template = new Templator(errorTemplate);

const compiled = template.compile(context);

const rootDiv = document.getElementById('root');

if (rootDiv) {
  rootDiv.innerHTML = compiled;
}
