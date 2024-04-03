import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useGetOrderDetailsQuery } from '../../redux/api/orderApi';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

export default function OrderDetails() {
  const { id: orderId } = useParams();

  const {
    isLoading, isError, data, error,
  } = useGetOrderDetailsQuery(orderId);

  const { user } = useSelector((state) => state.auth);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <MetaData title="Order Details" />
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-lg-9 mt-5 order-details">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-5 mb-4">Your Order Details</h3>

            <Link to={`/invoice/${orderId}`}>
              <button
                type="button"
                aria-label="Print invoice"
                className="btn btn-primary fa fa-print"
              />
            </Link>
          </div>

          <MDBTable striped>
            <MDBTableBody>
              <tr>
                <th scope="row">Order ID</th>
                <td>{orderId}</td>
              </tr>

              <tr>
                <th scope="row">Status</th>
                <td
                  style={{
                    color:
                      data.order.orderStatus === 'Processing'
                        ? 'orange'
                        : 'green',
                  }}
                >
                  {data.order.orderStatus}
                </td>
              </tr>

              <tr>
                <th scope="row">Date</th>
                <td>
                  {new Date(data.order.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
              </tr>
            </MDBTableBody>
          </MDBTable>

          <h3 className="mt-5 mb-4">Shipping Info</h3>

          <MDBTable striped>
            <MDBTableBody>
              <tr>
                <th scope="row">Name</th>
                <td>{user.name}</td>
              </tr>

              <tr>
                <th scope="row">Mobile</th>
                <td>{`+91 ${data.order.shippingDetails.mobileNumber}`}</td>
              </tr>

              <tr>
                <th scope="row">Address</th>
                <td>{`${data.order.shippingDetails.address} ${data.order.shippingDetails.city} ${data.order.shippingDetails.pincode} ${data.order.shippingDetails.country}`}</td>
              </tr>
            </MDBTableBody>
          </MDBTable>

          <h3 className="mt-5 mb-4">Payment Info</h3>

          <MDBTable striped>
            <MDBTableBody>
              <tr>
                <th scope="row">Status</th>
                <td
                  style={{
                    color:
                      data.order.paymentInfo.status === 'Not paid'
                        ? 'red'
                        : 'green',
                  }}
                >
                  {data.order.paymentInfo.status[0]
                    .toUpperCase()
                    .concat(data.order.paymentInfo.status.slice(1))}
                </td>
              </tr>

              <tr>
                <th scope="row">Method</th>
                <td>{data.order.paymentMethod}</td>
              </tr>

              {data.order.paymentInfo.id && (
                <tr>
                  <th scope="row">Stripe ID</th>
                  <td>{data.order.paymentInfo.id}</td>
                </tr>
              )}

              <tr>
                <th scope="row">Amount</th>
                <td>{`$ ${data.order.totalAmount}`}</td>
              </tr>
            </MDBTableBody>
          </MDBTable>

          <h3 className="mt-5 my-4">Order Items:</h3>

          <MDBTable>
            <MDBTableHead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
              </tr>
            </MDBTableHead>

            <MDBTableBody>
              {data.order.orderItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.image}
                      alt="Product"
                      height="45"
                      width="65"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{`$ ${item.price}`}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </>
  );
}
