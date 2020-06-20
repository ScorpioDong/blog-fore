import React from 'react';
import './index.less';
import { history, Link } from 'umi';
import { Row, Col, Menu } from 'antd';
import { AlertOutlined, SearchOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';


interface HeaderPropsType {
  progressValue: number,
  progressVisible: boolean,
  selectValue: string,
  routes: any[]
}

class Header extends React.Component<HeaderPropsType, any> {
  state = {
    menuVisible: false,
  };

  handleMenuPlus = (visible: boolean) => {
    if (visible) {
      this.setState({ menuVisible: true });
      document.documentElement.style.overflow = 'hidden';
    } else {
      this.setState({ menuVisible: false });
      document.documentElement.style.overflow = 'scroll';
    }
  };

  render() {
    const {
      progressValue,
      progressVisible,
      selectValue,
      routes,
    } = this.props;
    const {
      menuVisible,
    } = this.state;
    return (
      <div>
        <div
          className={'header' + (progressValue === 0 ? ' no-visible bgc-no' : ' visible bgc-white')}
          style={{ boxShadow: '0 1px 3px 0 rgba(0,34,77,.05)' }}
        >
          <div
            className='progress'
            style={{ width: progressVisible ? progressValue + '%' : 0 }}
          />
          <Row gutter={16}>
            <Col span={3} offset={3}>
              <img className={'logo'}
                   src={require('@/assets/logo.png')} alt="logo"/>
            </Col>
            <Col span={12}>
              {
                routes.map((item: any) => {
                  if (item.name) {
                    return (
                      <Link
                        key={item.path}
                        className={'menu-link' + (selectValue === item.path ? ' menu-link-active' : '')}
                        to={item.path}>{item.name}
                      </Link>
                    );
                  }
                })
              }
            </Col>
            <Col span={4}>
              <SearchOutlined className="icon"/>
              <AlertOutlined className='icon'/>
            </Col>
          </Row>
        </div>
        <div
          className={'menu-div' + (progressValue === 0 ? ' visible' : ' no-visible')}
          style={!menuVisible ? { boxShadow: '0 1px 3px 0 rgba(0,34,77,.05)' } : {}}
        >
          {!menuVisible ?
            <MenuOutlined className={'menu-icon'} onClick={() => this.handleMenuPlus(true)}/> :
            <CloseOutlined className={'menu-icon'} onClick={() => this.handleMenuPlus(false)}/>}
        </div>
        <div className={'menu-plus' + (menuVisible ? ' menu-plus-100h' : ' menu-plus-0h')}>
          <Row gutter={16} style={{ boxShadow: '0 2px 5px 0 rgba(0,34,77,.05)' }}>
            <Col span={3} offset={3}>
              <img className={'logo'}
                   src={require('@/assets/logo.png')} alt="logo"/>
            </Col>
          </Row>
          <Row className='menu-plus-row'><Link to='#' className="icon">首页</Link></Row>
          <Row className='menu-plus-row'><Link to='#' className="icon">归档</Link></Row>
          <Row className='menu-plus-row'><Link to='#' className="icon">分类</Link></Row>
          <Row className='menu-plus-row'><SearchOutlined className="icon"/></Row>
          <Row className='menu-plus-row'><AlertOutlined className='icon'/></Row>
        </div>
      </div>
    );
  }
}

export default Header;
