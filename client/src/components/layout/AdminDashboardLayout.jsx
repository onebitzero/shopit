import React from 'react';
import { useSelector } from 'react-redux';
import AdminSidebar from './AdminSidebar';

export default function UserLayout({ children }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="mt-2 mb-4 py-4">
        <h2 className="text-center fw-bolder">{`Hi, ${user.name}`}</h2>
      </div>

      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-lg-3">
            <AdminSidebar />
          </div>

          <div className="col-12 col-lg-8 user-dashoard">{children}</div>
        </div>
      </div>
    </div>
  );
}
