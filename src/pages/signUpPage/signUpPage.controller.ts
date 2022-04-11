import {authApi, UserDataSignUp} from '../../api/authApi/AuthApi';
import store from '../../store/Store';
import {Router} from '../../router';

const router = Router.getInstance('#root');

export class SignupPageController {
  public static signUp(data: UserDataSignUp) {
    authApi
      .signUp(data)
      .then(() => authApi.getUserData())
      .then((response) => {
        store.set('user', {
          ...response,
          isLoggedIn: true,
        });
        router.go('/chat');
      });
  }
}
