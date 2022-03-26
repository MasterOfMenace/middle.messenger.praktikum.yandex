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

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (newProps.items.length && newProps.items.every((item) => item instanceof Block)) {
      // кажется это костыль...
      this.children.items = newProps.items as Block[];
    } else {
      this.children.items = [];
    }
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
