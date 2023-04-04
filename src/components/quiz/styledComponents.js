import styled from "styled-components";

export const BgContainer = styled.div`
    min-height:100vh;
    max-height:200vh;
    height: 100%;
    background:url('https://wallpaperaccess.com/full/2384075.jpg');
    display:flex;
    justify-content:center;
    align-items:center;
`;

export const Navbar = styled.nav`
    display:flex;
    justify-content:space-between;
`;

export const QuizContainer = styled.div`
    background-color:#fff;
    margin-top:30px;
    border-radius: 10px;
    padding: 16px;
    min-width:300px;
    max-width:900px;
`;
export const TimeContainer = styled.div`
    display:flex;
    justify-content:flex-end;
`;

export const Time = styled.h3`
    display:flex;
    align-items:center;
    font-size:16px;
    color:${props => props.timeless ? "red" : "darkgreen"};
    // padding:15px 5px;
    // border-radius:50%;
    @media (min-width:650px){
        font-size:18px;
    }
`;

export const LoadingContainer = styled.div`
    height:350px;
    padding:${props => props.padding}px;
    height:${props => props.height}px;
    width:320px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background-color:#fff;
    border-radius:10px;
    @media (min-width:650px){
        width:600px;
        min-height:400px;
    }
`;
export const LoadingText = styled.h2`
    margin-top:20px;
    font-size:20px;
    @media (min-width:650px){
        font-size:25px;
    }
`;

export const QuizName = styled.h2`
    text-transform:capitalize;
    text-align:center;
    margin-top:30px;
    `;

export const LevelName = styled.p`
    text-align:center;
    font-weight:500;
    margin-bottom:${props => props.noMargin ? "0" : "50"}px;
    text-transform:capitalize;
    color:blue;
`;

export const Rank = styled.p`
    color:royalblue;
    font-size:20px;
    font-weight:bold;
`;

export const Score = styled.span`
    color:orange;
    font-size:25px;

`;
export const ScoreCardImg = styled.div`
    background:url('https://thumbs.dreamstime.com/b/prize-cup-illustration-51511994.jpg');
    background-size:70%;
    background-position:center top;
    background-repeat:no-repeat;
    width:100%;
    height:70%;
    display:flex;
    justify-content:center;
    align-items:flex-end;
    @media (min-width:650px){
        height:80%;
        background-size:40%;
    }
`;