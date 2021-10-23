
import React, {Component} from 'react';
import {
    Button,
    Input
} from "antd";
import Client from '../../api';

import './classRoomEdit.less';
import { Link } from 'react-router-dom';

class ClassRoomEdit extends Component {
    constructor(props) {
        super(props);
        const {classRoomID} = this.props.match.params;
        this.state = {
            classRoomID,
            description: ''
        }

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onClickSaveBtn = this.onClickSaveBtn.bind(this);
    }

    render() {
        const {classRoomID, description} = this.state;

        return (
            <div className="class-room-edit">
                <Input className="input" placeholder="请输入新的班级介绍" value={description} onChange={this.onChangeDescription}></Input>
                <Button className="save-btn" type="primary" onClick={this.onClickSaveBtn}>保存</Button>
                <Link to={`/classRoom/${classRoomID}`}>
                    <Button>取消</Button>
                </Link>
            </div>
        )
    }

    // 点击保存按钮
    onClickSaveBtn() {
        const {classRoomID, description} = this.state;
        Client.updateClassRoomInfo(classRoomID, {description}).then(res => {
            const {code, data, msg} = res;
            if (!code) {
                window.location.href = `/classRoom/${classRoomID}`;
            }
        })
    }

    // 输入新的 班级介绍信息
    onChangeDescription(e) {
        const {value} = e.target;
        this.setState({
            description: value
        });
    }
}
 export default ClassRoomEdit
