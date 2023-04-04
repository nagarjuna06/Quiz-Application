# Quiz Application

This is a web application built with React that allows users to take quizzes. It uses an API for its data and authentication.

Live Link: https://nagarjuna06.github.io/Quiz-Application

## Features

- User authentication with Api key.
- View a list of available quizzes.
- Take quizzes with multiple choice questions.
- Get immediate explanation on the correctness of each answer.
- See a summary of the quiz results upon completion.

### Setup

1. Clone the repository

```
git clone https://github.com/nagarjuna06/Quiz-Application.git
```

2. Install dependencies

```
cd Quiz-Application
npm install
```

3. Set environment variables
   Copy the .env.example file to .env and replace the values with your own. You will need to set the following environment variables:

`REACT_APP_API_URL:` The URL for the Quiz API.
`REACT_APP_TOKEN_KEY:` The key for the JWT token in local storage.

4. Start the development server

```
npm start
```

## Usage

#### Quizzes

After logging in, you will be taken to the quizzes page, where you can see a list of available quizzes. Clicking on a quiz will take you to the quiz page.

#### Taking a Quiz

On the quiz page, you will see the quiz instructions, the current question, and the possible answers. To select an answer, click on the radio button next to it and then click the "Next" button to move on to the next question.

#### Quiz Results

After completing the quiz, you will see a summary of your results, including your score and the correct answers for each question.

#### API

This application uses the Quiz API to retrieve quiz data and authenticate users. The API has the following endpoints:

`GET /quiz` : Returns a list of available quizzes.
`GET /quiz/:id` : Returns the quiz with the given ID.
`GET /quiz/:quizName/:questionId/answer` : it returns answer for the specified question.
