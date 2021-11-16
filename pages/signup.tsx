import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from 'firebaseConfig';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

const SignUp = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

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
      <button onClick={() => createUserWithEmailAndPassword(email, password)}>
        Register
      </button>
      <div>
        <p>Already have an account ? : </p>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
