import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

export default function JobApplication() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        position: '',
        experience: '',
        education: '',
        resume: null,
        coverLetter: null,
    });
    
    const { firstName, lastName, email, phoneNumber, position, experience, education, resume, coverLetter } = formData;
    const router = useRouter();
    
    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'resume' || name === 'coverLetter') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('firstName', firstName);
        formDataToSend.append('lastName', lastName);
        formDataToSend.append('email', email);
        formDataToSend.append('phoneNumber', phoneNumber);
        formDataToSend.append('position', position);
        formDataToSend.append('experience', experience);
        formDataToSend.append('education', education);
        if (resume) {
            formDataToSend.append('resume', resume);
        }
        if (coverLetter) {
            formDataToSend.append('coverLetter', coverLetter);
        }

        try {
            const res = await axios.post('/api/jobApplication', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                position: '',
                experience: '',
                education: '',
                resume: null,
                coverLetter: null,
            });
        
            alert('Application submitted successfully!');
            
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main style={{ marginTop: '80px' }} className="mx-auto ml-20 mr-20 mt-40 mb-10">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-4xl font-bold">Job Application Form</h2>
                        <button 
                            className="bg-custom-green-1 text-white py-2 px-4 rounded flex items-center"
                            onClick={() => router.push('/career')}
                        >
                            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                            Careers Page
                        </button>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={onChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
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
                            <label className="block text-sm font-medium text-gray-700">Position Applying For</label>
                            <input
                                type="text"
                                name="position"
                                value={position}
                                onChange={onChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Work Experience</label>
                            <textarea
                                name="experience"
                                value={experience}
                                onChange={onChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Please describe your relevant work experience"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Education</label>
                            <textarea
                                name="education"
                                value={education}
                                onChange={onChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Please describe your educational background"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Resume/CV</label>
                            <input
                                type="file"
                                name="resume"
                                onChange={onChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Cover Letter (optional)</label>
                            <input
                                type="file"
                                name="coverLetter"
                                onChange={onChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <button type="submit" className="bg-custom-green-1 text-white py-2 px-4 rounded">Submit Application</button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
