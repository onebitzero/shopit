import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import MetaData from './layout/MetaData';
import { useGetProductsQuery } from '../redux/api/productsApi';
import Loader from './layout/Loader';
import ProductItem from './product/ProductItem';
import CustomPagination from './layout/CustomPagination';
import Filters from './layout/Filters';

export default function Home() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const keyword = searchParams.get('keyword') || '';
  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const category = searchParams.get('category');
  const ratings = searchParams.get('ratings');

  const params = { page, keyword };

  if (min) {
    params.min = min;
  }

  if (max) {
    params.max = max;
  }

  if (category) {
    params.category = category;
  }

  if (ratings) {
    params.ratings = ratings;
  }

  const {
    data, error, isLoading, isError,
  } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError]);

  const columnSize = keyword ? 4 : 3;

  return (
    isLoading
      ? <Loader />
      : (
        <div>
          <MetaData title="One stop solution to all your needs." />
          <div className="row">
            {keyword && (
            <div className="col-6 col-md-3 mt-5">
              <Filters />
            </div>
            )}
            <div className={keyword ? 'col-6 col-md-9' : 'col-6 col-md-12'}>
              <h1 id="products_heading" className="text-secondary">{keyword ? 'Search results' : 'Latest products'}</h1>
              <section id="products" className="mt-5">
                <div className="row">
                  {data.products.map(
                    (product, index) => (
                      <ProductItem
                        key={index}
                        product={product}
                        columnSize={columnSize}
                      />
                    ),
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
