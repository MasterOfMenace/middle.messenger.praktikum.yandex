import {AuthApi} from '../../api/authApi/AuthApi';
import {Router} from '../../router';
import store from '../../store/Store';

const authApi = new AuthApi();
const router = Router.getInstance('#root');

export class LoginPageController {
  public static login(data: {login: string; password: string}) {
    authApi
      .login(data)
      .then(() => authApi.getUserData())
      .then((response) => {
        store.set('user', {
          ...response,
          isLoggedIn: true,
        });
        router.go('/user-settings');
      });
  }
}
