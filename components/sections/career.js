import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import background from '../../public/background.jpg';

const CareerSection = () => {
  const jobListing = {
    position: 'Software Engineer',
    startDate: 'June 1, 2024',
    dueDate: 'July 1, 2024',
    description: 'We are looking for a skilled software engineer to join our team.',
    requirements: [
      'Bachelor’s degree in Computer Science or related field',
      '3+ years of experience in software development',
      'Proficiency in JavaScript, HTML, and CSS',
      'Experience with React and Node.js',
    ],
  };

  return (
    <section id="career" className="py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6">Career Opportunities</h2>
        <div className="career-container p-6 mb-8 border border-gray-200 rounded-lg shadow-lg bg-white">
          <div className="job-header flex items-center mb-4">
            <div className="job-image w-1/4 mr-4">
              <Image src={background} alt="Job Image" className="rounded-lg" fetchpriority="high" />
            </div>
            <div className="job-info w-3/4">
              <h3 className="text-2xl font-bold">{jobListing.position}</h3>
              <p className="text-gray-600">Start Date: {jobListing.startDate} | Due Date: {jobListing.dueDate}</p>
              <div className="job-description mb-4">
                <h4 className="text-xl font-semibold">Job Description</h4>
                <p>{jobListing.description}</p>
              </div>
              <div className="job-requirements">
                <h4 className="text-xl font-semibold">Requirements</h4>
                <ul className="list-disc list-inside">
                  {jobListing.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Link href="/career" className="mt-4 bg-custom-green-1 text-white py-2 px-4 rounded">
          Learn More
        </Link>
      </div>
    </section>
  );
};

export default CareerSection;
