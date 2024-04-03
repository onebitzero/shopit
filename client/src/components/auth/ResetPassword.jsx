import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/api/userApi';

export default function ResetFunction() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [resetPassword, { isSuccess, isLoading, error }] = useResetPasswordMutation();

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Successful');
      navigate('/login');
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [error, isSuccess]);

  function handleResetPassword(event) {
    event.preventDefault();

    resetPassword({ token: params.token, body: { password, confirmPassword } });
  }

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleResetPassword}
        >
          <h2 className="mb-4">New Password</h2>

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

          <div className="mb-3">
            <label
              htmlFor="confirm_password_field"
              className="form-label"
            >
              Confirm Password
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                name="confirm_password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </label>
          </div>

          <button id="new_password_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'Reset'}
          </button>
        </form>
      </div>
    </div>
  );
}
