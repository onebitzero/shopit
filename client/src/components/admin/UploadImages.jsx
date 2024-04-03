import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
} from '../../redux/api/productsApi';
import Loader from '../layout/Loader';
import AdminDashboardLayout from '../layout/AdminDashboardLayout';

export default function UploadImages() {
  const [selectedImages, setSelectedImages] = useState([]);
  const { id: paramsProductId } = useParams();

  const {
    isLoading: getProductDetailsIsLoading,
    data: { product: { images } = {} } = {},
  } = useGetProductDetailsQuery(paramsProductId);

  const [
    uploadProductImages,
    {
      isLoading: uploadProductImagesIsLoading,
      isSuccess: uploadProductImagesIsSuccess,
      isError: uploadProductImagesIsError,
      error: uploadProductImagesError,
    },
  ] = useUploadProductImagesMutation();

  const [
    deleteProductImage,
    {
      isLoading: deleteProductImageIsLoading,
      isSuccess: deleteProductImageIsSuccess,
      isError: deleteProductImageIsError,
      error: deleteProductImageError,
    },
  ] = useDeleteProductImageMutation();

  useEffect(() => {
    if (uploadProductImagesIsSuccess) {
      toast.success('Images uploaded');
      setSelectedImages([]);
    }

    if (uploadProductImagesIsError) {
      toast.error(uploadProductImagesError.data.message);
    }
  }, [
    uploadProductImagesIsSuccess,
    uploadProductImagesIsError,
    uploadProductImagesError,
  ]);

  useEffect(() => {
    if (deleteProductImageIsSuccess) {
      toast.success('Image deleted');
    }

    if (deleteProductImageIsError) {
      toast.error(deleteProductImageError.data.message);
    }
  }, [
    deleteProductImageIsSuccess,
    deleteProductImageIsError,
    deleteProductImageError,
  ]);

  function handleSelectImages(event) {
    const productImages = [...event.target.files];

    productImages.forEach((productImage) => {
      const reader = new FileReader();

      reader.readAsDataURL(productImage);

      reader.onload = () => {
        setSelectedImages((pendingSelectedImages) => [
          ...pendingSelectedImages,
          reader.result,
        ]);
      };
    });
  }

  function handleUploadProductImages(event) {
    event.preventDefault();

    selectedImages.forEach((selectedImage) => {
      uploadProductImages({ id: paramsProductId, body: { selectedImage } });
    });
  }

  return getProductDetailsIsLoading ? (
    <Loader />
  ) : (
    <AdminDashboardLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8 mt-5 mt-lg-0">
          <form
            className="shadow rounded bg-body"
            onSubmit={handleUploadProductImages}
          >
            <h3 className="mb-4">Upload Product Images</h3>

            <div className="mb-3">
              <label htmlFor="customFile" className="form-label">
                Choose Images
                <div className="custom-file">
                  <input
                    id="customFile"
                    className="form-control"
                    type="file"
                    name="product_images"
                    accept="images/*"
                    multiple
                    onChange={handleSelectImages}
                  />
                </div>
              </label>

              {selectedImages.length > 0 && (
                <div className="new-images my-4">
                  <p className="text">New Images:</p>

                  <div className="row mt-4">
                    {selectedImages.length > 0
                      && selectedImages.map((image, index) => (
                        <div className="col-md-3 mt-2">
                          <div className="card" key={index}>
                            <img
                              src={image}
                              alt="Card"
                              className="card-img-top p-2"
                              style={{ width: '100%', height: '80px' }}
                            />
                            <button
                              type="button"
                              aria-label="Remove selected images"
                              className="btn btn-block btn-danger cross-button mt-1 py-0"
                              onClick={() => {
                                setSelectedImages(
                                  selectedImages.filter(
                                    (selectedImage) => selectedImage !== image,
                                  ),
                                );
                              }}
                              style={{
                                backgroundColor: '#dc3545',
                                borderColor: '#dc3545',
                              }}
                            >
                              <i className="fa fa-times" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {images.length > 0 && (
                <div className="uploaded-images my-4">
                  <p className="text">Uploaded images:</p>

                  <div className="row mt-1">
                    {images.length > 0
                      && images.map((image, index) => (
                        <div className="col-md-3 mt-2" key={index}>
                          <div className="card">
                            <img
                              src={image.url}
                              alt="Card"
                              className="card-img-top p-2"
                              style={{ width: '100%', height: '80px' }}
                            />
                            <button
                              type="button"
                              aria-label="Delete uploaded image"
                              className="btn btn-block btn-danger cross-button mt-1 py-0"
                              disabled={deleteProductImageIsLoading}
                              style={{
                                backgroundColor: '#dc3545',
                                borderColor: '#dc3545',
                              }}
                              onClick={() => {
                                deleteProductImage({
                                  productId: paramsProductId,
                                  publicId: image.public_id,
                                });
                              }}
                            >
                              <i className="fa fa-trash" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={
                !selectedImages.length
                || uploadProductImagesIsLoading
                || deleteProductImageIsLoading
            }
            >
              {uploadProductImagesIsLoading ? 'Please wait...' : 'Upload'}
            </button>
          </form>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
