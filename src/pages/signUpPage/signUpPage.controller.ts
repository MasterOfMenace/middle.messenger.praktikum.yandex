import {authApi, UserDataSignUp} from '../../api/authApi/AuthApi';

export class SignupPageController {
  public static signUp(data: UserDataSignUp) {
    authApi.signUp(data).then(() => authApi.getUserData());
  }
}
