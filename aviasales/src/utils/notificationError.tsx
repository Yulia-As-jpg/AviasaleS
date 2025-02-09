import { notification } from 'antd';

export const notificationError = (message: string): void => {
  notification.error({
    message: 'Ошибка',
    description: message,
    placement: 'topRight',
  });
};