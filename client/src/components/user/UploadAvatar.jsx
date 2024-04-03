import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUploadAvatarMutation } from '../../redux/api/userApi';
import UserLayout from '../layout/UserLayout';

export default function UploadAvatar() {
  const { user } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    user.avatar ? user.avatar.url : 'images/default_avatar.jpg',
  );

  const navigate = useNavigate();

  const [uploadAvatar, {
    isLoading, isSuccess, isError, error,
  }] = useUploadAvatarMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Successful');
      navigate('/me/profile');
    }

    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError, error]);

  function handleImageUpload(event) {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  function handleUploadAvatar(event) {
    event.preventDefault();

    uploadAvatar({ avatar });
  }
  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form
            className="shadow rounded bg-body"
            onSubmit={handleUploadAvatar}
          >
            <h2 className="mb-4">Upload Avatar</h2>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <figure className="avatar item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="avatar"
                    />
                  </figure>
                </div>
                <div className="input-foam">
                  <label className="form-label" htmlFor="customFile">
                    Choose Avatar
                    <input
                      type="file"
                      name="avatar"
                      className="form-control"
                      id="customFile"
                      accept="images/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : 'Upload'}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
