import React from 'react';
import style from './index.less';
import { history } from 'umi';
import { getPage, deleteBlog } from '@/services/blog';
import { Breadcrumb, Card, Row, Col, Input, Button, Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import sort from '@/util/sort';

const { Search } = Input;


class Blog extends React.Component<any, any> {

  state = {
    data: [],
    sorts: [],
    pagination: {
      current: 1,
      pageSize: 7,
      total: 0,
    },
    loading: false,
    columns: [
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
        render: (record: { sortId: number; }) => {
          return <span>{sort.getSortName(record.sortId)}</span>;
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
        render: (record: { id: number; title: string; }) => {
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
                    await this.page(this.state.pagination.current, this.state.pagination.pageSize);
                  } else {
                    message.error('删除失败！');
                  }
                }}
              >
                <Button className={style.button} danger shape="round" icon={<DeleteOutlined/>}/>
              </Popconfirm>
            </div>
          );
        },
      },
    ],
  };

  async page(current: number, size: number) {
    this.setState({ loading: true });
    const data = await getPage(current, size);
    this.setState({
      loading: false,
      data: data.records,
      pagination: {
        current: data.current,
        pageSize: data.size,
        total: data.total,
      },
    });
  }

  async componentDidMount() {
    await sort.update();
    await this.page(this.state.pagination.current, this.state.pagination.pageSize);
  }

  handleTableChange = async (pagination: any, filters: any, sorter: any) => {
    await this.page(pagination.current, pagination.pageSize);
  };

  render() {
    const { columns, data, pagination, loading } = this.state;
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>后台管理</Breadcrumb.Item>
          <Breadcrumb.Item>博客管理</Breadcrumb.Item>
        </Breadcrumb>
        <Card style={{ padding: 10, minHeight: 700 }}>
          <Row gutter={16} style={{marginBottom:10}}>
            <Col span={8}><Search enterButton/></Col>
            <Col span={4}><Button type='primary' onClick={() => history.push('/admin/edit/0')}>添加博客</Button></Col>
          </Row>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record: any) => record.id}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />
        </Card>
      </div>
    );
  }

}


export default Blog;
