import {AuthApi} from '../../api/authApi/AuthApi';
import {UserApi} from '../../api/userApi/UserApi';
import {Router} from '../../router';
import store from '../../store/Store';

const router = Router.getInstance('#root');
const authApi = new AuthApi();
const userApi = new UserApi();

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
      router.go('/login');
    });
  }
}
