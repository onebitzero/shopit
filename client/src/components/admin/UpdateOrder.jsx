import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetOrderDetailsQuery, useUpdateOrderMutation } from '../../redux/api/orderApi';
import AdminDashboardLayout from '../layout/AdminDashboardLayout';
import Loader from '../layout/Loader';

export default function UpdateOrder() {
  const { id: paramsOrderId } = useParams();

  const {
    isLoading: getOrderDetailsIsLoading,
    isSuccess: getOrderDetailsIsSuccess,
    isError: getOrderDetailsIsError,
    data: {
      order: {
        _id: orderId,
        user: {
          name,
        } = {},
        paymentMethod,
        orderItems,
        paymentInfo: {
          id: stripeId,
          status: paymentStatus,
        } = {},
        shippingDetails: {
          mobileNumber,
          address,
          pincode,
          city,
          country,
        } = {},
        totalAmount,
        orderStatus,
      } = {},
    } = {},
  } = useGetOrderDetailsQuery(paramsOrderId);

  const [currentOrderStatus, setCurrentOrderStatus] = useState('');

  const [
    updateOrder,
    {
      isLoading: updateOrderIsLoading,
      isSuccess: updateOrderIsSuccess,
      isError: updateOrderIsError,
      error: updateOrderError,
    },
  ] = useUpdateOrderMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (getOrderDetailsIsSuccess) {
      setCurrentOrderStatus(orderStatus);
    }

    if (getOrderDetailsIsError) {
      navigate('/login');
    }
  }, [getOrderDetailsIsSuccess, getOrderDetailsIsError]);

  useEffect(() => {
    if (updateOrderIsSuccess) {
      toast.success('Order status updated');
    }

    if (updateOrderIsError) {
      toast.error(updateOrderError.data.message);
    }
  }, [updateOrderIsSuccess, updateOrderIsError, updateOrderError]);

  return (getOrderDetailsIsLoading ? (
    <Loader />
  ) : (
    <AdminDashboardLayout>
      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-8 order-details">
          <h3 className="mt-5 mb-4">Order Details</h3>

          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{orderId}</td>
              </tr>

              <tr>
                <th scope="row">Status</th>
                <td>
                  <b>{orderStatus}</b>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Shipping Info</h3>

          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>{name}</td>
              </tr>

              <tr>
                <th scope="row">Mobile Number</th>
                <td>{`+91 ${mobileNumber}`}</td>
              </tr>

              <tr>
                <th scope="row">Address</th>
                <td>{`${address}, ${city}, ${pincode} ${country}`}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Payment Info</h3>

          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Status</th>
                <td style={paymentStatus === 'paid'
                  ? { color: 'green' }
                  : { color: 'red' }}
                >
                  <b>
                    {paymentStatus[0]
                      .toUpperCase()
                      .concat(paymentStatus.slice(1))}
                  </b>
                </td>
              </tr>

              <tr>
                <th scope="row">Method</th>
                <td>{paymentMethod}</td>
              </tr>

              {stripeId && (
              <tr>
                <th scope="row">Stripe ID</th>
                <td>{stripeId}</td>
              </tr>
              )}

              <tr>
                <th scope="row">Amount</th>
                <td>{`$ ${totalAmount}`}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 my-4">Order Items:</h3>

          <hr />

          {orderItems.map((item, index) => (
            <Fragment key={index}>
              <div className="cart-item my-1">
                <div className="row my-5">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item.image}
                      alt={`Item ${index}`}
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-5">
                    <Link to={`/products/${item.productId}`}>
                      {item.name}
                    </Link>
                  </div>

                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p>{item.price}</p>
                  </div>

                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <p>{`(${item.quantity})`}</p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 mt-5">
          <h4 className="my-4">Status</h4>

          <div className="mb-3">
            <select
              className="form-select"
              name="status"
              value={currentOrderStatus}
              onChange={(event) => {
                setCurrentOrderStatus(event.target.value);
              }}
            >
              {['Processing', 'Shipped', 'Delivered'].map((status, index) => (
                <option
                  key={index}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            aria-label="Update status"
            className="btn btn-primary w-100"
            disabled={updateOrderIsLoading}
            onClick={() => {
              updateOrder({
                orderId,
                orderStatus: currentOrderStatus,
              });
            }}
          >
            {updateOrderIsLoading ? 'Please wait...' : 'Update Status'}
          </button>

          <h5 className="mt-5 mb-3">Order Invoice</h5>

          <Link to={`/invoice/${orderId}`} className="btn btn-success w-100">
            <i className="fa fa-print" />
            {' Generate Invoice'}
          </Link>
        </div>
      </div>
    </AdminDashboardLayout>
  ));
}
