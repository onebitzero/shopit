import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {
  useLazyGetProductReviewsQuery,
  useDeleteProductReviewMutation,
} from '../../redux/api/productsApi';
import Loader from '../layout/Loader';
import AdminDashboardLayout from '../layout/AdminDashboardLayout';

export default function Reviews() {
  const [searchProductId, setSearchProductId] = useState('');

  const [
    getProductReviews,
    {
      isLoading: getProductReviewsIsLoading,
      isError: getProductReviewsIsError,
      error: getProductReviewsError,
      data: {
        reviews,
      } = { reviews: [] },
    } = {},
  ] = useLazyGetProductReviewsQuery();

  const [
    deleteProductReview,
    {
      isLoading: deleteProductReviewisLoading,
      isSuccess: deleteProductReviewIsSuccess,
      isError: deleteProductReviewIsError,
      error: deleteProductReviewError,
    },
  ] = useDeleteProductReviewMutation();

  useEffect(() => {
    if (getProductReviewsIsError) {
      toast.error(getProductReviewsError.data.message);
    }
  }, [getProductReviewsIsError, getProductReviewsError]);

  useEffect(() => {
    if (deleteProductReviewIsSuccess) {
      toast.success('Review deleted');
    }

    if (deleteProductReviewIsError) {
      toast.error(deleteProductReviewError.data.message);
    }
  }, [deleteProductReviewIsSuccess, deleteProductReviewIsError, deleteProductReviewError]);

  function handleReviewsSearch(event) {
    event.preventDefault();

    getProductReviews(searchProductId);
  }
  return (
    <AdminDashboardLayout>
      <div className="row justify-content-center my-5">
        <div className="col-6">
          <form onSubmit={handleReviewsSearch}>
            <div className="mb-3">
              <label htmlFor="productId_field" className="form-label">
                Enter Product ID
              </label>
              <input
                type="text"
                id="productId_field"
                className="form-control"
                value={searchProductId}
                onChange={(event) => setSearchProductId(event.target.value)}
              />
            </div>

            <button
              type="submit"
              id="search_button"
              className="btn btn-primary w-100 py-2"
              disabled={getProductReviewsIsLoading}
            >
              {getProductReviewsIsLoading ? 'Please wait...' : 'Search'}
            </button>
          </form>
        </div>
      </div>

      {getProductReviewsIsLoading ? (
        <Loader />
      ) : reviews.length ? (
        <MDBTable striped hover>
          <MDBTableHead>
            <tr>
              <th scope="col">Review ID</th>
              <th scope="col">User</th>
              <th scope="col">Rating</th>
              <th scope="col">Comment</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>

          <MDBTableBody>
            {reviews.map((review, index) => (
              <tr key={index}>
                <td>{review._id}</td>
                <td>{review.user.name}</td>
                <td>{review.rating}</td>
                <td>{review.comment}</td>
                <td>
                  <button
                    type="button"
                    aria-label="Delete review"
                    className="btn btn-outline-danger fa-solid fa-trash"
                    disabled={deleteProductReviewisLoading}
                    onClick={() => {
                      deleteProductReview({
                        productId: searchProductId,
                        reviewId: review._id,
                      });
                    }}
                  />
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      ) : (
        <h4 style={{ textAlign: 'center' }}>No Reviews</h4>
      )}

    </AdminDashboardLayout>
  );
}
