const MongoClient=require('mongodb').MongoClient
const assert=require('assert')


const url='mongodb://localhost:27017/'
const dbname='mongodb'

MongoClient.connect(url,(err,client)=>{ //connects mongo client to mongo server
    assert.strictEqual(err,null)
    console.log('connected correctly')
    const db=client.db(dbname)//to connect to database

    const collection=db.collection('dishes')
    //inserting one record om collection dishes 
    collection.insertOne({"name":"Uthapizza","description":"test"},
    (err,result)=>{
        assert.strictEqual(err,null)
        console.log("after insert:\n")
        console.log(result.ops)
        // we are doing operation inside another to ensure 
        // that previous is completed before proceeding to next one.
        collection.find({}).toArray(
            (err,docs)=>{ 
            //to find collection that matches in {} and output in docs
            //all collection returned as nocriteria 
            assert.strictEqual(err,null);
            
            console.log("Found:\n");
            console.log(docs);

            db.dropCollection("dishes",
                  (err, result) => {
                // to remove dishes collection
                assert.strictEqual(err,null);

                client.close();
            })
        })
    })

})