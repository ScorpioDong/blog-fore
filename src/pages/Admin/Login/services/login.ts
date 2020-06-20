import {request} from '@/util/request';
import token from '@/util/token';

export interface LoginSubmitType {
  username: String,
  password: String
}

export default async function login(user: LoginSubmitType) {
  const resp = await request.post(
    '/web/login', {
      data: user,
    },
  );
  if (resp.code === '200') {
    token.save(resp.data.token)
    return true;
  } else {
    return false;
  }
}
