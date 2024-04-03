import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useRegisterMutation } from '../../redux/api/authApi';

export default function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = user;

  const [register, { isLoading, error }] = useRegisterMutation();

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

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    register({ name, email, password });
  }

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-4">Register</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </label>
          </div>

          <button id="register_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
