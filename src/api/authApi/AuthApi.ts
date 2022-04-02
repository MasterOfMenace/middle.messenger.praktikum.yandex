import {BASE_URL} from '../../constants/constants';
import HTTPTransport from '../../HTTPTransport/HTTPTransport';
import {userAdapter} from '../adapter/userAdapter/userAdapter';
import {Router} from '../../router';

const router = Router.getInstance('#root');

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

class AuthApi {
  httpTransport: HTTPTransport;

  constructor() {
    this.httpTransport = new HTTPTransport(`${BASE_URL}/auth`);
  }

  login(data: {login: string; password: string}) {
    return this.httpTransport
      .post('/signin', {
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
    return this.httpTransport
      .post('/signup', {
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
    return this.httpTransport.post('/logout');
  }

  getUserData() {
    return this.httpTransport
      .get('/user')
      .then((response) => userAdapter(JSON.parse(response as string)))
      .catch((err) => {
        router.go('/');
        throw new Error(err);
      });
  }
}

export const authApi = new AuthApi();
