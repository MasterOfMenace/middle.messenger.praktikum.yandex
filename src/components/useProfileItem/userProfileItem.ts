import Block from '../block/Block';
import template from './userProfileItem.tmpl';

type Props = {
  label: string;
  value: string;
};

export class UserProfileItem extends Block {
  constructor(props: Props) {
    super('li', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
