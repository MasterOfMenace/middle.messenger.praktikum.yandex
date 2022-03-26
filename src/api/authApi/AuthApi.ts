import {BASE_URL} from '../../constants/constants';
import HTTPTransport from '../../utils/httpTransport';
import {userAdapter} from '../adapter/userAdapter/userAdapter';
import {BaseApi} from '../baseApi/BaseApi';

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
};

export type UserDataSignUp = Pick<
  User,
  'first_name' | 'second_name' | 'login' | 'email' | 'phone'
> & {
  password: string;
};

const authHttpTransport = new HTTPTransport(BASE_URL);

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
    return authHttpTransport
      .get('/auth/user')
      .then((response) => userAdapter(JSON.parse(response as string)));
  }
}
