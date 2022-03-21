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
}
