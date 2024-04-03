import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import {
  useGetAdminProductsQuery,
  useDeleteProductMutation,
} from '../../redux/api/productsApi';
import Loader from '../layout/Loader';
import AdminDashboardLayout from '../layout/AdminDashboardLayout';

export default function Products() {
  const {
    isLoading: getAdminProductsIsLoading,
    data: { products } = {},
  } = useGetAdminProductsQuery();

  const [
    deleteProduct,
    {
      isLoading: deleteProductIsLoading,
      isSuccess: deleteProductIsSuccess,
      isError: deleteProductIsError,
      error: deleteProductError,
    },
  ] = useDeleteProductMutation();

  useEffect(() => {
    if (deleteProductIsSuccess) {
      toast.success('Product deleted');
    }

    if (deleteProductIsError) {
      toast.error(deleteProductError.data.message);
    }
  }, [deleteProductIsSuccess, deleteProductIsError, deleteProductError]);

  return getAdminProductsIsLoading ? (
    <Loader />
  ) : (
    <AdminDashboardLayout>
      <h2>{`${products.length} Products`}</h2>

      <MDBTable bordered hover striped className="px-3">
        <MDBTableHead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>

        <MDBTableBody>
          {products.map((product, index) => (
            <tr key={index}>
              <th scope="row">{product._id}</th>
              <td>{`${product.name.substring(0, 14)}...`}</td>
              <td>{`$ ${product.price}`}</td>
              <td>{product.stock}</td>
              <td>
                <Link
                  to={`update/${product._id}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  <i className="fa-solid fa-pen" />
                </Link>

                <Link
                  to={`upload_images/${product._id}`}
                  className="btn btn-sm btn-outline-primary ms-1"
                >
                  <i className="fa-solid fa-images" />
                </Link>

                <button
                  type="button"
                  aria-label="Delete product"
                  className="btn btn-sm btn-outline-danger ms-1"
                  disabled={deleteProductIsLoading}
                  onClick={() => {
                    deleteProduct({ id: product._id });
                  }}
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </AdminDashboardLayout>
  );
}
