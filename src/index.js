import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, compose, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { combineReducers } from 'redux';
import { createForms } from 'react-redux-form/immutable';
import { fromJS, Map } from 'immutable';

const initialStoreRegistrationState = fromJS({
  storeName: '',
  storeDescription: '',
  files: [],
});

const store = createStore(
  combineReducers({
    ...createForms({
      storeRegistration: initialStoreRegistrationState,
    }),
  }),
  fromJS({}),
  compose(applyMiddleware(
    thunk,
    createLogger({ stateTransformer: state => Map(state).toJS() }),
  )),
);


ReactDOM.render(
	<Provider store={store}>
	  <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
