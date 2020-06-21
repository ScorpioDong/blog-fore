import { request } from '@/util/requst';
import memory from '@/util/memory';
import store from 'store2';

export const webUpdate = () => {
  request.get('/web/info')
    .then((resp) => {
      if (resp.code === '200') {
        memory.web = resp.data;
      }
    });
};

export const login = async (user) => {
  const resp = await request.post(
    '/web/login', {
      data: user,
    },
  );
  if (resp.code === '200') {
    memory.token = resp.data.token;
    store.set('token', resp.data.token);
    return true;
  } else {
    return false;
  }
};

export const getToken = () => {
  let token = '';
  if (!(memory.token === '')) {
    token = memory.token;
  } else if (store.has('token')) {
    memory.token = store.get('token');
    token = memory.token;
  }

  return token;
};

export const logout = () => {
  memory.token = '';
  store.remove('token');
};
