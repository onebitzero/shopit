import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../redux/api/userApi';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const [forgotPassword, { isLoading, isSuccess, error }] = useForgotPasswordMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success('E-mail sent. Please check your inbox.');
      navigate('/login');
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  function handleForgotPassword(event) {
    event.preventDefault();

    forgotPassword({ email });
  }
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleForgotPassword}
        >
          <h2 className="mb-4">Forgot Password</h2>
          <div className="mt-3">
            <label htmlFor="email_field" className="form-label">
              Enter Email
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

          <button
            id="forgot_password_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : 'Send E-mail'}
          </button>
        </form>
      </div>
    </div>
  );
}
