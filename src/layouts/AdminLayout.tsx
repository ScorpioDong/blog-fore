import React from 'react';
import { Link } from 'umi';
import style from './AdminLayout.less';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import token from '@/util/token';
import web from '@/util/web';
import { baseUrl } from '@/util/request';

const { Header, Content, Footer } = Layout;

class AdminLayout extends React.Component<any, any> {
  state = {
    avatar: '',
  };

  async componentDidMount() {
    await web.update()
    if (!token.has()) {
      this.props.history.push('/login');
      return;
    }
    this.setState({
      avatar: web.get().avatar,
    });
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item onClick={() => {
          this.props.history.push('/login');
        }}>
          退出登录
        </Menu.Item>
      </Menu>
    );
    const { routes } = this.props.route;
    const { avatar } = this.state;
    return (
      <Layout className={style.layout}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <img src={require('@/assets/logo.png')} alt="logo" className={style.logo}/>
          <Menu theme="dark" mode="horizontal" selectedKeys={[this.props.location.pathname]}>
            {
              routes.map((item: any) => {
                if (item.name) {
                  return (
                    <Menu.Item key={item.path}>
                      <Link to={item.path}>{item.name}</Link>
                    </Menu.Item>
                  );
                }
              })
            }
          </Menu>
          <Dropdown overlay={menu}>
            <Avatar size={42} src={baseUrl + avatar} className={style.avatar}/>
          </Dropdown>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>ScorpioDong的个人小站 ©2020 Created by ScorpioDong</Footer>
      </Layout>
    );
  }
}


export default AdminLayout;
