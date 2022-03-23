import Block from '../block/Block';
import template from './avatar.tmpl';
import imagePlaceholder from '../../../static/images/image-placeholder.jpg';

type AvatarProps = {
  avatarSrc: string;
  wrapperClassName?: string;
  imageClassName?: string;
};

export default class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    const defaultProps: Partial<AvatarProps> = {
      wrapperClassName: 'avatar',
      imageClassName: '"avatar__image"',
    };
    super('div', {...defaultProps, ...props});

    if (!this.props.avatarSrc) {
      this.setProps({
        avatarSrc: imagePlaceholder,
        imageClassName: '"avatar__image avatar__image--no-avatar"',
      });
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
