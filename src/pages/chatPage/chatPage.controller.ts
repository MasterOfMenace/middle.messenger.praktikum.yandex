import {AuthApi} from '../../api/authApi/AuthApi';
import {ChatsApi} from '../../api/chatsApi/ChatsApi';
import store from '../../store/Store';
import {MessagesTransport} from '../../utils/MessagesTransport';
import {mockChatsListData} from './mocks/mocks';

const chatsApi = new ChatsApi();
const authApi = new AuthApi();

export class ChatPageController {
  static messageTransport: MessagesTransport | null;

  // static token: string;

  static userId: number;

  static messagesCount: number;

  public static initChatPage() {
    const storeData = store.getState();

    if (!('user' in storeData)) {
      authApi.getUserData().then((response) => {
        store.set('user', response);
        this.userId = store.getState()?.user?.id;
      });
    } else {
      this.userId = storeData?.user?.id;
    }
    this.getChats();
  }

  public static getChats(data?: {offset?: number; limit?: number; title?: string}) {
    chatsApi.getChats(data).then((response) => store.set('chats', response));
    // store.set('chats', mockChatsListData);
  }

  public static async changeChat(chatId: number) {
    store.set('currentChat', chatId);

    if (this.messageTransport) {
      this.messageTransport = null;
    }

    const token = await this.getChatToken(chatId);

    this.messagesCount = await this.getMessagesCount(chatId);

    console.log(token);

    this.initMessageTransport(this.userId, chatId, token);
  }

  static async getChatToken(chatId: number) {
    return chatsApi.getChatToken(chatId);
  }

  public static async initMessageTransport(userId: number, chatId: number, token: string) {
    console.log('message transport init', userId, chatId, token);

    this.messageTransport = new MessagesTransport(userId, chatId, token);

    // this.getMessages();
  }

  public static getMessagesCount(chatId: number) {
    return chatsApi.getMessagesCount(chatId);
  }

  public static sendMessage(message: string) {
    if (!this.messageTransport) {
      throw new Error('Не выбран чат');
    }

    this.messageTransport.sendMessage(message);
  }

  public static getMessages() {
    if (!this.messageTransport) {
      throw new Error('Не выбран чат');
    }

    this.messageTransport?.getMessages();
  }
}
