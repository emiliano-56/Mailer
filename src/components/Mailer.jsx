import { useState } from 'react';
//import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import ReactModal from 'react-modal';
import ReactQuill from 'react-quill';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BeatLoader } from 'react-spinners';
import MainNavbar from '../components/MainNavb';

function Mailer() {
  const [formData, setFormData] = useState([]);
  const [previewData, setPreviewData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newData = [...formData];
    newData[index][name] = value;
    setFormData(newData);
  };

  const handleEditorChange = (index, value) => {
    const newData = [...formData];
    newData[index].message = value;
    setFormData(newData);
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    const newData = [...formData];
    newData[index].attachment = file;
    setFormData(newData);
  };

  const handlePreview = (index) => {
    setPreviewData(formData[index]);
    setIsModalOpen(true);
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Extract recipients, subject, and message from formData
    const recipients = formData.map(entry => entry.recipient);
    const subject = "Your email subject"; // Define subject
    const message = "Your email message"; // Define message

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: recipients.join(','), subject, text: message }),
      });

      if (response.ok) {
        toast.success('Emails sent successfully');
        setFormData([]);
      } else {
        toast.error('Error sending emails');
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      toast.error('Error sending emails');
    } finally {
      setIsLoading(false);
    }
  };

  const addRecipient = () => {
    setFormData([...formData, { recipient: '', subject: '', message: '', attachment: null }]);
  };

  const removeRecipient = (index) => {
    const newData = [...formData];
    newData.splice(index, 1);
    setFormData(newData);
  };

  return (
    <>
    <MainNavbar/>
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center mt-3">Mailer, send it , owned it at a faster speed!</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {formData.map((entry, index) => (
          <div key={index}>
            <input
              type="email"
              name="recipient"
              value={entry.recipient}
              onChange={(e) => handleChange(index, e)}
              placeholder="Recipient Email"
              className="block w-full p-2 rounded border border-gray-300"
            />
         <br />   
            <input
              type="text"
              name="subject"
              value={entry.subject}
              onChange={(e) => handleChange(index, e)}
              placeholder="Subject"
              className="block w-full p-2 rounded border border-gray-300"
            />
          <br />
            <ReactQuill
              theme="snow"
              value={entry.message}
              onChange={(value) => handleEditorChange(index, value)}
              className="mb-2"
            />
            <br />
            <input
              type="file"
              onChange={(e) => handleFileChange(index, e)}
              className="mb-2"
            />
            <button
              type="button"
              onClick={() => handlePreview(index)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-1 m-1 rounded"
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => removeRecipient(index)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-1 rounded"
              disabled={isLoading}
           >
          {isLoading ? (
            <BeatLoader size={8} color="#ffffff" />
          ) : (
            'Delete'
          )}

            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addRecipient}
          className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-600"
        >
      More+
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <BeatLoader size={8} color="#ffffff" />
          ) : (
            'Send'
          )}
        </button>
      </form>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Email Preview"
      >
        {previewData && (
          <div >
            <h2 className="text-lg font-bold  text-center mb-4">Email Preview</h2>

            <p className='font-bold mb-4'><strong>Recipient:</strong> {previewData.recipient}</p>
            <p className='font-bold mb-4' ><strong>Subject:</strong> {previewData.subject}</p>
            <div  dangerouslySetInnerHTML={{ __html: previewData.message }} />
          </div>
        )}
        <br />
        <button    
        className="text-gray-600  font-bold py-2 px-2 rounded"
        onClick={() => setIsModalOpen(false)}>Close </button>
      </ReactModal>
      <ToastContainer />
    </div>
    </>
  );
}

export default Mailer;

