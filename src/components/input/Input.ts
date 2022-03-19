import Block, {EventType} from '../block/Block';
import inputTemplate from './input.tmpl';

export type InputProps = {
  className?: string;
  type?: 'text' | 'password' | 'email' | 'phone';
  value?: string;
  name?: string;
  id?: string;
  controlClassName?: string;
  dataSet?: {
    name?: string;
  };
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

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    const defaultProps: Partial<InputProps> = {
      value: '',
      className: 'input',
      label: {
        text: ' ',
        className: 'input__label',
      },
      controlClassName: 'input__control',
      type: 'text',
      validationProps: {},
    };
    super('div', {...defaultProps, ...props});
  }

  render() {
    return this.compile(inputTemplate, this.props);
  }
}
