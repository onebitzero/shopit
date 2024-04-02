import React, { useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
  const menuItems = [
    {
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'fa-solid fa-chart-simple',
    },
    {
      name: 'Add New Product',
      url: '/admin/product/new',
      icon: 'fas fa-plus',
    },
    {
      name: 'Products',
      url: '/admin/products',
      icon: 'fa-solid fa-list',
    },
    {
      name: 'Orders',
      url: '/admin/orders',
      icon: 'fas fa-file-invoice',
    },
    {
      name: 'Users',
      url: '/admin/users',
      icon: 'fas fa-user',
    },
    {
      name: 'Reviews',
      url: '/admin/reviews',
      icon: 'fas fa-star',
    },
  ];

  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = useCallback((menuItemUrl) => setActiveMenuItem(menuItemUrl));

  return (
    <div className="list-group mt-5 pl-4">
      {menuItems.map((menuItem, index) => (
        <Link
          key={index}
          to={menuItem.url}
          className={`fw-bold list-group-item list-group-item-action ${activeMenuItem.includes(menuItem.url) ? 'active' : ''}`}
          aria-current={activeMenuItem.includes(menuItem.url)}
          onClick={() => handleMenuItemClick(menuItem.url)}
        >
          <i className={menuItem.icon} />
          {` ${menuItem.name}`}
        </Link>
      ))}
    </div>
  );
}
