import {Error} from '../../components/error';
import {Link} from '../../components/link';
import {Main} from '../../components/main';
import {renderDOM} from '../../utils';

const context = {
  sectionClassName: 'error-page__content',
  buttonText: 'Назад к чатам',
  error: {
    code: '500',
    description: 'Мы уже фиксим',
  },
  children: {
    link: new Link({
      text: 'Назад к чатам',
      className: '"button button--underline"',
    }),
  },
};

const error = new Error(context);

const main = new Main({
  className: 'error-page',
  children: {
    content: error,
  },
});

const rootDiv = document.getElementById('root');

renderDOM(rootDiv, main);
