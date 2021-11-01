import React, {Component} from "react";
import {
    Route,
    Redirect
} from 'react-router-dom';

// 首页
import Home from '../Home';

// 策略回测
import StrategyCommonView from '../Strategy/CommonView';
import StrategyEtf from '../Strategy/Etf';
import StrategyFund from '../Strategy/Fund';
import StrategyStock from '../Strategy/Stock';
import StrategyBond from '../Strategy/Bond';

// 数据&API
import DataApiEtf from '../DataApi/Etf';
import DataApiFund from '../DataApi/Fund';
import DataApiStock from '../DataApi/Stock';
import DataApiBond from '../DataApi/Bond';

// 帮助&社区
import HelpCommunity from '../HelpCommunity';

// 商务&合作
import BusinessCooperation from '../BusinessCooperation';

// 关于我们
import About from '../About';

import './index.less';


export const LINK = {
    Home: "/home",
    
    StrategyCommonView: "/strategy/common-view",
    StrategyEtf: "/strategy/etf",
    StrategyFund: "/strategy/fund",
    StrategyStock: "/strategy/stock",
    StrategyBond: "/strategy/bond",

    DataApiEtf: "/data-api/etf",
    DataApiFund: "/data-api/fund",
    DataApiStock: "/data-api/stock",
    DataApiBond: "/data-api/bond",
    
    HelpCommunity: "/help-community",
    BusinessCooperation: "/business-cooperation",
    About: "/about"
};

// （体现 程序 = 数据结构 + 算法）。这里放数据结构，render放算法
const ROUTE_LIST = [
    // 需求很明确，Route 只会传入 path 和 component 2个属性，所以这里用 数组[p, c] 代替 对象{path: p, component: c}
    ["/", Home],
    [LINK.Home, Home],

    [LINK.StrategyCommonView, StrategyCommonView],
    [LINK.StrategyEtf, StrategyEtf],
    [LINK.StrategyFund, StrategyFund],
    [LINK.StrategyStock, StrategyStock],
    [LINK.StrategyBond, StrategyBond],

    [LINK.DataApiEtf, DataApiEtf],
    [LINK.DataApiFund, DataApiFund],
    [LINK.DataApiStock, DataApiStock],
    [LINK.DataApiBond, DataApiBond],

    [LINK.HelpCommunity, HelpCommunity],
    [LINK.BusinessCooperation, BusinessCooperation],
    [LINK.About, About],
];

class MyRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="my-router">
                {/* 优点：通过类RESTful API风格的url快速区别不同的页面路径值 */}
                {
                    ROUTE_LIST.map(item => {
                        const [path, component] = item;
                        return <Route exact key={path} path={path} component={component} />
                    })
                }
                {/* 匹配不到，重定向至 首页 */}
                {/* <Redirect from="/" to="/home"></Redirect> */}
            </div>
        )
    }
}

export default MyRouter;
