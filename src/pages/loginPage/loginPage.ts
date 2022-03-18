import Block from '../../components/block/Block';
import {Button} from '../../components/button';
import Form from '../../components/form/Form';
import {Input} from '../../components/input';
import {LinkWithRouter} from '../../components/link';
import {formSubmitHandler} from '../../utils';
import loginPageTemplate from './loginPage.tmpl';
import {LoginPageController} from './loginPage.controller';
import {AuthApi} from '../../api/baseApi/authApi/AuthApi';

type LoginPageProps = {
  link: Block;
  form: Form;
};

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

const authApi = new AuthApi();

const logout = new Button({
  type: 'button',
  className: '"button button--solid"',
  text: 'Выйти',
  events: {
    click: {
      event: () => {
        authApi.logout();
      },
    },
  },
});

const form = new Form({
  className: '"login-form"',
  children: [login, password, submitBtn],
  events: {
    submit: {
      event: (evt) => {
        const formData = formSubmitHandler(evt);
        if (formData) {
          LoginPageController.login({
            login: formData.login,
            password: formData.password,
          });
        }
      },
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

const link = new LinkWithRouter({
  to: '/signup',
  className: '"button button--underline"',
  text: 'У меня нет аккаунта',
});

const userProps = {
  form,
  link,
  logout,
};

export class LoginPage extends Block<LoginPageProps> {
  constructor() {
    super('div', userProps);
  }

  render() {
    return this.compile(loginPageTemplate, this.props);
  }
}
