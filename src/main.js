import Vue from 'vue';
import ElementUI from 'element-ui';
import VueResize from 'vue-resize';
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhCNLocale from 'element-ui/lib/locale/lang/zh-CN';
import ElementLocale from 'element-ui/lib/locale';
import App from './App.vue';
import store from './store';
import router from './router';


import 'vue-resize/dist/vue-resize.css';

import 'font-awesome/scss/font-awesome.scss';
import 'flag-icon-css/css/flag-icon.min.css';
import '../public/dark-theme/index.css';
import '../public/main.scss';
import { _queryAllDictionaries } from './api/sysDictionaryApi';
import { _queryAllLanguages } from './api/languageApi';

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'mini' });

Vue.use(VueResize);

Vue.use(VueI18n);


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});


Vue.directive('has', {
  inserted(el, binding) {
    function permissionJudge(value) {
      const set = new Set(JSON.parse(localStorage.getItem('BUTTONS')));
      return set.has(value);
    }

    if (!permissionJudge(binding.value)) {
      el.parentNode.removeChild(el);
    }
  },
});

_queryAllDictionaries()
  .then((result) => {
    result.data.sysDictionaries.forEach((x) => {
      store.commit('addDictionary', {
        key: x.code,
        value: x,
      });
      x.data.forEach((d) => {
        store.commit('addDictionaryData', {
          key: `${x.code}-${d.code}`,
          value: d,
        });
      });
    });
  });


// 注册 (指令函数)
Vue.directive('dict', {
  inserted(el, binding) {
    const { parentNode } = el;
    parentNode.removeChild(el);
    parentNode.append(store.getters.getDictionaryDataByKey(binding.value).name);
  },
});

Vue.prototype.$dict = (code, value) => {
  const key = `${code}-${value}`;
  return store.getters.getDictionaryDataByKey(key) ? store.getters.getDictionaryDataByKey(key).name : '';
};

const locate = localStorage.getItem('language') || 'zh-CN';

const messages = {
  en: {
    LOGIN_NAME: 'Login name',
    PASSWORD: 'Password',
    LOGIN: 'Login',
    ...enLocale,
  },
  'zh-CN': {
    LOGIN_NAME: '账号',
    PASSWORD: '密码',
    LOGIN: '登录',
    ...zhCNLocale,
  },
};
// i18NDetails.forEach((x) => {
//   messages[x.languageCode][x.i18nCode] = x.value;
// });
let i18n = new VueI18n({
  locale: locate, // set locale
  messages, // set locale messages
});
ElementLocale.i18n((key, value) => i18n.t(key, value));

_queryAllLanguages()
  .then((result) => {
    // const locate = localStorage.getItem('language') || 'en';
    const { languages, i18NDetails } = result.data;
    languages.forEach((x) => {
      store.commit('addLanguage', x);
    });
    i18NDetails.forEach((x) => {
      messages[x.languageCode][x.i18nCode] = x.value;
    });
    i18n = new VueI18n({
      locale: locate, // set locale
      messages, // set locale messages
    });
    ElementLocale.i18n((key, value) => i18n.t(key, value));
    new Vue({
      store,
      router,
      i18n,
      render: h => h(App),
    }).$mount('#app');
  });
