import React, {Component} from "react";

import './index.less';

class H1 extends Component {
    render() {
        const {title} = this.props || {};
        return (
            <div className="my-h1">{title}</div>
        )
    }
}

export default H1;
