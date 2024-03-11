import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import calculateOrderSummary from '../../helpers/calculateOrderSummary';
import { useCreateNewOrderMutation } from '../../redux/api/orderApi';

export default function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState('Pay on delivery');

  const { user } = useSelector((state) => state.auth);
  const { cart, shippingInfo } = useSelector((state) => state.cart);

  const [createNewOrder, { isLoading, isSuccess, error }] = useCreateNewOrderMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      toast.success('Order placed.');
      navigate('/');
    }
  }, [error, isSuccess]);

  function handlePaymentMethod(event) {
    event.preventDefault();

    const total = calculateOrderSummary(cart);

    if (paymentMethod === 'Pay on delivery') {
      const orderData = {
        shippingDetails: shippingInfo,
        user,
        orderItems: cart,
        paymentMethod,
        paymentInfo: {
          status: 'Not paid',
        },
        itemsPrice: total.orderTotal,
        taxAmount: total.tax,
        totalAmount: total.grossTotal,
      };

      createNewOrder(orderData);
    }
  }
  return (
    <>
      <MetaData title="Payment Method" />

      <CheckoutSteps shipping confirmOrder paymentMethod />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            onSubmit={handlePaymentMethod}
          >
            <h2 className="mb-4">Select Payment Method</h2>
            <div className="form-check">
              <label className="form-check-label" htmlFor="codradio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment_mode"
                  id="codradio"
                  value="POD"
                  onClick={() => setPaymentMethod('Pay on delivery')}
                />
                Pay on Delivery
              </label>
            </div>

            <div className="form-check">
              <label className="form-check-label" htmlFor="cardradio">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment_mode"
                  id="cardradio"
                  value="Online"
                  onClick={() => setPaymentMethod('Online')}
                />
                Card - VISA, MasterCard
              </label>
            </div>
            <button id="shipping_btn" type="submit" className="btn py-2 w-100">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
