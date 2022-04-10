import {formSubmitHandler, isEqual} from '../../utils';
import changePasswordTemplate from './changePassword.tmpl';
import Block from '../../components/block/Block';
import {Avatar} from '../../components/avatar';
import {UserInfo} from '../../components/userInfo';
import {UserShortInfo} from '../../components/userShortInfo';
import Form from '../../components/form/Form';
import {Input} from '../../components/input';
import {Button} from '../../components/button';
import store, {STORE_EVENTS} from '../../store/Store';
import {User} from '../../api/authApi/AuthApi';
import {ChangePasswordController} from './changePassword.controller';

type Props = {
  userData: User;
  form: Form;
};

const oldPasswordInput = new Input({
  name: 'old_password',
  id: 'old_password',
  className: 'input input--oneline',
  label: {
    text: 'Старый пароль',
    className: 'input__label',
  },
  validationProps: {
    maxLength: 40,
    minLength: 8,
    required: true,
  },
});

const newPasswordInput = new Input({
  name: 'new_password',
  id: 'new_password',
  className: 'input input--oneline',
  label: {
    text: 'Новый пароль',
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
  className: 'input input--oneline',
  label: {
    text: 'Повторите новый пароль',
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
  className: 'change-password-page__edit-settings-button button button--solid',
  text: 'Сохранить',
});

const form = new Form({
  className: 'user-settings-page__form',
  children: [oldPasswordInput, newPasswordInput, repeatPasswordInput, submitBtn],
  events: {
    submit: {
      event: (evt) => {
        const {
          new_password: newPassword,
          repeat_password: repeatPassword,
          old_password: oldPassword,
        } = formSubmitHandler(evt);

        if (newPassword === repeatPassword) {
          ChangePasswordController.changePassword(oldPassword, newPassword);
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

export class ChangePasswordPage extends Block<Props> {
  constructor() {
    ChangePasswordController.initChangePassword();
    const userData = store.getState().user;

    const userInfo = new UserInfo({
      className: 'user-short-info',
      avatar: new Avatar({
        wrapperClassName: 'avatar',
        imageClassName: 'avatar__image',
      }),
      shortInfo: new UserShortInfo({
        className: 'user-short-info__user-info',
        userNameClass: 'user-short-info__user-name',
        userPhoneClass: 'user-short-info__user-phone',
        userName: userData?.first_name || '',
        userPhone: userData?.phone || '',
      }),
    });

    store.subscribe(STORE_EVENTS.UPDATED, () => {
      const {user} = store.getState();

      if (user) {
        this.setProps({
          userData: user,
        });
      }
    });

    super('div', {
      userData,
      userInfo,
      form,
    });
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (!oldProps.userData || !isEqual(oldProps.userData, newProps.userData)) {
      const userElem = this.children.userInfo as Block;
      (userElem.children?.shortInfo as Block)?.setProps({
        userName: newProps.userData.first_name,
        userPhone: newProps.userData.phone,
      });

      (userElem.children?.avatar as Block).setProps({
        avatarSrc: newProps.userData.avatar ?? '',
      });
    }
    return true;
  }

  render() {
    return this.compile(changePasswordTemplate, this.props);
  }
}
