import React, { useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";

const Createticket = () => {
  const { activeMenu } = useStateContext();
  const fileRef = useRef();
  const imageRef = useRef();
  const [preview, setPreview] = useState(null);  

  const handleSubmit = (ev) => {
    ev.preventDefault();
    alert("TODO: submit create ticket");
  };

  const handleUploadfile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileChange = (ev) => {
    const file = ev.target.files[0];  
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
       
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`mx-5 md:mx-5 lg:mx-5 transition-all duration-300 ${activeMenu ? "lg:pl-75" : "lg:pl-25"}`}
    >
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Create Ticket</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-1">Create Quick Ticket</h2>
          <p className="text-gray-400 mb-4">Write and address new queries and issues</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  placeholder="Type Email"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium text-gray-600">Categories</label>
                <select className="w-full border border-gray-300 p-2 rounded-md focus:outline-none">
                  <option>Choose Type</option>
                  <option>Technical</option>
                  <option>Billing</option>
                  <option>Account</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold">Ticket Body</label>
              <textarea
                placeholder="Type ticket issue here.."
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none"
                rows={5}
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Upload Photo</label>
              <div
                onClick={handleUploadfile}
                className="border border-dashed border-gray-300 p-10 flex flex-col items-center justify-center rounded-md cursor-pointer hover:bg-gray-50 transition"
              >
                <input
                  onChange={handleFileChange}
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />

                {/* Display Image Preview */}
                {preview ? (
                  <img ref={imageRef} alt="Preview" src={preview} className="max-w-xs max-h-60 object-contain mb-2" />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                      />
                    </svg>
                    <p className="text-gray-400">Upload an image</p>
                  </>
                )}
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Send Ticket
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Createticket;
