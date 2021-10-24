import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
} from 'react-router-dom';

import {
    ConfigProvider
} from 'antd';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 国际化（优化）：设置成中文的（结合 antd 的 ConfigProvider 组件）。
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';

import './index.css';


ReactDOM.render(
    <React.StrictMode>
        <ConfigProvider locale={locale}>
            <Router>
                <App />
            </Router>
        </ConfigProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
