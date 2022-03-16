import {Error} from '../../components/error';
import {LinkWithRouter} from '../../components/link';
import {Main} from '../../components/main';

const errorProps = {
  sectionClassName: 'error-page__content',
  buttonText: 'Назад к чатам',
  error: {
    code: '404',
    description: 'Не туда попали',
  },
  children: new LinkWithRouter({
    to: -1,
    text: 'Назад к чатам',
    className: '"button button--underline"',
  }),
};

const error = new Error(errorProps);

export class Error404 extends Main {
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
