import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("updating database")
  const jateDb = await openDB("text editor", 1)
  const tx = jateDb.transaction("text editor", "readwrite")
  const store = tx.objectStore("text editor")
  const request = store.put({id: 1, value: content})
  const result = await request;
  console.log("data saved to database", result.value)
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("reading database")
  const jateDb = await openDB("text editor", 1)
  const tx = jateDb.transaction("text editor", "readonly")
  const store = tx.objectStore("text editor")
  const request = store.get(1)
  const result = await request;
  result? console.log("data found in database", result.value): console.log("no data in database")
  return result?.value;
}

initdb();
