import {ChatsApi} from '../../api/chatsApi/ChatsApi';
import store from '../../store/Store';

const chatsApi = new ChatsApi();

export class ChatPageController {
  public static getChats(data?: {offset?: number; limit?: number; title?: string}) {
    chatsApi.getChats(data).then((response) => store.set('chats', response));
  }
}
