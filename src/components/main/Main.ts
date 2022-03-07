import Block, {Children} from '../block/Block';
import template from './main.tmpl';

type MainProps = {
  className: string;
  children: Children;
};

export default class Main extends Block<MainProps> {
  constructor(props: MainProps) {
    super('main', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
