import Block from '../block/Block';
import template from './list.tmpl';

type Props = {
  className?: string;
  items: unknown[];
};

export default class List extends Block {
  constructor(props: Props) {
    super('ul', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
