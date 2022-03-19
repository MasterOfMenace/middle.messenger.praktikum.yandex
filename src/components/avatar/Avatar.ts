import Block from '../block/Block';
import template from './avatar.tmpl';

type AvatarProps = {
  avatarSrc: string;
  wrapperClassName: string;
  imageClassName: string;
};

export default class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super('div', props);

    if (!this.props.avatarSrc) {
      this.setProps({
        imageClassName: '"avatar__image avatar__image--no-avatar"',
      });
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
