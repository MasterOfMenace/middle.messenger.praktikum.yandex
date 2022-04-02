import {ChatMessage} from '../components/chat/Chat';
import {isObject} from '../utils';

export function isMessagesArrayData(data: unknown): data is ChatMessage[] {
  return (
    Array.isArray(data) && data.every((item) => item.type === 'message' || item.type === 'file')
  );
}

export function isMessageData(data: unknown): data is ChatMessage {
  return isObject(data) && (data.type === 'message' || data.type === 'file');
}
