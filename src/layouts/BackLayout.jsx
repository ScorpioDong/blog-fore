import React from 'react';
import style from './BackLayout.scss';
import { Link } from 'umi';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import memory from '@/util/memory';
import { baseUrl } from '@/util/requst';
import { getToken, webUpdate } from '@/services/web';
import { sortUpdate } from '@/services/sort';
import $ from 'jquery';
import Loading from '@/components/Loading';

const { Header, Content, Footer } = Layout;

class BackLayout extends React.Component {

  state = {
    avatar: '',
    loading: 0
  };

  constructor(props) {
    super(props);
    webUpdate();
    sortUpdate();
  }

  componentDidMount() {
    webUpdate();
    if (getToken() === '') {
      this.props.history.push('/login');
      return;
    }
    this.setState({
      avatar: memory.web.avatar,
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

    const { route, location, children } = this.props;
    const { avatar, loading } = this.state;
    if ($.isEmptyObject(memory.web) || memory.sorts.length === 0) {
      webUpdate();
      sortUpdate();
      window.setTimeout(() => {
        this.setState({ loading: loading + 1 });
      }, 1000);
      return <Loading/>;
    } else {
      return (
        <Layout className={style.layout}>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <img
              className={style.logo}
              src={require('@/assets/logo.png')}
              alt="logo"/>
            <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
              {
                route.routes.map((item) => {
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
              <Avatar
                className={style.avatar}
                size={42}
                src={baseUrl + avatar}
              />
            </Dropdown>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>ScorpioDong的个人小站 ©2020 Created by ScorpioDong</Footer>
        </Layout>
      );
    }
  }
}

export default BackLayout;
