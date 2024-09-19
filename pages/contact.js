import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'; 

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: '',
    });
    
    const { name, email, phoneNumber, subject, message } = formData;
    const router = useRouter();
    
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await axios.post('/api/contact', formData);
            console.log(res.data);

            setFormData({
              name: '',
              email: '',
              phoneNumber: '',
              subject: '',
              message: '',
            });
        
            alert('Message sent successfully!');
            
        } catch (err) {
            console.error(err.response.data);
        }
    };

    
    const handleMakeRequest = () => {
        router.push('/makeRequest'); 
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main style={{ marginTop: '80px' }} className="mx-auto ml-20 mr-20 mt-40 mb-10">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-4xl font-bold">Contact Us</h2>
                        <button 
                            className="bg-custom-green-1 text-white py-2 px-4 rounded flex items-center"
                            onClick={handleMakeRequest} // Add click handler here
                        >
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                            Make a Request
                        </button>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={onChange} // Make sure onChange is properly defined here
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
            </main>
            <Footer />
        </div>
    );
}
