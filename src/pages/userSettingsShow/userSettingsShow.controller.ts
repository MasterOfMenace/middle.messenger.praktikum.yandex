import {AuthApi} from '../../api/authApi/AuthApi';
import {Router} from '../../router';
import store from '../../store/Store';

const authApi = new AuthApi();
const router = Router.getInstance('#root');

export class UserSettingsController {
  public static getUserData() {
    authApi.getUserData().then((response) => {
      store.set('user', {
        ...response,
        isLoggedIn: true,
      });
    });
  }

  public static logout() {
    authApi.logout().then(() => {
      router.go('/login');
    });
  }
}
