import { request } from '@/util/request';
import store from 'store2';

let sort = new class {

  get() {
    return store.get('sorts');
  }

  remove() {
    store.remove('sorts');
  }

  async update() {
    const resp = await request.get('/sort/all');
    store.set('sorts', resp.data);
  }

  getSortName(sortId: number) {
    let name = '未找到';
    sort.get().map((item: { id: number; name: string; }) => {
      if (item.id === sortId) {
        name = item.name;
        return;
      }
    });
    return name;
  }
};

export default sort;
