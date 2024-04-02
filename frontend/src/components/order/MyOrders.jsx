import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useSearchParams, Link } from 'react-router-dom';
import { clearCart } from '../../redux/features/cartSlice';
import { useGetMyOrdersQuery } from '../../redux/api/orderApi';
import Loader from '../layout/Loader';

export default function MyOrders() {
  const [searchParams] = useSearchParams();

  const {
    isLoading, isError, data, error,
  } = useGetMyOrdersQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }

    if (searchParams.get('success')) {
      dispatch(clearCart());
    }
  }, [isError, error, searchParams]);

  if (isLoading) {
    return <Loader />;
  }

  if (data.orders.length) {
    return (
      <div>
        <h1>
          {`${data.orders.length} ${data.orders.length > 1 ? 'Orders' : 'Order'}`}
        </h1>

        <MDBTable striped>
          <MDBTableHead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Amount</th>
              <th scope="col">Paymnent Status</th>
              <th scope="col">Order Status</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>

          <MDBTableBody>
            {data.orders.map((order, index) => (
              <tr key={index}>
                <th scope="row">{order._id}</th>
                <td>{`$ ${order.totalAmount}`}</td>
                <td
                  style={{
                    color:
                  order.paymentInfo.status === 'Not paid'
                    ? 'red'
                    : 'green',
                  }}
                >
                  {order.paymentInfo.status[0]
                    .toUpperCase()
                    .concat(order.paymentInfo.status.slice(1))}
                </td>
                <td>{order.orderStatus}</td>
                <td>
                  <Link to={order._id}>
                    <button
                      type="button"
                      aria-label="View order"
                      className="btn btn-primary fa fa-eye"
                    />
                  </Link>

                  <Link to={`/invoice/${order._id}`}>
                    <button
                      type="button"
                      aria-label="Print invoice"
                      className="ms-2 btn btn-success fa fa-print"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    );
  }

  return <h1>Orders that you have placed appear here</h1>;
}
