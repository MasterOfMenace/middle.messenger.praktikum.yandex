import {BASE_URL} from '../../constants/constants';
import HTTPTransport from '../../utils/httpTransport';
import {userAdapter} from '../adapter/userAdapter/userAdapter';
import {User} from '../authApi/AuthApi';
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

  getChatToken(chatId: number) {
    return chatHttpTransport.post(`/chats/token/${chatId}`).then((response) => {
      console.log('chat token received response', response);
      return JSON.parse(response as string).token;
    });
  }

  getMessagesCount(chatId: number) {
    return chatHttpTransport.get(`/chats/new/${chatId}`).then((response) => {
      console.log('messages count received response', response);
      return JSON.parse(response as string);
    });
  }

  getChatUsers(chatId: number) {
    return chatHttpTransport.get(`/chats/${chatId}/users`).then((response) => {
      console.log('chat users received', response);
      return JSON.parse(response as string).map((user: User) => userAdapter(user));
    });
  }

  create(title: string) {
    return chatHttpTransport.post('/chats', {
      data: {
        title,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
