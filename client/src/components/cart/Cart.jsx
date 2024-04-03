import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setCartItem, removeCartItem } from '../../redux/features/cartSlice';
import MetaData from '../layout/MetaData';

export default function Cart() {
  const { cart } = useSelector((state) => state.cart);

  const { totalQuantity, totalPrice } = cart.reduce(
    (accumulator, item) => ({
      totalQuantity: accumulator.totalQuantity + item.quantity,
      totalPrice: accumulator.totalPrice + item.quantity * item.price,
    }),
    { totalQuantity: 0, totalPrice: 0 },
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function addToCart(item, newQuantity) {
    const cartItem = {
      ...item,
      quantity: newQuantity,
    };

    dispatch(setCartItem(cartItem));
  }

  function handleDecreaseQuantity(item, quantity) {
    if (quantity === 1) {
      dispatch(removeCartItem(item));
    } else {
      addToCart(item, quantity - 1);
    }
  }

  function handleIncreaseQuantity(item, quantity) {
    if (quantity < item.stock) {
      addToCart(item, quantity + 1);
    } else {
      toast.error('You have reached stock limit.');
    }
  }

  function handleRemoveFromCart(item) {
    dispatch(removeCartItem(item));
  }

  return (
    <div>
      <MetaData title="Cart" />

      {cart.length ? (
        <>
          <h2 className="mt-5">
            Your Cart:
            <b>{` ${totalQuantity} Items`}</b>
          </h2>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cart.map((item) => (
                <>
                  <hr />
                  <div className="cart-item" data-key="product1">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item.productId}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">{item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span className="btn btn-danger minus" onClick={() => handleDecreaseQuantity(item, item.quantity)}> - </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />
                          <span className="btn btn-primary plus" onClick={() => handleIncreaseQuantity(item, item.quantity)}> + </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => handleRemoveFromCart(item)}
                        />
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
                  <span className="order-summary-values">{`${totalQuantity} (Units)`}</span>
                </p>
                <p>
                  Est. total:
                  <span className="order-summary-values">{`$ ${totalPrice.toFixed(2)}`}</span>
                </p>
                <hr />
                <button
                  type="button"
                  id="checkout_btn"
                  className="btn btn-primary w-100"
                  onClick={() => navigate('/shipping')}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h4 className="mt-5">Items that you add to your cart appear here.</h4>
      )}
    </div>
  );
}
