import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';

const QuestionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;
`;

const CardLink = styled.a`
    text-decoration: none;
`

function Questions() {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    const router = useRouter();
    const { page } = router.query;
    const pageNumber: string = page as string;

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(
                `https://api.stackexchange.com/2.2/questions?${pageNumber ? `page=${pageNumber}&` : ``}order=desc&sort=hot&tagged=reactjs&site=stackoverflow`);
            const result = await data.json();

            if (result) {
                setQuestions(result.items);
                setHasMore(result.has_more);
                setLoading(false);
            }
        }

        fetchData();
    }, [pageNumber]);

    return (
        <QuestionsContainer>
            <h2>Questions</h2>
            {loading ? (<span>Loading...</span>) : (
                <>
                    <div>
                        {questions.map((question: any) => (
                            <Link
                                key={question.question_id}
                                href={`/questions/${question.question_id}`}
                                passHref
                            >
                                <CardLink>
                                    <Card
                                        key={question.question_id}
                                        title={question.title}
                                        views={question.view_count}
                                        answers={question.answer_count}
                                    />
                                </CardLink>
                            </Link>
                        ))}
                    </div>
                    <Pagination currentPage={parseInt(pageNumber) || 1} hasMore={hasMore} />
                </>
            )}
        </QuestionsContainer>
    );
}

export default Questions;