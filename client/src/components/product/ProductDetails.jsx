import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { useGetProductDetailsQuery, useGetCanReviewQuery } from '../../redux/api/productsApi';
import { setCartItem } from '../../redux/features/cartSlice';
import Loader from '../layout/Loader';
import NewReview from '../review/NewReview';
import ReviewList from '../review/ReviewList';

export default function ProductDetails() {
  const { id: paramsProductId } = useParams();

  const {
    data: {
      product: {
        _id: productId,
        name,
        images,
        price,
        stock,
        ratings,
        description,
        seller,
        numOfReviews,
      } = {},
    } = {},
    error,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(paramsProductId);

  const {
    isLoading: canReviewIsLoading,
    isSuccess: canReviewIsSuccess,
    data: canReviewData,
  } = useGetCanReviewQuery(paramsProductId);

  const { canReview } = canReviewIsLoading ? {} : canReviewIsSuccess ? canReviewData : {};

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [activeImageUrl, setActiveImageUrl] = useState('');

  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }

    if (images) {
      if (images.length) {
        setActiveImageUrl(images[0].url);
      } else {
        setActiveImageUrl('images/default_product.png');
      }
    }
  }, [isError, error, images]);

  function handleDecreaseQuantity() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  function handleIncreaseQuantity() {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error('You have reached stock limit.');
    }
  }

  function handleAddToCart() {
    const cartItem = {
      productId,
      name,
      price,
      image: images.length ? images[0].url : 'images/default_product.png',
      stock,
      quantity,
    };

    dispatch(setCartItem(cartItem));
  }

  return (isLoading || canReviewIsLoading) ? (
    <Loader />
  ) : (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            src={activeImageUrl}
            alt={name}
            width="340"
            height="390"
          />
        </div>

        <div className="row justify-content-start mt-5">
          {images.length ? (
            images.map((image) => (
              <div key={image.public_id} className="col-2 ms-4 mt-2">
                <a role="button">
                  <img
                    className={`d-block border rounded p-3 cursor-pointer ${
                      image.url === activeImageUrl ? 'border-warning' : ''
                    }`}
                    height="100"
                    width="100"
                    src={image.url}
                    alt={image.url}
                    onClick={() => setActiveImageUrl(image.url)}
                  />
                </a>
              </div>
            ))
          ) : (
            <div className="col-2 ms-4 mt-2">
              <a role="button">
                <img
                  className="d-block border rounded p-3 cursor-pointer border-warning"
                  height="100"
                  width="100"
                  src="../../../images/default_product.png"
                  alt="default"
                />
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{name}</h3>

        <p id="product_id">
          Product #
          {productId}
        </p>

        <hr />

        <div className="d-flex">
          <StarRatings
            rating={ratings}
            starRatedColor="ffb829"
            numberOfStars={5}
            starDimension="25px"
            starSpacing="1px"
            name="rating"
          />

          <span id="no-of-reviews" className="pt-1 ps-2">
            (
            {numOfReviews}
            )
          </span>
        </div>

        <hr />

        <p id="product_price">
          {`$ ${price}`}
        </p>

        <div className="stockCounter d-inline">
          <span
            className="btn btn-danger minus"
            onClick={handleDecreaseQuantity}
          >
            -
          </span>

          <input
            type="number"
            className="form-control count d-inline"
            value={quantity}
            readOnly
          />

          <span
            className="btn btn-primary plus"
            onClick={handleIncreaseQuantity}
          >
            +
          </span>
        </div>

        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled={quantity === 0}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status:
          <span id="stock_status" className={stock ? 'greenColor' : 'redColor'}>
            {stock ? 'In Stock' : 'Out of Stock'}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>

        <p>{description}</p>

        <hr />

        <p id="product_seller mb-3">
          Sold by:
          <strong>{` ${seller}`}</strong>
        </p>

        {isAuthenticated ? canReview ? (
          <NewReview />
        ) : (
          <div className="alert alert-danger my-5" type="alert">
            Buy the product to post your review.
          </div>
        ) : (
          <div className="alert alert-danger my-5" type="alert">
            Login to post your review.
          </div>
        )}
      </div>

      {numOfReviews > 0 && <ReviewList />}
    </div>
  );
}
