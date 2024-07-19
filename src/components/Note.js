import React, { useState, useEffect } from 'react';
import './Note.css';

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await fetch('/notes');
    const data = await response.json();
    setNotes(data);
  };

  const addNote = async () => {
    const response = await fetch('/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    const newNote = await response.json();
    setNotes([...notes, newNote]);
    setTitle('');
    setContent('');
  };

  const deleteNote = async (id) => {
    await fetch(`/notes/${id}`, { method: 'DELETE' });
    setNotes(notes.filter(note => note._id !== id));
  };

  return (
    <div>
      <h1>Notes</h1>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="Content" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
      ></textarea>
      <button onClick={addNote}>Add Note</button>
      <div id="main">
        {notes.map(note => (
          <div key={note._id} className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;

