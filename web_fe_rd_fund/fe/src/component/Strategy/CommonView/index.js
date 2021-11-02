import React, {Component} from "react";
import MyH1 from '../../Common/H1';

import './index.less';

class Bond extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 策略列表。默认有1条
            strategyList: [
                [{probability: 0, rate: 0}],
            ],
        };
    }

    render() {
        const {strategyList} = this.state;

        return (
            <div className="common-view">
                <MyH1 title="策略生成" />
                <div className="strategy-list">
                    {
                        strategyList.map((strategy, index) => {
                            return <div>策略{index + 1}</div>
                            
                            // strategy.map(item => {
                            //     const {probability, rate} = item;
                            //     return 
                            // })
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Bond;
