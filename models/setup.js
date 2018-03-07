const ApiError = require('../helpers/apiError');
const fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync('./sampleData/data.json', 'utf8'));
const quizService = require('../dbServices/quizService');
const questionService = require('../dbServices/questionService');
let isInitStart = false;

insertQuizId = (questions, id) => {
  return questions.map(q => {
    q['quiz_id'] = id;
    return q;
  })
}

getQuizIdByName = (quizzes, quizName) => {
  for (let quiz of quizzes) {
    if (quiz.name === quizName) {
      return quiz._id.toJSON();
    }
  }
  return null;
}

isQuizExist = (quizzes, name) => {
  for (let i = 0; i < quizzes.length; i++) {
    if (quizzes[i].name === name) {
      return true;
    }
  }
  return false;
}

isQuestionExist = (questions, questionText) => {
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].questionText === questionText) {
      return true;
    }
  }
  return false;
}

initDBData = (clearData) => {
  return new Promise((resolve, reject) => {
    try {
      clearDbData(clearData)
      .then(res => {
        quizService.all()
        .then(quizzesFromDb => {
          const quizzesFromJson = jsonData.map(data => {
            return data.quiz;
          })
          const filteredQuizzes = quizzesFromJson.filter(q => !isQuizExist(quizzesFromDb, q.name));
          if (filteredQuizzes.length === 0) {
            resolve('there aren\'t new quizzes to insert')
            return;
          }
          quizService.create(filteredQuizzes)
          .then(res => {
            const insertedArray = res.ops;
            questionService.all()
            .then(questionsFromDb => {
              let filteredQuestionsWithQuizId = [];
              for (let quizData of jsonData) {
                if (quizData.questions) {
                  let filteredQuestions = quizData.questions.filter(q => !isQuestionExist(questionsFromDb, q.questionText));
                  filteredQuestionsWithQuizId.push(...insertQuizId(filteredQuestions, getQuizIdByName([...insertedArray, ...quizzesFromDb], quizData.quiz.name)));
                }
              }
              questionService.create(filteredQuestionsWithQuizId)
              .then(res => {
                resolve(res)
              })
              .catch(error => {
                reject(error)
              })
            })
            .catch(error => {
              reject(error)
            })
          })
          .catch(error => {
            reject(error);
          })
        })
        .catch(error => {
          reject(error);
        })
      })
      .catch(error => {
        reject(error);
      })
    }
    catch (e) {
      reject(e);
    }
  }
  )
}

clearDbData = (clearData) => {
  if (clearData === 'true') {
    return Promise.all([quizService.drop(), questionService.drop()])
    return Promise.resolve();
  }
}

exports.init = (clearData) => {
  return new Promise((resolve, reject) => {
    if (isInitStart) {
      reject('setup already started')
      return;
    }
    isInitStart = true;
    initDBData(clearData)
    .then(res => {
      resolve(res);
    })
    .catch(error => {
      reject(error)
    })
    .then(() => {
      isInitStart = false;
    })
  })
}
