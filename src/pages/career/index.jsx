import React, { useEffect, useState } from "react";
import "./index.css";

const Careers = () => {
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    // State for adding/updating careers
    const [formData, setFormData] = useState({ title: "", description: "", location: "", userId: "test-user" });
    const [editingId, setEditingId] = useState(null);

    // Fetch careers from backend
    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:3000/careers");
            if (!response.ok) throw new Error("Failed to fetch careers");
            const data = await response.json();
            setCareers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle add or update
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.location) {
            setError("All fields are required");
            return;
        }

        try {
            const method = editingId ? "PUT" : "POST";
            const url = editingId ? `http://localhost:3000/careers/${editingId}` : "http://localhost:3000/careers";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to save career");
            }

            fetchCareers(); // Refresh list
            setFormData({ title: "", description: "", location: "", userId: "test-user" });
            setEditingId(null);
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/careers/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete career");
            fetchCareers();
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle edit (pre-fill form)
    const handleEdit = (career) => {
        setFormData({ title: career.title, description: career.description, location: career.location, userId: career.userId });
        setEditingId(career.id);
    };

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-6">Careers</h2>

            {/* Form to Add/Update Career */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required 
                    className="w-full p-2 mb-3 border rounded-lg" />
                <textarea 
    name="description" 
    value={formData.description} 
    onChange={handleChange} 
    placeholder="Description" 
    required 
    className="w-full p-3 mb-3 border rounded-lg resize-none h-32"
    rows="6">
</textarea>
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required 
                    className="w-full p-2 mb-3 border rounded-lg" />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    {editingId ? "Update" : "Add"} Career
                </button>
            </form>

            {/* Error Message */}
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            {/* Loading State */}
            {loading && <p className="text-center">Loading careers...</p>}

            {/* Career List */}
            <ul className="space-y-4 bg-red-100">
                {careers.map((career) => (
                    <li key={career.id} className="bg-gray-100 p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold">{career.title}</h3>
                        <p className="text-gray-700">{career.description}</p>
                        <small className="block text-gray-500 mt-2">📍 {career.location}</small>
                        <div className="mt-4 flex space-x-2">
                            <button onClick={() => handleEdit(career)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(career.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Careers;