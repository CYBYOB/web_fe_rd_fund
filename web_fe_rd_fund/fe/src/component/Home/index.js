import React, {Component} from 'react';

import * as echarts from "echarts";
import $ from 'jquery';
import {name, code, historyDataList, historyNetWorthList} from '../../data/etf/513050.js';

import './index.less';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="home">
                home
            </div>
            // <div id="chart" style={{width: 500, height: 500}}>
            // </div>
        )
    }

    componentDidMount() {
        return;
        // console.log(name, code, historyDataList, historyNetWorthList);

        // const chart = echarts.init(document.getElementById('chart'));
        // debugger
        const chart = echarts.init($('#chart')[0]);
        const option = {
            xAxis: {
                // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                data: historyNetWorthList.map(item => item[0])
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    // data: [150, 230, 224, 218, 135, 147, 260],
                    data: historyNetWorthList.map(item => item[1]),
                    type: 'line'
                }
            ]
          };
        // debugger
        chart.setOption(option);
    }
}

export default Home;
