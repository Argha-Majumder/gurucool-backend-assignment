const Quiz = require('../models/quizzes');

module.exports.home = (req, res) => {
    res.send('Server is live now!');
}

module.exports.create = async (req, res) => {
    try {
        let quiz = req.body;
        let startDate = new Date(quiz.startDate);
        let endDate = new Date(quiz.endDate);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({error: 'Start or end date is invalid'});
        }

        if (startDate === endDate) {
            return res.status(400).json({error: 'Start and end date can\'t be same'});
        }

        if (endDate <= new Date()) {
            return res.status(400).json({error: "End date must be bigger than local date and time"});
        }
        
        if (startDate > endDate) {
            return res.status(400).json({error: "End date must be bigger than start date"});
        }
        
        if (quiz.rightAnswer >= quiz.options.length) {
            return res.status(400).json({error: "right answer should be between options index"});
        }
        let validatedQuiz = new Quiz(quiz);
        await validatedQuiz.save();
        return res.status(201).json({message: "Quiz created successfully"});
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}

module.exports.getAciveQuizzes = async (req, res) => {
    try {
        let activeQuizzes = await Quiz.find({
            status: 'active'
        });
        return res.status(200).json(activeQuizzes);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

module.exports.getAllQuizzes = async (req, res) => {
    try {
        let allQuizzes = await Quiz.find({});
        return res.status(200).json(allQuizzes);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

module.exports.getResult = async (req, res) => {
    try {
        let quiz = await Quiz.findById({_id: req.params.id});
        let currentDate = new Date();
        //console.log(quiz.title);
        if (quiz.endDate > currentDate) {
            return res.status(400).json({error: "Quiz has not ended it"});
        }
        if (currentDate - quiz.endDate < (5*60*1000)) {
            return res.status(400).json({error: `Wait for ${(currentDate-quiz.endDate)/(60*1000)}`});
        }
        return res.status(200).json(quiz.options[quiz.rightAnswer]);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}