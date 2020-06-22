import { request } from '@/util/requst';

export const getBlogPage = async (current, size) => {
  const resp = await request.get('/blog/' + current + '/' + size);
  if (resp.code === '200') {
    return resp.data;
  } else {
    return null;
  }
}

export const getBlogOne = async (id) => {
  const resp = await request.get('/blog/' + id);
  if (resp.code === '200') {
    return resp.data;
  } else {
    return null;
  }
}

export const blogUpload = async (blog) => {
  const resp = await request.post('/blog/add', {
    data: blog,
  });
  return true;
};

export const blogUpdate = async (blog) => {
  const resp = await request.put('/blog/update', {
    data: blog,
  });
  return true;
};

export const deleteBlog = async (id) => {
  const resp = await request.delete('/blog/' + id);
  return resp.code === '200';
}
