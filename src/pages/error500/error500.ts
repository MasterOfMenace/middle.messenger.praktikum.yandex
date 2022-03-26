import {Error} from '../../components/error';
import {LinkWithRouter} from '../../components/link';
import {Main} from '../../components/main';

const context = {
  sectionClassName: 'error-page__content',
  buttonText: 'Назад к чатам',
  error: {
    code: '500',
    description: 'Мы уже фиксим',
  },
  children: new LinkWithRouter({
    to: -1,
    children: 'Назад к чатам',
    className: 'button button--underline',
  }),
};

const error = new Error(context);

export class Error500 extends Main {
  constructor() {
    super({
      className: 'error-page',
      children: error,
    });
  }

  render() {
    return super.render();
  }
}
