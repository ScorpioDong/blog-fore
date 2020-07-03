import { baseUrl, request } from '@/util/requst';

export const imgUpload = async (file, isMark) => {
  let form = new FormData();
  form.append('file', file);
  const resp = await request.post('/file/upload', {
    data: form,
  });
  if (isMark)
    return '![](' + resp.data + ')';
  else
    return resp.data;
};
