import Block from '../block/Block';
import {Avatar} from '../avatar';
import {UserShortInfo} from '../userShortInfo';
import template from './userInfo.tmpl';

type Props = {
  className: string;
  avatar: Avatar;
  shortInfo: UserShortInfo;
};

export default class UserInfo extends Block<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
