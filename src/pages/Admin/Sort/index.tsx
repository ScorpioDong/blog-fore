import React from 'react';
import style from './index.less';
import { Breadcrumb, Card, Row, Col, Input, Button, Table, Popconfirm, message, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import sort from '@/util/sort';
import { deleteSort, addSort, updateSort, getPage } from '@/pages/Admin/Sort/services/sort';

class Sort extends React.Component<any, any> {

  state = {
    data: [],
    visible: false,
    id: 0,
    name: undefined,
    description: undefined,
    isUpdate: false,
    loading: true,
    pagination: {
      current: 1,
      pageSize: 7,
      total: 0,
    },
    columns: [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        width: 100,
      },
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
        width: 200,
      },
      {
        title: '简介',
        dataIndex: 'description',
        key: 'description',
        width: 1200,
      },
      {
        title: '操作',
        key: 'action',
        className: 'action',
        render: (record: { id: number; name: string; description: string }) => {
          return (
            <div>
              <Button
                className={style.button}
                shape="round"
                icon={<EditOutlined/>}
                onClick={
                  () => {
                    this.setState({
                      visible: true, id: record.id, name: record.name,
                      description: record.description, isUpdate: true,
                    });
                  }
                }
              />
              <Popconfirm
                title={'确定要删除 "' + record.name + '" 吗？'}
                okText="删除"
                cancelText="取消"
                onConfirm={async () => {
                  const result = await deleteSort(record.id);
                  if (result) {
                    message.success('删除成功！');
                    await sort.update();
                    const { total, current, pageSize } = this.state.pagination;
                    await this.handleTableChange(
                      {total: total - 1, current: current, pageSize: pageSize},
                    );
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
    await this.page(this.state.pagination.current, this.state.pagination.pageSize);
  }

  handleTableChange = async (pagination: any) => {
    let { total, current, pageSize } = pagination;
    if ((current - 1) * pageSize >= total) {
      current = current - 1;
    }
    await this.page(current, pageSize);
  };

  render() {
    const { columns, id, data, name, description, visible, isUpdate, pagination, loading } = this.state;
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>后台管理</Breadcrumb.Item>
          <Breadcrumb.Item>分类管理</Breadcrumb.Item>
        </Breadcrumb>
        <Card style={{ padding: 10, minHeight: 700 }}>
          <Row gutter={16} style={{ marginBottom: 10 }}>
            <Col span={4}><Button type='primary' onClick={() => {
              this.setState({ visible: true });
            }}>添加分类</Button></Col>
          </Row>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record: any) => record.id}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />
          <Modal
            title={isUpdate ? '更新分类' : '添加分类'}
            visible={visible}
            cancelText={'取消'}
            okText={isUpdate ? '更新' : '添加'}
            onCancel={() => {
              this.setState({ visible: false, id: 0, name: undefined, description: undefined, isUpdate: false });
            }}
            onOk={
              async () => {
                if (name === undefined) {
                  message.error('请输入分类名！');
                  return;
                }
                if (description === undefined) {
                  message.error('请输入分类描述！');
                  return;
                }
                if (isUpdate) {
                  await updateSort({
                    id: id,
                    name: name,
                    description: description,
                  });
                  message.success('更新成功！');
                } else {
                  await addSort({
                    name: name,
                    description: description,
                  });
                  message.success('添加成功！');
                }
                await sort.update();
                await this.handleTableChange(pagination);
                this.setState({
                  data: sort.get(), visible: false, id: 0,
                  name: undefined, description: undefined, isUpdate: false,
                });
              }
            }
          >
            <Input size="large" placeholder="分类名" value={name} style={{ marginBottom: 10 }}
                   onChange={(e) => this.setState({ name: e.target.value })}/>
            <Input.TextArea placeholder="分类描述" value={description} rows={6}
                            style={{ resize: 'none' }}
                            onChange={(e) => this.setState({ description: e.target.value })}/>
          </Modal>
        </Card>
      </div>
    );
  }

}


export default Sort;
