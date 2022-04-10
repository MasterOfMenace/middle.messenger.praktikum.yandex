import {authApi} from '../../api/authApi/AuthApi';
import {userApi} from '../../api/userApi';
import store from '../../store/Store';

export class ChangePasswordController {
  public static async initChangePassword() {
    const userData = store.getState().user;

    if (!userData) {
      const data = await authApi.getUserData();
      store.set('user', data);
    }
  }

  public static changePassword(oldPassword: string, newPassword: string) {
    return userApi.changePassword({oldPassword, newPassword});
  }
}
