import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/api/authApi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { isLoading, error }] = useLoginMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isAuthenticated) {
      navigate('/');
    }
  }, [error, isAuthenticated]);

  function handleSubmit(event) {
    event.preventDefault();

    login({ email, password });
  }

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4">Login</h2>
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">
              Password
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </div>

          <a href="/password/forgot" className="float-end mb-4">Forgot Password?</a>

          <button id="login_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'Login'}
          </button>

          <div className="my-3">
            <a href="/register" className="float-end">New User?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
