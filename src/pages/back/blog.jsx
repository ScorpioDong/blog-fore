import React from 'react';
import style from './blog.scss';
import { Breadcrumb, Card, Row, Col, Input, Button, Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getSortName } from '@/services/sort';
import { deleteBlog, getBlogPage } from '@/services/blog';

const { Search } = Input;

class Blog extends React.Component {

  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 7,
      total: 0,
    },
    loading: false,
  };

  componentDidMount() {
    this.page(this.state.pagination.current, this.state.pagination.pageSize);
  }

  page(current, size) {
    this.setState({ loading: true });
    getBlogPage(current, size)
      .then((data) => {
        this.setState({
          loading: false,
          data: data.records,
          pagination: {
            current: data.current,
            pageSize: data.size,
            total: data.total,
          },
        });
      });
  }

  tableChange = (pagination, filters, sorter) => {
    let { total, current, pageSize } = pagination;
    if ((current - 1) * pageSize >= total) {
      current = current - 1;
    }
    this.page(current, pageSize);
  };

  render() {

    const { data, pagination, loading } = this.state;
    const { history } = this.props;
    const { page, tableChange } = this;

    const columns = [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        width: 100,
      },
      {
        title: '题目',
        dataIndex: 'title',
        key: 'title',
        width: 200,
      },
      {
        title: '分类',
        key: 'sort',
        width: 200,
        render: function(record) {
          return <span>{getSortName(record.sortId)}</span>;
        },
      },
      {
        title: '简介',
        dataIndex: 'description',
        key: 'description',
        width: 600,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 200,
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 200,
      },
      {
        title: '操作',
        key: 'action',
        className: 'action',
        render: function(record) {
          return (
            <div>
              <Button
                className={style.button}
                shape="round"
                icon={<EditOutlined/>}
                onClick={
                  () => {
                    history.push('/admin/edit/' + record.id);
                  }
                }
              />
              <Popconfirm
                title={'确定要删除 "' + record.title + '" 吗？'}
                okText="删除"
                cancelText="取消"
                onConfirm={async () => {
                  const result = await deleteBlog(record.id);
                  if (result) {
                    message.success('删除成功！');
                    page(pagination.current, pagination.pageSize);
                  } else {
                    message.error('删除失败！');
                  }
                }}
              >
                <Button
                  className={style.button}
                  danger
                  shape="round"
                  icon={<DeleteOutlined/>}/>
              </Popconfirm>
            </div>
          );
        },
      },
    ];

    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>后台管理</Breadcrumb.Item>
          <Breadcrumb.Item>博客管理</Breadcrumb.Item>
        </Breadcrumb>
        <Card style={{ padding: 10, minHeight: 700 }}>
          <Row gutter={16} style={{ marginBottom: 10 }}>
            <Col span={8}><Search enterButton/></Col>
            <Col span={4}><Button type='primary' onClick={() => history.push('/admin/edit/0')}>添加博客</Button></Col>
          </Row>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
            pagination={pagination}
            loading={loading}
            onChange={tableChange}
          />
        </Card>
      </div>
    );
  }

}

export default Blog;
