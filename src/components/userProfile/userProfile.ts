import Block from '../block/Block';
import template from './userProfile.tmpl';

type Props = {
  login: string;
  displayName: string;
  email: string;
  name: string;
  secondName: string;
  phone: string;
};

export default class UserProfile extends Block<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
