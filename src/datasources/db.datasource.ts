require('dotenv').config();
import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

declare let process: {
  env: {
    MAIN_DB: string;
    NODE_ENV: string;
    MONGODB_URL: string;
    MONGODB_HOST: string;
    MONGODB_PORT: number;
    MONGODB_USER: string;
    MONGODB_PASS: string;
  };
};

const config = {
  name: 'db',
  connector: 'mongodb',
  url: process.env.MONGODB_URL,
  host: process.env.MONGODB_HOST,
  port: process.env.MONGODB_PORT,
  user: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASS,
  database: process.env.MAIN_DB,
  useNewUrlParser: true,
  allowExtendedOperators: true,
  lazyConnect: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource implements LifeCycleObserver {
  // dotenv config
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
