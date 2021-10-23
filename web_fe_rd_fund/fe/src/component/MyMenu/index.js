import React, {Component} from "react";
import {
    Link
} from 'react-router-dom';

import {
    Menu
} from 'antd';

import {LINK} from '../MyRouter';

import './index.less';


const {SubMenu} = Menu;

class MyMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLink: LINK.Home
        };
    }

    // 菜单link 变更
    currentLinkChange = (e) => {
        this.setState({ currentLink: e.key });
    };
    
    render() {
        const { currentLink } = this.state;

        return (
            <div className="my-menu">
                <Menu onClick={this.currentLinkChange} selectedKeys={[currentLink]} mode="horizontal">
                    <Menu.Item key={LINK.Home}>
                        <Link to={LINK.Home}>首页</Link>
                    </Menu.Item>

                    <SubMenu key="strategy" title="策略回测">
                        <Menu.Item key={LINK.StrategyEtf}>
                            <Link to={LINK.StrategyEtf}>ETF</Link>
                        </Menu.Item>
                        <Menu.Item key={LINK.StrategyFund}>
                            <Link to={LINK.StrategyFund}>基金</Link>
                        </Menu.Item>
                        <Menu.Item key={LINK.StrategyStock}>
                            <Link to={LINK.StrategyStock}>股票</Link>
                        </Menu.Item>
                        <Menu.Item key={LINK.StrategyBond}>
                            <Link to={LINK.StrategyBond}>可转债</Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="data-api" title="策略回测">
                        <Menu.Item key={LINK.DataApiEtf}>
                            <Link to={LINK.DataApiEtf}>ETF</Link>
                        </Menu.Item>
                        <Menu.Item key={LINK.DataApiFund}>
                            <Link to={LINK.DataApiFund}>基金</Link>
                        </Menu.Item>
                        <Menu.Item key={LINK.DataApiStock}>
                            <Link to={LINK.DataApiStock}>股票</Link>
                        </Menu.Item>
                        <Menu.Item key={LINK.DataApiBond}>
                            <Link to={LINK.DataApiBond}>可转债</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key={LINK.HelpCommunity}>
                        <Link to={LINK.HelpCommunity}>帮助&社区</Link>
                    </Menu.Item>
                    <Menu.Item key={LINK.BusinessCooperation}>
                        <Link to={LINK.BusinessCooperation}>商务&合作</Link>
                    </Menu.Item>
                    <Menu.Item key={LINK.About}>
                        <Link to={LINK.About}>关于我们</Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default MyMenu;