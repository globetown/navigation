/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {AppRegistry} from 'react-native';
import App from './experiment';
import SimpleNav from './parent_navigator';
import List from "./list_view.js";
AppRegistry.registerComponent('Navigation', () => SimpleNav);
