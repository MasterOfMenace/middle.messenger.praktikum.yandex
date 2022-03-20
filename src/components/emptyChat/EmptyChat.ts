import Block from '../block/Block';

type EmptyChatProps = {
  message?: string;
};

export class EmptyChat extends Block<EmptyChatProps> {
  constructor(props: EmptyChatProps) {
    super('div', {
      message: props.message ?? 'Тут ничего нет',
    });
  }

  render() {
    return this.compile('<div class="chat chat--empty">{{message}}</div>', this.props);
  }
}
