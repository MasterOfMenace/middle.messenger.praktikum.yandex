import {v4 as makeId} from 'uuid';
import {Templator} from '../../utils';
import EventBus from '../eventBus/EventBus';

export type Children = {
  [key: string]: Block;
};

export type Props = {
  events?: Record<string, (evt: Event) => void>;
  [key: string]: unknown;
};

export type PropsWithChildren = Props & {
  children?: Children;
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

  _id: string | null;

  _children: Children | null;

  props: Props;

  eventBus: () => EventBus;

  constructor(tagName = 'div', props: PropsWithChildren = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this._element = null;

    this._id = makeId();

    this._children = null;

    this.eventBus = () => eventBus;
    this.props = this._makePropsProxy({...props, _id: this._id});

    if (props.children) {
      this._children = props.children;
    }

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

    if (this._children) {
      Object.values(this._children).forEach((child) => {
        child.dispatchComponentDidMount();
      });
    }
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
    // добавить сравнение пропсов
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
      this._element.innerHTML = '';
      this._element.appendChild(block);

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

  compile(template: string, props: Props) {
    const propsWithStubs: Props = {...props};

    if (this._children) {
      const newChildren: {
        [key: string]: string;
      } = {};

      Object.entries(this._children).forEach(([key, child]) => {
        newChildren[key] = `<div data-id="${child._id}"></div>`;
      });
      propsWithStubs.children = newChildren;
    }

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = new Templator(template).compile(propsWithStubs);

    if (this._children) {
      Object.values(this._children).forEach((child) => {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        stub?.replaceWith(child.getContent() as Node);
      });
    }

    return fragment.content;
  }

  _makePropsProxy(props: Props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    // const self = this;
    // const componentDidUpdate = this.componentDidUpdate.bind(this);
    const eventBus = this.eventBus.bind(this);

    return new Proxy(props, {
      set(target, prop: string, value) {
        // this здесь указывает на объект handler
        if (prop in target) {
          target[prop] = value;
          eventBus().emit(Block.EVENTS.FLOW_CDU);
          return true;
        }
        return false;
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id ?? '');
    return element;
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
