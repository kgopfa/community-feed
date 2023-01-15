import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';

const QuestionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;
`;

const CardLink = styled(Link)`
    text-decoration: none;
`;

type Question = {
    question_id: string;
    title: string;
    view_count: string;
    answer_count: number;
}

type Data = {
    page: string;
    questions: Question[];
    hasMore: boolean;
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => {
    const { page } = context.query;
    const result = await fetch(
        `https://api.stackexchange.com/2.2/questions?${page ? `page=${page}&` : ``}pagesize=10&order=desc&sort=hot&tagged=reactjs&site=stackoverflow`);
    const parsedData = await result.json();
    const data : Data = {
        page: page as string || '1',
        questions: parsedData.items,
        hasMore: parsedData
    }

    return {
        props: {
            data,
        },
    }
}

function Questions({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Head>
                <title>Questions</title>
            </Head>
            <QuestionsContainer>
                <h2>Questions</h2>
                <>
                    <div>
                        {data.questions.map((question: any) => (
                            <CardLink
                                style={{ textDecoration: 'none' }}
                                key={question.question_id}
                                href={`/questions/${question.question_id}`}
                                passHref
                            >
                                <Card
                                    key={question.question_id}
                                    title={question.title}
                                    views={question.view_count}
                                    answers={question.answer_count}
                                />
                            </CardLink>
                        ))}
                    </div>
                    <Pagination currentPage={parseInt(data.page) || 1} hasMore={data.hasMore} />
                </>
            </QuestionsContainer>
        </>
    );
}

export default Questions;