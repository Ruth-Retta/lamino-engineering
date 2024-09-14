import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';

const MakeRequest = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
  });

  const { name, email, phoneNumber, subject, message } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Implement form submission logic here (e.g., using axios)
    console.log('Form submitted:', formData);

    // Clear form data after submission (optional)
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      subject: '',
      message: '',
    });

    onClose(); // Close the popup after submission
  };

  const modalRef = useRef(null);
  const root = useRef(null);

  useEffect(() => {
    root.current = document.getElementById('modal-root');
    const modalElement = modalRef.current;
    root.current.appendChild(modalElement);

    const handleClickOutside = (event) => {
      if (modalElement && !modalElement.contains(event.target)) {
        onClose(); // Close the popup when clicked outside
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      root.current.removeChild(modalElement);
    };
  }, []);

  return (
    <div ref={modalRef} className="contact-form-popup fixed z-50 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center px-4 py-2">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold text-center mb-4">Contact Us</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone No</label>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                value={subject}
                onChange={onChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={message}
                onChange={onChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <button type="submit" className="bg-custom-green-1 text-white py-2 px-4 rounded">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeRequest;