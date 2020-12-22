import { Context } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';

export default function({ $axios }: Context, inject: Inject) {
  const api = $axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      common: {
        Authorization: window.localStorage.getItem('auth._token.github') || '',
        'Content-Type': 'application/json'
      }
    }
  });

  inject('api', api);
}
