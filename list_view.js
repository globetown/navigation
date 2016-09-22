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
  View
} = ReactNative;

var Chance = require('chance');
var chance = new Chance();
const longList = new Array(500);
for (var i=0;longList.length>i;i++) {
  longList[i] = {
    title:i,
    paragraph:chance.paragraph()
  }
}

export default class List extends React.Component {
  
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(longList),
      loadingView: true
    };
  }

  render () {
    return (
      <ListView
        initialListSize={10}
        pageSize={10}
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
    )
  }
}
