import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import MetaData from './layout/MetaData';
import { useGetProductsQuery } from '../redux/api/productsApi';
import Loader from './layout/Loader';
import ProductItem from './product/ProductItem';
import CustomPagination from './layout/CustomPagination';

export default function Home() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;

  const params = { page };

  const {
    data, error, isLoading, isError,
  } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError]);

  return (
    isLoading
      ? <Loader />
      : (
        <div>
          <MetaData title="One stop solution to all your needs." />
          <div className="row">
            <div className="col-6 col-md-12">
              <h1 id="products_heading" className="text-secondary">Latest Products</h1>
              <section id="products" className="mt-5">
                <div className="row">
                  {data.products.map(
                    (product, index) => <ProductItem key={index} product={product} />,
                  )}
                </div>
              </section>

              <CustomPagination
                resultsPerPage={data.resultsPerPage}
                productsCount={data.productsCount}
              />
            </div>
          </div>
        </div>
      )
  );
}
