import {Error} from '../../components/error';
import {renderDOM} from '../../utils';

const context = {
  mainClassName: 'error-page',
  sectionClassName: 'error-page__content',
  buttonText: 'Назад к чатам',
  error: {
    code: '500',
    description: 'Мы уже фиксим',
  },
};

const error = new Error(context);

const rootDiv = document.getElementById('root');

renderDOM(rootDiv, error);
