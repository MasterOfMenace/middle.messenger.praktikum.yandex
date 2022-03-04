import {formSubmitHandler, renderDOM} from '../../utils';
import changePasswordTemplate from './changePassword.tmpl';
import avatarSrc from '../../../static/images/avatar.jpg';
import Block from '../../components/block/Block';
import {Avatar} from '../../components/avatar';
import {UserInfo} from '../../components/userInfo';
import {UserShortInfo} from '../../components/userShortInfo';
import Form from '../../components/form/Form';
import {Input} from '../../components/input';
import {Button} from '../../components/button';

type Props = {
  userInfo: UserInfo;
  form: Form;
};
class ChangePasswordPage extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(changePasswordTemplate, this.props);
  }
}

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

const oldPasswordInput = new Input({
  name: 'old_password',
  id: 'old_password',
  className: '"input input--oneline"',
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

const newPasswordInput = new Input({
  name: 'new_password',
  id: 'new_password',
  className: '"input input--oneline"',
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
  className: '"input input--oneline"',
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
  className: '"change-password-page__edit-settings-button button button--solid"',
  text: 'Сохранить',
});

const form = new Form({
  className: '"user-settings-page__form"',
  children: [oldPasswordInput, newPasswordInput, repeatPasswordInput, submitBtn],
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

const page = new ChangePasswordPage({
  userInfo,
  form,
});

const rootDiv = document.getElementById('root');

renderDOM(rootDiv, page);
