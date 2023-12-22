const express = require('express');
const router = express.Router();
const checkAuth = require('../config/authMiddleware');
const quizController = require('../controllers/quiz_controller');

router.get('/', quizController.home);
router.use('/auth', require('./auth'));
router.post('/quizzes', checkAuth , quizController.create);
router.get('/quizzes/active', checkAuth, quizController.getAciveQuizzes);
router.get('/quizzes/all', checkAuth, quizController.getAllQuizzes);
router.get('/quizzes/:id/result', checkAuth, quizController.getResult);

module.exports = router;