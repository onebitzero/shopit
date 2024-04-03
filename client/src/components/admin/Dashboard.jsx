import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLazyGetOrdersAndSalesQuery } from '../../redux/api/orderApi';
import Loader from '../layout/Loader';
import AdminDashboardLayout from '../layout/AdminDashboardLayout';
import OrdersAndSalesChart from '../chart/OrdersAndSalesChart';

export default function Dashboard() {
  const initialStartDate = new Date();
  const initialEndDate = new Date();
  initialStartDate.setDate(initialStartDate.getDate() - 7);

  const [startDate, setStartDate] = useState(initialStartDate.toISOString());
  const [endDate, setEndDate] = useState(initialEndDate.toISOString());

  const [getOrderDetails, { isUninitialized, isLoading, data }] = useLazyGetOrdersAndSalesQuery();

  useEffect(() => {
    getOrderDetails({ startDate, endDate });
  }, []);

  function handleFetch(event) {
    event.preventDefault();

    getOrderDetails({ startDate, endDate });
  }

  return ((isUninitialized || isLoading) ? (
    <Loader />
  ) : (
    <AdminDashboardLayout>
      <div className="d-flex justify-content-start align-items-center">
        <div className="mb-3 me-4">
          <label className="form-label d-block">
            Start Date
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="form-control"
            />
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label d-block">
            End Date
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="form-control"
            />
          </label>
        </div>

        <button
          type="button"
          className="btn fetch-btn ms-4 mt-3 px-5"
          onClick={handleFetch}
          disabled={isLoading}
        >
          {isLoading ? 'Fetching...' : 'Fetch'}
        </button>
      </div>

      <div className="row pr-4 my-5">
        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white orders o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Orders

                <br />

                <b>{data.totalOrders}</b>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white sales o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Sales

                <br />

                <b>{`$ ${data.totalSales}`}</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrdersAndSalesChart ordersAndSalesData={data.finalOrderAndSalesData} />
      <div className="mb-5" />
    </AdminDashboardLayout>
  )
  );
}
