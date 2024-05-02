import { useState } from 'react';
import { supabase } from '../libs/initSupabase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Navbar from '../components/Navbar';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    query: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        name:formData.name,
        subject:formData.subject
      });
  
      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('User already registered!');
        } else {
          throw error;
        }
      } else {
        toast.success('Registration successful!');
        // Clear form fields
        setFormData({
          name: '',
          email: '',
          subject: '',
          query: '',
          password: ''
        });
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false); // Clear loading state
    }
  };
  

  return (
    <>
    <Navbar/>
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4 text-center">Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <input type="text" id="subject" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" placeholder="Your Password" value={formData.password} onChange={handleChange} required className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
        </div>
       
        <div className="mb-4">
          <label htmlFor="query" className="block text-sm font-medium text-gray-700">Query</label>
          <textarea id="query" name="query" placeholder="Your Query" value={formData.query} onChange={handleChange} required rows="4" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
        </div>
     
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" disabled={loading}>
  {loading ? <i className="animate-spin mr-1 fas fa-spinner"></i> : 'Submit'}
</button>

      </form>
    </div>
    </>
  );
}

export default RegistrationForm;



