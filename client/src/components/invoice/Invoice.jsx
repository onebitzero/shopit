import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useGetOrderDetailsQuery } from '../../redux/api/orderApi';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import './Invoice.css';

export default function Invoice() {
  const { id: paramsOrderId } = useParams();

  const { user: { name: userName, email: userEmail } } = useSelector((state) => state.auth);

  const {
    isLoading, isError, data, error,
  } = useGetOrderDetailsQuery(paramsOrderId);

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, error]);

  const {
    _id: orderId,
    shippingDetails: {
      mobileNumber,
      address,
      city,
      pincode,
      country,
    } = {},
    createdAt,
    paymentInfo: {
      status,
    } = {},
    orderItems,
    itemsPrice,
    taxAmount,
    totalAmount,
  } = isLoading ? {} : data.order;

  function handleDownloadInvoice() {
    html2canvas(document.getElementById('order_invoice')).then((canvas) => {
      const imageData = canvas.toDataURL();

      const doc = new jsPDF();

      const width = doc.internal.pageSize.getWidth();
      doc.addImage(imageData, 0, 0, width, 0);
      doc.save(`invoice_${orderId}.pdf`);
    });
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <MetaData title="Invoice" />

      <div className="order-invoice my-5">
        <div className="row d-flex justify-content-center mb-5">
          <button
            type="button"
            className="btn btn-success col-md-5 fa fa-print"
            onClick={handleDownloadInvoice}
          >
            {' Download Invoice'}
          </button>
        </div>

        <div id="order_invoice" className="p-3 border border-secondary">
          <header className="clearfix">
            <div id="logo">
              <img src="../../../images/invoice-logo.png" alt="Company Logo" />
            </div>

            <h1>{`INVOICE #${orderId}`}</h1>

            <div id="company" className="clearfix">
              <div>ShopIT</div>

              <div>
                221B Baker Street,
                <br />
                London, UK
              </div>

              <div>(+44 ) 1632 960456</div>

              <div>
                <a href="mailto:info@shopit.com">info@shopit.com</a>
              </div>
            </div>

            <div id="project">
              <div>
                <span>Name</span>
                {` ${userName}`}
              </div>

              <div>
                <span>E-mail</span>
                {` ${userEmail}`}
              </div>

              <div>
                <span>Phone</span>
                {` +91 ${mobileNumber}`}
              </div>

              <div>
                <span>Address</span>
                {` ${address} ${city} ${pincode} ${country}`}
              </div>

              <div>
                <span>Date</span>
                {` ${new Date(createdAt).toLocaleDateString(
                  'en-US',
                  {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  },
                )}`}
              </div>

              <div>
                <span>Status</span>
                {` ${status[0]
                  .toUpperCase()
                  .concat(status.slice(1))}`}
              </div>
            </div>
          </header>

          <main>
            <table className="mt-5">
              <thead>
                <tr>
                  <th className="service">ID</th>
                  <th className="desc">NAME</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>

              <tbody>
                {orderItems.map(({
                  _id: itemId, name, price, quantity,
                }, index) => (
                  <tr key={index}>
                    <td className="service">{itemId}</td>
                    <td className="desc">{name}</td>
                    <td className="unit">{` ${price}`}</td>
                    <td className="qty">{quantity}</td>
                    <td className="total">{`$ ${(price * quantity).toFixed(2)}`}</td>
                  </tr>
                ))}

                <tr>
                  <td colSpan="4">
                    <b>SUBTOTAL</b>
                  </td>
                  <td className="total">{`$ ${itemsPrice}`}</td>
                </tr>

                <tr>
                  <td colSpan="4">
                    <b>TAX 15%</b>
                  </td>
                  <td className="total">{`$ ${taxAmount}`}</td>
                </tr>

                <tr>
                  <td colSpan="4">
                    <b>SHIPPING</b>
                  </td>
                  <td className="total">{`$ ${itemsPrice > 200 ? 0 : 25}`}</td>
                </tr>

                <tr>
                  <td colSpan="4" className="grand total">
                    <b>GRAND TOTAL</b>
                  </td>
                  <td className="grand total">{`$ ${totalAmount}`}</td>
                </tr>
              </tbody>
            </table>

            <div id="notices">
              <div>NOTICE:</div>

              <div className="notice">
                A finance charge of 1.5% will be made on unpaid balances after
                30 days.
              </div>
            </div>
          </main>

          <footer>
            Invoice was created on a computer and is valid without the
            signature.
          </footer>
        </div>
      </div>
    </div>
  );
}
