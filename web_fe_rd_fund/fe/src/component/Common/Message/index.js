// 对 antd 中 message 的进一步封装
import {
    message
} from 'antd';

// 全局提示（含 成功、失败、警告）
export const mySuccess = (content) => {
    message.success(content);
}

export const myError = (content) => {
    message.error(content);
}

export const myWarning = (content) => {
    message.warning(content);
}
