import {Avatar} from '../avatar';
import Block from '../block/Block';
import template from './message.tmpl';

type Props = {
  className?: string;
  avatar?: Avatar;
  message: {
    text: string;
    time: string;
  };
};

export default class Message extends Block<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
