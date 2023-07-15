import React, { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

const AnnouncementNotificationService = () => {
  const [previousAnnouncement, setPreviousAnnouncement] = useState(null);

  useEffect(() => {
    let notificationSubscription;
    let checkAnnouncementsTimer;

    // Function to fetch announcements and check for new ones
    const fetchAndCheckAnnouncements = async () => {
      try {
        const response = await axios.get('http://192.168.43.213:4000/announcements');
        const announcements = response.data;


        if (announcements.length > 0) {
          const lastAnnouncement = announcements[announcements.length - 1];

          // Compare with previous announcement
          if (JSON.stringify(lastAnnouncement) !== JSON.stringify(previousAnnouncement)) {
            // Send notification with the last announcement
            sendNotification(lastAnnouncement);
          }

          // Update previous announcement
          setPreviousAnnouncement(lastAnnouncement);
        }
      } catch (error) {
        console.log('Error fetching announcements:', error);
      }
    };

    // Function to send a notification
    const sendNotification = (announcement) => {
      const { title, content } = announcement;

      // Configure the notification
      const notificationContent = {
        title: title,
        body: content,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: 'blue',
      };

      // Schedule the notification
      Notifications.scheduleNotificationAsync({
        content: notificationContent,
        trigger: null, // Send immediately
      });
    };

    // Handle app state changes
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        // App has come to the foreground, fetch and check announcements
        fetchAndCheckAnnouncements();
        console.log('checking3');

      }
    };

    // Set up the notification handler
    const setupNotifications = async () => {
      await Notifications.requestPermissionsAsync();
      notificationSubscription = Notifications.addNotificationReceivedListener(handleNotification);
    };

    // Handle incoming notifications when app is in foreground
    const handleNotification = (notification) => {
      // Do something with the received notification if needed
      console.log('Received notification:', notification);
    };

    // Subscribe to app state changes
    AppState.addEventListener('change', handleAppStateChange);

    // Set up notifications and start checking for announcements
    setupNotifications();
    fetchAndCheckAnnouncements();

    // Set the timer to check for new announcements every 10 seconds
    checkAnnouncementsTimer = setInterval(fetchAndCheckAnnouncements, 10000);
    // console.log('checking')


    // Clean up event listeners and timers
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      if (notificationSubscription) {
        notificationSubscription.remove();
      }
    //   console.log('checking')
      clearInterval(checkAnnouncementsTimer);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AnnouncementNotificationService;
