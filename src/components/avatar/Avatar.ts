import Block from '../block/Block';
import template from './avatar.tmpl';

type AvatarProps = {
  wrapperClassName: string;
  avatarSrc: string;
  imageClassName: string;
};

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
