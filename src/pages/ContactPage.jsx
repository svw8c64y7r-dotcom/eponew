import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, company, phone, subject, message } = formData;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0ACompany: ${company}%0D%0APhone: ${phone}%0D%0A%0D%0A${message}`;
    const mailto = `mailto:info@epotech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-body">
      <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Get in Touch
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            required
            className="form-input"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            required
            className="form-input"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            className="form-input"
            value={formData.company}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject *"
            required
            className="form-input"
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message *"
            required
            rows={4}
            className="form-input"
            value={formData.message}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            Send Message <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
