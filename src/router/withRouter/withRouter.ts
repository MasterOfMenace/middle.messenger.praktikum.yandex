import Block, {Props} from '../../components/block/Block';
import {Router} from '../router';

export type WithRouterProps = {
  router: Router;
};

export type ExcludeRouterProps<T extends Props> = Omit<T, 'router'>;

type Constructor<T = object> = new (...args: any[]) => T; // https://www.typescriptlang.org/docs/handbook/mixins.htm

export function withRouter<P extends Props, T extends Constructor = Constructor>(Component: T) {
  // пришлось сменить в пропсах страниц где ожидалась ссылка тип на блок
  return class WithRouter extends Component {
    public static componentName = Component.name;

    constructor(...args: any[]) {
      const props = args[0];
      super({...props, router: Router.getInstance('#root')});
    }
  } as new (props: ExcludeRouterProps<P>) => Block<ExcludeRouterProps<P>>;
}
