import {v4 as makeId} from 'uuid';
import EventBus from '../eventBus/EventBus';
import {Templator} from '../../utils';

export type Children = {
  [key: string]: Block | Block[];
};

export type EventType = {
  event: (evt: Event) => void;
  useCapture?: boolean;
};

export interface Props {
  events?: Record<string, EventType>;
  [key: string]: unknown;
}

type Meta = {
  tagName: string;
  props: Props;
};

export interface IBlock<T extends Props = Props> {
  new (): Block;
  _element: HTMLElement | null;

  _meta: Meta;

  _id: string | null;

  children: Children;

  props: T;

  eventBus: EventBus;
}

class Block<T extends Props = Props> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element: HTMLElement | null;

  _meta: Meta;

  _id: string | null;

  children: Children;

  props: T;

  eventBus: EventBus;

  constructor(tagName = 'div', propsWithChildren = <T>{}) {
    const {props, children} = this._getPropsAndChildrens(propsWithChildren);

    this._meta = {
      tagName,
      props,
    };

    this._element = null;

    this._id = makeId();

    this.children = children;

    this.eventBus = new EventBus();

    this.props = this._makePropsProxy({...propsWithChildren, _id: this._id});

    this._registerEvents(this.eventBus);

    this.eventBus.emit(Block.EVENTS.INIT);
  }

  _getPropsAndChildrens(propsWithChildren: T) {
    const props = <Props>{};
    const children = <Children>{};

    Object.entries(propsWithChildren).forEach(([k, v]) => {
      if (v instanceof Block) {
        children[k] = v;
      } else if (Array.isArray(v) && v.every((item) => item instanceof Block)) {
        children[k] = v as Block[];
      } else {
        props[k] = v;
      }
    });

    return {props, children};
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
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();

    if (this.children) {
      Object.values(this.children).forEach((child) => {
        if (Array.isArray(child)) {
          child.forEach((item) => item.dispatchComponentDidMount());
        } else {
          child.dispatchComponentDidMount();
        }
      });
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {}

  dispatchComponentDidMount() {}

  _componentDidUpdate(oldProps: T, newProps: T) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: T, newProps: T) {
    // добавить сравнение пропсов
    if (oldProps && newProps) {
      return true;
    }
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
    this._removeEvents();
    const block = this.render();

    const newElement = block.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.innerHTML = '';
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
  }

  // Может переопределять пользователь, необязательно трогать
  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this._element;
  }

  compile(template: string, props: Record<string, any>) {
    const propsWithStubs = {...props};

    Object.entries(this.children).forEach(([key, child]: [keyof T, Block | Block[]]) => {
      if (Array.isArray(child)) {
        propsWithStubs[key as keyof Record<string, any>] = child
          .map((childItem) => `<div data-id="${childItem._id}"></div>`)
          .join(' ') as T[keyof T];
      } else {
        propsWithStubs[key as keyof Record<string, any>] =
          `<div data-id="${child._id}"></div>` as T[keyof T];
      }
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = new Templator(template).compile(propsWithStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((childItem) => {
          const stub = fragment.content.querySelector(`[data-id="${childItem._id}"]`);
          stub?.replaceWith(childItem.getContent() as Node);
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        stub?.replaceWith(child.getContent() as Node);
      }
    });

    return fragment.content;
  }

  _makePropsProxy(props: T): T {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    // const self = this;

    return new Proxy(props, {
      set: (target, prop: string, value) => {
        // this здесь указывает на объект handler
        const _target = {...props};
        if (prop in target) {
          target[prop as keyof T] = value;
          this.eventBus.emit(Block.EVENTS.FLOW_CDU, _target, props);
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
    if (!content) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  hide() {
    const content = this.getContent();
    if (content) {
      content.remove();
    }
  }

  _addEvents() {
    const {events} = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.addEventListener(
          eventName,
          events[eventName].event,
          events[eventName].useCapture ?? false,
        );
      });
    }
  }

  _removeEvents() {
    const {events} = this.props;
    if (events) {
      Object.keys(events).forEach((event) => {
        this._element?.removeEventListener(event, events[event].event);
      });
    }
  }
}

export default Block;
