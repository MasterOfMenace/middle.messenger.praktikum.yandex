import Block from '../block/Block';
import template from './form.tmpl';

export type FormProps = {
  className: string;
  children: Block[];
};

export default class Form extends Block {
  constructor(props: FormProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
