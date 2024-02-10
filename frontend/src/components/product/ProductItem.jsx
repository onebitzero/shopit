import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';

export default function ProductItem({
  product: {
    _id: id, name, price, ratings, images, numOfReviews,
  },
}) {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={images[0].url ? images[0].url : '../../../images/default_product.png'}
          alt={name}
        />
        <div className="card-body ps-3 d-flex justify-content-center flex-column">
          <h5 className="card-title">
            <Link to={`/products/${id}`}>{name}</Link>
          </h5>
          <div className="ratings mt-auto d-flex">
            <StarRatings
              rating={ratings}
              starRatedColor="ffb829"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="1px"
              name="rating"
            />
            <span id="no_of_reviews" className="pt-2 ps-2">
              (
              {numOfReviews}
              )
            </span>
          </div>
          <p className="card-text mt-2">{price}</p>
          <Link to={`/products/${id}`} id="view_btn" className="btn btn-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};
