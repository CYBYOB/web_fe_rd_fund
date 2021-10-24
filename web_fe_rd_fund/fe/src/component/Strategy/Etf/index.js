import React, {Component} from "react";

import {
    Tabs,
    Select,
    DatePicker,
    Button,
} from 'antd';
import { myWarning } from "../../Common/Message";

// import $ from 'jquery';
// import * as echarts from 'echarts';
import moment from 'moment';

import './index.less';


const {TabPane} = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const ETF_TAB_ONE = "ETF_TAB_ONE",
    ETF_TAB_GROUP = "ETF_TAB_GROUP";
const dateFormat = 'YYYY-MM-DD';
// ETF下拉框
const ALL_ETF_LIST = [
    {text: '大成深证成份ETF', value: '159943'},
];

class Etf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEtfTab: ETF_TAB_ONE,
            etfOne: {
                code: '',
                timeRange: [moment('1970/01/01', dateFormat), moment(moment(), dateFormat)],
            }
        };
    }
    
    // ETF tab 变更
    etfTabChange = (e) => {
        this.setState({
            currentEtfTab: e
        });
    }

    // ETF 变更
    codeChange = (e) => {
        const {etfOne} = this.state;

        this.setState({
            etfOne: Object.assign(etfOne, {code: e})
        });
    }

    // 时间范围 变更
    timeRangeChange = (e) => {
        const {etfOne} = this.state;
        
        this.setState({
            etfOne: Object.assign(etfOne, {timeRange: e})
        })
    }

    // 点击确定，校验 ETF、日期选择情况！
    onClickConfirmBtn = () => {
        const {code, timeRange} = this.state.etfOne;
        if (!code) {
            return myWarning('ETF为必填项');
        }
        if (!timeRange) {
            return myWarning('时间范围为必填项');
        }
    }

    render() {
        const {
            etfOne: {timeRange}
        } = this.state;
        
        return (
            <div className="strategy-etf">
                <Tabs defaultActiveKey={ETF_TAB_ONE} onChange={this.etfTabChange}>
                    <TabPane tab="单个ETF" key={ETF_TAB_ONE}>
                        <Select
                            showSearch
                            style={{ width: 240 }}
                            placeholder="请输入ETF代码或名称"
                            onChange={this.codeChange}
                        >
                            {
                                ALL_ETF_LIST.map(item => {
                                    const {text, value} = item;
                                    const tempVal = `${value}-${text}`;
                                    return <Option key={value} value={tempVal}>{tempVal}</Option>
                                })
                            }
                        </Select>
                        <RangePicker
                            value={timeRange}
                            format={dateFormat}
                            onChange={this.timeRangeChange}
                        />

                        <Button type="primary" onClick={this.onClickConfirmBtn}>确定</Button>
                        <Button onClick={this.onClickResetBtn}>重置</Button>
                    </TabPane>

                    <TabPane tab="组合ETF" key={ETF_TAB_GROUP}>
                        开发中
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Etf;
