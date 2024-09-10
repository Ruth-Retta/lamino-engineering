import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Careers = () => {
    const [careers, setCareers] = useState([]);

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
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="mx-auto mt-40">
                {/* <h2 className="text-3xl font-bold mb-6">Career</h2> */}


                {careers.map(career => (
                    <div key={career._id} className="text-center">
                        <p>{career.imageId && (
                <Image
                  src={`/api/careers/image/${career.imageId}?t=${new Date().getTime()}`}
                  alt={career.position}
                  width={200}
                  height={200}
                  className="mt-4 rounded-lg h-24 w-auto mx-auto"
                />
          )}</p>
                        <p className="text-lg font-medium">{career.position}</p>
                        <p className="text-sm text-gray-500">{career.startDate} | {career.endDate}</p>
                        <p>{career.description}</p>
                        <p className="text-sm text-gray-500">{career.requirements}</p>
                        <p className="text-sm text-gray-500">{new Date(career.date).toLocaleDateString()}</p>
                    </div>
                ))}
</main>
      <Footer />
    </div>
  );
};

export default Careers;
