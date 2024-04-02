import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '../layout/AdminDashboardLayout';
import PRODUCT_CATEGORIES from '../../constants/constants';
import { useAddProductMutation } from '../../redux/api/productsApi';

export default function NewProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [seller, setSeller] = useState('');

  const [addProduct, {
    isLoading, isSuccess, isError, error,
  }] = useAddProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Product created');

      navigate('/admin/products');
    }

    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError, error]);

  function handleCreateProduct(event) {
    event.preventDefault();

    addProduct({
      name,
      description,
      price,
      stock,
      category,
      seller,
    });
  }

  return (
    <AdminDashboardLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={handleCreateProduct}>
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

            <button type="submit" className="btn w-100 py-2">{isLoading ? 'Please wait...' : 'Create'}</button>
          </form>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
