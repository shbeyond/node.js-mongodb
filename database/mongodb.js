//cSpell:word runoob
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";
var assert = require("assert")
function connectDateBase(callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, d) {
        assert.equal(null, err);
        dbs = d.db("runoob");
        callback(dbs, d)
    })
}
exports.findData = function(collectionName, json, callback) {
    connectDateBase(function(dbs, d) {
        dbs.collection(collectionName).find(json).toArray(function(err, res) {
            assert.equal(null, err)
            callback(res)
        })
        d.close()
    })
}
exports.insertManyData = function(collectionName, json, callback) {
    connectDateBase(function(dbs, d) {
        dbs.collection(collectionName).insertMany(json, (err, res) => {
            assert.equal(null, err)
            callback(res)
        })
        d.close()
    })
}
exports.insertOneData = function(collectionName, json, callback) {
    connectDateBase(function(dbs, d) {
        dbs.collection(collectionName).insertOne(json, (err, res) => {
            assert.equal(null, err)
            callback(res)
        })
        d.close()
    })
}
exports.deleteOneData = function(collectionName, json, callback) {
    connectDateBase(function(dbs, d) {
        dbs.collection(collectionName).deleteOne(json, (err, res) => {
            assert.equal(null, err)
            callback(res)
        })
        d.close()
    })
}
exports.deleteManyData = function(collectionName, json, callback) {
    connectDateBase(function(dbs, d) {
        dbs.collection(collectionName).deleteMany(json, (err, res) => {
            assert.equal(null, err)
            callback(res)
        })
        d.close()
    })
}
exports.upDateData = function(collectionName, json, updateJson, callback) {
    connectDateBase(function(dbs, d) {
        dbs.collection(collectionName).updateOne(json, updateJson, (err, res) => {
            assert.equal(null, err)
            callback(res)
        })
        d.close()
    })
}
