import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import {
  useGetAdminOrdersQuery,
  useDeleteOrderMutation,
} from '../../redux/api/orderApi';
import Loader from '../layout/Loader';
import AdminDashboardLayout from '../layout/AdminDashboardLayout';

export default function Orders() {
  const {
    isLoading: getAdminOrdersIsLoading,
    data: { orders } = {},
  } = useGetAdminOrdersQuery();

  const [
    deleteOrder,
    {
      isLoading: deleteOrderIsLoading,
      isSuccess: deleteOrderIsSuccess,
      isError: deleteOrderIsError,
      error: deleteOrderError,
    },
  ] = useDeleteOrderMutation();

  useEffect(() => {
    if (deleteOrderIsSuccess) {
      toast.success('Order deleted');
    }

    if (deleteOrderIsError) {
      toast.error(deleteOrderError.data.message);
    }
  }, [deleteOrderIsSuccess, deleteOrderIsError, deleteOrderError]);

  return getAdminOrdersIsLoading ? (
    <Loader />
  ) : (
    <AdminDashboardLayout>
      <h2>{`${orders.length} Orders`}</h2>

      <MDBTable bordered hover striped className="px-3">
        <MDBTableHead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Order Status</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>

        <MDBTableBody>
          {orders.map((order, index) => (
            <tr key={index}>
              <th scope="row">{order._id}</th>
              <td>{order.paymentInfo.status}</td>
              <td>{order.orderStatus}</td>
              <td>
                <Link
                  to={`update/${order._id}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  <i className="fa-solid fa-pen" />
                </Link>

                <button
                  type="button"
                  aria-label="Delete order"
                  className="btn btn-sm btn-outline-danger ms-1"
                  disabled={deleteOrderIsLoading}
                  onClick={() => {
                    deleteOrder({ orderId: order._id });
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
