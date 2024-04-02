import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import {
  useGetAdminUsersQuery,
  useDeleteUserMutation,
} from '../../redux/api/userApi';
import Loader from '../layout/Loader';
import AdminDashboardLayout from '../layout/AdminDashboardLayout';

export default function Users() {
  const {
    isLoading: getAdminUsersIsLoading,
    data: { users } = {},
  } = useGetAdminUsersQuery();

  const [
    deleteUser,
    {
      isLoading: deleteUserIsLoading,
      isSuccess: deleteUserIsSuccess,
      isError: deleteUserIsError,
      error: deleteUserError,
    },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (deleteUserIsSuccess) {
      toast.success('User deleted');
    }

    if (deleteUserIsError) {
      toast.error(deleteUserError.data.message);
    }
  }, [deleteUserIsSuccess, deleteUserIsError, deleteUserError]);

  return getAdminUsersIsLoading ? (
    <Loader />
  ) : (
    <AdminDashboardLayout>
      <h2>{`${users.length} Users`}</h2>

      <MDBTable striped hover className="px-3">
        <MDBTableHead>
          <tr>
            <th scope="col">User ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>

        <MDBTableBody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{user._id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.role[0]
                  .toUpperCase()
                  .concat(user.role.slice(1))}
              </td>
              <td>
                <Link
                  to={`update/${user._id}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  <i className="fa-solid fa-pen" />
                </Link>

                <button
                  type="button"
                  aria-label="Delete user"
                  className="btn btn-sm btn-outline-danger ms-1"
                  disabled={deleteUserIsLoading}
                  onClick={() => {
                    deleteUser({ userId: user._id });
                  }}
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </AdminDashboardLayout>
  );
}
