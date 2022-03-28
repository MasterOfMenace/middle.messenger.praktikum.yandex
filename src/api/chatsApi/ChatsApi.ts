import {BASE_URL} from '../../constants/constants';
import HTTPTransport from '../../HTTPTransport/HTTPTransport';
import {userAdapter} from '../adapter/userAdapter/userAdapter';
import {User} from '../authApi/AuthApi';

class ChatsApi {
  httpTransport: HTTPTransport;

  constructor() {
    this.httpTransport = new HTTPTransport(BASE_URL);
  }

  getChats(data?: {offset?: number; limit?: number; title?: string}) {
    return this.httpTransport
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
    return this.httpTransport.post(`/chats/token/${chatId}`).then((response) => {
      return JSON.parse(response as string).token;
    });
  }

  getMessagesCount(chatId: number) {
    return this.httpTransport.get(`/chats/new/${chatId}`).then((response) => {
      return JSON.parse(response as string);
    });
  }

  getChatUsers(chatId: number) {
    return this.httpTransport.get(`/chats/${chatId}/users`).then((response) => {
      return JSON.parse(response as string).map((user: User) => userAdapter(user));
    });
  }

  addUserToChat(userId: number, chatId: number) {
    return this.httpTransport.put('/chats/users', {
      data: {
        users: [userId],
        chatId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  create(title: string) {
    return this.httpTransport.post('/chats', {
      data: {
        title,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export const chatsApi = new ChatsApi();
