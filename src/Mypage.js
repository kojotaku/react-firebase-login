import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from './FirebaseConfig';

const Mypage = () => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate('/login/');
  };

  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/login/`} />
          ) : (
            <>
              <h1>マイページ</h1>
              <p>{user?.email}</p>
              <button onClick={logout}>ログアウト</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Mypage;
