import {BASE_URL} from '../../constants/constants';
import HTTPTransport from '../../utils/httpTransport';
import {BaseApi} from '../baseApi/BaseApi';

const chatHttpTransport = new HTTPTransport(BASE_URL);

export class ChatsApi extends BaseApi {
  getChats(data?: {offset?: number; limit?: number; title?: string}) {
    return chatHttpTransport
      .get('/chats', {
        data,
        headers: {
          accept: 'application/json',
        },
      })
      .then((response) => JSON.parse(response as string))
      .catch((error) => {
        throw new Error(error);
      });
  }
}
