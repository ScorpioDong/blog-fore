import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {},
  // proxy: {
  //   '/api': {
  //     'target': 'http://localhost:8080/',
  //     'changeOrigin': true,
  //   },
  // },
  routes: [
    {
      path: '/login',
      title: '后台登录',
      component: '@/pages/Admin/Login',
    },
    {
      path: '/admin',
      component: '@/layouts/AdminLayout',
      routes: [
        {
          path: '/admin',
          redirect: '/admin/home',
        },
        {
          path: '/admin/home',
          title: '主页',
          name: '主页',
          component: '@/pages/Admin/Home',
        },
        {
          path: '/admin/blog',
          title: '博客管理',
          name: '博客管理',
          component: '@/pages/Admin/Blog',
        },
        {
          path: '/admin/sort',
          title: '分类管理',
          name: '分类管理',
          component: '@/pages/Admin/Sort',
        },
        {
          path: '/admin/edit/:id',
          title: '博客编辑',
          component: '@/pages/Admin/Edit',
        },
      ],
    },
    {
      path: '/',
      component: '@/layouts/BlogLayout',
      routes: [
        {
          path: '/',
          redirect: '/index',
        },
        {
          path: '/index',
          title: 'ScorpioDong的个人小站',
          name: '首页',
          component: '@/pages/Blog/Index',
        },
        {
          path: '/blog/:id',
          component: '@/pages/Blog/Article',
        },
      ],
    },
  ],
});
