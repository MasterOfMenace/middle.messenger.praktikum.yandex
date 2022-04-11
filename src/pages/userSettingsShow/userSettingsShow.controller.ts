import {authApi} from '../../api/authApi/AuthApi';
import {userApi} from '../../api/userApi';
import {Router} from '../../router';
import store from '../../store/Store';

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

  public static changeAvatar(files: FileList | null) {
    if (!files) {
      return;
    }

    const formData = new FormData();

    const file = files[0];
    formData.append('avatar', file);

    userApi.changeAvatar(formData)?.then((response) => {
      store.set('user', response);
    });
  }

  public static logout() {
    authApi.logout().then(() => {
      store.clearState();
      router.go('/login');
    });
  }
}
