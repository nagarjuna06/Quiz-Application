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
    @media (min-width:650px){
        font-size:18px;
    }
`;

export const LoadingContainer = styled.div`
    height:480px;
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
    text-transform:uppercase;
`;

export const Score = styled.span`
    color:orange;
    font-size:28px;
    @media (min-width:650px){
        font-size:40px;

    };

`;
export const ScoreText = styled.h1`
    margin:3px;
    font-size:20px;
    @media (min-width:650px){
        font-size:30px;

    };
`;

export const ScoreCardImg = styled.img`
    width:200px;
    height:200px;
    @media (min-width:650px){
        width:240px;
        height:260px;

    };
`;
export const DownlodIconContainer = styled.div`
display:flex;
justify-content:flex-end;
`;
export const ResponsiveDiv = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    text-align:center;
@media (min-width:650px){
        flex-direction:row;
        justify-content:space-around;

    };
`;
export const ScoreDiv = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
@media (min-width:650px){
        justify-content:space-around;

    };  
`;
