import styled from "styled-components";

export const Question = styled.label`
    font-weight:600;
    margin-top:10px;
`;



export const Form = styled.form`
    width: 320px;
    min-height:300px;
    line-height: 30px;
    margin-top:20px;
    user-select: none; 
    @media (min-width:650px){
        width:600px;
    }
`;

export const Option = styled.div`
   line-height:40px;
   font-weight:500;
   display:flex;
   align-items:center;
   padding-left:10px;
   @media (min-width:650px){
    padding-left:20px;
    }
   `;

export const OptionCorrectWrong = styled.label`
   color:${props => props.correct ? "green" : props.wrong && "red"};
   font-weight:${props => props.correct ? "bold" : "500"}
`;
export const Input = styled.input`
    margin-right:15px;
    width:14px;
    height:14px;
`;

export const Button = styled.button`
    color: ${props => props.Color ? "royalblue" : "white"};
    background-color: ${props => props.bgColor ? "#1665d8" : "white"};
    border: 2px solid #1665d8;
    font-size:16px;
    padding: 3px 30px;
    border-radius: 5px;
    cursor: pointer;
    ${props => props.noMargin ? '' : "margin-right:20px;"}
    font-weight:500;
    text-transform:uppercase;
    margin-top:20px;
    width:200px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    ${props => props.bgColor && "box-shadow:2px 2px 3px grey;"}
    ${props => props.noDrop && 'cursor:no-drop;'}
    ${props => props.disabled && "color:#95c0ff; border: 2px solid #95c0ff;"}
    @media (min-width:650px){
        margin-top:${props => props.noMargin ? "20px" : "50px"};
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    flex-wrap:wrap;
`;

export const Explanation = styled.div`
    margin-top:20px;
    tab-size:8;
    margin-left:5px;
`;
export const ErrorMsg = styled.p`
    color:#ff8909;
    font-size:15px;
    padding-left:20px;
`;
export const MarksContainer = styled.div`
    margin-top:20px;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
export const Marks = styled.div`
    border:2px solid lightgrey;
    border-radius:5px;
    text-align:center;
    width:100px;
    padding:10px 50px;
    display:flex;
    justify-content:space-between;
    align-items:center;
`;

export const SkipBtnContainer = styled.div`
    text-align:center;
    font-size:14px;
    font-weight:500;
    color:royalblue;
`;