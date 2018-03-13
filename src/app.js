import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Featured } from './components/layout';
import { Provider } from 'react-redux';
import { podcastReducer } from './reducers';

const rootReducer = combineReducers({
  podcast: podcastReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <Featured />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
