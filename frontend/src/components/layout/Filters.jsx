import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import getPriceQueryParams from '../../helpers/getPriceQueryParams';
import PRODUCT_CATEGORIES from '../../constants/constants';

export default function Filters() {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has('min')) {
      setMin(searchParams.get('min'));
    } else {
      setMin('');
    }

    if (searchParams.has('max')) {
      setMax(searchParams.get('max'));
    } else {
      setMax('');
    }
  }, []);

  function handleCategoryAndRatingsFilter(checkbox) {
    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((element) => {
      if (element !== checkbox) {
        element.checked = false;
      }
    });

    if (checkbox.checked === false) {
      searchParams.delete(checkbox.name);
    } else if (searchParams.has(checkbox.name)) {
      searchParams.set(checkbox.name, checkbox.value);
    } else {
      searchParams.append(checkbox.name, checkbox.value);
    }

    const path = `${window.location.pathname}?${searchParams}`;
    navigate(path);
  }

  function handlePriceFilter(event) {
    event.preventDefault();

    searchParams = getPriceQueryParams(searchParams, 'min', min);
    searchParams = getPriceQueryParams(searchParams, 'max', max);

    const path = `${window.location.pathname}?${searchParams}`;
    navigate(path);
  }

  function isDefaultChecked(checkboxName, checkboxValue) {
    const value = searchParams.get(checkboxName);

    return checkboxValue === value;
  }

  return (
    <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form
        id="filter_form"
        className="px-2"
        onSubmit={handlePriceFilter}
      >
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="$Min"
              name="min"
              value={min}
              onChange={(event) => setMin(event.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="$Max"
              name="max"
              value={max}
              onChange={(event) => setMax(event.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">GO</button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Category</h5>

      {PRODUCT_CATEGORIES.map((category) => (
        <div className="form-check">
          <label className="form-check-label" htmlFor="check4">
            <input
              className="form-check-input"
              type="checkbox"
              name="category"
              id="check4"
              value={category}
              defaultChecked={isDefaultChecked('category', category)}
              onClick={(event) => handleCategoryAndRatingsFilter(event.target)}
            />
            {category}
          </label>
        </div>
      ))}

      <hr />
      <h5 className="mb-3">Ratings</h5>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="ratings"
            id="check7"
            value={rating}
            defaultChecked={isDefaultChecked('ratings', rating.toString())}
            onClick={(event) => handleCategoryAndRatingsFilter(event.target)}
          />
          <StarRatings
            rating={rating}
            starRatedColor="ffb829"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="1px"
            name="rating"
          />
        </div>
      ))}
    </div>
  );
}
