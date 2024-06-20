// pages/careers.js
import CareerSection from '../components/CareerSection';

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

export default function Careers() {
  return (
    <div>
      <CareerSection
        position={jobListing.position}
        startDate={jobListing.startDate}
        dueDate={jobListing.dueDate}
        description={jobListing.description}
        requirements={jobListing.requirements}
      />
    </div>
  );
}
