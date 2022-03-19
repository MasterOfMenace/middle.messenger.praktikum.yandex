import Block, {Props} from '../components/block/Block';
import {Indexed} from '../utils';
import store, {STORE_EVENTS} from './Store';

/**
 * function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
    // используем class expression
  return class extends Component {
    constructor(props) {
      super({...props, ...mapStateToProps(store.getState())});

      // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // вызываем обновление компонента, передав данные из хранилища
          this.setProps({...mapStateToProps(store.getState())});
            });
    }
  }
}
 *
 */

const getMappedProps = (props: any, mapped?: any) => {
  return {
    ...props,
    ...mapped,
  };
};

export function connect(Component: new (props: any) => Block): typeof Component;

export function connect(
  Component: new (props: any) => Block,
  mapStateToProps: (state: Indexed) => Indexed,
): typeof Component;

export function connect<P extends Props>(
  Component: new (props: P) => Block<P>,
  mapStateToProps?: (state: Indexed) => Indexed,
) {
  return class extends Component {
    constructor(props: P) {
      const newProps = getMappedProps(props, mapStateToProps?.(store.getState()));
      super(newProps);

      this.setProps({...mapStateToProps?.(store.getState())});

      store.subscribe(STORE_EVENTS.UPDATED, () => {
        // вызываем обновление компонента, передав данные из хранилища
        this.setProps({...store.getState()});
      });
    }
  };
}
