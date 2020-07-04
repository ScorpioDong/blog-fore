import React from 'react';
import './ImageDrawer.scss';
import { Button, Drawer, Upload } from 'antd';
import { baseUrl } from '@/util/requst';
import { imgUpload } from '@/services/edit';
import { UploadOutlined } from '@ant-design/icons';

const ImageDrawer = (props) => {
  const { imgs, onImageClick, onDrawerClose, visible, updateImages } = props;
  return (
    <Drawer
      width={360}
      title="选择图片"
      placement="right"
      closable={false}
      onClose={() => onDrawerClose()}
      visible={visible}
      footer={
        <Upload
          accept="image/*"
          className='cover'
          multiple
          showUploadList={false}
          customRequest={
            async (value) => {
              await imgUpload(value.file);
              updateImages();
            }
          }
        >
          <Button block type='primary'>
            <UploadOutlined/> 上传图片
          </Button>
        </Upload>
      }
    >
      {
        imgs.map((item) => {
          return (
            <img
              className='img-style'
              src={baseUrl + item}
              alt={baseUrl + item}
              onClick={() => {
                onImageClick(item);
                onDrawerClose();
              }}
            />
          );
        })
      }
    </Drawer>
  );
};

export default ImageDrawer;
