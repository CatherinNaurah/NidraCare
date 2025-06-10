import { openDB } from 'idb';

const DATABASE_NAME = 'nidracare';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'data';

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade: (database) => {
    database.createObjectStore(OBJECT_STORE_NAME, {
      keyPath: 'id',
    });
  },
});

const Database = {
  async putData(report) {
    if (!Object.hasOwn(report, 'id')) {
      throw new Error('`id` is required to save.');
    }
    return (await dbPromise).put(OBJECT_STORE_NAME, report);
  },

  async getDataById(id) {
    if (!id) {
      throw new Error('`id` is required.');
    }
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async getAllData() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  
  async removeData(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default Database;
