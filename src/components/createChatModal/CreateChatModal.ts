import {formSubmitHandler} from '../../utils';
import Block from '../block/Block';
import {Button} from '../button';
import Form from '../form/Form';
import {Input} from '../input';
import template from './crateChat.modal.tmpl';

type Props = {
  onSubmit?: (chatName: string) => void;
};

const button = new Button({
  text: 'Создать',
  type: 'submit',
  className: 'button',
});

const input = new Input({
  className: 'input input--oneline',
  type: 'text',
  name: 'chat-name',
  validationProps: {
    required: true,
  },
});

export class CreateChatModal extends Block<Props> {
  constructor(props: Props) {
    const form = new Form({
      className: 'create-chat-modal__form',
      children: [input, button],
      events: {
        submit: {
          event: (evt) => {
            evt.preventDefault();
            const formData = formSubmitHandler(evt);
            console.log(formData['chat-name']);

            this.props.onSubmit?.(formData['chat-name']);
          },
        },
      },
    });

    super('div', {
      ...props,
      form,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
