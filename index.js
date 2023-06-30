/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { I18nManager } from 'react-native';
import moment from 'moment';

// Set the default language and locale configuration
I18nManager.allowRTL(false);
moment.locale('en'); // Replace 'en' with the desired language code
LocaleConfig.defaultLocale = 'en'; // Replace 'en' with the desired language code

AppRegistry.registerComponent(appName, () => App);