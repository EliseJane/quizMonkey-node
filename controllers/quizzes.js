const controllerHandler = require('./controllerHandler');
const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const Question = require('../models/question');

router.get('/', controllerHandler(Quiz.all, (req, res, next) => []));
router.get('/:id', controllerHandler(Quiz.getById, (req, res, next) => [req.params.id]));
router.patch('/:id', controllerHandler(Quiz.updateQuizResults, (req, res, next) => [req.params.id, req.body.score]));
router.get('/:id/questions', controllerHandler(Question.getByQuizId, (req, res, next) => [req.params.id]));
router.post('/', controllerHandler(Quiz.create, (req, res, next) => [req.body]));

module.exports = router;
