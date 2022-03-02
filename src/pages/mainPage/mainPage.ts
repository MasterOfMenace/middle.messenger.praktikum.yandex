import Block from '../../components/block/Block';
import {Link} from '../../components/link';
import {renderDOM} from '../../utils';
import mainPageTemplate from './mainPage.tmpl';

type MainPageProps = {
  mainClassName: string;
  sectionClassName: string;
  signInLink: Link;
  signUpLink: Link;
};

class MainPage extends Block {
  constructor(props: MainPageProps) {
    super('div', props);
  }

  render() {
    return this.compile(mainPageTemplate, this.props);
  }
}

const props = {
  mainClassName: '"main-page"',
  sectionClassName: '"main-page__content"',
  signInLink: new Link({
    to: './loginPage.html',
    className: 'button',
    text: 'Войти',
  }),
  signUpLink: new Link({
    to: './signUpPage.html',
    className: '"button button--underline"',
    text: 'Зарегистрироваться',
  }),
};

const page = new MainPage(props);

const rootDiv = document.getElementById('root');

renderDOM(rootDiv, page);
