import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


const scheduleLocalNotification = async (title, body, trigger) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger,
    });
  };
  


  const cancelAllLocalNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };
  