'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {Navigator,StyleSheet,ScrollView,TabBarIOS,Text,TouchableHighlight,View} = ReactNative;

import ChildNavigatorZero from './child_navigator_zero.js';
import ChildNavigatorOne from './child_navigator_one.js';
import ChildNavigatorTwo from './child_navigator_two.js';
var buildStyleInterpolator = require('buildStyleInterpolator');

class NavButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

var ROUTE_STACK = [{num:0}];
var INIT_ROUTE_INDEX = 0;

class JumpingNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tabIndex:props.initTabIndex};
  }
  handleWillFocus(route) {
    var tabIndex = ROUTE_STACK.indexOf(route);
    this.setState({tabIndex});
  }
  render() {
    return (
      <View style={styles.tabs}>
        <TabBarIOS>
          <TabBarIOS.Item
            icon={require('image!tabnav_notification')}
            selected={this.state.tabIndex === 0}
            onPress={() => {
              this.props.onTabIndex(0);
              this.setState({tabIndex:0});
            }}>
            <View />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            icon={require('image!tabnav_list')}
            selected={this.state.tabIndex === 1}
            onPress={() => {
              this.props.onTabIndex(1);
              this.setState({tabIndex:1});
            }}>
            <View />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            icon={require('image!tabnav_settings')}
            selected={this.state.tabIndex === 2}
            onPress={() => {
              this.props.onTabIndex(2);
              this.setState({tabIndex:2});
            }}>
            <View />
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }
}

class JumpingNavSample extends React.Component {
  render() {
    console.log('this.props',this.props);
    return (
      <Navigator
        debugOverlay={false}
        style={styles.appContainer}
        ref={(navigator) => {
          this._navigator = navigator;
        }}
        initialRoute={ROUTE_STACK[INIT_ROUTE_INDEX]}
        initialRouteStack={ROUTE_STACK}
        renderScene={this.renderScene}
        configureScene={() => ({
          ...Navigator.SceneConfigs.FadeAndroid,
          gestures: null,
          defaultTransitionVelocity: 1000,
          animationInterpolators: {
            into: buildStyleInterpolator({opacity:{value:1.0,type:'constant'}}),
            out: buildStyleInterpolator({opacity:{value:1.0,type:'constant'}}),
          },
        })}
        navigationBar={
          <JumpingNavBar
            ref={(navBar) => {this.navBar = navBar}}
            initTabIndex={INIT_ROUTE_INDEX}
            routeStack={ROUTE_STACK}
            onTabIndex={(index) => {
              this.props.action();
              if(this._navigator.state.routeStack.map(elm => elm.num).indexOf(index) === -1){
                this._navigator.push({num:index});
              } else {
                this._navigator.jumpTo(this._navigator.state.routeStack[index]);
              }
            }}
          />
        }
      />
    );
  }
  renderScene = (route,navigator) => {
    if(route.num === 0){
      return <ChildNavigatorZero />
    } else if(route.num === 1){
      return <ChildNavigatorOne />
    } else if(route.num === 2) {
      return <ChildNavigatorTwo />
    } else {
      return;
    }
  };
}

var styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  appContainer: {
    overflow: 'hidden',
    backgroundColor: '#dddddd',
    flex: 1,
  },
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
  tabs: {
    height: 50,
  }
});

module.exports = JumpingNavSample;
