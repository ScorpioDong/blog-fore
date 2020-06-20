import store from 'store2';

let token = {
  save: (token: String) => {
    store.set('token', token);
  },
  get: () => {
    return store.get('token');
  },
  remove: () => {
    store.remove('token')
  },
  has: () => {
    return store.has('token');
  },
};

export default token;
