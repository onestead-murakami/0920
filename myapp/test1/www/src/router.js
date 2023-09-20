import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from './components/HelloWorld.vue';
import Sample1 from './components/Sample1.vue';
import Sample2 from './components/Sample2.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: HelloWorld },
    { path: '/sample1', name: 'Sample1', component: Sample1 },
    { path: '/sample2', name: 'Sample2', component: Sample2 },
  ],
});
