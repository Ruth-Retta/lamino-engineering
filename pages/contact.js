import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiUser, FiMail, FiPhone, FiEdit, FiSend } from 'react-icons/fi'; // Import icons from react-icons/fi

const Contact = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <div className="flex items-center">
              <span className="inline-flex items-center justify-center h-10 w-10 bg-gray-200 text-gray-600 rounded-md">
                <FiUser className="h-6 w-6" />
              </span>
              <input type="text" className="ml-3 mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center">
              <span className="inline-flex items-center justify-center h-10 w-10 bg-gray-200 text-gray-600 rounded-md">
                <FiMail className="h-6 w-6" />
              </span>
              <input type="email" className="ml-3 mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone No</label>
            <div className="flex items-center">
              <span className="inline-flex items-center justify-center h-10 w-10 bg-gray-200 text-gray-600 rounded-md">
                <FiPhone className="h-6 w-6" />
              </span>
              <input type="text" className="ml-3 mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <div className="flex items-center">
              <span className="inline-flex items-center justify-center h-10 w-10 bg-gray-200 text-gray-600 rounded-md">
                <FiEdit className="h-6 w-6" />
              </span>
              <input type="text" className="ml-3 mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
          </div>
          <div>
            <button type="submit" className="bg-custom-green-2 text-white py-2 px-4 rounded">
              <FiSend className="mr-2 h-5 w-5 inline-block" />
              Send
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
