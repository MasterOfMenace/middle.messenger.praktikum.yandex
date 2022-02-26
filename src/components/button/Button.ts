import Block from '../block/Block';
import template from './button.tmpl';
import {Templator} from '../../utils';

export type ButtonProps = {
  type: 'button' | 'submit';
  className: string;
  text: string;
};

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  render() {
    const templator = new Templator(template);
    return templator.compile(this.props);
  }
}
