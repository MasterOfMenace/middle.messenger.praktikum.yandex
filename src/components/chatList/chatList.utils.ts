import {LastMessage} from './ChatList';

export function getLastMessageContent(message: LastMessage | null) {
  if (!message) {
    return 'Нет сообщений';
  }

  return `${message.user.first_name}: ${message.content}`;
}
