import {BASE_URL} from '../../constants/constants';
import HTTPTransport from '../../utils/httpTransport';
import {userAdapter} from '../adapter/userAdapter/userAdapter';
import {UserDataSignUp} from '../authApi/AuthApi';
import {BaseApi} from '../baseApi/BaseApi';

const userHttpTransport = new HTTPTransport(BASE_URL);

export class UserApi extends BaseApi {
  update(userData: UserDataSignUp) {
    return userHttpTransport
      .put('/user/profile', {
        data: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => userAdapter(JSON.parse(response as string)))
      .catch((error) => {
        throw new Error(error);
      });
  }

  changeAvatar(formData: FormData) {
    if (!formData.has('avatar')) {
      return undefined;
    }
    return userHttpTransport
      .put('/user/profile/avatar', {
        data: formData,
      })
      .then((response) => {
        const userData = JSON.parse(response as string);
        return userAdapter(userData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
