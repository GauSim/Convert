import * as ReactDOM from 'react-dom';
import { Page } from './index';

require('es6-promise').polyfill();


document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    ReactDOM.render(Page, root);
});

