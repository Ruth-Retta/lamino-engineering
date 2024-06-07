export default function ContactSection() {
    return (
      <section id="contact" className="py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone No</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
            </div>
            <div>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Send</button>
            </div>
          </form>
        </div>
      </section>
    );
  }
  