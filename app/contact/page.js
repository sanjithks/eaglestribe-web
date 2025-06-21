"use client";

import { useState } from 'react';

// ✅ Data for the country code dropdown
const countryCodes = [
  { name: 'UAE', code: '+971', flag: '🇦🇪' },
  { name: 'KSA', code: '+966', flag: '🇸🇦' },
  { name: 'IN', code: '+91', flag: '🇮🇳' },
  { name: 'UK', code: '+44', flag: '🇬🇧' },
  { name: 'USA', code: '+1', flag: '🇺🇸' },
];

export default function ContactPage() {
  // ✅ Add new fields to the form state, with a default country code
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    countryCode: '+971',
    mobileNumber: '',
  });
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
        // Clear all form fields on success
        setFormData({ name: '', email: '', message: '', countryCode: '+971', mobileNumber: '' });
      } else {
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
            {/* ...your existing contact info... */}
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white text-foreground p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold text-secondary mb-4">Send a Message</h2>
              
              {/* Name and Email fields (Unchanged) */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full ..."/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full ..."/>
              </div>

              {/* ✅ NEW: Mobile number field with country code dropdown */}
              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium">Mobile Number</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <select