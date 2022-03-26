import Block from '../../components/block/Block';
import {LinkWithRouter} from '../../components/link';
import userSettingsTemplate from './userSettingsShow.tmpl';
import {UserInfo} from '../../components/userInfo';
import {Avatar} from '../../components/avatar';
import {UserShortInfo} from '../../components/userShortInfo';
import store, {STORE_EVENTS} from '../../store/Store';
import {UserSettingsController} from './userSettingsShow.controller';
import UserProfile from '../../components/userProfile/userProfile';
import {Button} from '../../components/button';

type UserSettingsProps = {
  userInfo: UserInfo;
  userProfile: UserProfile;
  linkToEdit: Block;
  linkToPassword: Block;
  logoutButton: Button;
  linkBack: Block;
};

const linkToEditPage = new LinkWithRouter({
  to: '/user-settings/edit',
  className: 'user-settings-page__change-password button button--underline',
  children: 'Редактировать',
});

const linkToPasswordChange = new LinkWithRouter({
  to: '/change-password',
  className: 'user-settings-page__change-password button button--underline',
  children: 'Изменить пароль',
});

const logoutButton = new Button({
  type: 'button',
  className: 'user-settings-page__change-password button button--underline',
  text: 'Выйти',
  events: {
    click: {
      event: () => {
        UserSettingsController.logout();
      },
    },
  },
});

const linkBack = new LinkWithRouter({
  to: '/chat',
  className: 'button button--round',
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

const list = new UserProfile({
  name: '',
  login: '',
  displayName: '',
  email: '',
  secondName: '',
  phone: '',
});

const userInfo = new UserInfo({
  className: 'user-short-info user-short-info--settings-page',
  avatar: new Avatar({
    avatarSrc: '',
    wrapperClassName: 'avatar',
    imageClassName: 'avatar__image',
    events: {
      click: {
        event: () => {
          const fileInput = document.getElementById('avatar-upload') as HTMLInputElement;
          fileInput.click();
          fileInput.addEventListener('change', () =>
            UserSettingsController.changeAvatar(fileInput.files),
          );
        },
      },
    },
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

export class UserSettingsShow extends Block<UserSettingsProps> {
  constructor() {
    super('div', {
      userInfo,
      userProfile: list,
      linkToEdit: linkToEditPage,
      linkToPassword: linkToPasswordChange,
      logoutButton,
      linkBack,
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
      this.props.userProfile.setProps({
        name: userData.name,
        login: userData.login,
        secondName: userData.secondName,
        displayName: userData.displayName,
        phone: userData.phone,
        email: userData.email,
      });
    } else {
      UserSettingsController.getUserData();
    }
  }

  render() {
    return this.compile(userSettingsTemplate, this.props);
  }
}
