import HTTPTransport from '../../utils/httpTransport';
import {UserDataSignUp} from '../authApi/AuthApi';
import {BaseApi} from '../baseApi/BaseApi';

const baseUrl = 'https://ya-praktikum.tech/api/v2';

const userHttpTransport = new HTTPTransport(baseUrl);

export class UserApi extends BaseApi {
  update(userData: UserDataSignUp) {
    return userHttpTransport
      .put('/user/profile', {
        data: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => JSON.parse(response as string))
      .catch((error) => {
        throw new Error(error);
      });
  }
}
