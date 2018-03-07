const ApiError = require('../helpers/apiError');
const mongoDB = require('../helpers/db');
const dbUtils = require('../helpers/dbUtils');

exports.findAll = (collectionName) => {
  const collection = mongoDB.db.collection(collectionName);
  return collection.find({}).toArray();
}

exports.findByConditions = (collectionName, conditions) => {
  const collection = mongoDB.db.collection(collectionName);
  return collection.find(conditions).toArray();
}

exports.findOneAndUpdate = (collectionName, filter, update, options) => {
  const collection = mongoDB.db.collection(collectionName);
  return collection.findOneAndUpdate(filter, update, options);
}

exports.insertMany = (collectionName, docs) => {
  const collection = mongoDB.db.collection(collectionName);
  return collection.insertMany(docs);
}

exports.getById = (collectionName, id) => {
  const collection = mongoDB.db.collection(collectionName);
  return new Promise(function (resolve, reject) {
    collection.findOne({ _id: dbUtils.stringToObjectId(id) }, (err, doc) => {
      if(err){
        reject(err);
      } else {
        if(doc === null) {
          reject(new ApiError('The server can not find requested resource', 404));
        } else {
          resolve(doc);
        }
      }
    });
  });
}

exports.drop = (collectionName) => {
  const collection = mongoDB.db.collection(collectionName);
  return collection.drop();
}
