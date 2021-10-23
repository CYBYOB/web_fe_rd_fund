
import React, {Component} from 'react';
import {
    Button,
    Table
} from 'antd';
import {
    Link
} from "react-router-dom";
import './classRoom.less';

import Client from '../../api';

// 学生列表的 columns
const studentColumns = [
    {
        title: '学生ID',
        dataIndex: 'id'
    },
    {
        title: '名字',
        dataIndex: 'name'
    },
    {
        title: '性别',
        dataIndex: 'sex'
    },
    {
        title: '年龄',
        dataIndex: 'age'
    },
    {
        title: '简介',
        dataIndex: 'description'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        render() {
            return (
                <div className="operation">
                    <Button type="primary">编辑</Button>
                    <Button type="primary" className="delete-btn">删除</Button>
                </div>
            )
        }
    }
];


class ClassRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 班级信息
            classRoom: {
                id: '-',
                name: '-',
                description: '-',
                // 暂时由 studentList.length 表示
                // studentCount: 0,
            },

            // student表格
            studentList: [],
        }
    }

    componentDidMount() {
        const {classRoomID} = this.props.match.params;
        this.getClassRoomInfoById(classRoomID);
        this.getStudentList(classRoomID);
    }

    // 学区学生列表数据
    getStudentList(classRoomID) {
        Client.getStudentList(classRoomID).then(res => {
            const {code, data, msg} = res;
            if (!code) {
                this.setState({
                    studentList: data
                });
            }
        })
    }

    // 获取某班级信息
    getClassRoomInfoById(classRoomID) {
        Client.getClassRoomInfo(classRoomID).then(res => {
            const {code, data, msg} = res;
            if (!code) {
                const {classRoom} = this.state;
                const {id, name, description} = data;
                this.setState({
                    classRoom: Object.assign(classRoom, {id, name, description})
                });
            }
        });
    }

    render() {
        const {classRoom, studentList} = this.state;
        const {id, name, description, studentCount} = classRoom;

        return (
            <div className="class-room">
                <div className="class-room-wrapper">
                    <div className="info">
                        <div>班级ID：{id}</div>
                        <div>班级名字：{name}</div>
                        <div>班级描述：{description}</div>
                        <div>班级总人数：{studentList.length}</div>
                    </div>
                    <div className="eidt">
                        <Link to={`/classRoom/${id}/edit`}>
                            <Button type="primary">编辑</Button>
                        </Link>
                    </div>
                </div>
                <div className="student">
                    <div className="title">
                        <span>班级学生信息表：</span>
                        <Button className="all-update-btn" type="primary">一键更新该班级下所有学生信息</Button>
                        <Button type="primary">+ 添加学生</Button>
                    </div>
                    <Table className="table" rowKey="id" dataSource={studentList} columns={studentColumns}>
                    </Table>
                </div>
            </div>
        )
    }
}

export default ClassRoom;
