import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

import 'react-toastify/dist/ReactToastify.css';
import { reducers } from './reducers';
import App from './App';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
const unsubscribe = store.subscribe(() => {
                        console.log(store.getState());
                    });
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

//unsubscribe();