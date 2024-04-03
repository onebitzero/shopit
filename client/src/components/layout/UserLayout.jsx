import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

export default function UserLayout({ children }) {
  const { user: { name } } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="mt-2 mb-4 py-4">
        <h2 className="text-center fw-bolder">
          {`Hi, ${name}`}
        </h2>
      </div>

      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-lg-3">
            <Sidebar />
          </div>

          <div className="col-12 col-lg-8 user-dashoard">{children}</div>
        </div>
      </div>
    </div>
  );
}
