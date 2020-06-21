import { request } from '@/util/requst';
import memory from '@/util/memory';

export const sortUpdate = () => {
  request.get('/sort/all')
    .then((resp) => {
      if (resp.code === '200') {
        memory.sorts = resp.data;
      }
    });
};

export const getSortName = (sortId) => {
  let name = '未找到';
  memory.sorts.map((item) => {
    if (item.id === sortId) {
      name = item.name;
    }
  });
  return name;
}

export const deleteSort = async (id) => {
  const resp = await request.delete('/sort/' + id);
  return resp.code === '200';
}

export const addSort = async (sort) => {
  const resp = await request.post('/sort/add', {data: sort});
  return resp.code === '200';
}

export const updateSort = async (sort) => {
  const resp = await request.put('/sort/update', {data: sort});
  return resp.code === '200';
}

export const getSortPage = async (current, size) => {
  const resp = await request.get('/sort/' + current + '/' + size);
  if (resp.code === '200') {
    return resp.data;
  } else {
    return null;
  }
}
