import { hot } from 'react-hot-loader/root';
import { Typography } from 'antd';

import BatchConcerned from './BatchConcerned';
import './App.scss';

const { Title } = Typography;

const App = () => (
    <div className="app">
        <Title className="title" level={5}>
            批量关注LeetCode
        </Title>
        <BatchConcerned />
    </div>
);

export default hot(App);
