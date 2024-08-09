import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import background from '../public/background.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Career() {
    const [careers, setCareers] = useState([]);

    useEffect(() => {
        const fetchCareers = async () => {
            const response = await axios.get('/api/careers');
            setCareers(response.data);
        };

        fetchCareers();
    }, []);

    return (
        <div>
            <Header />
            <main className="mx-auto ml-20 mr-20 p-10 mt-40 mb-10 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6 ">Career Opportunities</h1>
                {careers.map((job, index) => (
                    <div key={index} className="career-container p-6 mb-8 border border-gray-200 rounded-lg shadow-lg bg-white flex items-center">
                        <div className="job-image w-1/4 mr-4">
                            <Image src={background} alt={`${job.position} Image`} className="rounded-lg" fetchpriority="high" />
                        </div>
                        <div className="job-info w-3/4">
                            <h3 className="text-2xl font-bold">{job.position}</h3>
                            <p className="text-gray-600 mb-4">Start Date: {new Date(job.startDate).toLocaleDateString()} | Due Date: {new Date(job.endDate).toLocaleDateString()}</p>
                            <div className="job-description mb-4">
                                <h4 className="text-xl font-semibold">Job Description</h4>
                                <p>{job.description}</p>
                            </div>
                            <div className="job-requirements">
                                <h4 className="text-xl font-semibold">Requirements</h4>
                                <ul className="list-disc list-inside">
                                    {job.requirements.map((requirement, reqIndex) => (
                                        <li key={reqIndex}>{requirement}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
            <Footer />
        </div>
    );
}
