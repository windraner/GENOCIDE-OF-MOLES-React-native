import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';

import MainContainer from './containers/MainContainer';

export const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer/>
      </Provider>
    );
  }
}

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
// import {combineReducers, createStore, applyMiddleware} from 'redux';
// import { Provider } from 'react-redux';
// import {countReducer} from './reducers';
// import configureStore from './store';


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// import MainContainer from './containers/MainContainer';

// const store = createStore (countReducer, applyMiddleware (thunk));

// export default class App extends Component<{}> {
//   render() {
//     return (
//       <Provider store={store}>
//         <MainContainer/>
//       </Provider>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
