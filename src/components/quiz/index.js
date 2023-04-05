
import { useEffect, useState } from "react";
import QuestionFormat from "../quizFormat"
import { LevelName, LoadingContainer, LoadingText, QuizContainer, QuizName, Time, TimeContainer, BgContainer, ScoreCardImg, Score, Rank, Navbar } from "./styledComponents"
import QuestionContext from "../../context/questionContext";
import { Watch } from "react-loader-spinner";
import { RiTimerLine } from 'react-icons/ri'
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Button } from "../quizFormat/styledComponents";

const gameStatus = {
    loading: "LOADING",
    start: "START",
    end: "END"
}

let questionObj = [];

const shuffledArray = array => {
    return array.sort(() => Math.random() - 0.5)
}
const selectRandomQuestion = () => {
    const index = Math.floor(Math.random() * questionObj.length)
    return questionObj[index]
}
const randomQuestion = () => {
    const question = selectRandomQuestion();
    question.options = shuffledArray(question.options);
    return question
}
const removeQuestion = (questionId) => {
    questionObj = questionObj.filter(each => each.questionId !== questionId);
}

const Timer = (props) => {
    const { timeInMinutes } = props;
    const strTime = timeInMinutes + 1 < 10 ? `0${timeInMinutes + 1}:00` : `${timeInMinutes + 1}:00`
    const [time, setTime] = useState(strTime);
    const [minutes, setMinutes] = useState(timeInMinutes);
    const [seconds, setSeconds] = useState(59);
    const [timeLess, setTimeLess] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            const strMinutes = minutes < 10 ? `0${minutes}` : minutes
            const strSeconds = seconds < 10 ? `0${seconds}` : seconds
            const StrFtime = `${strMinutes}:${strSeconds}`;
            setTime(StrFtime);
            if (minutes === 0 && seconds === 0) {
                setTimeout(() => {
                    props.timerEnd()
                }, 300)
            }
            if (minutes !== 0 && seconds === 0) {
                setMinutes(prev => prev - 1);
                setSeconds(59);
            }
            else if (seconds > 0) {
                setSeconds(prev => prev - 1)
            }

        }, 1000);
    }, [time])

    useEffect(() => {
        if (minutes === 0) {
            setTimeLess(true);
        }
    }, [minutes])

    return (
        <TimeContainer>
            <Time timeless={timeLess}><RiTimerLine size={20} style={{ marginRight: "5px" }} />{time}</Time>
        </TimeContainer>
    )
}

const Quiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [Question, setQuestion] = useState({});
    const [time, setTime] = useState(1);
    const [skip, setSkip] = useState(0);
    const [mark, setMark] = useState(0);
    const [score, setScore] = useState(0);
    const [errorMsg, SetErrorMsg] = useState('Questions are Loading...');
    const [gameState, setGameState] = useState(gameStatus.loading);
    const [queryParams, setQueryParams] = useState({});
    const [questionChange, setQuestionChange] = useState(true);
    const loadNextQuestion = () => {
        if (questionObj.length > 0) {
            setQuestionChange(false)
            setTimeout(() => {
                setQuestion(randomQuestion());
                setQuestionChange(true)
            }, 500);
        }
        else {
            quizOver()
        }
    }


    const storeMarks = (marks, questionId) => {
        if (marks > 0) {
            removeQuestion(questionId)
        }
        setScore(prev => prev + marks)
    }
    const quizOver = () => {
        setGameState(gameStatus.end)
    }
    const quizApiCall = async () => {
        const values = queryString.parse(location.search);
        const { quizName, level, no } = values
        const apiKey = process.env.REACT_APP_API_KEY;
        const options = {
            method: "GET",
            headers: {
                'X-Api-Key': apiKey
            }
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/quiz/${quizName}?level=${level}&no=${no}`, options);
            const response = await res.json()
            if (res.ok) {
                questionObj = response.data
                setTime(response.time);
                setSkip(response.skip);
                setMark(response.mark);
                setQuestion(randomQuestion());
                setGameState(gameStatus.start);
                SetErrorMsg("Question is Loading...");
                setQueryParams(values);
            }
            else {
                SetErrorMsg(response.msg)
            }
        }
        catch (err) {
            SetErrorMsg(err.message)
        }
    }

    useEffect(() => {
        quizApiCall()
    }, []);

    const playAgainClicked = () => {
        navigate('/')
    }

    const renderScoreCard = () => {
        const { quizName, no, level, name } = queryParams
        const noOfQuestions = parseInt(no);

        return (
            <LoadingContainer height={500}>
                <QuizName>{quizName} Quiz</QuizName>
                <LevelName>{level} level</LevelName>
                <ScoreCardImg>
                    <Rank>{name}</Rank>
                </ScoreCardImg>
                <LoadingText>You Scored</LoadingText>
                <h3><Score>{score}</Score>/{mark * noOfQuestions}</h3>
                <Button bgColor noMargin onClick={playAgainClicked}>Play Again!</Button>
            </LoadingContainer>
        )
    }

    const renderLoadingComponent = () => {
        return (
            <LoadingContainer>
                <Watch
                    height="80"
                    width="80"
                    radius="48"
                    color="royalblue"
                    visible={true}

                />
                <LoadingText>{errorMsg}</LoadingText>
            </LoadingContainer>
        )
    }
    const renderQuestions = () => {
        const { quizName, level, no } = queryParams
        return (
            <>
                <Navbar>
                    <LevelName noMargin>Attempted: {no - questionObj.length}/{no}</LevelName>
                    <Timer timeInMinutes={time - 1} timerEnd={quizOver} />
                </Navbar>
                <QuizName>{quizName} Quiz</QuizName>
                <LevelName>{level} level</LevelName>
                {questionChange ? <QuestionFormat />
                    :
                    renderLoadingComponent()
                }
            </>
        )
    }
    const renderComponent = () => {
        switch (gameState) {
            case gameStatus.loading: return renderLoadingComponent()
            case gameStatus.start: return renderQuestions()
            case gameStatus.end: return renderScoreCard()
            default: return
        }
    }
    return (
        <BgContainer height={110}>
            <QuizContainer>
                <QuestionContext.Provider
                    value={{
                        data: Question,
                        mark: mark,
                        values: queryParams,
                        getQuestion: loadNextQuestion,
                        questionMarks: storeMarks,
                        skip: skip
                    }}
                >
                    {renderComponent()}
                </QuestionContext.Provider>
            </QuizContainer>
        </BgContainer>
    )
}
export default Quiz