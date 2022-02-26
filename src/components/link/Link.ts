import {Templator} from '../../utils';
import Block from '../block/Block';
import template from './link.tmpl';

type LinkProps = {
  to?: string;
  text: string;
  className: string;
};

export default class Link extends Block {
  constructor(props: LinkProps) {
    super('a', props);
  }

  render() {
    const templator = new Templator(template);
    return templator.compile(this.props);
  }
}
