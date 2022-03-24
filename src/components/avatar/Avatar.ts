import Block, {EventType} from '../block/Block';
import template from './avatar.tmpl';
import imagePlaceholder from '../../../static/images/image-placeholder.jpg';

type AvatarProps = {
  avatarSrc: string;
  wrapperClassName?: string;
  imageClassName?: string;
  events?: Record<string, EventType>;
};

export default class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    const defaultProps: Partial<AvatarProps> = {
      wrapperClassName: 'avatar',
      imageClassName: '"avatar__image"',
      avatarSrc: imagePlaceholder,
    };

    super('div', {
      avatarSrc: props.avatarSrc ? props.avatarSrc : defaultProps.avatarSrc,
      wrapperClassName: props.wrapperClassName
        ? props.wrapperClassName
        : defaultProps.wrapperClassName,
      imageClassName: props.imageClassName ? props.imageClassName : defaultProps.imageClassName,
      events: props.events ?? undefined,
    });
  }

  componentDidUpdate(oldProps: AvatarProps, newProps: AvatarProps): boolean {
    if (oldProps.avatarSrc !== newProps.avatarSrc) {
      if (!newProps.avatarSrc || newProps.avatarSrc === ' ') {
        this.setProps({
          avatarSrc: imagePlaceholder,
        });
      } else {
        this.setProps({
          avatarSrc: newProps.avatarSrc,
        });
      }
    }

    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
