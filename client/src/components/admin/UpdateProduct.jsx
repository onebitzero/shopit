import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../redux/api/productsApi';
import AdminDashboardLayout from '../layout/AdminDashboardLayout';
import Loader from '../layout/Loader';
import PRODUCT_CATEGORIES from '../../constants/constants';

export default function UpdateProduct() {
  const { id: paramsProductId } = useParams();

  const {
    isLoading: getProductDetailsIsLoading,
    isSuccess: getProductDetailsIsSuccess,
    data: {
      product: {
        name: oldName,
        description: oldDescription,
        price: oldPrice,
        stock: oldStock,
        category: oldCategory,
        seller: oldSeller,
      } = {},
    } = {},
  } = useGetProductDetailsQuery(paramsProductId);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [seller, setSeller] = useState('');

  useEffect(() => {
    if (getProductDetailsIsSuccess) {
      setName(oldName);
      setDescription(oldDescription);
      setPrice(oldPrice);
      setStock(oldStock);
      setCategory(oldCategory);
      setSeller(oldSeller);
    }
  }, [getProductDetailsIsSuccess]);

  const [
    updateProduct,
    {
      isLoading: updateProductIsLoading,
      isSuccess: updateProductIsSuccess,
      isError: updateProductIsError,
      error: updateProductError,
    }] = useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (updateProductIsSuccess) {
      toast.success('Product updated');

      navigate('/admin/products');
    }

    if (updateProductIsError) {
      toast.error(updateProductError.data.message);
    }
  }, [updateProductIsSuccess, updateProductIsError, updateProductError]);

  function handleUpdateProduct(event) {
    event.preventDefault();

    updateProduct({
      id: paramsProductId,
      body: {
        name,
        description,
        price,
        stock,
        category,
        seller,
      },
    });
  }

  return (getProductDetailsIsLoading ? (
    <Loader />
  ) : (
    <AdminDashboardLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={handleUpdateProduct}>
            <h2 className="mb-4">New Product</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description_field" className="form-label">
                Description
              </label>
              <textarea
                id="description_field"
                className="form-control"
                rows="8"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="price_field" className="form-label">
                  Price
                  <input
                    type="number"
                    id="price_field"
                    className="form-control"
                    name="price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </label>
              </div>

              <div className="mb-3 col">
                <label htmlFor="stock_field" className="form-label">
                  Stock
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    name="stock"
                    value={stock}
                    onChange={(event) => setStock(event.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="category_field" className="form-label">
                  Category
                  <select
                    id="category_field"
                    className="form-select"
                    name="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    {PRODUCT_CATEGORIES.map((element, index) => (
                      <option key={index} value={element}>{element}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mb-3 col">
                <label htmlFor="seller_field" className="form-label">
                  Seller Name
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    name="seller"
                    value={seller}
                    onChange={(event) => setSeller(event.target.value)}
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={updateProductIsLoading}
            >
              {updateProductIsLoading ? 'Please wait...' : 'Update'}
            </button>
          </form>
        </div>
      </div>
    </AdminDashboardLayout>
  ));
}
