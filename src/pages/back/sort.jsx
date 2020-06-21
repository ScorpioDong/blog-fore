import React from 'react';
import style from './sort.scss';
import { Breadcrumb, Card, Row, Col, Input, Button, Table, Popconfirm, message, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { addSort, deleteSort, getSortPage, sortUpdate, updateSort } from '@/services/sort';
import memory from '@/util/memory';

class Sort extends React.Component {
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
  };

  componentDidMount() {
    this.page(this.state.pagination.current, this.state.pagination.pageSize);
  }

  page(current, size) {
    this.setState({ loading: true });
    getSortPage(current, size)
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
    const {
      id, data, name, description, visible,
      isUpdate, pagination, loading,
    } = this.state;
    const { tableChange } = this;

    const that = this;

    const columns = [
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
        render: function(record) {
          return (
            <div>
              <Button
                className={style.button}
                shape="round"
                icon={<EditOutlined/>}
                onClick={
                  () => {
                    that.setState({
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
                    const { total, current, pageSize } = pagination;
                    tableChange(
                      { total: total - 1, current: current, pageSize: pageSize },
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
    ];

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
            rowKey={(record) => record.id}
            pagination={pagination}
            loading={loading}
            onChange={tableChange}
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
                sortUpdate();
                tableChange(pagination);
                this.setState({
                  data: memory.sorts, visible: false, id: 0,
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
