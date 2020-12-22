import { NuxtAxiosInstance } from '@nuxtjs/axios';
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $api: NuxtAxiosInstance;
  }
}
