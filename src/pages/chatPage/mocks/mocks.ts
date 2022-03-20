import avatarSrc from '../../../../static/images/avatar.jpg';
import {ChatShortInfo} from '../../../components/chatList/ChatList';

export const mockChatData = {
  wrapperClassName: '"avatar avatar--message"',
  imageClassName: '"avatar__image"',
  userName: 'Алексей',
  messageTime: '12:33',
  message: 'Набери меня после работы, если',
};

export const mockMessageData = [
  {
    className: '"messages-list__item message"',
    avatar: {
      avatarSrc,
      wrapperClassName: '"avatar avatar--message"',
      imageClassName: '"avatar__image"',
    },
    message: {
      text: 'Есть над чем задуматься: элементы политического процесса могут быть в равной степени предоставлены сами себе. Но сделанные на базе интернет-аналитики   выводы являются только методом.',
      time: '12:33',
    },
  },
  {
    className: '"messages-list__item message message--current-user"',
    avatar: {
      avatarSrc,
      wrapperClassName: '"avatar avatar--message"',
      imageClassName: '"avatar__image"',
    },
    message: {
      text: 'Есть над чем задуматься: элементы политического процесса могут быть в равной степени предоставлены сами себе. Но сделанные на базе интернет-аналитики   выводы являются только методом.',
      time: '12:33',
    },
  },
];

export const mockChatsListData: ChatShortInfo[] = new Array(20).fill(1).map((_, index) => ({
  id: 123 + index,
  title: 'my-chat',
  avatar: avatarSrc,
  unread_count: 15,
  last_message: {
    user: {
      first_name: mockChatData.userName,
      second_name: 'Pupkin',
      avatar: '/path/to/avatar.jpg',
      email: 'my@email.com',
      login: 'userLogin',
      phone: '8(911)-222-33-22',
    },
    time: mockChatData.messageTime,
    content: mockChatData.message,
  },
}));
