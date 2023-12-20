const express = require('express');
const router = express.Router();

const quizController = require('../controllers/quiz_controller');

router.get('/', quizController.home);
router.post('/quizzes', quizController.create);
router.get('/quizzes/active', quizController.getAciveQuizzes);
router.get('/quizzes/all', quizController.getAllQuizzes);
router.get('/quizzes/:id/result', quizController.getResult);

module.exports = router;