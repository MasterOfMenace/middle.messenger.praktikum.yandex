import Block from '../block/Block';
import template from './button.tmpl';

export type ButtonProps = {
  type: 'button' | 'submit';
  className: string;
  text: string;
};

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
