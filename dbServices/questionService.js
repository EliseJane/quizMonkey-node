const mongoService = require('./mongoService');
const dbUtils = require('../helpers/dbUtils');
const collection = "questions";

exports.getByQuizId = (quizId) => {
  return mongoService.findByConditions(collection, {quiz_id: dbUtils.stringToObjectId(quizId)});
}

exports.getById = (id) => {
  return mongoService.getById(collection, id);
}

exports.create = (docs) => {
  return mongoService.insertMany(collection, dbUtils.stringIDToObjectId(docs, 'quiz_id'));
}

exports.all = () => {
  return mongoService.findAll(collection);
}

exports.drop = () => {
  return mongoService.drop(collection);
}
