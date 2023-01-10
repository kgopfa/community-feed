import styled from "styled-components";

const CardWrapper = styled.div`
    text-align: left;
    padding: 1%;
    background: lightGray;
    border-radius: 5px;
    margin-bottom: 2%;
`;

const Title = styled.h2`
    width: 100%;
    padding-bottom: 10px;
    text-align: center;
    border-bottom: 1px solid darkGray;
    color: black;
`;

const Count = styled.span`
    color: darkGray;
`;

function Card(props: any) {
    return (
        <CardWrapper>
            <Title>{props.title}</Title>
            <Count>{`Views: ${props.views} | Answers: ${props.answers}`}</Count>
        </CardWrapper>
    );
}

export default Card;

