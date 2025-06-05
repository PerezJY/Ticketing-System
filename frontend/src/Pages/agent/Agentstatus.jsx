import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import {attachment} from ticket.image_path;

function UpdateStatusModal({ isOpen, onClose, ticket, onSave }) {
  const [priority, setPriority] = useState(ticket.priority);
  const [status, setStatus] = useState(ticket.status);

  useEffect(() => {
    if (isOpen && ticket) {
      setPriority(ticket.priority);
      setStatus(ticket.status);
    }
  }, [isOpen, ticket]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 px-2">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Update Ticket Status</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ priority, status });
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
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
  const isPDF = file.url.endsWith(".pdf");
  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file.url);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-2">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-2xl relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">Preview: {file.name}</h2>
        <div className="min-h-[300px] flex items-center justify-center">
          {isPDF ? (
            <iframe
              src={file.url}
              title={file.name}
              className="w-full h-[60vh] border rounded"
            />
          ) : isImage ? (
            <img
              src={file.url}
              alt={file.name}
              className="max-h-[60vh] max-w-full rounded"
            />
          ) : (
            <div className="text-gray-500">Preview not available.</div>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Agentstatus() {
  const { token } = useStateContext();
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isResolveOpen, setIsResolveOpen] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/ticket/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch ticket");
        setTicket(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, token]);
 
  const handleSave = (updated) => {
    setTicket((prev) => ({ ...prev, ...updated }));
    setIsEditOpen(false);
  };

  const handleResolve = () => {
    setTicket((prev) => ({ ...prev, status: "Resolved" }));
    setResolved(true);
    setIsResolveOpen(false);
  };

  if (loading) return <div className="p-8 text-center">Loading ticket...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!ticket) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 p-2 sm:p-4 md:p-8 flex items-center justify-center lg:ml-64 w-full">
        <div className="flex flex-col lg:flex-row gap-6 justify-center w-full max-w-5xl">
          <div className="flex-1 min-w-[280px] md:min-w-[400px]">
            <div className="bg-white rounded-lg shadow p-4 sm:p-8 mb-6 relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                  Ticket #{ticket.id}
      <span
                    className={`text-xs px-2 py-1 rounded ml-2 ${
                      ticket.category
                    }`}
                  ></span>
                   <span
                    
                  >{ticket.ticket_body}</span>                   
                  <span
                    className={`text-xs px-2 py-1 rounded ml-2 ${
                      ticket.status === "Resolved"
                        ? "bg-blue-200 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </h1>
                <div className="space-x-2 flex flex-row items-center">
                  <select
                    className="bg-gray-200 px-4 py-2 rounded text-sm"
                    value={ticket.status}
                    onChange={(e) =>
                      setTicket({ ...ticket, status: e.target.value })
                    }
                    disabled={resolved}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <button
                    onClick={() => setIsResolveOpen(true)}
                    className="bg-[#08032B] text-white px-4 py-2 rounded flex items-center gap-2 text-sm disabled:opacity-50"
                    disabled={resolved}
                  >
                    Resolve
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-1">{ticket.title}</h2>
                <p className="text-sm text-gray-600 ">{ticket.description}</p>
                <div className="text-xs text-gray-500 mt-2">
                  Created: {ticket.created_at}
                  <span
                    className={`font-semibold ps-3 ${
                      ticket.priority === "High"
                        ? "text-red-600"
                        : ticket.priority === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    Priority: {ticket.priority}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Attachments</h3>
                <ul className="space-y-2">
                  {[
                   
                    {
                      name: ticket.image_path,
                      url: ticket.image_path,
                    },
                  ].map((file, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between p-2 border rounded gap-2"
                    >
                      <span>{file.name}</span>
                      <div className="flex gap-2">
                        <button
                          className="cursor-pointer text-lg text-blue-600 hover:text-blue-800"
                          title={`Preview ${file.name}`}
                          onClick={() => setPreviewFile(file)}
                        >
                          <span role="img" aria-label="preview">
                            👁️
                          </span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Timeline</h3>
                <div className="relative pl-6 space-y-8">
                  <div className="absolute top-2 left-2 w-1 h-full bg-gray-200"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-blue-500 rounded-full block"></span>
                      <p className="font-semibold">Issue Reported</p>
                    </div>
                    <p className="text-gray-600 ml-5">Jan 16, 2025 – 09:15 AM</p>
                    <p className="text-gray-500 ml-5">
                      Initial ticket created by HR department
                    </p>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-blue-500 rounded-full block"></span>
                      <p className="font-semibold">Technical Review</p>
                    </div>
                    <p className="text-gray-600 ml-5">Jan 16, 2025 – 10:30 AM</p>
                    <p className="text-gray-500 ml-5">
                      IT team investigating sync failure between systems
                    </p>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-blue-500 rounded-full block"></span>
                      <p className="font-semibold">Status Update</p>
                    </div>
                    <p className="text-gray-600 ml-5">Jan 16, 2025 – 02:45 PM</p>
                    <p className="text-gray-500 ml-5">
                      API connection issue identified, working on fix
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80 flex-shrink-0 min-w-[250px]">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <h3 className="font-medium mb-4">Assigned To</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
                  <span role="img" aria-label="avatar">
                    👨‍💻
                  </span>
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

      <UpdateStatusModal
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
