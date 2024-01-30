import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import StarRatings from 'react-star-ratings'
import { useGetProductDetailsQuery } from '../../redux/api/productsApi.js'
import Loader from '../layout/Loader'

export default function ProductDetails () {
  const { id } = useParams()

  const { data, error, isLoading, isError } = useGetProductDetailsQuery(id)
  const product = data?.product

  const [activeImageUrl, setActiveImageUrl] = useState('')

  useEffect(() => {
    setActiveImageUrl(product?.images[0].url)
  }, [data])

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message)
    }
  }, [isError])

  return (
    isLoading
      ? <Loader />
      : <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <div className="p-3">
                    <img
                            className="d-block w-100"
                            src={activeImageUrl}
                            alt={product.name}
                            width="340"
                            height="390"
                    />
                </div>
                <div className="row justify-content-start mt-5">
                    {product.images.map((image, index) => (
                        <div key={index} className="col-2 ms-4 mt-2">
                            <a role="button">
                                <img
                                    className={`d-block border rounded p-3 cursor-pointer ${image.url === activeImageUrl ? 'border-warning' : ''}`}
                                    height="100"
                                    width="100"
                                    src={image.url}
                                    alt={image.url}
                                    onClick={() => setActiveImageUrl(image.url)}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product # {product._id}</p>
                <hr />
                <div className="d-flex">
                    <StarRatings
                        rating={product.ratings}
                        starRatedColor="ffb829"
                        numberOfStars={5}
                        starDimension='25px'
                        starSpacing='1px'
                        name='rating'
                    />
                    <span id="no-of-reviews" className="pt-1 ps-2"> ({product.numOfReviews}) </span>
                </div>
                <hr />
                <p id="product_price">${product.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus">-</span>
                    <input
                        type="number"
                        className="form-control count d-inline"
                        value="1"
                        readOnly
                    />
                    <span className="btn btn-primary plus">+</span>
                </div>
                <button
                    type="button"
                    id="cart_btn"
                    className="btn btn-primary d-inline ms-4"
                    disabled=""
                >
                    Add to Cart
                </button>
                <hr />
                <p>
                    Status:
                    <span id="stock_status" className={product.stock ? 'greenColor' : 'redColor'}>
                        {product.stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </p>
                <hr />
                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                <div className="alert alert-danger my-5" type="alert">
                        Login to post your review.
                </div>
            </div>
        </div>
  )
}
