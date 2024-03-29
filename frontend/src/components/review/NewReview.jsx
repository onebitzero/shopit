import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useSubmitProductReviewMutation } from '../../redux/api/productsApi';

export default function NewReview() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const [submitProductReview, { isSuccess, isError, error }] = useSubmitProductReviewMutation();

  const { id: productId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      toast.success('Review submitted');
    }
  }, [isError, isSuccess, error]);

  function handleSubmitProductReview(event) {
    event.preventDefault();

    submitProductReview({
      rating,
      comment: review,
      productId,
    });
  }

  return (
    <div>
      <button
        type="button"
        id="review_btn"
        className="btn btn-primary mt-4"
        data-bs-toggle="modal"
        data-bs-target="#ratingModal"
      >
        Submit Your Review
      </button>

      <div className="row mt-2 mb-5">
        <div className="rating w-50">
          <div
            className="modal fade"
            id="ratingModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="ratingModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ratingModalLabel">
                    Submit Review
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>

                <div className="modal-body">
                  <StarRatings
                    rating={rating}
                    starRatedColor="ffb829"
                    numberOfStars={5}
                    starDimension="25px"
                    starSpacing="1px"
                    name="rating"
                    changeRating={(event) => setRating(event)}
                  />

                  <textarea
                    name="review"
                    id="review"
                    className="form-control mt-4"
                    placeholder="Enter your review"
                    value={review}
                    onChange={(event) => setReview(event.target.value)}
                  />

                  <button
                    type="submit"
                    id="new_review_btn"
                    className="btn w-100 my-4 px-4"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleSubmitProductReview}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
