import avatarSrc from '../../../../static/images/avatar.jpg';

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
