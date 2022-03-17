import {AuthApi} from '../../api/baseApi/authApi/AuthApi';

const authApi = new AuthApi();

export class LoginPageController {
  public static login(data: {login: string; password: string}) {
    authApi.login(data);
  }
}
