import { requestUpload, requestWithToken, request, baseUrl } from '@/util/request';

const blogUpload = async (blog: any) => {
  const resp = await requestWithToken.post('/blog/add', {
    data: blog,
  });
  return true;
};

const blogUpdate = async (blog: any) => {
  const resp = await requestWithToken.put('/blog/update', {
    data: blog,
  });
  return true;
};

const get = async (id: number) => {
  const resp = await request.get('/blog/' + id);
  return resp.data;
};

const imgUpload = async (file: any, isMark: boolean) => {
  let form = new FormData();
  form.append('file', file);
  const resp = await requestUpload.post('/file/upload', {
    data: form,
  });
  if (isMark)
    return '![](' + baseUrl + resp.data + ')';
  else
    return baseUrl + resp.data;
};

export default {
  imgUpload,
  blogUpload,
  blogUpdate,
  get,
};
