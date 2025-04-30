import React from "react";
import AboutImage from "../assets/QtechAbout.jpg";
import VisionImage from "../assets/Vision.jpg";
import MissionImage from "../assets/Mission.jpg";
import QtechLogo from "../assets/qtechlogo.png";

const About = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* About Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Left text section */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">About Us</h1>
            <p className="text-gray-700 mb-4">
              <strong>We are Qtech —</strong> an ICT company for those who don't have an ICT
              department. This website is where you can submit tickets so we can help solve your
              ICT-related concerns, questions, and issues.
            </p>
            <p className="italic text-gray-600">
              Qtech Business Solutions, Inc. (formerly Qtech BPO) is a software development company
              and electronic security hardware integrator based in the Philippines. Qtech’s services
              are offered globally on a project or strategic-staffing basis in both custom and
              off-the-shelf package environments across all technology platforms, operating systems,
              and infrastructures. We also offer system integration and consultancy with superior
              value-priced services and reliable delivery for both private and government sector
              clients.
            </p>
          </div>

          {/* Right image section */}
          <div className="md:w-1/2">
            <img
              src={AboutImage}
              alt="Qtech"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Vision */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <img src={VisionImage} alt="Vision" className="w-full rounded-lg shadow-md" />
            <div>
              <h2 className="text-4xl font-bold text-blue-600 mb-4">Vision</h2>
              <p className="text-2xl text-gray-900 leading-relaxed">
                Become the prime IT Solutions Provider in the country and enable our business
                clientele achieve their objectives through automation.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-4xl font-bold text-blue-600 mb-4">Mission</h2>
              <p className="text-2xl text-gray-900 leading-relaxed">
                Solve the most challenging technology problems to ensure the success of our business
                clienteles.<br />
                We stick to the following principles in delivering our mission:
              </p>
            </div>
            <img src={MissionImage} alt="Mission" className="w-full rounded-lg shadow-md" />
          </div>
        </div>
      </div>

    {/* Core Principles */}
    <div className="py-12 px-4 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">Our Core Principles</h2>
      <p className="text-gray-800 text-lg md:text-xl mb-12">
        We stick to the following principles in delivering our mission
      </p>

      {/* Top row: 3 cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* 1. Understand our customer */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md text-left">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-blue-600 text-2xl">
              {/* First icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
                <path fill="currentColor" fillRule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7m-1.5 8a4 4 0 0 0-4 4a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2a4 4 0 0 0-4-4zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293a3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2a4 4 0 0 0-4-4h-1.1a5.5 5.5 0 0 1-.471.762A6 6 0 0 1 19.5 18M4 7.5a3.5 3.5 0 0 1 5.477-2.889a5.5 5.5 0 0 0-2.796 6.293A3.5 3.5 0 0 1 4 7.5M7.1 12H6a4 4 0 0 0-4 4a2 2 0 0 0 2 2h.5a6 6 0 0 1 3.071-5.238A5.5 5.5 0 0 1 7.1 12" clipRule="evenodd"/>
              </svg>
            </span>
            <h3 className="text-lg font-bold">Understand our customer</h3>
          </div>
          <p className="text-gray-700 text-sm">
            We at Qtech understand the needs and requirements of our customers and make
            technology resolve what they need and help them realize their full business potential.
          </p>
        </div>

        {/* 2. Know-how to develop software */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md text-left">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-blue-600 text-xl font-mono border border-blue-600 px-2 rounded">
              &lt;&gt;
            </span>
            <h3 className="text-lg font-bold">Know-how to develop software</h3>
          </div>
          <p className="text-gray-700 text-sm">
            Qtech knows how to use appropriate technology based on customer requirements and
            capability.
          </p>
        </div>

        {/* 3. Employ advantages of outsourcing */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md text-left">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-blue-600 text-2xl">
              {/* Third icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width={35} height={32} viewBox="0 0 27 24">
                <path fill="currentColor" d="M18.494 17.679a.91.91 0 0 1 0-1.82h3.92a2.646 2.646 0 1 0-1.711-4.665l.004-.003a.911.911 0 0 1-1.178-1.389l.001-.001a4.44 4.44 0 0 1 2.095-.986l.027-.004A7.034 7.034 0 0 0 8.797 4.908l-.016.025a6.5 6.5 0 0 1 1.9 1.06l-.013-.01a.911.911 0 0 1-.562 1.626a.9.9 0 0 1-.576-.206l.002.001a4.67 4.67 0 0 0-2.947-1.04h-.014h.001a4.746 4.746 0 0 0 0 9.492h2.093a.91.91 0 0 1 0 1.82H6.569a6.567 6.567 0 1 1 0-13.134c.102 0 .202.008.305.013C8.417 1.818 11.305 0 14.617 0a8.86 8.86 0 0 1 8.859 8.858v.018c1.968.494 3.403 2.247 3.403 4.336a4.465 4.465 0 0 1-4.464 4.464zm-5.966-.91v-4.187l-1.029 1.03a.91.91 0 1 1-1.287-1.288l2.583-2.584a1 1 0 0 1 .19-.142l.005-.002q.025-.015.051-.026a1 1 0 0 1 .206-.079l.006-.001h.01a1 1 0 0 1 .235-.011h-.003h.01q.026 0 .05.006h-.001q.128.015.238.061l-.006-.002a1 1 0 0 1 .142.076l-.003-.002l.038.026a1 1 0 0 1 .098.08l.022.018l2.585 2.584a.91.91 0 1 1-1.287 1.288l-1.03-1.03v4.19a.91.91 0 0 1-1.82 0z"/>
              </svg>
            </span>
            <h3 className="text-lg font-bold">Employ advantages of outsourcing</h3>
          </div>
          <p className="text-gray-700 text-sm">
            Many companies have already embraced outsourcing. We ensure that our customers fully
            benefit from it in their businesses.
          </p>
        </div>
      </div>

      {/* Bottom row: 2 cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* 4. Excellent people only */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md text-left">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-blue-600 text-2xl">
              {/* Fourth icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 4a4 4 0 1 1 0 8a4 4 0 0 1 0-8m0 16s8 0 8-2c0-2.4-3.9-5-8-5s-8 2.6-8 5c0 2 8 2 8 2"/>
              </svg>
            </span>
            <h3 className="text-lg font-bold">Excellent people only</h3>
          </div>
          <p className="text-gray-700 text-sm">
            Qtech is a community of talented, bright professionals who are easy to work with. We
            pride ourselves on fostering a collaborative and supportive environment.
          </p>
        </div>

        {/* 5. Act globally */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md text-left">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-blue-600 text-2xl">
              {/* Fifth icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width={32} height={24} viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 1 0 0-18m0 18a9 9 0 1 1 0-18m0 18c2.761 0 3.941-5.163 3.941-9S14.761 3 12 3m0 18c-2.761 0-3.941-5.163-3.941-9S9.239 3 12 3M3.5 9h17m-17 6h17"/>
              </svg>
            </span>
            <h3 className="text-lg font-bold">Act globally</h3>
          </div>
          <p className="text-gray-700 text-sm">
            Our international experience and affiliations allow Qtech to compete with the top IT
            solutions companies. This global perspective helps us deliver cutting-edge solutions
            to our clients.
          </p>
        </div>
      </div>
    </div>

      {/* Footer */}
      <footer className="bg-[#0C0C24] text-white p-8 pl-35 grid md:grid-cols-3 gap-8">

      <div>
        <img src={QtechLogo} alt="Qtech Logo" className="h-24 mb-2" />
        <p>Follow us on :</p>
        <div className="flex gap-2 mt-2">
          <a href="https://www.facebook.com/qtechbsi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" className="text-white hover:text-blue-500 transition">
              <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"/>
            </svg>
            <span>Facebook</span>
          </a>
          <a href="https://www.instagram.com/qtechbsi?igsh=bDlwbWUyN2pldW40" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" className="text-white hover:text-pink-500 transition">
              <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/>
            </svg>
            <span>Instagram</span>
          </a>
        </div>
      </div>
        
        <div>
          <h4 className="font-bold mb-2">Service Offered</h4>
          <ul className="text-sm space-y-1">
            <li>Software Development Outsourcing</li>
            <li>Website Development and Hosting</li>
            <li>ICT Hardware Infrastructure Set up and Maintenance</li>
            <li>Systems Development and Database Administration</li>
            <li>Systems Integration</li>
            <li>ICT Human Resource Outsourcing Enterprise Application Integration</li>
            <li>ICT Training</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Office Address</h4>
          <p>Birch St. LM, Tayabas City - Quezon</p>
          <p>P: (042) 731 7482</p>
          <p>M: 09175063284 | 09228423284</p>
          <p>M: wecare@qtechbsi.com</p>
        </div>
      </footer>

      <div className="text-center text-xs py-2 bg-[#0C0C24] text-gray-400">
        © All Copyrights reserved
      </div>
    </div>
  );
};

export default About;
