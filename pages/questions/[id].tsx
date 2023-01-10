import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import styled from "styled-components";
import Card from '../../components/Card';

const QuestionDetailContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;
`;

interface Question {
    title: string;
    view_count: number;
    answer_count: number;
}

function QuestionDetail() {
    const router = useRouter();
    const { id } = router.query;

    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState<Question>({title: '', view_count: 0, answer_count: 0});

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`https://api.stackexchange.com/2.2/questions/${id}?site=stackoverflow`);
            const result = await data.json();

            if (result) {
                setQuestion(result.items[0]);
                setLoading(false);
            }
        }

        id && fetchData();
    }, [id]);

    return (
        <QuestionDetailContainer>
            <h2>Question: {id}</h2>
            {loading ? (<span>Loading...</span>) : (
                <Card
                    title={question.title}
                    views={question.view_count}
                    answers={question.answer_count}
                />
            )}
        </QuestionDetailContainer>
    );
}

export default QuestionDetail;