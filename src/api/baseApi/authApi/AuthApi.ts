import store from '../../../store/Store';
import HTTPTransport from '../../../utils/httpTransport';
import {BaseApi} from '../BaseApi';

export type UserDataSignUp = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

const baseUrl = 'https://ya-praktikum.tech/api/v2';

const authHttpTransport = new HTTPTransport(baseUrl);

export class AuthApi extends BaseApi {
  login(data: {login: string; password: string}) {
    return authHttpTransport
      .post('/auth/signin', {
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        store.set('user.isLoggedIn', true);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  signUp(data: UserDataSignUp) {
    return authHttpTransport
      .post('/auth/signup', {
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        store.set('user.id', response);
      });
  }
}
