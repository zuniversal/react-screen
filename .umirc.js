import { defineConfig } from 'umi';
import routes from './routes';
// import common from './routes/common';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: {
    type: 'hash',
  },
  publicPath: './',
  links: [{ rel: 'icon', href: 'favicon.ico' }],
  locale: {
    antd: true,
    default: 'zh-CN', //
  },

  dynamicImport: {
    loading: '@/common/Loading',
  },
  chainWebpack(config) {
    config.optimization.splitChunks({
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|less)$/,
          chunks: 'async',
          minChunks: 1,
          minSize: 0,
        },
      },
    });
  },
  // terserOptions: {
  //   compress: {
  //     drop_console: true,
  //   },
  // },

  alias: {},
  routes: [
    // { path: '/login', component: 'login' },
    // { path: '/userCenter', component: '@/pages/UserCenter' },

    // ...common,
    {
      path: '/',
      // component: '@/layouts/index',
      component: '@/pages/common/Home',
      routes: [{ path: '/om/test', component: '@/pages/Test' }, ...routes],
    },
  ],
  theme: {
    '@primary-color': '#00B460',
    '@menu-dark-bg': '#2C2C2C',
  },

  chainWebpack(config) {
    config.optimization.splitChunks({
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|less)$/,
          chunks: 'async',
          minChunks: 1,
          minSize: 0,
        },
      },
    });
  },
  proxy: {
    '/api': {
      target: 'http://188.131.235.243:31002',
      // target: 'http://192.168.124.14:8001',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '',
      // },
    },
  },
});