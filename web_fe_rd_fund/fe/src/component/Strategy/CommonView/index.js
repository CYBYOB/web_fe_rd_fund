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
            strategyListStr: '100, 10 \n 50, 20 ; 50, -15',
            strategyList: [[{count: 100, rate: 10}], [{count: 50, rate: 20}, {count: 50, rate: -15}]],
        };
    }

    changeStrategyListStr = (e) => {
        const {target: {value: strategyListStr}} = e;
        const strategyList = strategyListStr.split('\n').map(strategy => {
            let itemList = [];
            strategy.split(';').map(item => {
                let [count, rate] = item.split(',');
                count = parseFloat(count);
                rate = parseFloat(rate);
                if (![count, rate].includes(NaN) && count > 0) {
                    itemList.push({count, rate});
                }
            })
            return itemList;
        }).filter(item => item.length !== 0);

        this.setState({
            strategyListStr,
            strategyList
        });
    }

    submit = () => {
        const {strategyListStr, strategyList} = this.state;
        if (!strategyListStr.length) {
            myError('策略列表不能为空');
        }

        // 校验通过
        this.renderStrategyViewList(strategyList);
    }

    // 根据 strategyList 数据，渲染
    renderStrategyViewList(strategyList = []) {
        const l = strategyList.length;

        // TODO
        for (let i = 0; i < l; i++) {
            
        }
    }

    render() {
        const {strategyListStr, strategyList} = this.state;

        return (
            <div className="common-view">
                <div className="strategy-list">
                    <div className="user-input">
                        <div>请输入策略列表（ 格式形如 100, 10 \n 50, 20 ; 50, -15 ）：</div>
                        <TextArea rows={5} placeholder="请输入策略列表（ 格式形如 100, 10 \n 50, 20 ; 50, -15 ）"
                            value={strategyListStr}
                            allowClear
                            onChange={this.changeStrategyListStr}>
                        </TextArea>
                    </div>

                    <div className="format-data">
                        <div>格式后的数据如下：</div>
                        <div>
                            <TextArea rows={Number.MAX_SAFE_INTEGER}
                                value={JSON.stringify(strategyList)}
                            >
                            </TextArea>
                        </div>
                    </div>

                    <Button type="primary" onClick={this.submit}>确定</Button>
                </div>
                <div className="strategy-view">
                    
                </div>
            </div>
        )
    }
}

export default CommonView;
