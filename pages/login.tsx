import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from 'firebaseConfig';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

const Login = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    router.push('/');
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => signInWithEmailAndPassword(email, password)}>
        Sign In
      </button>
      <div>
        <p>No account yet? : </p>
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
