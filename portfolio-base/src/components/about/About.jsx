import React from 'react'
import axios from 'axios';

export default function About() {
  const skills = [
    "JavaScript", "React", "Node.js", "Python", "HTML/CSS", 
    "MongoDB", "PostgreSQL", "Git", "Docker", "AWS"
  ]

  const imageUrl = import.meta.env.VITE_IMAGE_URL;
  const QRCodeUrl = imageUrl + "/uploads/qr_only_clean.jpg";
  const baseUrl = import.meta.env.VITE_API_URL;

  async function sendMessage(data) {
    const apiBaseUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.post(`${baseUrl}/contact`, data, {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fullName: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };
    let result = await sendMessage(data);

      if (result.ok) {
        alert(result.message);
        e.target.reset();
      } else {
        alert(result.message);
        e.target.reset();
      }
  };

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Contact
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image and basic info */}
            <div className="flex justify-center lg:justify-start">
              <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 flex items-center justify-center h-full w-full min-h-[400px]">
                <img 
                  src={QRCodeUrl} 
                  alt="Zalo QR Code" 
                  className="object-contain h-full w-full"
                  style={{ maxHeight: "320px", maxWidth: "320px" }}
                />
              </div>
            </div>

            {/* Right side - Description and skills */}
            <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Liên hệ với tôi</h3>
              <p className="mb-6 text-gray-600">Bạn có câu hỏi hoặc muốn hợp tác? Hãy gửi tin nhắn cho tôi!</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Nhập email của bạn"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="message">
                    Tin nhắn
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Nội dung tin nhắn..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
                >
                  Gửi tin nhắn
                </button>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
