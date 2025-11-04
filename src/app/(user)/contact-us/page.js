'use client'
import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="w-full bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">We're here for you</h1>
          <p className="text-lg md:text-xl text-blue-100">Our friendly team is always here to chat.</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="mx-auto max-w-7xl px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="w-full h-[400px] md:h-[500px] bg-gray-200">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.038076464684!2d74.35844931512064!3d31.509803981359285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e2e3d3f9%3A0x5e8e5e5e5e5e5e5e!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location Map"></iframe>
          </div>
        </div>
      </div>

      {/* Contact Info & Form Section */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600 text-sm">123 Business Street, Lahore, Punjab, Pakistan</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Phone className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600 text-sm">+92 300 1234567</p>
                  <p className="text-gray-600 text-sm">+92 321 7654321</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Mail className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600 text-sm">info@solarhouse.pk</p>
                  <p className="text-gray-600 text-sm">support@solarhouse.pk</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Clock className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Working Hours</h3>
                  <p className="text-gray-600 text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600 text-sm">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-600 text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none" placeholder="John Doe" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Your email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none" placeholder="john@example.com" />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none" placeholder="How can we help?" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your message (optional)</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="6" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none resize-none" placeholder="Tell us more about your inquiry..."></textarea>
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find quick answers to common questions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold text-gray-900 mb-2">What are your response times?</h3>
              <p className="text-gray-600 text-sm">We typically respond to all inquiries within 24 hours during business days.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer technical support?</h3>
              <p className="text-gray-600 text-sm">Yes, our technical support team is available to assist you with any product-related queries.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold text-gray-900 mb-2">Can I visit your office?</h3>
              <p className="text-gray-600 text-sm">Absolutely! We welcome visitors during our working hours. Please call ahead to ensure availability.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold text-gray-900 mb-2">Do you provide installation services?</h3>
              <p className="text-gray-600 text-sm">Yes, we offer professional installation services for all our solar products.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs