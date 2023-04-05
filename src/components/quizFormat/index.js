import {
    Question,
    Form,
    Input,
    Option,
    Button,
    ButtonContainer,
    Explanation,
    OptionCorrectWrong,
    ErrorMsg,
    Marks,
    MarksContainer,
    SkipBtnContainer
} from './styledComponents';
import { v4 as uuid } from 'uuid';
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/mode-css'

import { useContext, useState } from 'react';
import { useEffect } from 'react';
import QuestionContext from '../../context/questionContext';

const QuestionFormat = () => {
    const context = useContext(QuestionContext);
    const { data, getQuestion, questionMarks, mark, values, skip } = context
    const [showExplanation, setShowExplanation] = useState(false);
    const [showBtn, setShowBtn] = useState(true);
    const [correct, setCorrect] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [showError, setShowError] = useState(false);
    const [marks, setMarks] = useState(0);
    const [enableSkipBtn, setEnableSkipBtn] = useState(true);
    const [clickedOption, setClickedOption] = useState('');
    const [skipTime, setSkipTime] = useState(skip);
    const doNotCopy = () => {
        navigator.clipboard.writeText('')
    }

    const codeContent = () => {
        const { code, language } = data.code
        return (
            <AceEditor
                width='100%'
                // height={100}
                minLines={5}
                maxLines={30}
                mode={language}
                theme='dracula'
                // name="blah2"
                fontSize={14}
                showGutter={true}
                highlightActiveLine={false}
                value={code}
                readOnly={true}
                onCopy={doNotCopy}
                style={{ borderRadius: "5px", margin: "20px 0px" }
                }
            />
        )
    }

    const explanationContent = () => {
        const { explanation } = data
        return (
            <Explanation>
                {explanation !== null
                    &&
                    <>
                        <details>
                            <summary>
                                <b>Explanation</b>
                            </summary>
                            <p>&emsp;&emsp;{explanation}</p>
                        </details>
                    </>
                }
            </Explanation>

        )
    }

    const btnClicked = async (e) => {
        e.target.innerText += '...'
        await answerApiCall()
        setShowExplanation(true)
        setShowBtn(false)
        setCorrect(true)
        setSelectedOption('null')
        setMarks(-1)
    }

    useEffect(() => {
        setTimeout(() => {
            if (skipTime <= 0) {
                setEnableSkipBtn(false);
            }
            else {
                setSkipTime(prev => prev - 1)
            }
        }, 1000)
    }, [skipTime])
    const skipBtnClicked = () => {
        getQuestion();
    }
    const nextBtnClicked = e => {
        e.target.innerText += '...'
        getQuestion()
    }
    const marksContent = () => {
        const size = 50;
        const space = 0;
        return (
            <MarksContainer>
                <Marks>
                    {(correct && !showExplanation) ? QuestionCorrect(size, space) : QuestionWrong(size, space)}
                    <h1>{marks > 0 ? " +" + marks : marks}</h1>
                </Marks>
                <Button type='button' bgColor noMargin onClick={nextBtnClicked}>Next</Button>
            </MarksContainer>
        )
    }
    const answerApiCall = async () => {
        const { questionId } = data
        const { quizName } = values
        const apiKey = process.env.REACT_APP_API_KEY
        const options = {
            method: "GET",
            headers: {
                "X-Api-Key": apiKey,
            }
        }
        const res = await fetch(`${process.env.REACT_APP_API_URL}/quiz/${quizName}/${questionId}/answer`, options);
        const response = await res.json()
        data.answer = response.answer
        data.explanation = response.explanation
    }

    const submitQuestion = async (e) => {
        e.preventDefault()
        await answerApiCall()
        const { answer } = data
        if (clickedOption === '') {
            setShowError(true)
            return
        }
        setSelectedOption(clickedOption);
        setShowBtn(false)
        if (answer === clickedOption) {
            setCorrect(true)
            setMarks(mark)
            questionMarks(mark, data.questionId)
        }
        else {
            setShowExplanation(true)
            setCorrect(false)
            setMarks(-1)
            questionMarks(-1, data.questionId)
        }
    }
    const submitBtnClicked = e => {
        e.target.innerText += '...'
    }
    const optionClicked = e => {
        setClickedOption(e.target.value);
        setShowError(false)
    }
    const renderSkipText = () => {
        return (
            <p>Skip&Show button will be enabled in {skipTime} seconds!.</p>
        )
    }

    const renderText = () => {
        return (
            <p>If you Skip,you attempt this question again!.</p>
        )
    }
    const question = () => {
        const { question, options, code = null, answer } = data
        return (
            <Form onSubmit={submitQuestion}>
                <Question>Q. {question}</Question>
                {code !== null && codeContent()}
                {
                    options.map(each => (
                        <Option key={uuid()}>
                            <Input type='radio' id={each} value={each} name='selectedOption' disabled={true && selectedOption} onChange={optionClicked} checked={each === clickedOption} />

                            <OptionCorrectWrong
                                htmlFor={each}
                                correct={each === (selectedOption && correct) || (each === answer && selectedOption)}
                                wrong={each === selectedOption && !correct}
                                onClick={() => setShowError(false)}
                            >
                                {each}
                            </OptionCorrectWrong>

                            {((each === selectedOption && !correct) && QuestionWrong())
                                ||
                                ((each === (selectedOption && correct) || (each === answer && selectedOption)) && QuestionCorrect())}<br />
                        </Option>
                    ))
                }
                {showError && <ErrorMsg>*Please select an option</ErrorMsg>}
                {
                    showBtn ?
                        < ButtonContainer >
                            <Button type='button' onClick={btnClicked} Color disabled={enableSkipBtn} noDrop={enableSkipBtn}>Show Answer</Button>
                            <Button type='submit' bgColor onClick={submitBtnClicked}>Submit</Button>
                            <SkipBtnContainer>
                                <Button type='button' onClick={skipBtnClicked} Color noDrop={enableSkipBtn} disabled={enableSkipBtn}>Skip</Button>
                                {enableSkipBtn ? renderSkipText() : renderText()}
                            </SkipBtnContainer>

                        </ButtonContainer>
                        :
                        <>
                            {showExplanation && explanationContent()}
                            {selectedOption && marksContent()}
                        </>

                }
            </Form >
        )

    }

    const QuestionCorrect = (size = 25, space_left = 15) => {
        return (
            <IoCheckmarkCircleOutline color='green' size={size} style={{ paddingLeft: `${space_left}px` }} />
        )
    }
    const QuestionWrong = (size = 25, space_left = 15) => {
        return (
            <IoCloseCircleOutline color='red' size={size} style={{ paddingLeft: `${space_left}px` }} />
        )
    }
    return (
        question()
    )
}

export default QuestionFormat