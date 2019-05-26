import React from 'react';
import ReactDOM from 'react-dom';
import MainWithGeoloc from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<MainWithGeoloc />, document.getElementById('root'));

serviceWorker.unregister();
