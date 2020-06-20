import React from 'react';
import style from './index.less';
import { Breadcrumb, Card } from 'antd';

const Home: React.FC = props => {
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
        <Breadcrumb.Item>主页</Breadcrumb.Item>
      </Breadcrumb>
      <Card style={{ padding: 10, minHeight: 700 }}>

      </Card>
    </div>
  );
};

export default Home;
