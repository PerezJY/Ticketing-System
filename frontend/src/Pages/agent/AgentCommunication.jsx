import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";

function EditModal({ isOpen, onClose, ticket, onSave }) {
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [priority, setPriority] = useState(ticket.priority);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#08032B] bg-opacity-40 px-2">

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Edit Ticket</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave({ title, description, priority });
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={priority}
              onChange={e => setPriority(e.target.value)}
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ResolveModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(8,3,43,0.8)] px-2">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-sm relative">
        <h2 className="text-xl font-semibold mb-4">Resolve Ticket</h2>
        <p>Are you sure you want to mark this ticket as resolved?</p>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={onConfirm}
          >
            Yes, Resolve
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewModal({ isOpen, file, onClose }) {
  if (!isOpen || !file) return null;
  const isPDF = file.url.endsWith('.pdf');
  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file.url);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-2">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-2xl relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl" onClick={onClose}>&times;</button>
        <h2 className="text-lg font-semibold mb-4">Preview: {file.name}</h2>
        <div className="min-h-[300px] flex items-center justify-center">
          {isPDF ? (
            <iframe src={file.url} title={file.name} className="w-full h-[60vh] border rounded" />
          ) : isImage ? (
            <img src={file.url} alt={file.name} className="max-h-[60vh] max-w-full rounded" />
          ) : (
            <div className="text-gray-500">Preview not available. <a href={file.url} download className="text-blue-600 underline ml-2">Download</a></div>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <a
            href={file.url}
            download
            className="px-4 py-2 bg-blue-600 text-white rounded"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Communication() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isResolveOpen, setIsResolveOpen] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [ticket, setTicket] = useState({
    title: "Employee attendance not syncing with payroll calculations",
    description:
      "The automated sync between the attendance system and payroll module has failed for the period of Jan 15–31, 2025. This is affecting 23 employees in the Operations department.",
    priority: "High",
    status: "Open",
  });

  const handleSave = (updated) => {
    setTicket({ ...ticket, ...updated });
    setIsEditOpen(false);
  };

  const handleResolve = () => {
    setTicket({ ...ticket, status: "Resolved" });
    setResolved(true);
    setIsResolveOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
      {/* Main Content */}
      <main className="flex-1 p-2 sm:p-4 md:p-8 flex items-center justify-center lg:ml-64 w-full">
        {/* Ticket Card */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center w-full max-w-5xl">
          {/* Main Ticket Info */}
          <div className="flex-1 min-w-[280px] md:min-w-[400px]">
            <div className="bg-white rounded-lg shadow p-4 sm:p-8 mb-6 relative">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                  Ticket #4829
                  <span className={`text-xs px-2 py-1 rounded ml-2 ${ticket.status === "Resolved" ? "bg-blue-200 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                    {ticket.status}
                  </span>
                </h1>
                <div className="space-x-2 flex flex-row">
                  <button
                    className="bg-gray-200 px-4 py-2 rounded flex items-center gap-2 text-sm disabled:opacity-50"
                    onClick={() => setIsEditOpen(true)}
                    disabled={resolved}
                  >
                     Edit
                  </button>
                  <button
                    onClick={() => setIsResolveOpen(true)}
                    className="bg-[#08032B] text-white px-4 py-2 rounded flex items-center gap-2 text-sm disabled:opacity-50"
                    disabled={resolved}
                  >
                     Resolve
                  </button>
                </div>
              </div>
              {/* Ticket Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-1">
                  {ticket.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {ticket.description}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  Created: Jan 16, 2025 · <span className={`font-semibold ${ticket.priority === "High" ? "text-red-600" : ticket.priority === "Medium" ? "text-yellow-600" : "text-green-600"}`}>Priority: {ticket.priority}</span>
                </div>
              </div>
              {/* Attachments */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Attachments</h3>
                <ul className="space-y-2">
                  {[
                    { name: "Attendance_Report_Jan2025.xlsx", url: "/files/Attendance_Report_Jan2025.xlsx" },
                    { name: "Payroll_Summary_Jan2025.pdf", url: "/files/Payroll_Summary_Jan2025.pdf" },
                    { name: "Project_Plan.docx", url: "/files/Project_Plan.docx" },
                    { name: "Company_Logo.png", url: "/files/Company_Logo.png" },
                  ].map((file, i) => (
                    <li key={i} className="flex items-center justify-between p-2 border rounded gap-2">
                      <span>{file.name}</span>
                      <div className="flex gap-2">
                        <button
                          className="cursor-pointer text-lg text-blue-600 hover:text-blue-800"
                          title={`Preview ${file.name}`}
                          onClick={() => setPreviewFile(file)}
                        >
                          <span role="img" aria-label="preview">👁️</span>
                        </button>
                        <a
                          href={file.url}
                          download
                          className="cursor-pointer text-lg"
                          title={`Download ${file.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span role="img" aria-label="download">⬇️</span>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Timeline */}
              <div>
                <h3 className="font-medium mb-2">Timeline</h3>
                <div className="relative pl-6 space-y-8">
                  {/* Timeline Dot and Line */}
                  <div className="absolute top-2 left-2 w-1 h-full bg-gray-200" style={{ zIndex: 0 }}></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-blue-500 rounded-full block"></span>
                      <p className="font-semibold">Issue Reported</p>
                    </div>
                    <p className="text-gray-600 ml-5">Jan 16, 2025 – 09:15 AM</p>
                    <p className="text-gray-500 ml-5">Initial ticket created by HR department</p>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-blue-500 rounded-full block"></span>
                      <p className="font-semibold">Technical Review</p>
                    </div>
                    <p className="text-gray-600 ml-5">Jan 16, 2025 – 10:30 AM</p>
                    <p className="text-gray-500 ml-5">IT team investigating sync failure between systems</p>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-blue-500 rounded-full block"></span>
                      <p className="font-semibold">Status Update</p>
                    </div>
                    <p className="text-gray-600 ml-5">Jan 16, 2025 – 02:45 PM</p>
                    <p className="text-gray-500 ml-5">API connection issue identified, working on fix</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Assigned To Card */}
          <div className="w-full lg:w-80 flex-shrink-0 min-w-[250px]">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <h3 className="font-medium mb-4">Assigned To</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
                  <span role="img" aria-label="avatar">👨‍💻</span>
                </div>
                <div>
                  <p className="font-semibold">Alex Thompson</p>
                  <p className="text-sm text-gray-600">IT Support Specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        ticket={ticket}
        onSave={handleSave}
      />
      <ResolveModal
        isOpen={isResolveOpen}
        onClose={() => setIsResolveOpen(false)}
        onConfirm={handleResolve}
      />
      <PreviewModal
        isOpen={!!previewFile}
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  );
}
