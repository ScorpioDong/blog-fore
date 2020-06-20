import React from 'react';
import style from './index.less';
import { history } from 'umi';
import { message, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import login, { LoginSubmitType } from '@/pages/Admin/Login/services/login';
import token from '@/util/token';
import web from '@/util/web';

const Login: React.FC = props => {

  const handleSubmit = async (value: LoginSubmitType) => {
    const result = await login(value);
    if (result) {
      message.success('登录成功！');
      await web.update();
      history.push('/admin/home');
    } else {
      message.error('登录失败，请检查用户名和密码！');
    }
  };

  token.remove();

  return (
    <div className={style.login}>
      <header className={style.login_header}>
        <img src={require('@/assets/logo.png')} alt="logo"/>
        <h1>博客管理</h1>
      </header>
      <section className={style.login_content}>
        <h1>用户登录</h1>
        <Form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={values => handleSubmit(values as LoginSubmitType)}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              { min: 4, message: '用户名至少为4位' },
              { max: 12, message: '用户名最多为12位' },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon"/>}
              placeholder="用户名"
              className={style.login_input}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码！' },
              { min: 4, message: '密码至少为4位' },
              { max: 12, message: '密码最多为12位' },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon"/>}
              type="password"
              placeholder="密码"
              className={style.login_input}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={style.login_button}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default Login;
