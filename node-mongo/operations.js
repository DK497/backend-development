const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    //to insert document in a collection
    const coll = db.collection(collection);// to get particular collection
    return coll.insertOne(document);
};

exports.findDocuments = (db, collection, callback) => {
    //to find all documents in a collection
    const coll = db.collection(collection);
   return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback) => {
    //to remove document of a particular collection
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection, callback) => {
    //update:is update info
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
};
