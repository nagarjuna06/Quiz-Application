import { useEffect, useState } from "react"
import { BgContainer, LoadingContainer, LoadingText } from "../quiz/styledComponents"
import { QuizForm, Input, Select, option, QuizImage, QuizImageContainer, ErrorText } from "./styledComponents"
import { Watch } from "react-loader-spinner";
import { Button } from "../quizFormat/styledComponents";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [errorMsg, SetErrorMsg] = useState('Quiz App is Loading...');
    const quizApiCall = async () => {
        const apiKey = process.env.REACT_APP_API_KEY
        const options = {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey
            }
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/quiz`, options)
            const response = await res.json()
            if (res.ok) {
                setLoading(false)
                setData(response);
                SetErrorMsg('');
            }
            else {
                SetErrorMsg(response.msg)
            }
        }
        catch (err) {
            SetErrorMsg(err.message);
        }
    }
    useEffect(() => {
        quizApiCall()
    }, [])

    const submittingForm = e => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target))
        if (formData.name === '') {
            SetErrorMsg('*Please enter your name')
        }
        else {
            const { name, quizName, level, no } = formData;
            const data = JSON.stringify({ quizName, name, level, no });
            Cookies.set('data', data, { expires: 30 });
            navigate(`/quiz`);
        }
    }

    const quizForm = () => {
        const { quizNames, levels, nos } = data
        return (
            <QuizForm onSubmit={submittingForm}>
                <QuizImageContainer>
                    <QuizImage />
                </QuizImageContainer>
                <Input id="name" name="name" placeholder="enter your name" onChange={() => SetErrorMsg('')} />
                <Select name='quizName'>
                    {quizNames.map(each => <option value={each} key={each}>{each}</option>)}
                </Select>
                <Select name="level">
                    {levels.map(each => <option value={each} key={each}>{each}</option>)}
                </Select>
                <Select name="no">
                    {nos.map(each => <option value={each} key={each}>{each}</option>)}
                </Select><br />
                <ErrorText>{errorMsg}</ErrorText>
                <Button bgColor flex={true}>submit</Button>
            </QuizForm>
        )
    }
    const LoadingComponent = () => {
        return (
            <LoadingContainer height={500} padding={10}>
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
    return (
        <BgContainer>
            {loading ? LoadingComponent() : quizForm()}
        </BgContainer>
    )
}

export default Home