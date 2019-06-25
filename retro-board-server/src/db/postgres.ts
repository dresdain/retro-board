import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { Post, Session, User } from './entities';
import { Store } from '../types';
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

async function getDb(sync: boolean = false) {
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

const get = (store: Connection) => (sessionId: string) =>
  new Promise((resolve, reject) => {
    store.findOne({ id: sessionId }, (err, session) => {
      if (err) {
        reject(err);
      } else if (session) {
        resolve(session);
      } else {
        resolve({
          id: sessionId,
          name: null,
          posts: [],
        });
      }
    });
  });

const set = (store: Connection) => (session: Session) =>
  new Promise((resolve, reject) => {
    store.update({ id: session.id }, session, { upsert: true }, err => {
      if (err) {
        reject(err);
      } else {
        resolve(session);
      }
    });
  });

export default async function db(): Promise<Store> {
  const connection = await getDb();

  // mongoose.connect(
  //   config.DB_Mongo_URL,
  //   {
  //     useNewUrlParser: true,
  //   }
  // );
  // mongoose.set('useCreateIndex', true);
  // const store = mongoose.connection;
  return {
    set: set(connection),
    get: get(connection),
  };
}
