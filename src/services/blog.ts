import { request } from '@/util/request';

export interface BlogType {
  id: number,
  sortId: number,
  title: string,
  description: string,
  createTime: string,
  updateTime: string,
  content: string,
  cover: string,
}

export async function getPage(current: number, size: number) {
  const resp = await request.get('/blog/' + current + '/' + size);
  if (resp.code === '200') {
    return resp.data;
  } else {
    return null;
  }
}

export async function getOne(id: number) {
  const resp = await request.get('/blog/' + id);
  if (resp.code === '200') {
    return resp.data;
  } else {
    return null;
  }
}

export async function deleteBlog(id: number) {
  const resp = await request.delete('/blog/' + id);
  return resp.code === '200';
}

