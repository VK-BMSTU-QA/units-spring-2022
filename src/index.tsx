import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App/App';

// Рендерим корневой компонент приложения. React работает с компонентами. Компоненты возвращают HTML.
ReactDOM.render(<App />, document.getElementById('root'));
