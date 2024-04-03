import React from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { useGetProductReviewsQuery } from '../../redux/api/productsApi';
import Loader from '../layout/Loader';

export default function ReviewList() {
  const { id: productId } = useParams();

  const { isLoading, data } = useGetProductReviewsQuery(productId);

  const { reviews } = isLoading ? {} : data;

  return isLoading ? (
    <Loader />
  ) : (
    <div className="reviews w-75">
      <h3>Reviews:</h3>

      <hr />

      {reviews.map(
        (
          {
            rating,
            comment: review,
            user: {
              avatar: { url },
              name,
            },
          },
          index,
        ) => (
          <div className="review-card my-3" key={index}>
            <div className="row">
              <div className="col-1">
                <img
                  src={url}
                  alt="User Name"
                  width="50"
                  height="50"
                  className="rounded-circle"
                />
              </div>

              <div className="col-11">
                <StarRatings
                  rating={rating}
                  starRatedColor="ffb829"
                  numberOfStars={5}
                  starDimension="25px"
                  starSpacing="1px"
                  name="rating"
                />

                <p className="review_user">{name}</p>

                <p className="review_comment">{review}</p>
              </div>
            </div>

            <hr />
          </div>
        ),
      )}
    </div>
  );
}
