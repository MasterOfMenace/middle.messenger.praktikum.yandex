import EventBus from '../eventBus/EventBus';

export type Props = {
  events?: Record<string, (evt: Event) => void>;
  [key: string]: unknown;
};

type Meta = {
  tagName: string;
  props: Props;
};

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element: HTMLElement | null;

  _meta: Meta;

  props: Props;

  eventBus: () => EventBus;

  constructor(tagName = 'div', props: Props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this._element = null;

    this.eventBus = () => eventBus;
    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.subscribe(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.subscribe(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.subscribe(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.subscribe(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const {tagName} = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {}

  dispatchComponentDidMount() {}

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }

    this._removeEvents();

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();

    if (this._element && block) {
      this._element.innerHTML = block;

      this._addEvents();
    }
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    return this._element;
  }

  _makePropsProxy(props: Props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    // const self = this;
    // const componentDidUpdate = this.componentDidUpdate.bind(this);
    const eventBus = this.eventBus.bind(this);

    return new Proxy(props, {
      set(target, prop: string, value) {
        if (prop in target) {
          target[prop] = value;
          // console.log(this); //this здесь указывает на объект handler
          eventBus().emit(Block.EVENTS.FLOW_CDU);
          return true;
        }
        return false;
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков

    return document.createElement(tagName);
  }

  show() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  hide() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }

  _addEvents() {
    const {events} = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.addEventListener(eventName, events[eventName]);
      });
    }
  }

  _removeEvents() {
    const events = {...this.props.events};
    Object.keys(events).forEach((event) => {
      this._element?.removeEventListener(event, events[event]);
    });
  }
}

export default Block;
