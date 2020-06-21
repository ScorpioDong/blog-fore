import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {},
  routes: [
    {
      path: '/login',
      title: '后台登录',
      component: '@/pages/back/login'
    },
    {
      path: '/admin',
      component: '@/layouts/BackLayout',
      routes: [
        {
          path: '/admin',
          redirect: '/admin/home'
        },
        {
          path: '/admin/home',
          title: '主页',
          name: '主页',
          component: '@/pages/back/home',
        },
        {
          path: '/admin/blog',
          title: '博客管理',
          name: '博客管理',
          component: '@/pages/back/blog',
        },
        {
          path: '/admin/sort',
          title: '分类管理',
          name: '分类管理',
          component: '@/pages/back/sort',
        },
        {
          path: '/admin/edit/:id',
          title: '博客编辑',
          component: '@/pages/back/edit',
        },
      ]
    },
    {
      path: '/',
      component: '@/layouts/BlogLayout',
      routes: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          title: 'ScorpioDong的个人小站',
          name: '首页',
          component: '@/pages/fore/home',
        },
        {
          path: '/blog/:id',
          component: '@/pages/fore/blog',
        },
      ]
    },
  ],
});
