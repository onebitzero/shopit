import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../redux/api/userApi';
import Loader from '../layout/Loader';
import AdminDashboardLayout from '../layout/AdminDashboardLayout';

export default function UpdateUser() {
  const { id: paramsUserId } = useParams();

  const {
    isLoading: getUserDetailsIsLoading,
    isSuccess: getUserDetailsIsSuccess,
    data: {
      user: {
        name: oldName,
        email: oldEmail,
        role: oldRole,
      } = {},
    } = {},
  } = useGetUserDetailsQuery(paramsUserId);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('user');

  useEffect(() => {
    if (getUserDetailsIsSuccess) {
      setNewName(oldName);
      setNewEmail(oldEmail);
      setNewRole(oldRole);
    }
  }, [getUserDetailsIsSuccess]);

  const [
    updateUser,
    {
      isLoading: updateUserIsLoading,
      isSuccess: updateUserIsSuccess,
      isError: updateUserIsError,
      error: updateUserError,
    }] = useUpdateUserMutation();

  useEffect(() => {
    if (updateUserIsSuccess) {
      toast.success('User updated');
    }

    if (updateUserIsError) {
      toast.error(updateUserError.data.message);
    }
  }, [updateUserIsSuccess, updateUserIsError, updateUserError]);

  function handleUpdateUser(event) {
    event.preventDefault();

    updateUser({
      userId: paramsUserId,
      name: newName,
      email: newEmail,
      role: newRole,
    });
  }

  return (getUserDetailsIsLoading ? (
    <Loader />
  ) : (
    <AdminDashboardLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow-lg" onSubmit={handleUpdateUser}>
            <h2 className="mb-4">Update User</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">Name</label>
              <input
                type="text"
                name="name"
                id="name_field"
                className="form-control"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">Email</label>
              <input
                type="email"
                name="email"
                id="email_field"
                className="form-control"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="role_field" className="form-label">Role</label>
              <select
                name="role"
                id="role_field"
                className="form-select"
                value={newRole}
                onChange={(event) => setNewRole(event.target.value)}
              >
                {['admin', 'user'].map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="btn update-btn w-100 py-2"
              disabled={updateUserIsLoading}
            >
              {updateUserIsLoading ? 'Please wait...' : 'Update'}
            </button>
          </form>
        </div>
      </div>
    </AdminDashboardLayout>
  ));
}
