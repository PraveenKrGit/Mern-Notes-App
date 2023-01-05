import "./App.css";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";

function App() {
  //states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  //fetch data from mongo db to react app
  useEffect(() => {
    getNotes().then(setNotes);
  }, []);

  async function getNotes() {
    console.log("getnotes reading...")
    const url = process.env.REACT_APP_API_URL + "/notes";
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  //add data to mongo db
  function addNewNote(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/notes";
    console.log(url);

    const datetime = new Date().getTime();

    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        datetime,
      }),
    }).then((response) => {
      response.json().then((json) => {
        setTitle("");
        setDescription("");
        console.log("result", json);
        alert("Notes added");
      });
    });
  }


  return (
    <main>
      <h1>Mern Notes</h1>

      <form onSubmit={addNewNote}>
        <div className="editTitle">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
        </div>

        <div className="editDescription">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
          />
        </div>

        <button type="submit" className="btn">
          Add Notes
        </button>
      </form>

      <div className="notes">

        {notes.length > 0 &&
          notes.map((note) => (

            <div className="note">
              
              <div className="title"><span>●</span>{note.title}</div>
              <div className="description">{note.description}</div>
              <div className="datetime">{moment(note.datetime).utc().format("hh:mm a")}</div>
            </div>

          ))}

      </div>
    </main>
  );
}

export default App;
