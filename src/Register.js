import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { auth } from './FirebaseConfig';

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      alert('正しく入力して下さい');
    }
  };

  const [user, setUser] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <h1>新規登録</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>メールアドレス</label>
              <input
                name="email"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード</label>
              <input
                name="password"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <button>登録する</button>
            <p>
              ログインは<Link to={`/login/`}>こちら</Link>
            </p>
          </form>
        </>
      )}
    </>
  );
};

export default Register;
