import { baseUrl, request } from '@/util/requst';

export const imgUpload = async (file, isMark) => {
  let form = new FormData();
  form.append('file', file);
  const resp = await request.post('/file/upload', {
    data: form,
  });
  if (isMark)
    return '![](' + baseUrl + resp.data + ')';
  else
    return baseUrl + resp.data;
};
