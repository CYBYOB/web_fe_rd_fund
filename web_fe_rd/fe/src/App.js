
import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import ClassRoomEdit from './component/ClassRoomEdit';
import Home from './component/Home';
import ClassRoom from './component/ClassRoom';

// （体现 程序 = 数据结构 + 算法）。这里放数据结构，render放算法
const routeList = [
    // 需求很明确，Route 只会传入 path 和 component 2个属性，所以这里用 数组[p, c] 代替 对象{path: p, component: c}
    ["/", Home],
    ["/classRoom/:classRoomID", ClassRoom],
    // 将 edit 变更为 post 会更好？？
    ["/classRoom/:classRoomID/edit", ClassRoomEdit]
];

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                {/* 优点：通过类RESTful API风格的url快速区别不同的页面路径值 */}
                {
                    routeList.map(item => {
                        const [path, component] = item;
                        return <Route exact key={path} path={path} component={component} />
                    })
                }
            </Router>
        )
    }
}

export default App;
