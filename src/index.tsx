import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import {stores} from './Store';
import { Provider } from 'mobx-react';

ReactDOM.render(
<Provider {...stores}>
 <Home />
 </Provider>,
 document.getElementById('root')
);