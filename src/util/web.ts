import { request } from '@/util/request';
import store from 'store2';

let web = new class {

  get() {
    if (!store.has('web')) {
      return {
        webName: 'ScorpioDong',
        domain: 'http://www.scorpiodong.com',
        motto: '在忙碌中挤出时间，只为让自己更强大',
        nickname: 'ScorpioDong',
        avatar: '/assets/img/pika.jpeg',
        cover: '/assets/img/cover/cover9.jpg'
      }
    }
    return store.get('web');
  }

  remove() {
    store.remove('web');
  }

  async update() {
    const resp = await request.get('/web/info');
    store.set('web', resp.data);
  }
};

export default web;
