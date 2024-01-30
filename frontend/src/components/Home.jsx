import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import MetaData from './layout/MetaData'
import { useGetProductsQuery } from '../redux/api/productsApi.js'
import Loader from './layout/Loader'
import ProductItem from './product/ProductItem'

export default function Home () {
  const { data, error, isLoading, isError } = useGetProductsQuery()

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message)
    }
  }, [isError])

  return (
    isLoading
      ? <Loader />
      : <div>
            <MetaData title={'One stop solution to all your needs.'} />
            <div className="row">
                <div className="col-6 col-md-12">
                    <h1 id="products_heading" className="text-secondary">Latest Products</h1>
                    <section id="products" className="mt-5">
                        <div className="row">
                            {data.products.map((product, index) => <ProductItem key={index} product={product} />)}
                        </div>
                    </section>
                </div>
            </div>
        </div>
  )
}
