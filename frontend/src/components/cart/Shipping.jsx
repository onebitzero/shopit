import React, { useEffect, useState } from 'react';
import { countries } from 'countries-list';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import { setShippingInfo } from '../../redux/features/cartSlice';

export default function Shipping() {
  const countriesList = Object.values(countries);

  const [mobileNumber, setMobileNumber] = useState();
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState(countriesList[0].name);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {
    if (Object.keys(shippingInfo).length) {
      setMobileNumber(shippingInfo.mobileNumber);
      setAddress(shippingInfo.address);
      setPincode(shippingInfo.pincode);
      setCity(shippingInfo.city);
      setCountry(shippingInfo.country);
    }
  }, [shippingInfo]);

  function handleSaveShippingInfo(event) {
    event.preventDefault();

    dispatch(
      setShippingInfo({
        mobileNumber,
        address,
        pincode,
        city,
        country,
      }),
    );

    navigate('/confirm_order');
  }

  return (
    <div>
      <MetaData title="Shipping Info" />

      <CheckoutSteps shipping />

      <div className="row wrapper mb-5">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            onSubmit={handleSaveShippingInfo}
          >
            <h2 className="mb-4">Shipping Info</h2>

            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">
                Mobile number
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="0123456789"
                  id="phone_field"
                  className="form-control"
                  name="mobileNumber"
                  value={mobileNumber}
                  onChange={(event) => setMobileNumber(event.target.value.replace(/\D/g, ''))}
                  required
                />
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                Address
                <input
                  type="text"
                  id="address_field"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  required
                />
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="postal_code_field" className="form-label">
                Pincode
                <input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  id="postal_code_field"
                  className="form-control"
                  name="pincode"
                  value={pincode}
                  onChange={(event) => setPincode(event.target.value.replace(/\D/g, ''))}
                  required
                />
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="city_field" className="form-label">
                City
                <input
                  type="text"
                  id="city_field"
                  className="form-control"
                  name="city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  required
                />
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="country_field" className="form-label">
                Country
                <select
                  id="country_field"
                  className="form-select"
                  name="country"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  required
                >
                  {countriesList.map((element) => (
                    <option value={element.name}>{element.name}</option>
                  ))}
                </select>
              </label>
            </div>
            <button id="shipping_btn" type="submit" className="btn w-100 py-2">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
