import Block from '../../components/block/Block';
import {LinkWithRouter} from '../../components/link';
import mainPageTemplate from './mainPage.tmpl';

type MainPageProps = {
  mainClassName: string;
  sectionClassName: string;
  signInLink: Block; // иначе ошибка типов
  signUpLink: Block;
};

const props: MainPageProps = {
  mainClassName: '"main-page"',
  sectionClassName: '"main-page__content"',
  signInLink: new LinkWithRouter({
    to: '/login',
    className: 'button',
    children: 'Войти',
  }),
  signUpLink: new LinkWithRouter({
    to: '/signup',
    className: 'button button--underline',
    children: 'Зарегистрироваться',
  }),
};

export class MainPage extends Block<MainPageProps> {
  constructor() {
    super('div', props);
  }

  render() {
    return this.compile(mainPageTemplate, this.props);
  }
}
