const mongoService = require('./mongoService');
const dbUtils = require('../helpers/dbUtils');
const collection = "quizzes";

exports.all = () => {
  return mongoService.findAll(collection);
}

exports.getById = (id) => {
  return mongoService.getById(collection, id);
}

exports.updateQuizResults = (id, score) => {
  const filter = { _id: dbUtils.stringToObjectId(id) };
  const update = { $inc: { aggregatedScore: score, gameCounter: 1 } };
  return mongoService.findOneAndUpdate(collection, filter, update, {});
}

exports.create = (docs) => {
  return mongoService.insertMany(collection, docs);
}

exports.drop = () => {
  return mongoService.drop(collection);
}
