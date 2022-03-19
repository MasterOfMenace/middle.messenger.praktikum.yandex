import {AuthApi} from '../../api/baseApi/authApi/AuthApi';
import store from '../../store/Store';
import {Router} from '../../router';

const authApi = new AuthApi();
const router = Router.getInstance('#root');

export class UserSettingsController {
  public static getUserData() {
    authApi.getUserData().then((response) => {
      console.log(response);
      store.set('user', {
        ...response,
        isLoggedIn: true,
      });
      console.log(store.getState());
      // router.go('/user-settings');
    });
  }

  public static logout() {
    authApi.logout().then(() => {
      router.go('/login');
    });
  }
}
