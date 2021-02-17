import next from 'next';
import { PageTitle } from '../components/PageTitle';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href='/login'>
        <a>Log In</a>
      </Link>
      <p>/</p>
      <Link href='/signup'>
        <a>Sign Up</a>
      </Link>
    </main>
  )
}
