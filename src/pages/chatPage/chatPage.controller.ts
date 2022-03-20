import {AuthApi} from '../../api/authApi/AuthApi';
import {ChatsApi} from '../../api/chatsApi/ChatsApi';
import store from '../../store/Store';
import {mockChatsListData} from './mocks/mocks';

const chatsApi = new ChatsApi();
const authApi = new AuthApi();

export class ChatPageController {
  public static initChatPage() {
    const storeData = store.getState();

    if (!('user' in storeData)) {
      authApi.getUserData().then((response) => store.set('user', response));
    }
    this.getChats();
  }

  public static getChats(data?: {offset?: number; limit?: number; title?: string}) {
    // chatsApi.getChats(data).then((response) => store.set('chats', response));
    store.set('chats', mockChatsListData);
  }

  public static changeChat(chatId: number) {
    store.set('currentChat', chatId);
  }
}
