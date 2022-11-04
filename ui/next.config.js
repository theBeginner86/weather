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
        APP_API_KEY: '6dbde2c35e994ab73a5b6499ea715f4e',
        APP_API_URL: 'https://api.openweathermap.org/data/2.5',
        GEO_API_URL: 'http://api.openweathermap.org/geo/1.0/direct'
      })
     config.plugins = [
      ...config.plugins,
      env
     ]
     return config;
  }, }
]);

//?q={city name},{state code},{country code}&limit={limit}&appid={API key}