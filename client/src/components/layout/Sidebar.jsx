import React, { useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = [
    {
      name: 'Profile',
      url: '/me/profile',
      icon: 'fa-solid fa-user',
    },
    {
      name: 'Update Profile',
      url: '/me/update_profile',
      icon: 'fa-solid fa-user-pen',
    },
    {
      name: 'Upload Avatar',
      url: '/me/upload_avatar',
      icon: 'fa-solid fa-circle-user',
    },
    {
      name: 'Update Password',
      url: '/me/update_password',
      icon: 'fa-solid fa-lock',
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
