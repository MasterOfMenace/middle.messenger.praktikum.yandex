import Block, {EventType} from '../block/Block';
import inputTemplate from './input.tmpl';

export type InputProps = {
  className?: string;
  type?: 'text' | 'password' | 'email' | 'phone';
  name?: string;
  id?: string;
  controlClassName?: string;
  label?: {
    text?: string;
    className?: string;
  };
  validationProps?: {
    minLength?: number;
    maxLength?: number;
    required?: boolean;
  };
  events?: Record<string, EventType>;
};

export default class Input extends Block {
  constructor(props: InputProps) {
    const defaultProps: Partial<InputProps> = {
      className: 'input',
      label: {
        text: ' ',
        className: 'input__label',
      },
      controlClassName: 'input__control',
      type: 'text',
      validationProps: {},
    };
    super('div', Object.assign(defaultProps, props));
  }

  render() {
    return this.compile(inputTemplate, this.props);
  }
}
