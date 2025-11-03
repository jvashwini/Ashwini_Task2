// src/components/NoteCard.jsx
import React from "react";

const NoteCard = ({ note }) => {
  return (
    <div className="note-card">
      <p>{note.text}</p>
      <small>{new Date(note.createdAt).toLocaleString()}</small>
    </div>
  );
};

export default NoteCard;
