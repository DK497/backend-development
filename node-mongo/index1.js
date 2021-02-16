// Linked to operations1.js using callbacks
const MongoClient=require('mongodb').MongoClient
const assert=require('assert')
const dboper = require('./operations1')

const url='mongodb://localhost:27017/'
const dbname='mongodb'

MongoClient.connect(url,(err,client)=>{ //connects mongo client to mongo server
    assert.strictEqual(err,null)
    console.log('connected correctly')
    const db=client.db(dbname)//to connect to database

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
    "dishes", (result) => {
        console.log("Insert Document:\n", result.ops);
        //result.ops tells no. of insert operation carried out  
 
        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents:\n", docs);

            dboper.updateDocument(db, { name: "Vadonut" },
            //2nd field is name of document to updated,3rd is field to be updated
                { description: "Updated Test" }, "dishes",
                (result) => {
                    console.log("Updated Document:\n", result.result);

                    dboper.findDocuments(db, "dishes", (docs) => {
                        console.log("Found Updated Documents:\n", docs);
                        
                        db.dropCollection("dishes", (result) => {
                            console.log("Dropped Collection: ", result);

                            client.close();
                        });
                    });
                });
        });
});

})