import {authApi, UserDataSignUp} from '../../api/authApi/AuthApi';
import {userApi} from '../../api/userApi/UserApi';
import store from '../../store/Store';

export class UserSettingsController {
  public static getUserData() {
    authApi.getUserData().then((response) => {
      store.set('user', {
        ...response,
        isLoggedIn: true,
      });
    });
  }

  public static updateUser(userData: UserDataSignUp) {
    userApi.update(userData).then((response) => {
      store.set('user', {
        ...response,
      });
    });
  }
}
