import {AuthApi} from '../../api/baseApi/authApi/AuthApi';
import store from '../../store/Store';
import {Router} from '../../router';

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
