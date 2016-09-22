'use strict';

import React from 'react';
import {Provider,connect} from 'react-redux';
import {createStore} from 'redux';
import SimpleNav from './parent_navigator';

class Container extends React.Component {
  render(){
    return (
      <SimpleNav/>
    );
  }
}

const mapStateToProps = state => Object.assign({},state);
export default connect(mapStateToProps,{})(Container);
