import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUpdatePasswordMutation } from '../../redux/api/userApi';
import UserLayout from '../layout/UserLayout';

export default function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigate = useNavigate();

  const [updatePassword, { isLoading, isSuccess, error }] = useUpdatePasswordMutation();

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      toast.success('Successful');
      navigate('/me/profile');
    }
  }, [error, isSuccess]);

  function handleUpdatePassword(event) {
    event.preventDefault();

    updatePassword({
      oldPassword,
      newPassword,
    });
  }

  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow rounded bg-body" onSubmit={handleUpdatePassword}>
            <h2 className="mb-4">Update Password</h2>
            <div className="mb-3">
              <label htmlFor="old_password_field" className="form-label">
                Old Password
                <input
                  type="password"
                  id="old_password_field"
                  className="form-control"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                />
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="new_password_field" className="form-label">
                New Password
                <input
                  type="password"
                  id="new_password_field"
                  className="form-control"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
              </label>
            </div>

            <button type="submit" className="btn update-btn w-100" disabled={isLoading}>
              {isLoading ? 'Please wait...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
