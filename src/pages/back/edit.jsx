import React from 'react';
import './edit.scss';
import { Breadcrumb, Card, Row, Col, Button, Input, Select, Upload, message } from 'antd';
import { StarOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import Editor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import marked from 'marked';
import { blogUpdate, blogUpload, getBlogOne } from '@/services/blog';
import { imgUpload } from '@/services/edit';
import memory from '@/util/memory';

class Edit extends React.Component {

  state = {
    value: '',
    title: '',
    description: '',
    sortId: 0,
    cover: '',
  };

  editor = {};

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id !== '0') {
      getBlogOne(id)
        .then((data) => {
          this.setState({
            title: data.title,
            description: data.description,
            value: data.content,
            cover: data.cover,
            sortId: data.sortId,
          });
        });
    }
  }

  render() {
    const { history } = this.props;
    const { value, title, description, sortId, cover } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined/>
        <div className='ant-upload-text'>添加封面</div>
      </div>
    );
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>后台管理</Breadcrumb.Item>
          <Breadcrumb.Item>博客编辑</Breadcrumb.Item>
        </Breadcrumb>
        <Card style={{ padding: 0, minHeight: 720 }}>
          <Row gutter={16} style={{ marginTop: 10 }}>
            <Col span={6}>
              <Input placeholder="标题"
                     prefix={<StarOutlined/>}
                     value={title}
                     onChange={e => {
                       this.setState({
                         title: e.target.value,
                       });
                     }}
              />
            </Col>
            <Col span={14}>
              <Input placeholder="简介"
                     value={description}
                     onChange={e => {
                       this.setState({
                         description: e.target.value,
                       });
                     }}
              />
            </Col>
            <Col span={4}>
              <Button type='primary'
                      block
                      onClick={
                        async () => {
                          if (title === '') {
                            message.error('博客标题不能为空！');
                            return;
                          }
                          if (description === '') {
                            message.error('博客简介不能为空！');
                            return;
                          }
                          if (value === '') {
                            message.error('博客内容不能为空！');
                            return;
                          }
                          if (sortId === 0) {
                            message.error('请选择博客分类！');
                            return;
                          }
                          const id = this.props.match.params.id;
                          if (id === '0') {
                            await blogUpload({
                              sortId: sortId,
                              title: title,
                              description: description,
                              content: value,
                              cover: cover,
                            });
                            message.success('添加成功！');
                          } else {
                            await blogUpdate({
                              id: id,
                              sortId: sortId,
                              title: title,
                              description: description,
                              content: value,
                              cover: cover,
                            });
                            message.success('修改成功！');
                          }
                          history.push('/admin/blog');
                        }
                      }
              >
                保存
              </Button>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 10, height: 570 }}>
            <Col span={20}>
              <Editor
                style={{ height: 620 }}
                ref={node => this.editor = node}
                value={value}
                renderHTML={(text) => {
                  return marked(text);
                }}
                onChange={(value) => {
                  this.setState({
                    value: value.text,
                  });
                }}
              />
            </Col>
            <Col span={4}>
              <Row gutter={2} style={{ padding: 0, margin: 0 }}>
                <Col span={8} style={{ display: 'flex', alignItems: 'center' }}><h3
                  style={{ fontSize: 14, marginBottom: 0 }}>请选择分类：</h3></Col>
                <Col span={16}>
                  <Select value={sortId === 0 ? undefined : sortId} placeholder='请选择分类！' style={{ width: '100%' }}
                          onSelect={(value) => {
                            this.setState({
                              sortId: value,
                            });
                          }}
                  >
                    {
                      memory.sorts.map((value) => {
                        return <Select.Option value={value.id} key={value.id}>{value.name}</Select.Option>;
                      })
                    }
                  </Select>
                </Col>
              </Row>
              <Upload
                accept="image/*"
                className='cover'
                customRequest={
                  async (value) => {
                    const url = await imgUpload(value.file, false);
                    this.setState({
                      cover: url,
                    });
                  }
                }
                listType="picture-card"
                showUploadList={false}
              >
                {cover !== '' ? <img src={cover} alt="avatar" style={{ width: '100%' }}/> : uploadButton}
              </Upload>
              <div className="upload-container">
                <Upload
                  className="upload"
                  accept="image/*"
                  listType='picture'
                  multiple
                  onPreview={async (file) => {
                    this.editor.insertPlaceholder('![图片上传中]()',
                      imgUpload(file.originFileObj, true));
                  }}
                >
                  <Button block>
                    <UploadOutlined/> 添加图片
                  </Button>
                </Upload>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default Edit;
