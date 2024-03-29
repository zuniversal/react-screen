import { defineConfig } from 'umi';
import common from './src/routes/common';
import routes from './src/routes';

export default defineConfig({
  // mfsu: { production: { output: '.mfsu-production' } },
  // mfsu: {},

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
    default: 'zh-CN',
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
    // { path: '/urgent', component: '@/pages/common/Urgent' },
    // {
    //   path: '/',
    //   // component: '@/layouts/index',
    //   component: '@/pages/common/Home',
    //   routes: [{ path: '/om/test', component: '@/pages/Test' }, ...routes],
    // },
    ...common,
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        // { path: '/om/test', component: '@/pages/Test' },
        ...routes,
      ],
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
      target: 'https://api.github.com',
      target: 'http://106.15.92.117:9510',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
});
