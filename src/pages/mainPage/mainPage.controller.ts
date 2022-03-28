import {authApi} from '../../api/authApi/AuthApi';
import {Router} from '../../router';
import store from '../../store/Store';

const router = Router.getInstance('#root');

export class MainPageController {
  public static checkAuth() {
    const {user} = store.getState();

    if (user?.id) {
      router.go('/chat');
    } else {
      authApi.getUserData().then((response) => {
        store.set('user', response);
        router.go('/chat');
      });
    }
  }
}
