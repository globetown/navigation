'use strict';

import {AppRegistry} from 'react-native';
import App from './experiment';
import SimpleNav from './parent_navigator';
import List from './list_view.js';
import ReduxApp from './redux_nav.js';
AppRegistry.registerComponent('Navigation',() => ReduxApp);
