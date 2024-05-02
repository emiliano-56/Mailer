// Navbar.jsx
import  { useState } from 'react';
import Modal from '../components/Modal';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAdminLogin = () => {
    setShowModal(true);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-bold">Mailer</h1>
      </div>
      <button onClick={handleAdminLogin} className="text-white hover:text-gray-200">
        Admin Login
      </button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </nav>
  );
};

export default Navbar;
