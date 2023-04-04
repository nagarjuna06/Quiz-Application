import { createContext } from "react";

const QuestionContext = createContext({
    data: [],
    mark: 0,
    skip: 0,
    values: {},
    getQuestion: () => { },
    getNextQuestion: () => { },
    questionMarks: () => { }
})

export default QuestionContext;