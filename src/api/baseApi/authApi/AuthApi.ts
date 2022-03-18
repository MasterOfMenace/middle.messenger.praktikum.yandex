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
        return JSON.parse(response as string);
      });
  }

  logout() {
    return authHttpTransport.post('/auth/logout');
  }

  getUserData() {
    return authHttpTransport.get('/auth/user').then((response) => JSON.parse(response as string));
  }
}
