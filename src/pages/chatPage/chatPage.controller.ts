import {AuthApi, User} from '../../api/authApi/AuthApi';
import {ChatsApi} from '../../api/chatsApi/ChatsApi';
import {ChatShortInfo} from '../../components/chatList/ChatList';
import store from '../../store/Store';
import {MessagesTransport} from '../../utils/MessagesTransport';

const chatsApi = new ChatsApi();
const authApi = new AuthApi();

export class ChatPageController {
  static messageTransport: MessagesTransport | null;

  static userId: number;

  static messagesCount: number;

  public static initChatPage() {
    const storeData = store.getState();

    if (!storeData.user?.id) {
      authApi.getUserData().then((response) => {
        store.set('user', response);

        this.userId = (store.getState()?.user as User)?.id;
        this.getChats();
      });
    } else {
      this.userId = storeData.user.id;
      this.getChats();
    }
  }

  public static getChats(data?: {offset?: number; limit?: number; title?: string}) {
    chatsApi.getChats(data).then((response) => store.set('chats', response));
  }

  public static createChat(title: string) {
    chatsApi.create(title).then(() => this.getChats());
  }

  public static async changeChat(selectedChat: ChatShortInfo) {
    store.set('currentChat', selectedChat);

    if (this.messageTransport) {
      this.messageTransport = null;
    }

    const token = await this.getChatToken(selectedChat.id);

    this.messagesCount = await this.getMessagesCount(selectedChat.id);

    this.getChatUsers(selectedChat.id);

    this.initMessageTransport(this.userId, selectedChat.id, token);
  }

  static async getChatToken(chatId: number) {
    return chatsApi.getChatToken(chatId);
  }

  static async getChatUsers(chatId: number) {
    chatsApi.getChatUsers(chatId).then((response) => store.set('chat.users', response));
  }

  public static addUserToChat(userId: number, chatId: number) {
    chatsApi.addUserToChat(userId, chatId);
  }

  public static async initMessageTransport(userId: number, chatId: number, token: string) {
    this.messageTransport = new MessagesTransport(userId, chatId, token);
    this.messageTransport?.subscribe(
      this.messageTransport.EVENTS.MESSAGE,
      this.getChats.bind(this),
    );
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
