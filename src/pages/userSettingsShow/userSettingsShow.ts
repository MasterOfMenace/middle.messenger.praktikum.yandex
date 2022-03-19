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
};

const linkToEditPage = new LinkWithRouter({
  to: '/user-settings/edit',
  className: '"user-settings-page__change-password button button--underline"',
  text: 'Редактировать',
});

const linkToPasswordChange = new LinkWithRouter({
  to: '/change-password',
  className: '"user-settings-page__change-password button button--underline"',
  text: 'Изменить пароль',
});

const logoutButton = new Button({
  // to: '/change-password',
  type: 'button',
  className: '"user-settings-page__change-password button button--underline"',
  text: 'Выйти',
  events: {
    click: {
      event: () => {
        UserSettingsController.logout();
      },
    },
  },
});

const list = new UserProfile({
  name: ' ',
  login: ' ',
  displayName: ' ',
  email: ' ',
  secondName: ' ',
  phone: ' ',
});

const userInfo = new UserInfo({
  className: '"user-short-info"',
  avatar: new Avatar({
    avatarSrc: '',
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
    });

    store.subscribe(STORE_EVENTS.UPDATED, () => {
      // вызываем обновление компонента, передав данные из хранилища
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
