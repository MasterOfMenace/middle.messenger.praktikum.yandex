import Block, {EventType} from '../block/Block';
import template from './list.tmpl';

type Props = {
  items: unknown[];
  className?: string;
  events?: Record<string, EventType>;
};

export default class List extends Block<Props> {
  constructor(props: Props) {
    super('ul', props);
  }

  componentDidUpdate(_: Props, newProps: Props): boolean {
    if (newProps.items.length && newProps.items.every((item) => item instanceof Block)) {
      this.children.items = newProps.items as Block[]; // кажется это костыль...
    }
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
