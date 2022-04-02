import Block, {Props} from '../components/block/Block';
import store, {STORE_EVENTS} from './Store';

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

      this.setProps(getMappedProps(props, mapStateToProps?.(store.getState())));

      store.subscribe(STORE_EVENTS.UPDATED, () => {
        this.setProps(getMappedProps(this.props, mapStateToProps?.(store.getState())));
      });
    }
  };
}
