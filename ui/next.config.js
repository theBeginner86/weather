const compose = require('next-compose');
// const withCSS = require('@zeit/next-css')
const webpack = require('webpack');

module.exports = compose([
  // [withCSS, {}],
  { exportPathMap : function () {
    return {
      '/' : { page : '/index' },
      '/index' : { page : '/index' },
      '/404' : { page : '/_error' },
      '/login' : { page : '/login' },
      '/signup' : { page : '/signup' },
    };
  }, },
  {
    webpack: (config) => {
      const env = new webpack.EnvironmentPlugin({
        "process.env.NODE_ENV": process.env.NODE_ENV || "production",
        REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
        REACT_APP_API_URL: process.env.REACT_APP_API_URL,
      })
     config.plugins = [
      ...config.plugins,
      env
     ]
     return config;
  }, }
]);
