import React, {Component} from "react";
import MyH1 from '../../Common/H1';
import {
    Button,
    Input,
} from 'antd';
import {myError} from '../../Common/Message';

import './index.less';


const { TextArea } = Input;

class CommonView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            strategyListStr: '100, 10 \n 50, 20 ; 50, -15'
        };
    }

    changeStrategyListStr = (e) => {
        const {target: {value}} = e;
        this.$set({
            strategyListStr: value
        });
    }

    submit = () => {
        const {strategyListStr} = this.state;
        const message = this.checkStrategyListStr(strategyListStr);
        if (!message) {
            myError(message);
        }

        // 校验通过，继续处理

    }

    checkStrategyListStr = (strategyListStr = '') => {
        const strategyList = strategyListStr.split('\n').map(strategy => {
            let itemList = [];
            strategy.split(';').map(item => {
                let [count, rate] = item.split(',');
                count = parseFloat(count);
                rate = parseFloat(rate);
                itemList.push({count, rate});
            })
            return itemList;
        });
        debugger
    }

    render() {
        const {strategyListStr} = this.state;

        return (
            <div className="common-view">
                <div className="strategy-list">
                    <TextArea rows={5} placeholder="请输入策略列表（ 格式形如 100, 10 \n 50, 20 ; 50, -15 ）"
                        value={strategyListStr}
                        allowClear
                        onChange={this.changeStrategyListStr}>
                    </TextArea>
                    <Button type="primary" onClick={this.submit}>确定</Button>
                </div>
                <div className="strategy-view">
                    
                </div>
            </div>
        )
    }
}

export default CommonView;
