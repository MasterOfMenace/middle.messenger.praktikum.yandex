import {BASE_URL, RESOURCES_ENDPOINT} from '../../../constants/constants';
import {User} from '../../authApi/AuthApi';

export function userAdapter(user: User): User {
  return {
    ...user,
    avatar: user.avatar ? `${BASE_URL}${RESOURCES_ENDPOINT}${user.avatar}` : null,
  };
}
