import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

export default function MetaData ({ title }) {
  return (
    <Helmet>
        <title>{`${title} - ShopIt`}</title>
    </Helmet>
  )
}

MetaData.propTypes = {
  title: PropTypes.string.isRequired
}
