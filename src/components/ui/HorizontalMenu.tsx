import React from 'react';
import { NavLink } from 'react-router-dom';

interface MenuItem {
  name: string;
  path: string;
  onClick?: () => void; // Add onClick prop
  isActive?: boolean; // Add isActive prop
}

interface HorizontalMenuProps {
  items: MenuItem[];
}

const HorizontalMenu: React.FC<HorizontalMenuProps> = ({ items }) => {
  return (
    <nav className="w-full bg-dark-800 border border-dark-700 rounded-xl p-2 flex flex-wrap gap-2">
      {items.map((item) => (
        <NavLink
          key={item.name} // Use name as key if path is not unique for internal tabs
          to={item.path}
          onClick={item.onClick} // Use onClick for internal tab switching
          className={({ isActive: routerIsActive }) =>
            `px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-grow text-center ${
              (item.isActive || routerIsActive) // Check both internal isActive and routerIsActive
                ? 'bg-secondary-500 text-white'
                : 'text-gray-300 hover:bg-dark-700 hover:text-white'
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default HorizontalMenu;
