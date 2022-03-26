import {User} from '../api/authApi/AuthApi';
import {ChatMessage} from '../components/chat/Chat';
import {ChatShortInfo} from '../components/chatList/ChatList';
import EventBus from '../components/eventBus/EventBus';
import {Indexed, set} from '../utils';

export const STORE_EVENTS = {
  UPDATED: 'updated',
};

class Store<T extends Indexed> extends EventBus {
  private state: T;

  constructor(initialState: T) {
    super();
    this.state = initialState;
  }

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    console.log('store.set');

    this.state = set(this.state, path, value);
    this.emit(STORE_EVENTS.UPDATED);
  }
}

type InitialState = {
  user: User | null;
  currentChat: ChatShortInfo | null;
  chat: {
    messages: ChatMessage[];
    users: User[];
  };
  chats: ChatShortInfo[];
};

const initialState: InitialState = {
  user: null,
  currentChat: null,
  chat: {
    users: [],
    messages: [],
  },
  chats: [],
};

const store = new Store<InitialState>(initialState);

window.store = store;

export default store;
