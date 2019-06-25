import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Post, Session, User } from './entities';
// import moment from 'moment';
// import { random } from 'lodash';
import dotenv from 'dotenv';

const conf = dotenv.config();
console.log('Conf: ', conf);

async function asyncForEach<T>(
  array: T[],
  callback: (item: T, index: number, arr: T[]) => void
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export async function init() {
  const connection = await getDb(true);
  // await createFakeData(connection);
}

export default async function getDb(sync: boolean = false) {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Post, Session, User],
    synchronize: sync,
    logging: 'all',
  });
  // await createFakeData(connection);
  return connection;
}
