import React from 'react';
import './web.scss';
import { Breadcrumb, Card, Row, Col, Form, Input, Button, message } from 'antd';
import memory from '@/util/memory';
import { baseUrl } from '@/util/requst';
import { updateWebInfo, webUpdate } from '@/services/web';

class Web extends React.Component {
  state = {
    avatar: '',
    cover: '',
  };

  componentDidMount() {
    this.setState({
      avatar: memory.web.avatar,
      cover: memory.web.cover,
    });
    this.formModel.current.setFieldsValue({
      nickname: memory.web.nickname,
      webName: memory.web.webName,
      keywords: memory.web.keywords,
      motto: memory.web.motto,
      domain: memory.web.domain,
      avatar: memory.web.avatar,
      cover: memory.web.cover,
    });
  }

  formModel = React.createRef();

  render() {
    const { formModel } = this;
    const { avatar, cover, domain, keywords, motto, nickname, webName } = this.state;
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>后台管理</Breadcrumb.Item>
          <Breadcrumb.Item>网站信息</Breadcrumb.Item>
        </Breadcrumb>
        <Card style={{ padding: 0, minHeight: 720 }}>
          <div className='web-edit-container'>
            <Row gutter={16}>
              <Col span={12}>
                <Form
                  {...layout}
                  ref={formModel}
                  size={'large'}
                >
                  <Form.Item label={'网站名'} name={'webName'} labelAlign={'left'} initialValue={webName}>
                    <Input/>
                  </Form.Item>
                  <Form.Item label={'用户昵称'} name={'nickname'} labelAlign={'left'} initialValue={nickname}>
                    <Input/>
                  </Form.Item>
                  <Form.Item label={'域名'} name={'domain'} labelAlign={'left'} initialValue={domain}>
                    <Input/>
                  </Form.Item>
                  <Form.Item label={'关键字'} name={'keywords'} labelAlign={'left'} initialValue={keywords}>
                    <Input/>
                  </Form.Item>
                  <Form.Item label={'座右铭'} name={'motto'} labelAlign={'left'} initialValue={motto}>
                    <Input/>
                  </Form.Item>
                  <Form.Item label={'头像'} name={'avatar'} labelAlign={'left'} initialValue={avatar}>
                    <Input/>
                  </Form.Item>
                  <Form.Item label={'首页图'} name={'cover'} labelAlign={'left'} initialValue={cover}>
                    <Input/>
                  </Form.Item>
                </Form>
              </Col>
              <Col span={8} offset={4}>
                <div>
                  <div className={'web-avatar-cover-container'}>
                    <img className={'web-avatar'} src={baseUrl + avatar} alt="avatar"/>
                  </div>
                  <div className={'web-avatar-cover-container'}>
                    <img className={'web-cover'} src={baseUrl + cover} alt="cover"/>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={1} offset={22}>
                <Button
                  type='primary'
                  onClick={async () => {
                    await updateWebInfo(formModel.current.getFieldsValue());
                    webUpdate();
                    message.success('更新成功');
                    window.setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  }}
                >
                  更新
                </Button>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    );
  }
}

export default Web;
