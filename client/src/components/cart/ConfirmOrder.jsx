import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import calculateOrderSummary from '../../helpers/calculateOrderSummary';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

export default function ConfirmOrder() {
  const { user } = useSelector((state) => state.auth);
  const { cart, shippingInfo } = useSelector((state) => state.cart);

  const total = calculateOrderSummary(cart);

  return (
    <>
      <MetaData title="Confirm Order" />

      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b>
            {` ${user.name}`}
          </p>
          <p>
            <b>Phone:</b>
            {` ${shippingInfo.mobileNumber}`}
          </p>
          <p className="mb-4">
            <b>Address:</b>
            {` ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pincode}, ${shippingInfo.country}`}
          </p>
          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>
          {cart.map((element) => (
            <>
              <hr />
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={element.image}
                      alt={element.name}
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${element.productId}`}>
                      {element.name}
                    </Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {`${element.quantity} x $ ${element.price} = `}
                      <b>{element.quantity * element.price.toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:
              <span className="order-summary-values">{`$ ${total.orderTotal}`}</span>
            </p>
            <p>
              Shipping:
              <span className="order-summary-values">{`$ ${total.shippingPrice}`}</span>
            </p>
            <p>
              Tax (15%):
              <span className="order-summary-values">{`$ ${total.tax}`}</span>
            </p>

            <hr />

            <p>
              Total:
              <span className="order-summary-values">{`$ ${total.grossTotal}`}</span>
            </p>

            <hr />
            <Link
              to="/payment_method"
              id="checkout_btn"
              className="btn btn-primary w-100"
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
