import EventBus from '../components/eventBus/EventBus';
import store from '../store/Store';
import {isMessagesArrayData, isMessageData} from './messagesTransport.utils';

export class MessagesTransport extends EventBus {
  EVENTS = {
    MESSAGE: 'MESSAGE',
  };

  URL = 'wss://ya-praktikum.tech/ws/chats';

  PING_TIMEOUT = 40000;

  socket: WebSocket;

  timerId: NodeJS.Timeout | null;

  constructor(userId: number, chatId: number, token: string) {
    super();
    this.timerId = null;

    this.socket = new WebSocket(`${this.URL}/${userId}/${chatId}/${token}`);

    this.socket.addEventListener('open', () => {
      const tick = () => {
        this.ping();
        this.timerId = setTimeout(tick, this.PING_TIMEOUT);
      };

      this.timerId = setTimeout(tick, this.PING_TIMEOUT);
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

    this.socket.addEventListener('close', () => {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
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
    this.socket.send(
      JSON.stringify({
        type: 'ping',
      }),
    );
  }
}
