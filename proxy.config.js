const config = require('./src/assets/config/development.json');

const proxy = [
  {
    context: '/api',
    target: config['HOST_API'],
    pathRewrite: {'^/api' : ''}
  },
  {
    context: '/accounts',
    target: config['API_AUTHORIZE'],
    pathRewrite: {'^/accounts' : ''}
  }
];

module.exports = proxy;