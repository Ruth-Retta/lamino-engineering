import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faContactBook } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'; 


export default function MakeRequest() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        subject: '',
        description: '',
        materials: '',
        attachments: null,
    });
    
    const { name, email, phoneNumber, subject, description, materials, attachments } = formData;
    const router = useRouter(); // Initialize useRouter
    
    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'attachments') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('email', email);
        formDataToSend.append('phoneNumber', phoneNumber);
        formDataToSend.append('subject', subject);
        formDataToSend.append('description', description);
        formDataToSend.append('materials', materials);
        if (attachments) {
            formDataToSend.append('attachments', attachments);
        }

        try {
            const res = await axios.post('/api/makeRequest', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);

            setFormData({
                name: '',
                email: '',
                phoneNumber: '',
                subject: '',
                description: '',
                materials: '',
                attachments: null,
            });
        
            alert('Request sent successfully!');
            
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const handleContact = () => {
        router.push('/contact');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main style={{ marginTop: '80px' }} className="mx-auto ml-20 mr-20 mt-40 mb-10">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-4xl font-bold">Make a Request</h2>
                        <button 
                            className="bg-custom-green-1 text-white py-2 px-4 rounded flex items-center"
                            onClick={handleContact}
                        >
                            <FontAwesomeIcon icon={faContactBook} className="mr-2" />
                            Contact Us
                        </button>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name/Company Name</label>
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
                            <label className="block text-sm font-medium text-gray-700">Request Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={subject}
                                onChange={onChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={description}
                                onChange={onChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">List of Materials</label>
                            <input
                                type="text"
                                name="materials"
                                value={materials}
                                onChange={onChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Attachments</label>
                            <input
                                type="file"
                                name="attachments"
                                onChange={onChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <button type="submit" className="bg-custom-green-1 text-white py-2 px-4 rounded">Send Request</button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
