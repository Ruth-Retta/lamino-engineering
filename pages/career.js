import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ApplicationForm from '../components/ApplicationForm';
import ReactDOM from 'react-dom';



const Careers = () => {
    const [careers, setCareers] = useState([]);
    const [isApplicationFormVisible, setIsApplicationFormVisible] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const modalRef = useRef(null);

    const handleApply = (career) => {
      setIsApplicationFormVisible(true);
      setSelectedCareer(career);
      ReactDOM.render(<ApplicationForm career={selectedCareer} onClose={() => setIsApplicationFormVisible(false)} />, modalRef.current);
    };

    useEffect(() => {
        axios.get('/api/careers')
          .then(response => {
            setCareers(response.data);
          })
          .catch(error => {
            console.error('Error fetching careers:', error);
          });
      }, []);


      return (
        <div className="career-page min-h-screen flex flex-col bg-gray-100">
          <Header />
          <main className="mx-auto px-4 mt-40">
            <h2 className="text-3xl font-bold text-center mb-12">We're Hiring!</h2>
            {careers.length > 0 ? (
              <ul className=" grid grid-cols-1 gap-8">
                {careers.map(career => (
                  <li key={career._id} className=" bg-white rounded-lg shadow-md px-6 py-8 hover:shadow-lg hover:bg-gray-200">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2">
                        {career.imageId && (
                          <div className="career-image mb-4 md:mb-0">
                            <Image
                              src={`/api/careers/image/${career.imageId}?t=${new Date().getTime()}`}
                              alt={career.position}
                              width={200}
                              height={200}
                              className="rounded-lg h-auto w-auto object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <div className="pl-4">
                        <h3 className="text-xl font-medium mb-2">{career.position}</h3>
                        <p className="text-gray-600 mb-4">Posted: {new Date(career.date).toLocaleDateString()}</p>
                        <p className="text-gray-600 mb-4">Start Date: {new Date(career.startDate).toLocaleDateString()} | End Date: {new Date(career.endDate).toLocaleDateString()}</p>
                        <p className="career-description mb-4">{career.description}</p>
                        <p className="text-gray-600 mb-2">Requirements:</p>
                        <ul className="list-disc pl-4 mb-4">
                          {career.requirements.map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                          ))}
                        </ul>
                        <button className="btn btn-primary" onClick={() => handleApply(career)}>Apply</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">We are not currently hiring. Please check back later.</p>
            )}
            {isApplicationFormVisible && (
        <ApplicationForm career={selectedCareer} onClose={() => setIsApplicationFormVisible(false)} />
      )}
          </main>
          <div ref={modalRef} className="modal-overlay" style={{ display: isApplicationFormVisible ? 'block' : 'none' }}>
        {/* The application form will be rendered here */}
      </div>
          <Footer />
        </div>
      );
    };

export default Careers;
