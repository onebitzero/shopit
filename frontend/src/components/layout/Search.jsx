import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate('/');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          aria-describedby="search_btn"
          className="form-control"
          placeholder="Enter Product Name ..."
          name="keyword"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <button id="search_btn" className="btn" type="submit" aria-label="Save">
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
