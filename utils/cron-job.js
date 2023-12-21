const cron = require('node-cron');
const Quiz = require('../models/quizzes');

cron.schedule('* * * * *', updateQuizStatus);

function updateQuizStatus() {
    const currentDate = new Date();
    Quiz.find({})
    .then(quizzes => {
        quizzes.forEach((quiz)=> {
            if (quiz.startDate > currentDate) {
                quiz.status = 'inactive';
            } else if (quiz.endDate < currentDate) {
                quiz.status = 'finished';
            } else {
                quiz.status = 'active';
            }

            quiz.save();
        });
    })
    .catch(err=> console.error(err));
}