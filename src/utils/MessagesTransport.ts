import {ChatMessage} from '../components/chat/Chat';
import EventBus from '../components/eventBus/EventBus';
import store from '../store/Store';
import {isObject} from './utils';

function isMessagesArrayData(data: unknown): data is ChatMessage[] {
  return (
    Array.isArray(data) && data.every((item) => item.type === 'message' || item.type === 'file')
  );
}

function isMessageData(data: unknown): data is ChatMessage {
  return isObject(data) && (data.type === 'message' || data.type === 'file');
}

export class MessagesTransport extends EventBus {
  EVENTS = {
    MESSAGE: 'MESSAGE',
  };

  URL = 'wss://ya-praktikum.tech/ws/chats';

  socket: WebSocket;

  timerId: NodeJS.Timeout | null;

  constructor(userId: number, chatId: number, token: string) {
    super();
    this.timerId = null;

    this.socket = new WebSocket(`${this.URL}/${userId}/${chatId}/${token}`);

    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');
      this.getMessages();
    });

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

      if (isMessagesArrayData(data)) {
        store.set('chat.messages', data);
      }

      if (isMessageData(data)) {
        this.getMessages();
      }
      this.emit(this.EVENTS.MESSAGE);
    });

    this.socket.addEventListener('error', (event) => {
      console.log('Error', event);
    });

    this.socket.addEventListener('close', (event) => {
      console.log('Connection closed', event.reason);
    });
  }

  sendMessage(message: string) {
    this.socket.send(
      JSON.stringify({
        type: 'message',
        content: message,
      }),
    );
  }

  getMessages(offset = 0) {
    this.socket.send(
      JSON.stringify({
        content: `${offset}`,
        type: 'get old',
      }),
    );
  }

  closeConnection() {
    this.socket.close();
  }

  ping() {
    // разобраться с пингом
    // this.timerId = setTimeout(() => this.ping(), 3000);

    this.socket.send(
      JSON.stringify({
        type: 'ping',
      }),
    );
  }
}
