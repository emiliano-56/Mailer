import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationForm from "./components/RegistrationForm";
import Mailer from "./components/Mailer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<RegistrationForm />} />
        
        {/* Route for other paths leading to Mailer */}
        <Route path="*" element={<Mailer />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;


