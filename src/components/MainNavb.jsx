import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MainNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    // Perform any logout logic here
    // For example, clearing session storage, etc.
    // Then navigate the user to the registration page
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-bold">Mailer</h1>
      </div>

      {/* User Profile */}
      <div className="relative">
        <button onClick={toggleDropdown} className="focus:outline-none">
          <img
            src="https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_960_720.jpg"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <ul className="py-1">
              <li>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={closeDropdown}
                >
                  Settings
                </Link>
              </li>
              <hr />
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default MainNavbar;
