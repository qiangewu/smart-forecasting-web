import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const mainRouters = [
  {
    path: '',
    name: 'Index',
    meta: { requiresAuth: true, title: '首页' },
    component: () => import('@/views/index/Index.vue'),
  },
];

const sysRouters = [
  {
    path: '/dictionary-management',
    name: 'DictionaryList',
    meta: { requiresAuth: true, title: '字典管理' },
    component: () => import('@/views/sys/dictionary/DictionaryList.vue'),
  },
  // {
  //   path: '/dictionary-data',
  //   name: 'DictionaryDataList',
  //   meta: { requiresAuth: true, title: '字典数据' },
  //   component: () => import('@/views/sys/dictionaryData/DictionaryDataList.vue'),
  // },
  {
    path: '/organization',
    name: 'OrganizationList',
    meta: { requiresAuth: true, title: '组织管理' },
    component: () => import('@/views/sys/organization/OrganizationList.vue'),
  },
  {
    path: '/user',
    name: 'UserList',
    meta: { requiresAuth: true, title: '用户管理' },
    component: () => import('@/views/sys/user/UserList.vue'),
  },
  {
    path: '/user-password',
    name: 'UserPassword',
    meta: { requiresAuth: true, title: '密码修改' },
    component: () => import('@/views/sys/user/UserPassword.vue'),
  },
  {
    path: '/menu',
    name: 'MenuList',
    meta: { requiresAuth: true, title: '菜单管理' },
    component: () => import('@/views/sys/menu/MenuList.vue'),
  },
  {
    path: '/role',
    name: 'RoleList',
    meta: { requiresAuth: true, title: '角色管理' },
    component: () => import('@/views/sys/role/RoleList.vue'),
  },
  {
    path: '/log',
    name: 'LogList',
    meta: { requiresAuth: true, title: '日志管理' },
    component: () => import('@/views/sys/log/LogList.vue'),
  },
  {
    path: '/language',
    name: 'LanguageList',
    meta: { requiresAuth: true, title: '语言管理' },
    component: () => import('@/views/sys/language/LanguageList.vue'),
  },
  {
    path: '/i18n-detail',
    name: 'I18NDetailList',
    meta: { requiresAuth: true, title: '翻译管理' },
    component: () => import('@/views/sys/i18nDetail/I18NDetailList.vue'),
  },
  {
    path: '/constructing-page',
    name: 'ConstructingPage',
    meta: { requiresAuth: true, title: '页面建设中' },
    component: () => import('@/layout/ConstructingPage.vue'),
  },
  {
    path: '/coding-rule',
    name: 'CodingRuleList',
    meta: { requiresAuth: true, title: '编码规则' },
    component: () => import('@/views/sys/codingRule/CodingRuleList.vue'),
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/layout/NotFoundPage.vue'),
  },
];
export default new Router({
  routes: [
    {
      path: '',
      meta: { requiresAuth: true, title: '' },
      component: () => import('@/layout/MainFramework.vue'),
      children: [
        ...mainRouters,
        ...sysRouters,
      ],
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false, title: '' },
      component: () => import('@/views/login/Login.vue'),
    },
    {
      path: '*',
      redirect: {
        name: '404',
      },
    },
  ],
});
