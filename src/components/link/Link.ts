import Block from '../block/Block';
import template from './link.tmpl';

type LinkProps = {
  to?: string;
  text: string;
  className?: string;
};

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super('a', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
