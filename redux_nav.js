'use strict';

import React from 'react';
import {Provider,connect} from 'react-redux';
import {createStore} from 'redux';
import SimpleNav from './parent_navigator';

const initialState = {count:1};

const reducer = (state,action) => {
  state = state || initialState;
  switch (action.type) {
  case 'INC':
    return {
      ...state,
      count:state.count + 1
    };
  default:
    return {
      ...state
    };
  }
};

const store = createStore(reducer);

class Container extends React.Component {
  render(){
    return (
      <SimpleNav {...this.props} />
    );
  }
}

const action = () => ({type:'INC'});
const mapStateToProps = state => ({...state});
const MyContainer = connect(mapStateToProps,{action})(Container);

export default class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <MyContainer />
      </Provider>
    );
  }
}
