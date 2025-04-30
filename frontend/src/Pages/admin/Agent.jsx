import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { GoPlus } from "react-icons/go";

import { useStateContext } from "../../contexts/ContextProvider";

export const Agent = () => {
  const { activeMenu, user, login, token } = useStateContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [allAgents, setAllAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  if (!login && !user) return <Navigate to="/" />;

  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await fetch("http://localhost:8000/api/agents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch agents");
        const data = await res.json();
        if (data && Array.isArray(data.agents)) {
          setAllAgents(data.agents);
        } else {
          console.error("Unexpected response shape:", data);
          setAllAgents([]);
        }
      } catch (err) {
        console.error(err);
        setAllAgents([]);
      }
    }
    fetchAgents();
  }, [token]);

  const onSubmit = async (formData) => {
    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          role: "agent",
          password_confirmation: formData.confirmPassword,
        }),
      });
      const payload = await res.json();

      if (!res.ok) {
        if (payload.errors) {
          Object.entries(payload.errors).forEach(([field, msgs]) =>
            setError(field, { type: "server", message: msgs.join(" ") })
          );
        }
        throw new Error("Validation failed");
      }

      const newAgent = payload.agent || payload.user || payload;
      setAllAgents(prev => [...prev, newAgent]);
      reset();
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Error registering agent:", err);
    }
  };

  const filteredData = allAgents.filter((a) =>
    [a.name, a.email, a.category]
      .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // --- 🛠 Functions for edit and delete ---
  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
    setIsActionModalOpen(true);
  };

  const handleDeleteAgent = async () => {
    if (!selectedAgent) return;

    try {
      const res = await fetch(`http://localhost:8000/api/agents/${selectedAgent.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete agent");

      setAllAgents(prev => prev.filter(a => a.id !== selectedAgent.id));
      setIsActionModalOpen(false);
      setSelectedAgent(null);
    } catch (err) {
      console.error("Error deleting agent:", err);
    }
  };

  const handleEditAgent = () => {
    if (!selectedAgent) return;
    setValue("name", selectedAgent.name);
    setValue("email", selectedAgent.email);
    setValue("category", selectedAgent.category);
    setIsActionModalOpen(false);
    setIsEditModalOpen(true);
  };

  const submitEdit = async (formData) => {
    if (!selectedAgent) return;

    try {
      const res = await fetch(`http://localhost:8000/api/agents/${selectedAgent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (!res.ok) throw new Error("Failed to edit agent");

      const updatedAgent = await res.json();

      setAllAgents(prev => prev.map(agent => agent.id === selectedAgent.id ? updatedAgent : agent));
      setIsEditModalOpen(false);
      setSelectedAgent(null);
      reset();
    } catch (err) {
      console.error("Error updating agent:", err);
    }
  };

  return (
    <div className={`mx-5 lg:mx-5 transition-all ${activeMenu ? "lg:pl-75" : "lg:pl-25"}`}>
      <h1 className="text-3xl font-bold text-blue-700 mb-1">Agent</h1>
      <p className="text-sm text-gray-500">Manage agent account</p>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <GoPlus className="mr-2" /> Add Agent
        </button>

        <div className="relative w-64">
          <MdOutlineSearch className="absolute top-2 left-2 text-gray-400" />
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-2 py-2 border rounded text-sm"
            placeholder="Search…"
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-100 text-gray-600 text-sm font-semibold p-3">
          <div>Name</div>
          <div>Email</div>
          <div>Category</div>
        </div>

        {filteredData.length > 0 ? (
          filteredData.map((agent, i) => (
            <div
              key={i}
              className="grid grid-cols-4 text-gray-700 text-sm p-3 hover:bg-blue-50 cursor-pointer"
              onClick={() => handleAgentClick(agent)}
            >
              <div>{agent.name}</div>
              <div>{agent.email}</div>
              <div>{agent.category}</div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">No agents found</div>
        )}
      </div>

      {/* Add Agent Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Agent</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Form fields */}
              <input {...register("name", { required: "Name required" })} className="w-full border p-2 rounded" placeholder="Full Name" />
              <input {...register("email", { required: "Email required" })} className="w-full border p-2 rounded" placeholder="Email" />
              <select {...register("category", { required: "Category required" })} className="w-full border p-2 rounded" defaultValue="">
                <option value="" disabled>Choose Type</option>
                <option>QTech Inventory Support System</option>
                <option>QTech Utility Billing System</option>
                <option>Philippine HR, Payroll and Time Keeping System</option>
                <option>POS for Retail and F&B</option>
                <option>QSA (Quick and Single Accounting)</option>
              </select>
              <input {...register("password", { required: "Password required" })} type="password" className="w-full border p-2 rounded" placeholder="Password" />
              <input {...register("confirmPassword", { required: "Confirm your password" })} type="password" className="w-full border p-2 rounded" placeholder="Confirm Password" />

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => { reset(); setIsAddModalOpen(false); }} className="px-4 py-2 bg-gray-200 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Agent Modal */}
      {isActionModalOpen && selectedAgent && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsActionModalOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Agent</h2>
            <p className="mb-6 text-gray-700">What would you like to do with <strong>{selectedAgent.name}</strong>?</p>
            <div className="flex justify-between gap-4">
              <button onClick={handleEditAgent} className="w-full py-2 bg-blue-400 hover:bg-blue-500 text-white rounded">
                Edit
              </button>
              <button onClick={handleDeleteAgent} className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                Delete
              </button>
            </div>

            <button onClick={() => setIsActionModalOpen(false)} className="mt-4 w-full py-2 bg-gray-300 hover:bg-gray-400 text-black rounded">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Agent Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Agent</h2>
            <form onSubmit={handleSubmit(submitEdit)} className="space-y-4">
              <input {...register("name", { required: "Name required" })} className="w-full border p-2 rounded" placeholder="Full Name" />
              <input {...register("email", { required: "Email required" })} className="w-full border p-2 rounded" placeholder="Email" />
              <select {...register("category", { required: "Category required" })} className="w-full border p-2 rounded">
                <option>QTech Inventory Support System</option>
                <option>QTech Utility Billing System</option>
                <option>Philippine HR, Payroll and Time Keeping System</option>
                <option>POS for Retail and F&B</option>
                <option>QSA (Quick and Single Accounting)</option>
              </select>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => { reset(); setIsEditModalOpen(false); }} className="px-4 py-2 bg-gray-200 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agent;
