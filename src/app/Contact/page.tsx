"use client";

import Image from "next/image";
import { useState } from "react";

export default function ContactUs() {
  // Local states to store user inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // For feedback (success/error)
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      // Make a POST request to our /api/contact route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatus("Email sent successfully!");
        // Reset form fields
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus(
          data.message || "Failed to send email. Please try again later."
        );
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setStatus("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {/* Header Section */}
      <div className="bg-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Contact Us
          </h1>
          <p className="text-sm text-gray-600">
            Home . Pages .{" "}
            <span className="text-pink-500">Contact us</span>
          </p>
        </div>
      </div>

      {/* Information Section */}
      <div className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Form */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Get In Touch</h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            We would love to hear from you! Whether you have a question about
            features, trials, pricing, need a demo, or anything else, our team
            is ready to answer all your questions.
          </p>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name*"
                  className="w-full border rounded-md p-4 text-sm focus:outline-none focus:ring-pink-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Your E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your E-mail*"
                  className="w-full border rounded-md p-4 text-sm focus:outline-none focus:ring-pink-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="sr-only">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Subject"
                className="w-full border rounded-md p-4 text-sm focus:outline-none focus:ring-pink-500"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Type Your Message
              </label>
              <textarea
                id="message"
                placeholder="Type Your Message*"
                rows={5}
                className="w-full border rounded-md p-4 text-sm focus:outline-none focus:ring-pink-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-pink-500 text-white font-medium rounded-md hover:bg-pink-600 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Mail"}
            </button>
          </form>

          {/* Status message */}
          {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
        </div>

        {/* Right Section - Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-900">Contact Way</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              <p className="text-gray-600">Tel: +1 (204) 333-4556</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
              <p className="text-gray-600">
                E-Mail: crafted.fusion.official@gmail.com
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
              <p className="text-gray-600">Sioux Lookout, Ontario, Canada</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              <p className="text-gray-600">
                Free standard shipping <br /> on all orders.
              </p>
            </div>
            {/* Image Section */}
            <div className="flex justify-center items-center mt-16">
              <Image
                src="/contact.png"
                alt="Contact Us Illustration"
                height={692}
                width={723}
                className="w-full max-w-md rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
