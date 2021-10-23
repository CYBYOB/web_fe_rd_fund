
import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom'
import {
    Radio
} from 'antd';
import Client from '../../api/index';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classRoomList: [
                {
                    id: 1,
                    name: '1班'
                },
                {
                    id: 2,
                    name: '2班'
                }
            ]
        }
    }
    componentDidMount() {
        Client.getClassRoomList().then(res => {
            const {code, data, msg} = res;
            if (!code) {
                this.setState({
                    classRoomList: data
                })
            }
        })
    }

    render() {
        const {classRoomList} = this.state;

        return (
            <div className="class-wrap">
                <div className="select">
                    请选择要管理的班级：
                    <Radio.Group buttonStyle="solid">
                        {
                            classRoomList.map(item => {
                                const {id, name} = item;
                                return (
                                    <Link key={id} to={`/classRoom/${id}`}>
                                        <Radio.Button value={id}>{name}</Radio.Button>
                                    </Link>
                                )
                            })
                        }
                    </Radio.Group>
                </div>
            </div>
        )
    }
}

export default Home;
