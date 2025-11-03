
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [noteData, setNoteData] = useState({
    name: "",
    topic: "",
    text: "",
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // ✅ Add Note
  const addNote = async (e) => {
    e.preventDefault();
    const { name, topic, text } = noteData;
    if (!name || !topic || !text) return alert("Please fill all fields!");
    try {
      await axios.post(
        "http://localhost:5000/notes",
        { name, topic, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNoteData({ name: "", topic: "", text: "" });
      fetchNotes();
    } catch (err) {
      console.log(err);
      alert("Failed to add note");
    }
  };

  // ✅ Delete Note
 // ✅ Delete Note
const deleteNote = async (id) => {
  if (!window.confirm("Are you sure you want to delete this note?")) return;
  try {
    await axios.delete(`http://localhost:5000/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // ✅ Instantly update frontend
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

  } catch (err) {
    console.log(err);
    alert("Failed to delete note");
  }
};


  const handleChange = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      {/* 🔹 Add Note Form */}
      <form
        onSubmit={addNote}
        className="flex flex-col gap-3 bg-slate-300 p-6 rounded-lg shadow-md w-full max-w-md mb-6 mt-8"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">Add a New Note</h2>

        <input
          type="text"
          name="name"
          value={noteData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="border p-2 text-xl rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="topic"
          value={noteData.topic}
          onChange={handleChange}
          placeholder="Topic"
          className="border p-2 text-xl rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="text"
          value={noteData.text}
          onChange={handleChange}
          placeholder="Write your note..."
          rows="3"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Add Note
        </button>
      </form>

      {/* 🔹 Notes Section */}
      {notes.length === 0 ? (
        <p className="text-gray-500 text-lg mt-10">No notes yet. Add one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-rose-400 p-6 rounded shadow hover:shadow-lg transition duration-200 break-words relative"
            >
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 bg-red-900 text-white rounded-full px-2 py-1 text-xs hover:bg-red-600"
              >
                Delete 
              </button>

              <h3 className="font-bold text-lg text-pink-950">{note.topic}</h3>
              <p className="text-sm text-white mb-1">By: {note.name}</p>
              <p>{note.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;

