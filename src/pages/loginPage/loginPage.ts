import Block from '../../components/block/Block';
import {Button} from '../../components/button';
import Form from '../../components/form/Form';
import {Input} from '../../components/input';
import {Link} from '../../components/link';
import {renderDOM} from '../../utils';
import loginPageTemplate from './loginPage.tmpl';

const login = new Input({
  name: 'login',
  label: {
    text: 'Логин',
    className: 'input__label',
  },
  validationProps: {
    maxLength: 20,
    minLength: 3,
    required: true,
  },
});

const password = new Input({
  name: 'password',
  label: {
    text: 'Пароль',
    className: 'input__label',
  },
  validationProps: {
    maxLength: 40,
    minLength: 8,
    required: true,
  },
});

const submitBtn = new Button({
  type: 'submit',
  className: '"button button--solid"',
  text: 'Войти',
});

const form = new Form({
  className: '"login-form"',
  children: [login, password, submitBtn],
});

const link = new Link({
  to: './signUpPage.html',
  className: '"button button--underline"',
  text: 'У меня нет аккаунта',
});

const userProps = {
  children: {
    form,
    link,
  },
};

type UserProfileProps = {
  children: {
    form: Form;
    link: Link;
  };
};

class UserProfile extends Block {
  constructor(props: UserProfileProps) {
    super('div', props);
  }

  render() {
    return this.compile(loginPageTemplate, this.props);
  }
}

const page = new UserProfile(userProps);

const rootDiv = document.getElementById('root');

renderDOM(rootDiv, page);

// if (rootDiv) {
//   rootDiv.innerHTML = compiled;
// }

// const form = rootDiv?.querySelector('.login-form') as HTMLFormElement;

// form?.addEventListener('submit', formSubmitHandler);
