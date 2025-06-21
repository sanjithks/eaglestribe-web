"use client"; // This must be a client component to handle form state and interaction

import { useState } from 'react';

export default function ContactPage() {
  // State variables for form fields, submission status, and messages
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setResponseMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();

      if (response.ok) {
        setResponseMessage('Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '' }); // Clear form on success
      } else {
        // Use the error message from the API, or a default one
        setResponseMessage(`Error: ${result.error || 'Something went wrong.'}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResponseMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-background text-foreground min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-primary text-center mb-12">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info (Unchanged) */}
          <div className="space-y-6 text-lg leading-relaxed">
            <h2 className="text-3xl font-semibold text-secondary">Get In Touch</h2>
            <p>
              Have questions or interested in learning more about <strong className="text-primary">Eagles Tribe MC</strong>? We’d love to hear from you. Reach out to us through the following channels.
            </p>
            <div>
              <h3 className="font-bold">Email</h3>
              <a href="mailto:info@eaglestribemc.com" className="text-primary hover:underline">
                info@eaglestribemc.com
              </a>
            </div>
            <div>
              <h3 className="font-bold">Phone</h3>
              <p>+971 55 555 5555</p>
            </div>
            <div>
              <h3 className="font-bold">Club House</h3>
              <p>Location details available to members and prospects.</p>
            </div>
          </div>

          {/* Contact Form - Now functional */}
          <div>
            {/* The form now calls handleSubmit when submitted */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-white text-foreground p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold text-secondary mb-4">Send a Message</h2>

              <div>
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-medium py-2 px-4 rounded-md shadow-md transition-colors hover:bg-secondary disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {/* Display success or error messages to the user */}
                {responseMessage && (
                  <p className="text-sm text-center mt-4 text-gray-600">{responseMessage}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}