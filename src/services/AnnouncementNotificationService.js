import React, { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

const AnnouncementNotificationService = () => {
  const [previousAnnouncement, setPreviousAnnouncement] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const notificationRef = useRef();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://192.168.43.213:4000/announcements');
        const result = response.data.data;
        setAnnouncements(result);
        console.log(result);
      } catch (error) {
        console.log("error", error);
      }
    };

    const registerForPushNotifications = async () => {
      // Request permission to send notifications
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Notification permission not granted');
        return;
      }
    };

    fetchAnnouncements();
    registerForPushNotifications();
  }, []);

  useEffect(() => {
    const checkNewAnnouncement = () => {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get('http://192.168.43.213:4000/announcements');
          const result = response.data.data;
          if (result.length > 0) {
            const latestAnnouncement = result[result.length - 1];
            if (
              previousAnnouncement &&
              latestAnnouncement.id !== previousAnnouncement.id
            ) {
              sendNotification(latestAnnouncement);
            }
            setPreviousAnnouncement(latestAnnouncement);
          }
        } catch (error) {
          console.log("error", error);
        }
      }, 5000); // Check every 5 seconds

      return () => clearInterval(interval);
    };

    checkNewAnnouncement();
  }, []);

  const sendNotification = (announcement) => {
    notificationRef.current = Notifications.scheduleNotificationAsync({
      content: {
        title: 'New Announcement',
        body: announcement.content,
      },
      trigger: null,
    });
  };

  useEffect(() => {
    return () => {
      if (notificationRef.current) {
        Notifications.cancelScheduledNotificationAsync(notificationRef.current);
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AnnouncementNotificationService;
