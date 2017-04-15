'use strict';

const ENV_DEVELOPMENT = 'development';
const ENV_PRODUCTION = 'production';
const POCKET_CALLBACK_ROUTE = '/auth/callback';

const config = {
  POCKET_API: {
    SESSION_SECRET: 'procket-prune_GHJK83945^45jdka6%9',
    POCKET_CONSUMER_KEY: '61558-0c488d55899f7c02136aff39'
  }
};

switch (process.env.NODE_ENV || ENV_DEVELOPMENT) {
  case ENV_DEVELOPMENT:
    config.BASE_URL = 'http://localhost:3000';
    config.POCKET_CALLBACK_URL = config.BASE_URL + POCKET_CALLBACK_ROUTE;
}

module.exports = config;
