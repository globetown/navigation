'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Navigator,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
  InteractionManager,
  View
} = ReactNative;

var _getRandomRoute = () => ({title:'#'+Math.ceil(Math.random()*1000)});

var Chance = require('chance');
var chance = new Chance();
const longList = new Array(500);
for (var i=0;longList.length>i;i++) {
  longList[i] = {
    title:i,
    paragraph:chance.paragraph()
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.state = {
      dataSource:ds.cloneWithRows(longList),
      loadingView:true
    };
  }
  componentDidMount() {
   InteractionManager.runAfterInteractions(() => {
     this.setState({loadingView:false});
   });
  }
  render(){
    if (this.state.loadingView) {
      return (<Text>Wait</Text>)
    } else {
      return (
        <ScrollView style={styles.scene}>
          <NavButton
            onPress={() => {this.props.navigator.push(_getRandomRoute())}}
            text="Push1"
          />
          <NavButton
            onPress={() => {this.props.navigator.pop()}}
            text="Pop"
          />
          <ListView
            removeClippedSubviews={false}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => {
              return (
                <View>
                  <Text>{rowData.title}</Text>
                  <Text>{rowData.paragraph}</Text>
                </View>
              )
            }}
          />
        </ScrollView>
      );
    }
  }
}

class NavButton extends React.Component {
  render(){
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

class BreadcrumbNavSample extends React.Component {
  componentWillMount(){
    this._navBarRouteMapper = {
      rightContentForRoute: function(route,navigator) {
        return null;
      },
      titleContentForRoute: function(route,navigator) {
        return (
          <TouchableOpacity
            onPress={() => navigator.push(_getRandomRoute())}>
            <Text style={styles.titleText}>{route.title}</Text>
          </TouchableOpacity>
        );
      },
      iconForRoute: function(route,navigator) {
        return (
          <TouchableOpacity
            onPress={() => {navigator.popToRoute(route)}}
            style={styles.crumbIconPlaceholder}
          />
        );
      },
      separatorForRoute: function(route,navigator) {
        return (
          <TouchableOpacity
            onPress={navigator.pop}
            style={styles.crumbSeparatorPlaceholder}
          />
        );
      }
    };
  }

  _renderScene = (route,navigator) => {
    return (
      <Page
        navigator={navigator}
      />
    );
  };

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={_getRandomRoute()}
        renderScene={this._renderScene}
        navigationBar={
          <Navigator.BreadcrumbNavigationBar
            routeMapper={this._navBarRouteMapper}
          />
        }
      />
    );
  }
}

var styles = StyleSheet.create({
  scene: {
    paddingTop: 50,
    flex: 1,
  },
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
  container: {
    overflow: 'hidden',
    backgroundColor: '#dddddd',
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 32,
  },
  crumbIconPlaceholder: {
    flex: 1,
    backgroundColor: '#666666',
  },
  crumbSeparatorPlaceholder: {
    flex: 1,
    backgroundColor: '#aaaaaa',
  },
});

module.exports = BreadcrumbNavSample;
