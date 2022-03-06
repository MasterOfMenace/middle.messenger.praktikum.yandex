type EventHandler<T = any> = (...args: T[]) => void;

type EventBusListeners = {
  [key: string]: EventHandler[];
};

export default class EventBus {
  listeners: EventBusListeners;

  constructor() {
    this.listeners = {};
  }

  subscribe(eventName: string, eventHandler: EventHandler) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(eventHandler);
  }

  unsubscribe(eventName: string, eventHandler: EventHandler) {
    if (!this.listeners[eventName]) {
      return;
    }

    this.listeners[eventName] = this.listeners[eventName].filter((event) => event !== eventHandler);
  }

  emit(eventName: string, ...args: any[]) {
    if (!this.listeners[eventName]) {
      throw new Error(`Event ${eventName} not exist`);
    }

    this.listeners[eventName].forEach((event) => event(...args));
  }
}
