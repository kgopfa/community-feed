import { Inter } from '@next/font/google'
import Questions from './questions'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Questions />
  )
}
