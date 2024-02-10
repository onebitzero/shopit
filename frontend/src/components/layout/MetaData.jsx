import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

export default function MetaData({ title }) {
  return (
    <Helmet>
      <title>{`${title} - ShopIt`}</title>
    </Helmet>
  );
}

MetaData.propTypes = {
  title: PropTypes.string.isRequired,
};
