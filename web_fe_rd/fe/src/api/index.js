
import axios from 'axios';

// API请求前缀
axios.defaults.baseURL = 'https://www.520cyb.cn:8080'
// axios.defaults.baseURL = 'http://www.520cyb.cn'

// 各种请求方法字符穿封装成常量，减少硬编码的存在。（弄成枚举类型就没太必要了）
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const PATCH = 'PATCH'; 

class Client {
    constructor() {
    }

    // 后端返回数据的统一化处理入口，TODO：状态码 等的统一化处理。
    static formatResponse(url, method, params, data) {
        return axios.request({url, method, params, data}).then(res => Promise.resolve(res.data));
    }

    // 更新 班级信息（目前仅支持 description 的变更）
    static updateClassRoomInfo(classRoomID, classRoom) {
        const url = `classRoom/${classRoomID}`; 
        return this.formatResponse(url, POST, classRoom, classRoom);
    }

    // 获取 学生列表
    static getStudentList(classRoomID) {
        const url = `classRoom/${classRoomID}/students`;
        return this.formatResponse(url, GET);
    }

    // 获取 班级信息
    static getClassRoomInfo(classRoomID) {
        const url = `classRoom/${classRoomID}`;
        return this.formatResponse(url, GET);
    }

    // 获取 班级列表
    static getClassRoomList() {
        const url = `classRooms`;
        return this.formatResponse(url, GET);
    }
}

export default Client;
