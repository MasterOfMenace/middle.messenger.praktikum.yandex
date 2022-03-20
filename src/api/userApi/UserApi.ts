import {BASE_URL} from '../../constants/constants';
import HTTPTransport from '../../utils/httpTransport';
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
      .then((response) => JSON.parse(response as string))
      .catch((error) => {
        throw new Error(error);
      });
  }
}
