import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import did_client from './reducers';

const store = createStore(did_client)

ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('root')
  );
serviceWorker.unregister();
