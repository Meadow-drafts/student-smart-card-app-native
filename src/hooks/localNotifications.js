import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


export const scheduleLocalNotification = async (title, body, trigger) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger,
    });
  };
  


  export const cancelAllLocalNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };
  