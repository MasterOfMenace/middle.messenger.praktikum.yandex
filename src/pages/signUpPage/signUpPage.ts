import Block from '../../components/block/Block';
import {Button} from '../../components/button';
import Form from '../../components/form/Form';
import {Input} from '../../components/input';
import {formSubmitHandler} from '../../utils';
import signUpPageTmpl from './signUpPage.tmpl';

type SignupPageProps = {
  // linkBack: Block;
  title: string;
  form: Form;
};

// const linkBack = new LinkWithRouter({  //lдоработать чтобы ссылка могла рисовать внутри себя свг
//   to: -1,
//   className: '"user-settings-page__change-password button button--underline"',
//   text: 'Назад',
// });

const firstNameInput = new Input({
  name: 'first_name',
  id: 'first_name',
  label: {
    text: 'Имя',
    className: 'input__label',
  },
  validationProps: {
    required: true,
  },
});

const secondNameInput = new Input({
  name: 'second_name',
  id: 'second_name',
  label: {
    text: 'Фамилия',
    className: 'input__label',
  },
  validationProps: {
    required: true,
  },
});

const loginInput = new Input({
  name: 'login',
  id: 'login',
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

const emailInput = new Input({
  name: 'email',
  id: 'email',
  type: 'email',
  label: {
    text: 'Почта',
    className: 'input__label',
  },
  validationProps: {
    // maxLength: 20,
    // minLength: 3,
    required: true,
  },
});

const phoneInput = new Input({
  name: 'email',
  id: 'email',
  type: 'phone',
  label: {
    text: 'Телефон',
    className: 'input__label',
  },
  validationProps: {
    // maxLength: 20,
    // minLength: 3,
    required: true,
  },
});

const passwordInput = new Input({
  name: 'password',
  id: 'password',
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

const repeatPasswordInput = new Input({
  name: 'repeat_password',
  id: 'repeat_password',
  label: {
    text: 'Повторите пароль',
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
  className: '"signup-page__submit button button--solid"',
  text: 'Войти',
});

const form = new Form({
  className: 'signup-form',
  children: [
    firstNameInput,
    secondNameInput,
    loginInput,
    emailInput,
    phoneInput,
    passwordInput,
    repeatPasswordInput,
    submitBtn,
  ],
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

export class SignupPage extends Block<SignupPageProps> {
  constructor() {
    super('div', {
      title: 'Регистрация',
      form,
    });
  }

  render() {
    return this.compile(signUpPageTmpl, this.props);
  }
}
