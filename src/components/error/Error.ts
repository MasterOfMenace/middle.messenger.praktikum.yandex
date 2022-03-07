import Block from '../block/Block';
import {Link} from '../link';
import template from './error.tmpl';

type ErrorProps = {
  sectionClassName: string;
  buttonText: string;
  error: {
    code: string;
    description: string;
  };
  children: {
    link: Link;
  };
};

export default class Error extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
