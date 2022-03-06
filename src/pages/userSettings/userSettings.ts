import Block from '../../components/block/Block';
import Form from '../../components/form/Form';
import {Input} from '../../components/input';
import {Button} from '../../components/button';
import {Link} from '../../components/link';
import {formSubmitHandler, renderDOM} from '../../utils';
import userSettingsTemplate from './userSettings.tmpl';
import avatarSrc from '../../../static/images/avatar.jpg';
import {UserInfo} from '../../components/userInfo';
import {Avatar} from '../../components/avatar';
import {UserShortInfo} from '../../components/userShortInfo';

type UserSettingsProps = {
  userInfo: UserInfo;
  form: Form;
};
class UserSettings extends Block {
  constructor(props: UserSettingsProps) {
    super('div', props);
  }

  render() {
    return this.compile(userSettingsTemplate, this.props);
  }
}

const loginInput = new Input({
  name: 'login',
  className: '"input input--oneline"',
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

const displayNameInput = new Input({
  name: 'display-name',
  className: '"input input--oneline"',
  id: 'display-name',
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
  className: '"input input--oneline"',
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

const firstNameInput = new Input({
  name: 'first_name',
  id: 'first_name',
  className: '"input input--oneline"',
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
  className: '"input input--oneline"',
  label: {
    text: 'Фамилия',
    className: 'input__label',
  },
  validationProps: {
    required: true,
  },
});

const phoneInput = new Input({
  name: 'email',
  id: 'email',
  className: '"input input--oneline"',
  type: 'phone',
  label: {
    text: 'Телефон',
    className: 'input__label',
  },
  validationProps: {
    maxLength: 15,
    minLength: 10,
    required: true,
  },
});

const submitBtn = new Button({
  type: 'submit',
  className: '"user-settings-page__edit-settings-button button button--underline"',
  text: 'Редактировать',
});

const linkToPasswordChange = new Link({
  to: './changePassword.html',
  className: '"user-settings-page__change-password button button--underline"',
  text: 'Изменить пароль',
});

const form = new Form({
  className: '"user-settings-page__form"',
  children: [
    loginInput,
    displayNameInput,
    emailInput,
    firstNameInput,
    secondNameInput,
    phoneInput,
    submitBtn,
    linkToPasswordChange,
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

const userInfo = new UserInfo({
  className: '"user-short-info"',
  avatar: new Avatar({
    avatarSrc,
    wrapperClassName: '"avatar"',
    imageClassName: '"avatar__image"',
  }),
  shortInfo: new UserShortInfo({
    className: '"user-short-info__user-info"',
    userNameClass: '"user-short-info__user-name"',
    userPhoneClass: '"user-short-info__user-phone"',
    userName: 'Snoop Dogg',
    userPhone: '+7 (985) 123 - 45 - 44',
  }),
});

const page = new UserSettings({
  userInfo,
  form,
});

const rootDiv = document.getElementById('root');

renderDOM(rootDiv, page);
