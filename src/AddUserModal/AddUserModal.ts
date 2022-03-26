import {UserApi} from '../api/userApi/UserApi';
import Block from '../components/block/Block';
import {Button} from '../components/button';
import Form from '../components/form/Form';
import {Input} from '../components/input';
import {List} from '../components/list';
import {UserShortInfo} from '../components/userShortInfo';
import {formSubmitHandler} from '../utils';
import template from './addUserModal.tmpl';

type Props = {
  onSelectUser?: (id: number) => void;
};

const userApi = new UserApi();

export class AddUserModal extends Block<Props> {
  loader: HTMLElement | null;

  constructor(props: Props) {
    const button = new Button({
      text: 'Поиск',
      type: 'submit',
      className: 'button',
    });

    const input = new Input({
      className: 'input input--oneline',
      type: 'text',
      name: 'user-login',
      validationProps: {
        required: true,
      },
    });

    const form = new Form({
      className: 'add-chat-user-modal__form',
      children: [input, button],
      events: {
        submit: {
          event: async (evt) => {
            evt.preventDefault();
            const formData = formSubmitHandler(evt);
            if (this.loader) {
              this.loader.style.display = 'flex';
            }
            try {
              const searchResult = await userApi.findUserByLogin(formData['user-login']);
              this.setProps({
                users: searchResult,
              });
              (this.children.searchResult as Block).setProps({
                items: searchResult.map(
                  (result) =>
                    new UserShortInfo({
                      userName: result.first_name,
                      userPhone: result.phone,
                      className: 'add-chat-user-modal__users-list-item',
                      userNameClass: '',
                      userPhoneClass: '',
                      events: {
                        click: {
                          event: () => this.props.onSelectUser?.(result.id),
                        },
                      },
                    }),
                ),
              });
              if (this.loader) {
                this.loader.style.display = 'none';
              }
            } catch (error) {
              if (this.loader) {
                this.loader.style.display = 'none';
              }
            }
          },
        },
      },
    });

    const searchResult = new List({
      items: [],
      className: 'add-chat-user-modal__users-list',
    });

    super('div', {
      ...props,
      form,
      searchResult,
      users: [],
      events: {
        click: {
          event: ({target}: MouseEvent) => {
            const inner = this._element?.querySelector('.modal__inner');
            if ((target as Node).contains(inner as Node) && target !== inner) {
              this.hide();
            }
          },
        },
      },
    });
    this.loader = null;
  }

  hide() {
    const element = this.getContent();

    if (element) {
      element.style.display = 'none';
      (this.children.searchResult as Block).setProps({
        items: [],
      });
    }
  }

  show() {
    const element = this.getContent();

    if (element) {
      element.style.display = 'flex';
    }
  }

  componentDidMount(): void {
    const element = this.getContent();

    if (element) {
      this.loader = element.querySelector('.loader');
      if (this.loader) {
        this.loader.style.display = 'none';
      }
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
