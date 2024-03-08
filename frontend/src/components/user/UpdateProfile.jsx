import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import { useUpdateProfileMutation } from '../../redux/api/userApi';

export default function UpdateProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [updateProfile, { isLoading, error, isSuccess }] = useUpdateProfileMutation();

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      toast.success('Successful');
      navigate('/me/profile');
    }
  }, [user, error, isSuccess]);

  function handleUpdateProfile(event) {
    event.preventDefault();

    updateProfile({ name, email });
  }

  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form
            className="shadow rounded bg-body"
            onSubmit={handleUpdateProfile}
          >
            <h2 className="mb-4">Update Profile</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                Name
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                Email
              </label>
            </div>

            <button type="submit" className="btn update-btn w-100" disabled={isLoading}>{isLoading ? 'Please wait...' : 'Update'}</button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
