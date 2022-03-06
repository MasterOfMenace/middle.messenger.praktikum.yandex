import Block from '../../components/block/Block';
import {Button} from '../../components/button';
import Form from '../../components/form/Form';
import {Input} from '../../components/input';
import {Link} from '../../components/link';
import {formSubmitHandler, renderDOM} from '../../utils';
import loginPageTemplate from './loginPage.tmpl';

type LoginPageProps = {
  link: Link;
  form: Form;
};

class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super('div', props);
  }

  render() {
    return this.compile(loginPageTemplate, this.props);
  }
}

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
  events: {
    submit: {
      event: (evt) => formSubmitHandler(evt),
    },
    focus: {
      event: (evt) => {
        const target = evt.target as HTMLInputElement;
        const isValid = target.checkValidity();

        if (!isValid) {
          target.reportValidity();
        }
      },
      useCapture: true,
    },
  },
});

const link = new Link({
  to: './signUpPage.html',
  className: '"button button--underline"',
  text: 'У меня нет аккаунта',
});

const userProps = {
  form,
  link,
};

const page = new LoginPage(userProps);

const rootDiv = document.getElementById('root');

renderDOM(rootDiv, page);
