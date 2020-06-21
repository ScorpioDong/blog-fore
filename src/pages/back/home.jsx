import React from 'react';
import { Breadcrumb, Card } from 'antd';

class Home extends React.Component{
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>后台管理</Breadcrumb.Item>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
        </Breadcrumb>
        <Card style={{ padding: 10, minHeight: 700 }}>

        </Card>
      </div>
    )
  }
}

export default Home;
