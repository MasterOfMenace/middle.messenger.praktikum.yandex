import {BASE_URL} from '../../constants/constants';
import HTTPTransport from '../../HTTPTransport/HTTPTransport';
import {userAdapter} from '../adapter/userAdapter/userAdapter';
import {User, UserDataSignUp} from '../authApi/AuthApi';

type PasswordData = {
  oldPassword: string;
  newPassword: string;
};

class UserApi {
  httpTransport: HTTPTransport;

  constructor() {
    this.httpTransport = new HTTPTransport(`${BASE_URL}/user`);
  }

  update(userData: UserDataSignUp) {
    return this.httpTransport
      .put('/profile', {
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

  changePassword(passData: PasswordData) {
    return this.httpTransport
      .put('/password', {
        data: passData,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  changeAvatar(formData: FormData) {
    if (!formData.has('avatar')) {
      return undefined;
    }
    return this.httpTransport
      .put('/profile/avatar', {
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

  findUserByLogin(login: string): Promise<User[]> {
    return this.httpTransport
      .post('/search', {
        data: {
          login,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => JSON.parse(response as string));
  }
}

export const userApi = new UserApi();
