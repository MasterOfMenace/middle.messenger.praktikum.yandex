import Block from '../../components/block/Block';
import Form from '../../components/form/Form';
import {Input} from '../../components/input';
import {Button} from '../../components/button';
import {LinkWithRouter} from '../../components/link';
import {formSubmitHandler} from '../../utils';
import userSettingsTemplate from './userSettings.tmpl';
import {UserInfo} from '../../components/userInfo';
import {Avatar} from '../../components/avatar';
import {UserShortInfo} from '../../components/userShortInfo';
import store, {STORE_EVENTS} from '../../store/Store';
import {UserSettingsController} from './userSettings.controller';
import {UserDataSignUp} from '../../api/authApi/AuthApi';

type UserSettingsProps = {
  linkBack: Block;
  userInfo: UserInfo;
  form: Form;
};

const loginInput = new Input({
  value: '',
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
  value: '',
  name: 'display_name',
  className: '"input input--oneline"',
  id: 'display-name',
  label: {
    text: 'Имя в чате',
    className: 'input__label',
  },
  validationProps: {
    maxLength: 20,
    minLength: 3,
    required: true,
  },
});

const emailInput = new Input({
  value: '',
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
  value: '',
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
  value: '',
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
  value: '',
  name: 'phone',
  id: 'phone',
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
  className: '"button"',
  text: 'Сохранить',
});

const linkToPasswordChange = new LinkWithRouter({
  to: '/change-password',
  className: '"user-settings-page__change-password button button--underline"',
  children: 'Изменить пароль',
});

const linkBack = new LinkWithRouter({
  to: -1,
  className: '"button button--round"',
  children: `<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M17.77 3.77L16 2L6 12L16 22L17.77 20.23L9.54 12L17.77 3.77Z"
  />
</svg>`,
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
    linkToPasswordChange,
    submitBtn,
  ],
  events: {
    submit: {
      event: (evt) => {
        const formData = formSubmitHandler(evt);
        UserSettingsController.updateUser(formData as UserDataSignUp);
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

const userInfo = new UserInfo({
  className: 'user-short-info',
  avatar: new Avatar({
    avatarSrc: '',
    wrapperClassName: 'avatar',
    imageClassName: 'avatar__image',
  }),
  shortInfo: new UserShortInfo({
    className: 'user-short-info__user-info',
    userNameClass: 'user-short-info__user-name',
    userPhoneClass: 'user-short-info__user-phone',
    userName: '',
    userPhone: '',
  }),
});

const getUserInfo = (state: any) => {
  if ('user' in state) {
    return {
      name: state?.user?.first_name ?? '',
      secondName: state?.user?.second_name ?? '',
      displayName: state?.user?.display_name ?? '',
      avatar: state?.user?.avatar ?? '',
      login: state?.user?.login ?? '',
      phone: state?.user?.phone ?? '',
      email: state?.user?.email ?? '',
    };
  }
  return undefined;
};
export class UserSettings extends Block<UserSettingsProps> {
  constructor() {
    super('div', {
      linkBack,
      userInfo,
      form,
    });

    store.subscribe(STORE_EVENTS.UPDATED, () => {
      this.updateProps();
    });

    this.updateProps();
  }

  updateProps() {
    const userData = getUserInfo(store.getState());

    if (userData) {
      this.props.userInfo.props.shortInfo.setProps({
        userName: userData.name,
        userPhone: userData.phone,
      });
      this.props.userInfo.props.avatar.setProps({
        avatarSrc: userData.avatar,
      });
      loginInput.setProps({
        value: userData.login,
      });
      displayNameInput.setProps({
        value: userData.displayName,
      });
      emailInput.setProps({
        value: userData.email,
      });
      firstNameInput.setProps({
        value: userData.name,
      });
      secondNameInput.setProps({
        value: userData.secondName,
      });
      phoneInput.setProps({
        value: userData.phone,
      });
    } else {
      UserSettingsController.getUserData();
    }
  }

  render() {
    return this.compile(userSettingsTemplate, this.props);
  }
}
