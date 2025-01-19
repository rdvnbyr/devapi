interface IConfig {
  name: string;
  connector: string;
  url: string;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  useNewUrlParser: boolean;
  allowExtendedOperators: boolean;
  lazyConnect: boolean;
}

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

export default function dbConfig(): IConfig {
  return {
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
}
