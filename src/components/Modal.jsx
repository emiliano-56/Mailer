import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = () => {
    setLoading(true); // Set loading state to true
    // Simulate login process (replace with actual login logic)
    setTimeout(() => {
      if (password === '123') {
        toast.success('Login successful');
        navigate('/mailer'); // Redirect to mailer page
      } else {
        toast.error('Invalid password. Please try again.');
      }
      setLoading(false); // Set loading state back to false
    }, 1000); // Simulate login delay
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-2 border border-gray-300 rounded-md text-black"
        />
        <div className="flex justify-end">
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading} // Disable the button when loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button onClick={onClose} className="ml-2 text-gray-600 hover:text-gray-800">Close</button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;




