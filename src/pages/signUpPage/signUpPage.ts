import Block from '../../components/block/Block';
import {Button} from '../../components/button';
import Form from '../../components/form/Form';
import {Input} from '../../components/input';
import {LinkWithRouter} from '../../components/link';
import {formSubmitHandler} from '../../utils';
import {SignupPageController} from './signUpPage.controller';
import signUpPageTmpl from './signUpPage.tmpl';

type SignupPageProps = {
  linkBack: Block;
  title: string;
  form: Form;
};

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
  name: 'phone',
  id: 'phone',
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
  className: 'signup-page__submit button button--solid',
  text: 'Войти',
});

const linkBack = new LinkWithRouter({
  to: -1,
  className: 'signup-page__go-back button button--transparent',
  children: `<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M17.77 3.77L16 2L6 12L16 22L17.77 20.23L9.54 12L17.77 3.77Z"
    fill="#0F484B"
  />
</svg>`,
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
      event: (evt) => {
        const formData = formSubmitHandler(evt);

        if (formData) {
          SignupPageController.signUp({
            first_name: formData.first_name,
            second_name: formData.second_name,
            login: formData.login,
            password: formData.password,
            email: formData.email,
            phone: formData.phone,
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

export class SignupPage extends Block<SignupPageProps> {
  constructor() {
    super('div', {
      title: 'Регистрация',
      form,
      linkBack,
    });
  }

  render() {
    return this.compile(signUpPageTmpl, this.props);
  }
}
