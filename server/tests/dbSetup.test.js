const mongoose = require('mongoose');
const setup = require('./dbSetup');

beforeAll(async () => {
  await setup.setup();
});

afterAll(async () => {
  await setup.deleteDB();
});

beforeEach(async () => {
  await setup.clearCollection();
});

test('test DB connects and can write/read a document', async () => {
  // create a temporary collection for checking
  const collection = mongoose.connection.db.collection('db_test');

  // insert a document in collection
  const insertDoc = await collection.insertOne({ name: 'kunal', time: Date.now() });

  // if document insertion worked must return a doc id
  expect(insertDoc.insertedId).toBeDefined();

  // check for document count it shold be 1
  const count = await collection.countDocuments();
  expect(count).toBe(1);
});