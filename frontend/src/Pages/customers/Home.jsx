import { Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";
import { FaSearch, FaPhoneAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import QtechLogo from "../../assets/qtechlogo.png";
import BackgroundBottom from "../../assets/background.jpg";
import BackgroundTop from "../../assets/background10.jpg";
import Image from "../../assets/img.png";
import Time from "../../assets/time.png";
import Support from "../../assets/247.png";
import Efficiency from "../../assets/efficiency.png";
import HKR from "../../assets/hkr.png";
import HPSC from "../../assets/hpsc.jpg";
import IME from "../../assets/ime.png";
import Novo from "../../assets/novo.png";
import Paotsin from "../../assets/paotsin.png";
import Unilever from "../../assets/unilever.png";
import Bigmak from "../../assets/bigmak.png";
import { motion } from "framer-motion";

const Home = () => {
  const { user,login,token } = useStateContext();

  if (!login && !user?.id) {
      return <Navigate to="/" />;
    }

  return (
    <div className={`transition-all duration-300 bg-gray-100 `}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div
          className="bg-blue-900 text-white px-15 lg:px-35 py-30 lg:py-40 mb-8 flex flex-col lg:flex-row 
        items-center justify-between shadow-md bg-contain bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(8, 3, 43, .7), rgba(30, 15, 80, 1)), url(${BackgroundTop})`,
            backgroundBlendMode: "multiply",
          }}
        >
          <div className="flex flex-col items-center mx-auto mt-5">
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center mx-auto">
                <h1 className="text-2xl lg:text-5xl font-bold text-center lg:text-left">
                  Welcome <span className="text-blue-500">{user?.name}!</span>
                </h1>
                <p className="mt-8 text-lg lg:text-xl text-center lg:text-left">
                  Your concerns matter: Ask questions, and we'll handle the
                  rest!
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between gap-9 mt-10">
                <Link
                  to="/customer/create-ticket"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <button className="bg-blue-500 hover:scale-105 text-white text-lg py-3 px-5 rounded-sm flex items-center justify-center cursor-pointer group transition-all duration-400">
                    Create Ticket
                    <FaArrowRight className="ml-2 transform -rotate-45 transition duration-400 group-hover:rotate-0" />
                  </button>
                </Link>
                <Link
                  to="/contact-us"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <button className="bg-white hover:scale-105 text-gray-800 text-lg py-3 px-5 rounded-sm flex items-center justify-center cursor-pointer group transition-all duration-400">
                    Contact Us
                    <FaArrowRight className="ml-2 transform -rotate-45 transition duration-400 group-hover:rotate-0" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        <div className="py-12 max-w-7xl mx-auto text-center cursor-pointer">
          <div className="flex flex-col items-center mb-0 lg:mb-10">
            <div className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 ">
              Why Choose Us?
            </div>
            <div>
              <p className="text-md lg:text-xl text-center text-gray-600 lg:text-left">
                Experience support that actually supports you
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 p-12 lg:p-2 gap-6">
            <div className="bg-white px-15 py-10  rounded-lg shadow-md text-left transform transition-all duration-200 hover:scale-103">
              <div className="flex flex-col items-center text-[#1D4ED8]">
                <div className="text-2xl mb-5">
                  <img
                    src={Time}
                    alt="Real-time-vector"
                    className="h-17 lg:h-25 cursor-pointer"
                  />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[#1D4ED8] mb-5">
                  Real-Time Updates
                </h3>
              </div>

              <p className="text-gray-700 text-sm lg:text-md text-center max-w-md mx-auto lg:text-justify">
                Stay informed with instant notifications on ticket status,
                replies, and escalations to ensure no issue goes unnoticed or
                unresolved.
              </p>
            </div>

            <div className="bg-white px-15 py-10 rounded-lg shadow-md text-left transform transition-all duration-200 hover:scale-103">
              <div className="flex flex-col items-center text-blue-600">
                <div className="text-2xl mb-5">
                  <img
                    src={Efficiency}
                    alt="Efficiency-vector"
                    className="h-17 lg:h-25 cursor-pointer"
                  />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[#1D4ED8] mb-5">
                  Efficient Ticket Management
                </h3>
              </div>

              <p className="text-gray-700 text-sm lg:text-md text-center max-w-md mx-auto lg:text-justify">
                Organize, prioritize, and assign tickets with customizable
                workflows and automation rules to boost team productivity and
                reduce response time.
              </p>
            </div>

            <div className="bg-white px-15 py-10 rounded-lg shadow-md text-left transform transition-all duration-200 hover:scale-103">
              <div className="flex flex-col items-center text-blue-600">
                <div className="text-2xl mb-5">
                  <img
                    src={Support}
                    alt="24/7-vector"
                    className="h-17 lg:h-25 cursor-pointer"
                  />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[#1D4ED8] mb-5">
                  24/7 Customer Support
                </h3>
              </div>

              <p className="text-gray-700 text-sm lg:text-md text-center max-w-md mx-auto lg:text-justify">
                Our dedicated support team is available around the clock to
                assist you with any issues or questions, ensuring your ticketing
                system runs smoothly.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="text-[#08032B] max-w-8xl mx-auto px-15 lg:px-32">
        <div className="flex justify-between items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col space-y-2 mx-auto mt-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-center lg:text-left">
                Need <span className="text-blue-600">Support?</span>
              </h1>
              <p className="mt-3 text-md lg:text-lg text-center lg:text-left">
                We're here to help you resolve issues and answer your questions
                — anytime.
              </p>
              <div className="flex flex-col"></div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="hidden lg:block px-0 lg:px-4">
              <img src={Image} alt="backrground" className="h-130" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        <div className="py-12 max-w-7xl mx-auto text-center cursor-pointer">
          <div className="flex flex-col items-center  text-3xl lg:text-4xl  font-bold text-gray-900 mb-0 lg:mb-10">
            Client's Testimonials
          </div>

          <div className="grid lg:grid-cols-3 p-12 lg:p-2 gap-6">
            <div className="bg-gray-50 px-12 py-10 rounded-lg shadow-md text-left ">
              <p className="text-gray-600 text-xl lg:text-xl text-justify max-w-md mx-auto lg:text-justify">
                “We have tried other HRIS providers before, but Qtech’s systems
                is the only one that fits our construction company well. It
                addresses our unique requirements having multiple types of
                payments and with multiple locavtions. Now, we are excited to
                implement their full ERP solution."
              </p>
              <div className="flex justify-center items-center gap-6 mt-7">
                <div>
                  <img
                    src={HPSC}
                    alt="hpsc-logo"
                    className="h-10 lg:h-14 cursor-pointer"
                  />
                </div>
                <div>
                  <h3 className="flex items-center text-lg lg:text-xl font-semibold text-black">
                    Claudio Pornela.
                  </h3>
                  <h3 className="flex items-center text-lg lg:text-lg font-normal text-gray-600">
                    Hefty Power Systems Corporation
                  </h3>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-12 py-10 rounded-lg shadow-md text-left ">
              <p className="text-gray-600 text-xl lg:text-xl text-justify max-w-md mx-auto lg:text-justify">
                “Fast and Friendly Assistance All you guys are awesome! Thanks
                for always helping me. Always very nice and friendly. It was
                great and handled very fast. They worked around my conference
                call and fixed the issue right away."
              </p>
              <div className="flex justify-center items-center gap-6 mt-15">
                <div>
                  <img
                    src={HKR}
                    alt="hkr-logo"
                    className="h-10 lg:h-13 cursor-pointer"
                  />
                </div>
                <div>
                  <h3 className="flex items-center text-lg lg:text-xl font-semibold text-black">
                    Rosemarie Famorca
                  </h3>
                  <h3 className="flex items-center text-lg lg:text-lg font-normal text-gray-600">
                    Philippine HKR Inc.
                  </h3>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-12 py-10 rounded-lg shadow-md text-left ">
              <p className="text-gray-600 text-xl lg:text-xl text-justify max-w-md mx-auto lg:text-justify">
                “QTECH is our partner for IT solutions for over 10 years now.
                Thank you for the wonderful job in helping us develop our
                programs. They are so great and quick to respond to anything we
                ask. Thank you guys you are the best! Highly recommended!"
              </p>
              <div className="flex justify-center items-center gap-6 mt-10">
                <div>
                  <img
                    src={IME}
                    alt="ime-logo"
                    className="h-10 lg:h-13 cursor-pointer"
                  />
                </div>
                <div>
                  <h3 className="flex items-center text-lg lg:text-xl font-semibold text-black">
                    Ederlyn Ocfemia
                  </h3>
                  <h3 className="flex items-center text-lg lg:text-lg font-normal text-gray-600">
                    Ichinomiya Electronics Phils. Corp.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        <div className="py-10 px-10 lg:px-5 mb-5">
          <h2 className="text-2xl font-medium text-gray-600 text-center mb-8 uppercase">
            <span className="text-blue-500">Notable </span>Clients
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 items-center justify-center max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <img
                src={Unilever}
                alt="unilever-logo"
                className="h-8 lg:h-12 cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src={Novo}
                alt="novo-logo"
                className="h-5 lg:h-9 cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src={Paotsin}
                alt="paotsin-logo"
                className="h-6 lg:h-10 cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src={Bigmak}
                alt="hkr-logo"
                className="h-10 lg:h-15 cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src={HKR}
                alt="hkr-logo"
                className="h-15 lg:h-22 cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src={IME}
                alt="ime-logo"
                className="h-12 lg:h-18 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        <div className="px-10 lg:px-2">
          <div
            className=" max-w-7xl mx-auto text-white px-15 lg:px-3 py-10 lg:py-10 mb-14 
      flex flex-col rounded-lg lg:flex-row items-center justify-between shadow-md bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.7)), url(${BackgroundBottom})`,
              backgroundBlendMode: "multiply",
            }}
          >
            <div className="flex flex-col text-center space-y-2 mx-auto mt-2">
              <h1 className="text-2xl lg:text-4xl font-bold">
                We simply position ourselves
              </h1>
              <p className="mt-5 text-md lg:text-lg text-center mx-auto">
                as an ICT company for those who have no ICT department.
              </p>
              <div className="flex justify-center items-center mx-auto gap-5">
                <Link to="/contact-us">
                  <button
                    className="mt-10 text-gray-950 bg-white hover:bg-gray-200 text-lg py-2 md:py-3 px-3 md:px-5 rounded-md flex 
              items-center justify-center w-full md:w-auto cursor-pointer"
                  >
                    <FaPhoneAlt className="mr-3" />
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <footer className="bg-[#08032B] text-white p-8 pl-35 grid md:grid-cols-3 gap-8">
          <div>
            <img
              src={QtechLogo}
              alt="Qtech Logo"
              className=" h-15 lg:h-24 mb-2"
            />
            <p>Follow us on :</p>
            <div className="flex gap-2 mt-2">
              <a
                href="https://www.facebook.com/qtechbsi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  className=" hover:text-blue-500 transition"
                >
                  <path
                    fill="currentColor"
                    d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                  />
                </svg>
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/qtechbsi?igsh=bDlwbWUyN2pldW40"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  className=" hover:text-pink-500 transition"
                >
                  <path
                    fill="currentColor"
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                  />
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
              <li>
                ICT Human Resource Outsourcing Enterprise Application
                Integration
              </li>
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
        <div className="text-center text-xs py-4 bg-[#08032B] text-gray-300">
          © All Copyrights reserved
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
