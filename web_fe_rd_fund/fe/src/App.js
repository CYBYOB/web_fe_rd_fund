
import React, {Component} from 'react';

import MyRouter from './component/MyRouter';
import MyMenu from './component/MyMenu';

import './App.less';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="app">
                {/* 顶部 */}
                <div className="top-menu">
                    {/* logo */}
                    <div className="logo">logo</div>
                    {/* 导航 */}
                    <MyMenu />
                </div>

                {/* 底部的渲染区 */}
                <div className="mid-router">
                    <MyRouter />
                </div>
            </div>
        );
    }
}

export default App;
