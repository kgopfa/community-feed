import { Inter } from '@next/font/google';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Questions, { getServerSideProps as getServerSidePropsQuestions } from './questions';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return getServerSidePropsQuestions(context);
}

export default function Home(props: any) {
  return (
    <Questions {...props}/>
  )
}
