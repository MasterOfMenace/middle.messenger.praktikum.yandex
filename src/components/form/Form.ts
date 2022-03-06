import Block, {EventType} from '../block/Block';
import template from './form.tmpl';

export type FormProps = {
  className: string;
  children: Block[];
  events?: Record<string, EventType>;
};

export default class Form extends Block {
  constructor(props: FormProps) {
    super('form', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
