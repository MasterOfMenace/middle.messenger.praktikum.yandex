import {AuthApi, UserDataSignUp} from '../../api/baseApi/authApi/AuthApi';

const authApi = new AuthApi();

export class SignupPageController {
  public static signUp(data: UserDataSignUp) {
    authApi.signUp(data);
  }
}
