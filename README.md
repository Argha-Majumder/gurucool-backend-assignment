# Quiz Application Assignment

Welcome to quiz application project, where user can enroll and participate in timed quizzes. This guide will show you how to use this api in various use-cases.

## Base URL 
```
https://quiz-application-9lf2.onrender.com/
```

## Endpoints

### GET
Simply showing you if the server is live or not.

#### Example Request
```
GET https://quiz-application-9lf2.onrender.com/
```
#### Example Response
```
Server is live now!
```


### POST /auth/signup
In this endpoint, you need to create an account for successful requests.

#### Example Request
```
POST https://quiz-application-9lf2.onrender.com/auth/signup
```
#### Request Body
- **email**: A string representing the user's email address
- **password**: A string representing the user's password

#### Example Request Body
```
{
    "email": "someone@example.com",
    "password": "abcdefgh"
}
```

#### Example Response
If the request is successful, the API will return a 201 Created status code along with a JSON object representing with a succesful message.
```
{
    "message": "Successfully created"
}
```

#### Error Response
If an error occurs, the API will return an appropriate HTTP status code along with a JSON object describing the error.

#### Example Error Response
```
{
    "errors": [
        {
            "type": "field",
            "value": "someone",
            "msg": "Please provide a valid email address",
            "path": "email",
            "location": "body"
        },
        {
            "type": "field",
            "value": "abcd",
            "msg": "Password should be a minimum of 6 characters",
            "path": "password",
            "location": "body"
        }
    ]
}
```


### POST /auth/signin
In this endpoint, you need to sign in using your email and password

#### Example Request
```
POST https://quiz-application-9lf2.onrender.com/auth/signin
```
#### Request Body
- **email**: A string representing the user's email address
- **password**: A string representing the user's password

#### Example Request Body
```
{
    "email": "someone@example.com",
    "password": "abcdefgh"
}
```

#### Example Response
If the request is successful, the API will return a 200 status code along with a JSON object representing a token.
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpveUBnbWFpbC5jb20iLCJpYXQiOjE3MDMyNTQzNDcsImV4cCI6MTcwMzI1Nzk0N30._NhaUoqaa_PMyI59VP5NFbgTmZ9Dr-1JTbJnY9gh8qf"
}
```

#### Error Response
If an error occurs, the API will return an appropriate HTTP status code along with a JSON object describing the error.

#### Example Error Response
```
{
    "error": "Invalid credentials"
}
```


### POST /quizzes
In this endpoint, you can post a question.

#### Authorization
To authenticate your request, include your bearer token in the *Authorization* header of your request. The header should be structured as follows:
```
Authorization: Bearer YOUR_TOKEN_HERE
```
Replace *YOUR_TOKEN_HERE* with your actual bearer token. And it'll valid until 1h.

#### Example Request
```
POST https://quiz-application-9lf2.onrender.com/quizzes
```
#### Request Body
- **title**: A string representing the title of the question
- **options**: An array of strings representing the options to that particular question
- **rightAnswer**: A numeric value representing the index of the option array
- **startDate**: A string which follows ISO format
- **endDate**: A string which follows ISO format

#### Example Request Body
```
{
    "title": "Which among these is a weakly-typed language?",
    "options": ["Java", "C++", "Go", "JavaScript"],
    "rightAnswer": 3,
    "startDate": "2023-12-22T10:50:00Z",
    "endDate": "2023-12-22T12:00:00Z"
}
```

#### Example Response
If the request is successful, the API will return a 200 status code along with a JSON object representing a successful message.
```
{
    "message": "Quiz created successfully"
}
```

#### Error Response
If an error occurs, the API will return an appropriate HTTP status code along with a JSON object describing the error.

#### Example Error Response
```
{
    "error": "This quiz already exists"
}
```
```
{
    "error": "End date must be bigger than local date and time"
}
```
```
{
    "error": "right answer should be between options index"
}
```


### GET /quizzes/active
In this endpoint, you can get all active questions.

#### Authorization
To authenticate your request, include your bearer token in the *Authorization* header of your request. The header should be structured as follows:
```
Authorization: Bearer YOUR_TOKEN_HERE
```
Replace *YOUR_TOKEN_HERE* with your actual bearer token. And it'll valid until 1h.

#### Example Request
```
GET https://quiz-application-9lf2.onrender.com/quizzes/active
```

#### Example Response
If the request is successful, the API will return a 200 status code along with a JSON object representing the quizzes that are active.
```
[
    {
        "_id": "6585a53c9c15ff9b2dc7682f",
        "title": "Which among these is a interpreted language?",
        "options": [
            "C",
            "C++",
            "Go",
            "JavaScript"
        ],
        "rightAnswer": 3,
        "startDate": "2023-12-22T10:50:00.000Z",
        "endDate": "2023-12-22T12:00:00.000Z",
        "status": "active",
        "__v": 0
    },
    {
        "_id": "6585a6bb9c15ff9b2dc76859",
        "title": "Which among these is a compiled language?",
        "options": [
            "C++",
            "Python",
            "JavaScript"
        ],
        "rightAnswer": 0,
        "startDate": "2023-12-22T10:50:00.000Z",
        "endDate": "2023-12-22T12:00:00.000Z",
        "status": "active",
        "__v": 0
    }
]
```


### GET /quizzes/:id/result
In this endpoint, you can get result of a questions only after 5 mins of quiz's end time.

#### Authorization
To authenticate your request, include your bearer token in the *Authorization* header of your request. The header should be structured as follows:
```
Authorization: Bearer YOUR_TOKEN_HERE
```
Replace *YOUR_TOKEN_HERE* with your actual bearer token. And it'll valid until 1h.

#### Example Request
```
GET https://quiz-application-9lf2.onrender.com/quizzes/6585696d41f8edfd240d1105/result
```

#### Example Response
If the request is successful, the API will return a 200 status code along with a JSON object representing the answer of a particular quiz.
```
{
    "answer": "JavaScript"
}
```

#### Error Response
If an error occurs, the API will return an appropriate HTTP status code along with a JSON object describing the error.

#### Example Error Response
```
{
    "error": "Quiz has not ended it"
}
```


### GET /quizzes/all
In this endpoint, you can get all quizzes.

#### Authorization
To authenticate your request, include your bearer token in the *Authorization* header of your request. The header should be structured as follows:
```
Authorization: Bearer YOUR_TOKEN_HERE
```
Replace *YOUR_TOKEN_HERE* with your actual bearer token. And it'll valid until 1h.

#### Example Request
```
GET https://quiz-application-9lf2.onrender.com/quizzes/all
```

#### Example Response
If the request is successful, the API will return a 200 status code along with a JSON object representing all quizzes.
```
[
    {
        "_id": "6585a370ba1881120ea55c53",
        "title": "Which among these is a weakly-typed language?",
        "options": [
            "Java",
            "C++",
            "Go",
            "JavaScript"
        ],
        "rightAnswer": 3,
        "startDate": "2023-12-22T09:00:00.000Z",
        "endDate": "2023-12-22T10:00:00.000Z",
        "status": "finished",
        "__v": 0
    },
    {
        "_id": "6585a53c9c15ff9b2dc7682f",
        "title": "Which among these is a interpreted language?",
        "options": [
            "C",
            "C++",
            "Go",
            "JavaScript"
        ],
        "rightAnswer": 3,
        "startDate": "2023-12-22T10:50:00.000Z",
        "endDate": "2023-12-22T12:00:00.000Z",
        "status": "active",
        "__v": 0
    },
    {
        "_id": "6585a6bb9c15ff9b2dc76859",
        "title": "Which among these is a compiled language?",
        "options": [
            "C++",
            "Python",
            "JavaScript"
        ],
        "rightAnswer": 0,
        "startDate": "2023-12-22T10:50:00.000Z",
        "endDate": "2023-12-22T12:00:00.000Z",
        "status": "active",
        "__v": 0
    }
]
```

### Error related to JWT

If there has no token you'll find error like this:

```
{
    "error": "No token found"
}
```

And if the token mismatches you'll get an error:
```
{
    "message": "invalid token"
}
```
Also if the token got expired you'll also get error message:
```
{
    "message": "jwt expired"
}
```