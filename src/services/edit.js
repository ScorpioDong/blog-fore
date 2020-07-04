import { baseUrl, request } from '@/util/requst';

export const imgUpload = async (file) => {
  let form = new FormData();
  form.append('file', file);
  const resp = await request.post('/file/upload', {
    data: form,
  });
  return resp.data;
};

export const getImgs = async () => {
  const resp = await request.get('/file/imgs');
  return resp.data;
};
