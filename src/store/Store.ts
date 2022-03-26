import EventBus from '../components/eventBus/EventBus';
import {Indexed, set} from '../utils';

export const STORE_EVENTS = {
  UPDATED: 'updated',
};

class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    this.state = set(this.state, path, value);
    this.emit(STORE_EVENTS.UPDATED);
  }
}

const store = new Store();

window.store = store;

export default store;
