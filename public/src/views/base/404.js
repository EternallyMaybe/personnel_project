import React, {Component} from 'react';
import img404 from '@/assets/img/404.png';

class NotMatch extends Component {
    render() {
        return (
            <img alt="404 Not Found" className="not-match" src={img404}/>
        );
    }
}

export default NotMatch;