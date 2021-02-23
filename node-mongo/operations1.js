const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    //to insert document in a collection
    const coll = db.collection(collection);// to get particular collection
    coll.insert(document, (err, result) => {
        assert.strictEqual(err, null);
        console.log("Inserted " + result.result.n + 
                            // result.result.n is no. of documents inserted
            " documents into the collection " + collection);
            // result.result.n is no. of documents inserted 
        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {
    //to find all documents in a collection
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);        
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    //to remove document of a particular collection
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        console.log("Removed the document ", document);
        callback(result);        
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    //update:is update info
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        //3rd parameter is for which fields to be updated
        assert.strictEqual(err, null);
        console.log("Updated the document with ", update);
        callback(result);        
    });
};
