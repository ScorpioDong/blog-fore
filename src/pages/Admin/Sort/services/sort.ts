import {request, requestWithToken} from '@/util/request';

export async function deleteSort(id: number) {
  const resp = await request.delete('/sort/' + id);
  return resp.code === '200';
}

export async function addSort(sort: any) {
  const resp = await requestWithToken.post('/sort/add', {data: sort});
  return resp.code === '200';
}

export async function updateSort(sort: any) {
  const resp = await requestWithToken.put('/sort/update', {data: sort});
  return resp.code === '200';
}

export async function getPage(current: number, size: number) {
  const resp = await request.get('/sort/' + current + '/' + size);
  if (resp.code === '200') {
    return resp.data;
  } else {
    return null;
  }
}
