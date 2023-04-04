import styled from "styled-components";

export const QuizForm = styled.form`
    background-color:#fff;
    width:300px;
    padding:20px;
    border-radius:10px;
    text-align:center;
    @media (min-width:650px){
        width:600px;
        height:400px;
    }
    `;

export const QuizImage = styled.img`
    content:url('https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/256/external-questionary-education-smashingstocks-circular-smashing-stocks.png');
    width:40%;
    @media (min-width:650px){
        content:url('https://img.icons8.com/external-flaticons-flat-flat-icons/256/external-quiz-team-building-flaticons-flat-flat-icons.png');
        width:32%;
    }

`;
export const QuizImageContainer = styled.div`
    display:flex;
    justify-content:center;
`;

export const Input = styled.input`
    width:90%;
    font-size:18px;
    text-transform:capitalize;
    padding:5px;
    margin-top:20px;
`;

export const Select = styled.select`
    margin:10px;
    font-size:18px;
    text-transform:capitalize;
    margin-top:20px;
    width:90%;
    @media (min-width:650px){
        width:25%;
    }
`;

export const ErrorText = styled.p`
    color:red;
`;