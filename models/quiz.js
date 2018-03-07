const quizService = require('../dbServices/quizService');

exports.all = () => {
  return quizService.all();
}

exports.getById = (id) => {
  return quizService.getById(id);
}

exports.updateQuizResults = (id, score) => {
  return quizService.updateQuizResults(id, score);
}

exports.create = (docs) => {
  return quizService.create(docs);
}
